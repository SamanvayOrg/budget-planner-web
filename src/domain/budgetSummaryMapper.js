import _ from "lodash";
import {fromContract} from "./budgetContractMapper";


const budgetSummaryData = (budgets, year) => {
	const currentYearBudget = _.chain(budgets)
		.filter((e) => e.budgetYear === year)
		.first()
		.value()
	const prevYearBudget = _.chain(budgets)
		.filter((e) => e.budgetYear === `${year.substring(0, 4) - 1}-${year.substring(7, 5) - 1}`)
		.first()
		.value()

	const getBudgetedValue = (budget, itemName) => {
		let revenue = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === itemName)
				.first()
				.value()
			revenue = _.ceil(revenueIncome.summary.budgetedAmount/100000);
		}
		return revenue;
	}

	const getRevisedValue = (budget, itemName) => {
		let revenue = 0;
		if (!_.isEqual(budget, undefined)) {
			const revenueIncome = _.chain(fromContract(budget).items)
				.filter((e) => e.majorHeadGroup === itemName)
				.first()
				.value()
			revenue = _.ceil(revenueIncome.summary.currentYear4MonthsProbables + revenueIncome.summary.currentYear8MonthsActuals);
		}
		return revenue;
	}


	const getHeadings = () => {
		let headings = [];
		headings.push('');
		headings.push(`FY ${year.substring(0, 4) - 1} - ${year.substring(7, 5) - 1} (Revised Estimates)`);
		headings.push(`FY ${year} (Budgeted Estimates)`);
		return headings
	};

	const getBudgetedTotalSurplusOrDef = () => {
		return (getBudgetedValue(currentYearBudget, 'Revenue Receipt') + getBudgetedValue(currentYearBudget, 'Assets')) - (getBudgetedValue(currentYearBudget, 'Expenses') + getBudgetedValue(currentYearBudget, 'Liability'))
	}
	const getRevisedTotalSurplusOrDef = () => {
		return (getRevisedValue(prevYearBudget, 'Revenue Receipt') + getRevisedValue(prevYearBudget, 'Assets')) - (getRevisedValue(prevYearBudget, 'Expenses') + getRevisedValue(prevYearBudget, 'Liability'))
	}

	const getData = () => {
		let dataLine = [];
		dataLine.push({
			name: 'Revenue Income',
			revised: getRevisedValue(prevYearBudget, 'Revenue Receipt'),
			budgeted: getBudgetedValue(currentYearBudget, 'Revenue Receipt')
		});
		dataLine.push({
			name: 'Revenue Expenditure',
			revised: getRevisedValue(prevYearBudget, 'Expenses'),
			budgeted: getBudgetedValue(currentYearBudget, 'Expenses')
		});
		dataLine.push({
			name: 'Capital Income',
			revised: getRevisedValue(prevYearBudget, 'Assets'),
			budgeted: getBudgetedValue(currentYearBudget, 'Assets')
		});
		dataLine.push({
			name: 'Capital Expenditure',
			revised: getRevisedValue(prevYearBudget, 'Liability'),
			budgeted: getBudgetedValue(currentYearBudget, 'Liability')
		});
		dataLine.push({
			name: 'Total surplus/deficit',
			revised: getRevisedTotalSurplusOrDef(prevYearBudget, 'Liability'),
			budgeted: getBudgetedTotalSurplusOrDef(currentYearBudget, 'Liability')
		});
		return dataLine;
	}
	const piechartData = () => {
		let pieData = [];
		pieData.push({
			id: 'Revenue Budget',
			value: getBudgetedValue(currentYearBudget, 'Expenses')
		});
		pieData.push({
			id: 'Capital Budget',
			value: getBudgetedValue(currentYearBudget, 'Liability')
		});
		return pieData;
	}

	return {headings: getHeadings(), data: getData(), pieChartData: piechartData()};
}


export {budgetSummaryData}

