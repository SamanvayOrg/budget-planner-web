import {toBudgetSummaryReport} from "./budgetSummaryTableMapper";

describe('summaryTable', () => {
		it('should get selected budget', () => {
			expect(toBudgetSummaryReport({}, '2023-24').headings[1]).toBe('FY 2022 - 23 (Revised Estimates)');
			expect(toBudgetSummaryReport({}, '2023-24').headings[2]).toBe('FY 2023-24 (Budgeted Estimates)');
			expect(toBudgetSummaryReport({}, '2023-24').data[0].name).toBe('Revenue Income');
			expect(toBudgetSummaryReport({}, '2023-24').data[1].name).toBe('Revenue Expenditure');
		})
	}
)