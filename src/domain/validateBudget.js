import {chain, find} from 'lodash';

const errorMessages = {
    BUDGET_LOWER_THAN_PREVIOUS_YEAR: 'BUDGET_LOWER_THAN_PREVIOUS_YEAR',
    REVENUE_INCOME_LESS_THAN_REVENUE_EXPENDITURE: 'REVENUE_INCOME_LESS_THAN_REVENUE_EXPENDITURE',
    CAPITAL_INCOME_LESS_THAN_CAPITAL_EXPENDITURE: 'CAPITAL_INCOME_LESS_THAN_CAPITAL_EXPENDITURE'
};

const assert = (isTrue, errorMessage) => {
    return isTrue ? errorMessage : undefined;
};

const validate = (budget) => (...validators) => {
    return chain(validators)
        .map(validator => validator(budget))
        .compact()
        .value();
};

const budgetShouldBeGreaterThanPreviousYear = (budget) => {
    const summary = budget.summary;
    return assert(summary.budgetedAmount < (summary.currentYear8MonthsActuals + summary.currentYear4MonthsProbables),
        errorMessages.BUDGET_LOWER_THAN_PREVIOUS_YEAR);
};

const revenueIncomeShouldBeGreaterThanRevenueExpenditure = (budget) => {
    const revenueIncomeSummary = find(budget.items, item => item.majorHeadGroup === 'Revenue Receipt').summary;
    const revenueExpenditureSummary = find(budget.items, item => item.majorHeadGroup === 'Expenses').summary;

    return assert(revenueExpenditureSummary.budgetedAmount > revenueIncomeSummary.budgetedAmount,
        errorMessages.REVENUE_INCOME_LESS_THAN_REVENUE_EXPENDITURE);
};

const capitalIncomeShouldBeGreaterThanCapitalExpenditure = (budget) => {
    const capitalExpenditure = find(budget.items, item => item.majorHeadGroup === "Assets (Capital Expenditure)").summary;
    const capitalIncome = find(budget.items, item => item.majorHeadGroup === "Liability (Capital Income)").summary;

    return assert( capitalExpenditure.budgetedAmount > capitalIncome.budgetedAmount ,
        errorMessages.CAPITAL_INCOME_LESS_THAN_CAPITAL_EXPENDITURE);
};

const validateBudget = (budget) => validate(budget)(
    budgetShouldBeGreaterThanPreviousYear,
    revenueIncomeShouldBeGreaterThanRevenueExpenditure,
    capitalIncomeShouldBeGreaterThanCapitalExpenditure
);

export default validateBudget;
