import _ from "lodash";
import {fromContract} from "./budgetContractMapper";


const toBudgetSummaryReport = (budgets, year) => {
	const currentYearBudget = _.chain(budgets)
		.filter((e) => e.budgetYear === year)
		.first()
		.value()

	const prevYearBudget = _.chain(budgets)
		.filter((e) => e.budgetYear === `${year.substring(0, 4) - 1}-${year.substring(7, 5) - 1}`)
		.first()
		.value()

	const budgetedAmount = (budget) => {
		let budgeted = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Revenue Receipt')
				.first()
				.value()
			budgeted = revenueIncome.summary.budgetedAmount;
		}
		return budgeted;
	}

	const expenseAmount = (budget) => {
		let expenses = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Expenses')
				.first()
				.value()
			expenses = revenueIncome.summary.budgetedAmount;
		}
		return expenses;
	}

	const getHeadings = () => {
		let headings = [];
		headings.push('');
		headings.push(`FY ${year.substring(0, 4) - 1} - ${year.substring(7, 5) - 1} (Revised Estimates)`);
		headings.push(`FY ${year} (Budgeted Estimates)`);
		return headings
	};

	const getData = () => {
		let dataLine = [];
		dataLine.push({name: 'Revenue Income', revised: 2965, budgeted: budgetedAmount(currentYearBudget)})
		dataLine.push({name: 'Revenue Expenditure', revised: 2965, budgeted: expenseAmount(currentYearBudget)})
		return dataLine;
	}
	return {headings: getHeadings(), data: getData()};
}

export {toBudgetSummaryReport}

