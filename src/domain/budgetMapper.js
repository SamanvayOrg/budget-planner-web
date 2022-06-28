const currentYear = () => '2022-23';

const getBudgetYearString = (yearString = currentYear(), minus = 0) => {
    const year = Number.parseInt(yearString.substring(0, 4));
    const actual = year - minus;
    const nextYear = actual + 1;
    return `${actual}-${nextYear}`
};

const headers = (budget = currentYear()) => (
    [
        'Sr',
        'Particulars',
        'Code Number',
        `${getBudgetYearString(budget.budgetYear, 4)} Actuals`,
        `${getBudgetYearString(budget.budgetYear, 3)} Actuals`,
        `${getBudgetYearString(budget.budgetYear, 2)} Actuals`,
        `${getBudgetYearString(budget.budgetYear, 1)} Actuals for 8 months`,
        `${getBudgetYearString(budget.budgetYear, 1)} Probables for remaining 4 months`,
        `${getBudgetYearString(budget.budgetYear, 0)} Budgeted amount`,
    ]
);
export {headers}