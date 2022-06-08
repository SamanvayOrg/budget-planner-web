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
        `Total`
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

    let finalArray = [];
    _.forEach(orderedMajorHeadGroups, (majorHeadGroup) => {
        finalArray.push([{value: majorHeadGroup, readOnly: true}]);
        const matchingLines = _.filter(budgetLines, line => line.majorHeadGroup === majorHeadGroup);
        _.forEach(matchingLines, line =>
            finalArray.push([
                {value: line.name, readOnly: true},
                {value: line.code, readOnly: true},
                {value: line.yearMinus3ActualAmount, readOnly: true},
                {value: line.yearMinus2ActualAmount, readOnly: true},
                {value: line.yearMinus1ActualAmount, readOnly: true},
                {value: line.plannedAmount},
                {value: line.revisedAmount},
                {value: line.actualAmount},
            ]));

        finalArray.push([
                {value: `Total ${majorHeadGroup}`, readOnly: true},
                {value: null, readOnly: true},
                {value: addAmounts(matchingLines, 'yearMinus3ActualAmount'), readOnly: true},
                {value: addAmounts(matchingLines, 'yearMinus2ActualAmount'), readOnly: true},
                {value: addAmounts(matchingLines, 'yearMinus1ActualAmount'), readOnly: true},
                {value: addAmounts(matchingLines, 'plannedAmount'), readOnly: true},
                {value: addAmounts(matchingLines, 'revisedAmount'), readOnly: true},
                {value: addAmounts(matchingLines, 'actualAmount'), readOnly: true}
            ]
        );
        finalArray.push([])
    });

    return finalArray;
};

export {toArray, headers}