import _ from 'lodash';
import {updateSummary} from './contractMapper';

const getDetailLines = (budget) => {
    return _.chain(budget.items)
        .map((majorHeadGroup) => _.map(majorHeadGroup.items, (majorHead) => _.map(majorHead.items, (detailedLine) => detailedLine)))
        .flattenDeep()
        .value();
};

const findDetailLine = (detailLines, row) => _.find(detailLines, line => line.id === row[0].context.id);

const updateDetailLine = (line, row) => {
    line.yearMinus2Actuals = row[3].value;
    line.yearMinus1Actuals = row[4].value;
    line.previousYearActuals = row[5].value;
    line.budgetedAmount = row[6].value;
    line.currentYear8MonthsActuals = row[7].value;
    line.currentYear4MonthsProbables = row[8].value;
}

const updateFromView = (budgetView, budget) => {
    const viewLines = _.filter(budgetView, item => {
         return item[0].context.type === 'detail'
    });
    const modelLines = getDetailLines(budget);
    _.forEach(viewLines, (row) => {
        updateDetailLine(findDetailLine(modelLines, row), row);
    });
    updateSummary(budget);
    return budget;
}

export {
    updateFromView
}