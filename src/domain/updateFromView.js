import _ from 'lodash';
import {updateSummary} from './contractMapper';

const getDetailLines = (budget) => {
    return _.chain(budget.items)
        .map((majorHeadGroup) => _.map(majorHeadGroup.items, (majorHead) => _.map(majorHead.items, (detailedLine) => detailedLine)))
        .flattenDeep()
        .value();
};

const findDetailLine = (detailLines, row) => _.find(detailLines, line => line.id === row[0].context.id);


//todo: This can use the key attribute and can be generalized
const updateDetailLine = (line, row = []) => {
    line.yearMinus2Actuals = getNumber(_.get(row[3], 'value'));
    line.yearMinus1Actuals = getNumber(_.get(row[4], 'value'));
    line.previousYearActuals = getNumber(_.get(row[5], 'value'));
    line.currentYear8MonthsActuals = getNumber(_.get(row[6], 'value'));
    line.currentYear4MonthsProbables = getNumber(_.get(row[7], 'value'));
    line.budgetedAmount = getNumber(_.get(row[8], 'value'));
}

const getNumber = (item) => {
	if (_.isNull(item)) {
		return null;
	}
	const num = _.toNumber(item);
	if (_.isNaN(num)) {
		return null;
	}
	return num;
}

const updateFromView = (budgetView, budget) => {
    const viewLines = _.filter(budgetView, item => {
        return item[0].context.type === 'detail';
    });
    const modelLines = getDetailLines(budget);
    _.forEach(viewLines, (row) => {
        updateDetailLine(findDetailLine(modelLines, row), row);
    });
    updateSummary(budget);
    return budget;
};

export {
    updateFromView,
    getDetailLines
};