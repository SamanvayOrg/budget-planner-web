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
			revenue = revenueIncome.summary.budgetedAmount;
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
			revised: _.ceil(getRevisedValue(prevYearBudget, 'Revenue Receipt') / 100000),
			budgeted: _.ceil(getBudgetedValue(currentYearBudget, 'Revenue Receipt') / 100000)
		});
		dataLine.push({
			name: 'Revenue Expenditure',
			revised: _.ceil(getRevisedValue(prevYearBudget, 'Expenses') / 100000),
			budgeted: _.ceil(getBudgetedValue(currentYearBudget, 'Expenses') / 100000)
		});
		dataLine.push({
			name: 'Capital Income',
			revised: _.ceil(getRevisedValue(prevYearBudget, 'Assets') / 100000),
			budgeted: _.ceil(getBudgetedValue(currentYearBudget, 'Assets') / 100000)
		});
		dataLine.push({
			name: 'Capital Expenditure',
			revised: _.ceil(getRevisedValue(prevYearBudget, 'Liability') / 100000),
			budgeted: _.ceil(getBudgetedValue(currentYearBudget, 'Liability') / 100000)
		});
		dataLine.push({
			name: 'Total surplus/deficit',
			revised: _.ceil(getRevisedTotalSurplusOrDef(prevYearBudget, 'Liability') / 100000),
			budgeted: _.ceil(getBudgetedTotalSurplusOrDef(currentYearBudget, 'Liability') / 100000)
		});
		return dataLine;
	}
	const piechartData = () => {
		let pieData = [];
		pieData.push({
			id: 'Revenue Budget',
			value: _.ceil(getBudgetedValue(currentYearBudget, 'Expenses') / 100000)
		});
		pieData.push({
			id: 'Capital Budget',
			value: _.ceil(getBudgetedValue(currentYearBudget, 'Liability') / 100000)
		});
		return pieData;
	}
	const getBarGraphData = () => {
		let barData = [];
		barData.push({
			"name": 'Revenue Income',
			"Revenue Income": _.ceil(getBudgetedValue(currentYearBudget, 'Revenue Receipt') / 100000)
		});
		barData.push({
			"name": 'Revenue Expenditure',
			"Revenue Expenditure": _.ceil(getBudgetedValue(currentYearBudget, 'Expenses') / 100000)
		})
		return barData;
	}


	return {
		headings: getHeadings(),
		data: getData(),
		pieChartData: piechartData(),
		barGraphData: getBarGraphData(),
		budgetedRevenueIncome:getBudgetedValue(currentYearBudget,'Revenue Receipt'),
		budgetedRevenueExpenditure: getBudgetedValue(currentYearBudget, 'Expenses'),
		budgetedCapitalExpenditure: getBudgetedValue(currentYearBudget, 'Liability')

	};
}


export {budgetSummaryData}

