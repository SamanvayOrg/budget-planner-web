import _ from 'lodash';

const getView = (budget) => {
	function getChar(order) {
		return String.fromCharCode('A'.charCodeAt(0) + order - 1);
	}

	const headerLine = (value, headerClass, majorHeadGroupOrder) => ([
		{value: headerClass === 'Spreadsheet-Major-head-group' ? getChar(majorHeadGroupOrder) : null, className: headerClass,context: {type: 'sr', key: 'sr'},readOnly:true},
		{value, className: headerClass, context: {type: 'header', key: 'name'}},
		{value: null, context: {type: 'header', key: 'code'}},
		{value: null, context: {type: 'header', key: 'yearMinus2Actuals'}},
		{value: null, context: {type: 'header', key: 'yearMinus1Actuals'}},
		{value: null, context: {type: 'header', key: 'previousYearActuals'}},
		{value: null, context: {type: 'header', key: 'budgetedAmount'}},
		{value: null, context: {type: 'header', key: 'currentYear8MonthsActuals'}},
		{value: null, context: {type: 'header', key: 'currentYear4MonthsProbables'}}
	]);

	const singleLine = (line, nameClass = 'Spreadsheet-particulars', numberClass = 'Spreadsheet-number') => ([
		{value: line.displayOrder,className: nameClass, context: {id: line.id, type: 'detail', key: 'sr'}, readOnly: true},
		{value: line.name, className: nameClass, context: {id: line.id, type: 'detail', key: 'name'}, readOnly: true},
		{value: line.code, className: numberClass, context: {id: line.id, type: 'detail', key: 'code'}, readOnly: true},
		{value: line.yearMinus2Actuals,className: numberClass,context: {id: line.id, type: 'detail', key: 'yearMinus2Actuals'},readOnly: true},
		{value: line.yearMinus1Actuals,className: numberClass,context: {id: line.id, type: 'detail', key: 'yearMinus1Actuals'},readOnly: true},
		{value: line.previousYearActuals,className: numberClass,context: {id: line.id, type: 'detail', key: 'previousYearActuals'}},
		{value: line.budgetedAmount, className: numberClass, context: {id: line.id, type: 'detail', key: 'budgetedAmount'}},
		{value: line.currentYear8MonthsActuals,className: numberClass,context: {id: line.id, type: 'detail', key: 'currentYear8MonthsActuals'}},
		{value: line.currentYear4MonthsProbables,className: numberClass,context: {id: line.id, type: 'detail', key: 'currentYear4MonthsProbables'}
		}
	]);

	const getSummary = (name, line, nameClass, numberClass) => ([
		{value: null, className: nameClass, context: {type: 'summary', key: 'sr'}, readOnly: true},
		{value: name, className: nameClass, context: {type: 'summary', key: 'name'}, readOnly: true},
		{value: null, className: numberClass, context: {type: 'summary', key: 'code'}, readOnly: true},
		{value: line.yearMinus2Actuals,className: numberClass,context: {type: 'summary', key: 'yearMinus2Actuals'},readOnly: true},
		{value: line.yearMinus1Actuals,className: numberClass,context: {type: 'summary', key: 'yearMinus1Actuals'},readOnly: true},
		{value: line.previousYearActuals,className: numberClass,context: {type: 'summary', key: 'previousYearActuals'},readOnly: true},
		{value: line.budgetedAmount,className: numberClass,context: {type: 'summary', key: 'budgetedAmount'},readOnly: true},
		{value: line.currentYear8MonthsActuals,className: numberClass,context: {type: 'summary', key: 'currentYear8MonthsActuals'},readOnly: true},
		{value: line.currentYear4MonthsProbables,className: numberClass,context: {type: 'summary', key: 'currentYear4MonthsProbables'},readOnly: true},
	]);

	const majorHeadLines = ({majorHead, items,summary}) => {
		return _.chain([])
			.concat([headerLine(majorHead, 'Spreadsheet-Major-head')])
			.concat(_.map(items, lineItem => singleLine(lineItem)))
			.concat([getSummary(majorHead + ' Total', summary, 'Spreadsheet-total-particulars', 'Spreadsheet-total-number')])
			.value();
	};

	function majorHeadGroupDetailLines(majorHeadGroup) {
		return _.chain(majorHeadGroup.items)
			.map(budgetHead => majorHeadLines(budgetHead, majorHeadGroup))
			.flatten()
			.value();
	}

	const majorHeadGroupLines = (majorHeadGroup) => {
		return _.chain([])
			.concat([headerLine(majorHeadGroup.majorHeadGroup, 'Spreadsheet-Major-head-group', majorHeadGroup.items[0].items[0].majorHeadGroupDisplayOrder)])
			.concat(majorHeadGroupDetailLines(majorHeadGroup))
			.concat([getSummary(majorHeadGroup.majorHeadGroup + ' Total', majorHeadGroup.summary, 'Spreadsheet-total-particulars', 'Spreadsheet-total-number')])
			.value();
	};

	return _.chain(budget.items)
		.map(majorHeadGroup => majorHeadGroupLines(majorHeadGroup))
		.flatten()
		.concat([getSummary('Total', budget.summary, 'Spreadsheet-total-particulars', 'Spreadsheet-total-number')])
		.value();
};

export default getView;