import _ from 'lodash';
import {t} from "i18next"

const getBudgetView = (budget) => {
	const getChar =  (order, startingChar) => {
		return String.fromCharCode(startingChar.charCodeAt(0) + order);
	};


	const headerLine = (value, headerClass, index) => ([
		{
			value: index,
			className: headerClass,
			context: {type: 'sr', key: 'sr'},
			readOnly: true
		},
		{value:t(value), className: headerClass, context: {type: 'header', key: 'name'}},
		{value: null, context: {type: 'header', key: 'code'}},
		{value: null, context: {type: 'header', key: 'yearMinus2Actuals'}},
		{value: null, context: {type: 'header', key: 'yearMinus1Actuals'}},
		{value: null, context: {type: 'header', key: 'previousYearActuals'}},
		{value: null, context: {type: 'header', key: 'currentYear8MonthsActuals'}},
		{value: null, context: {type: 'header', key: 'currentYear4MonthsProbables'}},
		{value: null, context: {type: 'header', key: 'budgetedAmount'}},
	]);

	const singleLine = (line, index, indexClass = 'Spreadsheet-particulars-index', nameClass = 'Spreadsheet-particulars', numberClass = 'Spreadsheet-number') => ([
		{value: t(index + 1),className: indexClass, context: {id: line.id, type: 'detail', key: 'sr'}, readOnly: true},
		{value: t(line.name), className: nameClass, context: {id: line.id, type: 'detail', key: 'name'}, readOnly: true},
		{value: line.code, className: numberClass, context: {id: line.id, type: 'detail', key: 'code'}, readOnly: true},
		{value: line.yearMinus2Actuals,className: numberClass,context: {id: line.id, type: 'detail', key: 'yearMinus2Actuals'},readOnly: true},
		{value: line.yearMinus1Actuals,className: numberClass,context: {id: line.id, type: 'detail', key: 'yearMinus1Actuals'},readOnly: true},
		{value: line.previousYearActuals,className: numberClass,context: {id: line.id, type: 'detail', key: 'previousYearActuals'}},
		{value: line.currentYear8MonthsActuals,className: numberClass,context: {id: line.id, type: 'detail', key: 'currentYear8MonthsActuals'}},
		{value: line.currentYear4MonthsProbables,className: numberClass,context: {id: line.id, type: 'detail', key: 'currentYear4MonthsProbables'}},
		{value: line.budgetedAmount, className: numberClass, context: {id: line.id, type: 'detail', key: 'budgetedAmount'}},
		{value: "delete", className: line.eligibleForDeletion ? "Spreadsheet-deleteButton":"Spreadsheet-deleteButton disable",
			context: {type: 'header', key: 'deleteButton', detailCode: line.code, majorHead: line.majorHead}},

	]);

	const getSummary = (name, line, nameClass, numberClass) => ([
		{value: null, className: nameClass, context: {type: 'summary', key: 'sr'}, readOnly: true},
		{value: name, className: nameClass, context: {type: 'summary', key: 'name'}, readOnly: true},
		{value: null, className: numberClass, context: {type: 'summary', key: 'code'}, readOnly: true},
		{value: line.yearMinus2Actuals,className: numberClass,context: {type: 'summary', key: 'yearMinus2Actuals'},readOnly: true},
		{value: line.yearMinus1Actuals,className: numberClass,context: {type: 'summary', key: 'yearMinus1Actuals'},readOnly: true},
		{value: line.previousYearActuals,className: numberClass,context: {type: 'summary', key: 'previousYearActuals'},readOnly: true},
		{value: line.currentYear8MonthsActuals,className: numberClass,context: {type: 'summary', key: 'currentYear8MonthsActuals'},readOnly: true},
		{value: line.currentYear4MonthsProbables,className: numberClass,context: {type: 'summary', key: 'currentYear4MonthsProbables'},readOnly: true},
		{value: line.budgetedAmount,className: numberClass,context: {type: 'summary', key: 'budgetedAmount'},readOnly: true},
	]);

	const getAddNewLine = (majorHead, majorHeadGroup, allowMajorHeadSelection, nameClass = 'Spreadsheet-particulars', numberClass = 'Spreadsheet-number') => ([
		{value: null, className: nameClass, context: {type: 'addNewLine', key: 'sr'}, readOnly: true},
		{value: 'Add a new entry',id:'addRowButton', className: "Spreadsheet-addNewLineBox", context: {type: 'addNewLine', key: 'addButton',
				majorHead:majorHead, majorHeadGroup:majorHeadGroup, allowMajorHeadSelection:allowMajorHeadSelection}, readOnly: true},
		{value: null, className: numberClass, context: {type: 'addNewLine', key: 'code'}, readOnly: true},
		{value: null, className: numberClass, context: {type: 'addNewLine', key: 'yearMinus2Actuals'}, readOnly: true},
		{value: null, className: numberClass, context: {type: 'addNewLine', key: 'yearMinus1Actuals'}, readOnly: true},
		{value: null, className: numberClass, context: {type: 'addNewLine', key: 'previousYearActuals'}, readOnly: true},
		{value: null, className: numberClass, context: {type: 'addNewLine', key: 'budgetedAmount'}, readOnly: true},
		{value: null,className: numberClass,context: {type: 'addNewLine', key: 'currentYear8MonthsActuals'},readOnly: true},
		{value: null,className: numberClass,context: {type: 'addNewLine', key: 'currentYear4MonthsProbables'},readOnly: true},
	]);

	const majorHeadLines = ({majorHead, items, summary}, index) => {
		return _.chain([])
			.concat([headerLine(majorHead, 'Spreadsheet-Major-head', getChar(index, 'a'))])
			.concat(_.chain(items).filter( item => !item.voided)
				.map( (lineItem, index) => singleLine(lineItem, index)).value())
			.concat([getAddNewLine(majorHead, '', false)])
			.concat([getSummary(majorHead + ' Total', summary, 'Spreadsheet-total-particulars', 'Spreadsheet-total-number')])
			.value();
	};

	const majorHeadGroupDetailLines = (majorHeadGroup) => {
		return _.chain(majorHeadGroup.items)
			.filter(majorHead => majorHead.items.find(item => !item.voided))
			.map((budgetHead, index) => majorHeadLines(budgetHead, index))
			.flatten()
			.concat([getAddNewLine('', majorHeadGroup.majorHeadGroup, true)])
			.value();
	}

	const majorHeadGroupLines = (majorHeadGroup, index) => {
		return _.chain([])
			.concat([headerLine(majorHeadGroup.majorHeadGroup, 'Spreadsheet-Major-head-group', getChar(index, 'A'))])
			.concat(majorHeadGroupDetailLines(majorHeadGroup))
			.concat([getSummary(majorHeadGroup.majorHeadGroup + ' Total', majorHeadGroup.summary, 'Spreadsheet-total-particulars', 'Spreadsheet-total-number')])
			.value();
	};

	return _.chain(budget.items)
		.map((majorHeadGroup, index) => majorHeadGroupLines(majorHeadGroup, index))
		.flatten()
		.concat([getSummary('Total', budget.summary, 'Spreadsheet-total-particulars', 'Spreadsheet-total-number')])
		.value();
};

export default getBudgetView;