const currentYear = () => '2022-23';

const getBudgetYearString = (yearString = currentYear(), minus = 0) => {
    const year = Number.parseInt(yearString.substring(0, 4));
    const actual = year - minus;
    console.log(actual)
    const nextYear = actual + 1;
    return `${actual}-${nextYear}`
};

const headers = (budget = currentYear()) => (
    [
        'Sr. No. ' ,
        'Particulars' ,
        'Code Number' ,
        `Year ${getBudgetYearString(budget.budgetYear, 3)}` ,
        `Year ${getBudgetYearString(budget.budgetYear, 2)}` ,
        `Year ${getBudgetYearString(budget.budgetYear, 1)}` ,
        `Year ${getBudgetYearString(budget.budgetYear, 0)}` ,
        'Actuals for 8 months' ,
        'Probables for remaining 4 months',
        `Total`
    ]
);

const toArray = (budget) => {
    return budget.budgetLines.map((line) => [{value: line.name}, {value: line.code},
        {value: line.yearMinus3ActualAmount, readOnly: true},
        {value: line.yearMinus2ActualAmount, readOnly: true},
        {value: line.yearMinus1ActualAmount, readOnly: true},
        {value: line.plannedAmount},
        {value: line.revisedAmount},
        {value: line.actualAmount},
    ]).sort((a, b) => a.displayOrder < b.displayOrder);
};

export {toArray, headers}