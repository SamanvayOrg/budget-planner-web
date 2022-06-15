import _ from 'lodash';

const getView = (budget) => {
    const headerLine = (value, headerClass) => ([
        {value, className: headerClass, context: {type: 'header', key: 'name'}},
        {value: null, context: {type: 'header', key: 'code'}},
        {value: null, context: {type: 'header', key: 'budgetedAmount'}},
        {value: null, context: {type: 'header', key: 'currentYear8MonthsActuals'}},
        {value: null, context: {type: 'header', key: 'currentYear4MonthsProbables'}},
        {value: null, context: {type: 'header', key: 'previousYearActuals'}},
        {value: null, context: {type: 'header', key: 'yearMinus1Actuals'}},
        {value: null, context: {type: 'header', key: 'yearMinus2Actuals'}},
    ]);

    const singleLine = (line, nameClass = 'Spreadsheet-particulars', numberClass = 'Spreadsheet-number') => ([
        {value: line.name, className: nameClass, context: {id: line.id, type: 'detail', key: 'name'}},
        {value: line.code, className: numberClass, context: {id: line.id, type: 'detail', key: 'code'}},
        {value: line.budgetedAmount, className: numberClass, context: {id: line.id, type: 'detail', key: 'budgetedAmount'}},
        {value: line.currentYear8MonthsActuals, className: numberClass, context: {id: line.id, type: 'detail', key: 'currentYear8MonthsActuals'}},
        {value: line.currentYear4MonthsProbables, className: numberClass, context: {id: line.id, type: 'detail', key: 'currentYear4MonthsProbables'}},
        {value: line.previousYearActuals, className: numberClass, context: {id: line.id, type: 'detail', key: 'previousYearActuals'}},
        {value: line.yearMinus1Actuals, className: numberClass, context: {id: line.id, type: 'detail', key: 'yearMinus1Actuals'}},
        {value: line.yearMinus2Actuals, className: numberClass, context: {id: line.id, type: 'detail', key: 'yearMinus2Actuals'}},
    ]);

    const summary = (name, line, nameClass, numberClass) => ([
        {value: name, className: nameClass, context: {type: 'summary', key: 'name'}},
        {value: null, className: numberClass, context: {type: 'summary', key: 'code'}},
        {value: line.budgetedAmount, className: numberClass, context: {type: 'summary', key: 'budgetedAmount'}},
        {value: line.currentYear8MonthsActuals, className: numberClass, context: {type: 'summary', key: 'currentYear8MonthsActuals'}},
        {value: line.currentYear4MonthsProbables, className: numberClass, context: {type: 'summary', key: 'currentYear4MonthsProbables'}},
        {value: line.previousYearActuals, className: numberClass, context: {type: 'summary', key: 'previousYearActuals'}},
        {value: line.yearMinus1Actuals, className: numberClass, context: {type: 'summary', key: 'yearMinus1Actuals'}},
        {value: line.yearMinus2Actuals, className: numberClass, context: {type: 'summary', key: 'yearMinus2Actuals'}},
    ]);

    const majorHeadLines = ({majorHead, items}) => {
        return _.chain([])
            .concat([headerLine(majorHead, 'Spreadsheet-Major-head')])
            .concat(_.map(items, lineItem => singleLine(lineItem)))
            .concat([summary(majorHead + ' Total', summary, 'Spreadsheet-total-particulars', 'Spreadsheet-total-number')])
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
            .concat([headerLine(majorHeadGroup.majorHeadGroup, 'Spreadsheet-Major-head-group')])
            .concat(majorHeadGroupDetailLines(majorHeadGroup))
            .concat([summary(majorHeadGroup.majorHeadGroup + ' Total', majorHeadGroup.summary, 'Spreadsheet-total-particulars', 'Spreadsheet-total-number')])
            .value();
    };

    return _.chain(budget.items)
        .map(majorHeadGroup => majorHeadGroupLines(majorHeadGroup))
        .flatten()
        .concat([summary('Total', budget.summary, 'Spreadsheet-total-particulars', 'Spreadsheet-total-number')])
        .value();
};

export default getView;