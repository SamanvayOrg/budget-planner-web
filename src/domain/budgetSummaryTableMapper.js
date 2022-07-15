import _ from "lodash";


const toBudgetSummaryReport = (budgets, year) => {
	const selectedBudget = _.chain(budgets)
		.filter((e) => e.budgetYear === year)
		.value()


	const getHeadings = () => {
		let headings = [];
		headings.push('');
		headings.push(`FY ${year.substring(0, 4) - 1} - ${year.substring(7, 5) - 1} (Revised Estimates)`);
		headings.push(`FY ${year} (Budgeted Estimates)`);
		return headings
	};
	const createData = (name, revised, budgeted) => {
		return {name, revised, budgeted};
	}
	const getData = () => {
		let dataLine = [];
		dataLine.push(createData('Revenue Income', 2965, 3048));
		dataLine.push(createData('Revenue Expenditure', 4287, 4198));

		return dataLine;
	}
	return {headings: getHeadings(), data: getData()};
}

export {toBudgetSummaryReport}

