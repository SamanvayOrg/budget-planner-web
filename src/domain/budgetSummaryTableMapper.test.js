import {budgetSummaryReportMapper} from "./budgetSummaryMapper";

describe('summaryTable', () => {
		it('should get selected budget', () => {
			expect(budgetSummaryReportMapper({}, '2023-24').headings[1]).toBe('FY 2022 - 23 (Revised Estimates)');
			expect(budgetSummaryReportMapper({}, '2023-24').headings[2]).toBe('FY 2023-24 (Budgeted Estimates)');
			expect(budgetSummaryReportMapper({}, '2023-24').data[0].name).toBe('Revenue Income');
			expect(budgetSummaryReportMapper({}, '2023-24').data[1].name).toBe('Revenue Expenditure');
		})
	}
)