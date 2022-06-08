import _ from "lodash";

const currentYear = () => '2022-23';

const getBudgetYearString = (yearString = currentYear(), minus = 0) => {
    const year = Number.parseInt(yearString.substring(0, 4));
    const actual = year - minus;
    const nextYear = actual + 1;
    return `${actual}-${nextYear}`
};

const headers = (budget = currentYear()) => (
    [
        'Particulars',
        'Code Number',
        `${getBudgetYearString(budget.budgetYear, 3)} Actuals`,
        `${getBudgetYearString(budget.budgetYear, 2)} Actuals`,
        `${getBudgetYearString(budget.budgetYear, 1)} Actuals`,
        `Planned amount`,
        'Actuals for 8 months',
        'Probables for remaining 4 months',
        'Total'
    ]
);

const toArray = ({budgetLines}) => {
    const orderedMajorHeadGroups = _.chain(budgetLines)
        .map(({majorHeadGroup, majorHeadGroupDisplayOrder}) => ({majorHeadGroup, majorHeadGroupDisplayOrder}))
        .uniqBy('majorHeadGroup')
        .sortBy(['majorHeadGroupDisplayOrder'])
        .map(({majorHeadGroup}) => majorHeadGroup)
        .value();

    const addAmounts = (lines, key) => _.reduce(lines, (accumulator, line) => {
        return accumulator + line[key]
    }, 0);

    const getLineName = line => line.name === 'All'? line.minorHead + ' (All)': line.name;

    let finalArray = [];
    _.forEach(orderedMajorHeadGroups, (majorHeadGroup) => {
        finalArray.push([
            {value: majorHeadGroup, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
        ]);
        const matchingLines = _.filter(budgetLines, line => line.majorHeadGroup === majorHeadGroup);
        _.forEach(matchingLines, line =>
            finalArray.push([
                {value: getLineName(line), className: 'Spreadsheet-particulars', details: {line, type: 'name'}},
                {value: line.code, className: 'Spreadsheet-number', details: {line, type: 'code'}},
                {value: line.yearMinus3ActualAmount, className: 'Spreadsheet-number', details: {line, type: 'yearMinus3ActualAmount'}},
                {value: line.yearMinus2ActualAmount, className: 'Spreadsheet-number'},
                {value: line.yearMinus1ActualAmount, className: 'Spreadsheet-number'},
                {value: line.plannedAmount, className: 'Spreadsheet-number', details: {line, type: 'plannedAmount'}},
                {value: line.revisedAmount, className: 'Spreadsheet-number'},
                {value: line.actualAmount, className: 'Spreadsheet-number'},
                {value: null, className: 'Spreadsheet-number'},
            ]));

        finalArray.push([
                {value: `Total ${majorHeadGroup}`, className: 'Spreadsheet-total-particulars'},
                {value: null, className: 'Spreadsheet-total-number'},
                {value: addAmounts(matchingLines, 'yearMinus3ActualAmount'), className: 'Spreadsheet-total-number'},
                {value: addAmounts(matchingLines, 'yearMinus2ActualAmount'), className: 'Spreadsheet-total-number'},
                {value: addAmounts(matchingLines, 'yearMinus1ActualAmount'), className: 'Spreadsheet-total-number'},
                {value: addAmounts(matchingLines, 'plannedAmount'), className: 'Spreadsheet-total-number'},
                {value: addAmounts(matchingLines, 'revisedAmount'), className: 'Spreadsheet-total-number'},
                {value: addAmounts(matchingLines, 'actualAmount'), className: 'Spreadsheet-total-number'},
                {value: null, className: 'Spreadsheet-total-number'},
            ]
        );
    });

    return finalArray;
};

export {toArray, headers}