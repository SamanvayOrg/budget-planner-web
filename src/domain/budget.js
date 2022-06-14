// let budget = {};
//
// const setBudget = (budgetObject) => {
//     budget = budgetObject;
// };
//
// const getLinesToDisplay = (budget) => {
//     const groupedItems = budget.budgetLines.groupBy(({majorHeadGroup}) => majorHeadGroup)
// }


import _ from 'lodash';

const linesForMajorHeadGroup = (lines, majorHeadGroup) => {
    _.filter(lines, line => line.majorHeadGroup === majorHeadGroup);
};

const fromContract = ({budgetYear, budgetLines}) => {
    const orderedMajorHeadGroups = _.chain(budgetLines)
        .map(({majorHeadGroup, majorHeadGroupDisplayOrder}) => ({majorHeadGroup, majorHeadGroupDisplayOrder}))
        .uniqBy('majorHeadGroup')
        .sortBy(['majorHeadGroupDisplayOrder'])
        .map(({majorHeadGroup}) => majorHeadGroup)
        .value();
    const majorHeadGroupItems = _.map(orderedMajorHeadGroups, majorHeadGroup => ({
        majorHeadGroup,
        items: linesForMajorHeadGroup(budgetLines, majorHeadGroup)
    }));

    return {
        year: Number.parseInt(budgetYear.substring(0, 4)),
        items: majorHeadGroupItems
    };
};

export {
    fromContract
};