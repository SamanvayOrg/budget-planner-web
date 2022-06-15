import _ from 'lodash';
import {updateSummary} from './contractMapper';

const getDetailLines = ({items}) => {
    return _.chain(items)
        .map(({items}) => _.map({items}, (detailedLine) => detailedLine))
        .flattenDeep()
        .value();
}

const findDetailLine = (detailLines, row) => _.find(detailLines, line => line.id === row.id);

const updateDetailLine = (line, row) => {
    line.name = row.name;
    line.code = row.code;
    line.budgetedAmount = row.budgetedAmount;
    line.currentYear8MonthsActuals = row.currentYear8MonthsActuals;
    line.currentYear4MonthsProbables = row.currentYear4MonthsProbables;
    line.previousYearActuals = row.previousYearActuals;
    line.yearMinus1Actuals = row.yearMinus1Actuals;
    line.yearMinus2Actuals = row.yearMinus2Actuals;
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