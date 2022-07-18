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

	const revenueIncome = (budget) => {
		let revenue = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Revenue Receipt')
				.first()
				.value()
			revenue = revenueIncome.summary.budgetedAmount;
		}
		return revenue;
	}

	const revenueExpenditure = (budget) => {
		let expenses = 0;
		if (!_.isEqual(budget, undefined)) {
			console.log(fromContract(budget))
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Expenses')
				.first()
				.value()
			expenses = revenueIncome.summary.budgetedAmount;
		}
		return expenses;
	}
	const capitalIncome = (budget) => {
		let assets = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Assets')
				.first()
				.value()
			assets = revenueIncome.summary.budgetedAmount;
		}
		return assets;
	}
	const capitalExpenditure = (budget) => {
		let liability = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Liability')
				.first()
				.value()
			liability = revenueIncome.summary.budgetedAmount;
		}
		return liability;
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
		dataLine.push({name: 'Revenue Income', revised: 2965, budgeted: revenueIncome(currentYearBudget)});
		dataLine.push({name: 'Revenue Expenditure', revised: 2965, budgeted: revenueExpenditure(currentYearBudget)});
		dataLine.push({name: 'Capital Income', revised: 2965, budgeted: capitalIncome(currentYearBudget)});
		dataLine.push({name: 'Capital Expenditure', revised: 2965, budgeted: capitalExpenditure(currentYearBudget)});
		return dataLine;
	}
	return {headings: getHeadings(), data: getData()};
}

export {toBudgetSummaryReport}

