let budget = {};

const setBudget = (budgetObject) => {
    budget = budgetObject;
};

const getLinesToDisplay = (budget) => {
    const groupedItems = budget.budgetLines.groupBy(({majorHeadGroup}) => majorHeadGroup)
}