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

	const budgetedRevenueIncome = (budget) => {
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

	const budgetedRevenueExpenditure = (budget) => {
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
	const budgetedCapitalIncome = (budget) => {
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
	const budgetedCapitalExpenditure = (budget) => {
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


	const revisedRevenueIncome = (budget) => {
		let revenue = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Revenue Receipt')
				.first()
				.value()
			revenue = revenueIncome.summary.currentYear4MonthsProbables + revenueIncome.summary.currentYear8MonthsActuals;
		}
		return revenue;
	}

	const revisedRevenueExpenditure = (budget) => {
		let revisedExpenses = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Expenses')
				.first()
				.value()
			revisedExpenses = revenueIncome.summary.currentYear4MonthsProbables + revenueIncome.summary.currentYear8MonthsActuals;
		}
		return revisedExpenses;
	}
	const revisedCapitalIncome = (budget) => {
		let assets = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Assets')
				.first()
				.value()
			assets = revenueIncome.summary.currentYear4MonthsProbables + revenueIncome.summary.currentYear8MonthsActuals;
		}
		return assets;
	}
	const revisedCapitalExpenditure = (budget) => {
		let liability = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === 'Liability')
				.first()
				.value()
			liability = revenueIncome.summary.currentYear4MonthsProbables + revenueIncome.summary.currentYear8MonthsActuals;
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
		dataLine.push({
			name: 'Revenue Income',
			revised: revisedRevenueIncome(currentYearBudget),
			budgeted: budgetedRevenueIncome(currentYearBudget)
		});
		dataLine.push({
			name: 'Revenue Expenditure',
			revised: revisedRevenueExpenditure(currentYearBudget),
			budgeted: budgetedRevenueExpenditure(currentYearBudget)
		});
		dataLine.push({
			name: 'Capital Income',
			revised: revisedCapitalIncome(currentYearBudget),
			budgeted: budgetedCapitalIncome(currentYearBudget)
		});
		dataLine.push({
			name: 'Capital Expenditure',
			revised: revisedCapitalExpenditure(currentYearBudget),
			budgeted: budgetedCapitalExpenditure(currentYearBudget)
		});
		return dataLine;
	}
	return {headings: getHeadings(), data: getData()};
}

export {toBudgetSummaryReport}

