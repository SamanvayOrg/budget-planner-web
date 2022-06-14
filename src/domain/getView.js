import _ from "lodash";

const getView = (budget) => {

	function getMajorHeadName(budgetHeadGroup) {
		return _.map(budgetHeadGroup.items, budgetItems => {
			return budgetItems.majorHead
		})
	}

	function getBudgetLine(budgetHeadGroup) {
		let finalArray = [];
		_.map(budgetHeadGroup.items, budgetItems => {
			_.forEach(budgetItems.items, line =>
				finalArray.push([
					{value: line.name},
					{value: line.code},
					{value: line.budgetedAmount},
					{value: line.currentYear8MonthsActuals},
					{value: line.currentYear4MonthsProbables},
					{value: line.previousYearActuals},
					{value: line.yearMinus1Actuals},
					{value: line.yearMinus2Actuals},
				]));
		})
		return finalArray;
	}

	const getMajorHeadGroupHeader = (budgetHeadGroup) => {
		const data = budgetHeadGroup.majorHeadGroup
		return [data];
	}

	function getMajorHeadGroupSummary(budgetHeadGroup) {
		let finalSummaryArray = [];
		_.map(budgetHeadGroup.items, budgetItems => {
			_.forEach(budgetItems.summary, summary => {
				finalSummaryArray.push({value: summary})
			})
		})
		return finalSummaryArray;
	}

	function getFinalSummary(budget) {
		let summaryArray = [];
		_.forEach(budget.summary, summary => {
			summaryArray.push({value: summary})
		})

		return summaryArray;
	}

	return _.map(budget.items, budgetHeadGroup => {
			let f = [];
			f.push(getMajorHeadGroupHeader(budgetHeadGroup));
			f.push(getMajorHeadName(budgetHeadGroup));
			f.push(getBudgetLine(budgetHeadGroup));
			f.push(getMajorHeadGroupSummary(budgetHeadGroup));
			f.push(getFinalSummary(budget));

			return f
		}
	)

}
export default getView;