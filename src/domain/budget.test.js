import {fromContract} from './index';
import getBudgetView from './getBudgetView';
import _ from 'lodash';
import {updateFromView} from './updateFromView';

describe('budget', () => {
	const budgetContract = {
		"budgetYear": "2023-24",
		"budgetLines": [{
			"id": 1,
			"code": "910-1110",
			"name": "All",
			"budgetedAmount": null,
			"currentYear8MonthsActuals": null,
			"currentYear4MonthsProbables": null,
			"previousYearActuals": null,
			"yearMinus1Actuals": 2021,
			"yearMinus2Actuals": 200,
			"yearMinus3Actuals": 200,
			"displayOrder": 1.00,
			"majorHeadGroup": "Revenue Receipt",
			"majorHeadGroupDisplayOrder": 1.00,
			"majorHead": "Property Tax",
			"minorHead": "Consolidated Tax on Property"
		}, {
			"id": 2,
			"code": "910-1111",
			"name": "Residential Property",
			"budgetedAmount": null,
			"currentYear8MonthsActuals": null,
			"currentYear4MonthsProbables": null,
			"previousYearActuals": null,
			"yearMinus1Actuals": 100,
			"yearMinus2Actuals": 200,
			"yearMinus3Actuals": 200,
			"displayOrder": 2.00,
			"majorHeadGroup": "Revenue Receipt",
			"majorHeadGroupDisplayOrder": 1.00,
			"majorHead": "Property Tax",
			"minorHead": "Consolidated Tax on Property"
		}, {
			"id": 3,
			"code": "920-1120",
			"name": "All",
			"budgetedAmount": 10,
			"currentYear8MonthsActuals": null,
			"currentYear4MonthsProbables": null,
			"previousYearActuals": null,
			"yearMinus1Actuals": 100,
			"yearMinus2Actuals": 200,
			"yearMinus3Actuals": 200,
			"displayOrder": 3.00,
			"majorHeadGroup": "Revenue Receipt",
			"majorHeadGroupDisplayOrder": 1.00,
			"majorHead": "Property Tax",
			"minorHead": "Advertisement Tax"
		}, {
			"id": 4,
			"code": "920-1121",
			"name": "Hoarding on Public Lands",
			"budgetedAmount": null,
			"currentYear8MonthsActuals": null,
			"currentYear4MonthsProbables": null,
			"previousYearActuals": null,
			"yearMinus1Actuals": 100,
			"yearMinus2Actuals": 200,
			"yearMinus3Actuals": 200,
			"displayOrder": 4.00,
			"majorHeadGroup": "Revenue Receipt",
			"majorHeadGroupDisplayOrder": 1.00,
			"majorHead": "Property Tax",
			"minorHead": "Advertisement Tax"
		}, {
			"id": 5,
			"code": "310-2510",
			"name": "All",
			"budgetedAmount": null,
			"currentYear8MonthsActuals": null,
			"currentYear4MonthsProbables": null,
			"previousYearActuals": null,
			"yearMinus1Actuals": 100,
			"yearMinus2Actuals": 200,
			"yearMinus3Actuals": 200,
			"displayOrder": 5.00,
			"majorHeadGroup": "Expenses",
			"majorHeadGroupDisplayOrder": 2.00,
			"majorHead": "Purchases for Operations and Programme implementation",
			"minorHead": "Purchase of Water for Supply"
		}, {
			"id": 6,
			"code": "314-2520",
			"name": "All",
			"budgetedAmount": null,
			"currentYear8MonthsActuals": null,
			"currentYear4MonthsProbables": null,
			"previousYearActuals": null,
			"yearMinus1Actuals": 100,
			"yearMinus2Actuals": 200,
			"yearMinus3Actuals": 200,
			"displayOrder": 6.00,
			"majorHeadGroup": "Expenses",
			"majorHeadGroupDisplayOrder": 2.00,
			"majorHead": "Purchases for Operations and Programme implementation",
			"minorHead": "Purchase of Consumables"
		}, {
			"id": 7,
			"code": "210-3221",
			"name": "Road Grants",
			"budgetedAmount": null,
			"currentYear8MonthsActuals": null,
			"currentYear4MonthsProbables": null,
			"previousYearActuals": null,
			"yearMinus1Actuals": 100,
			"yearMinus2Actuals": 200,
			"yearMinus3Actuals": 200,
			"displayOrder": 7.00,
			"majorHeadGroup": "Liability",
			"majorHeadGroupDisplayOrder": 3.00,
			"majorHead": "Grants, Contributions for Specific Purpose (Earmarked Funds)",
			"minorHead": "Government of Maharashtra (Urban Develonment Department)"
		}, {
			"id": 8,
			"code": "315-4234",
			"name": "Roads & Foot Paths \\Vater Supply System",
			"budgetedAmount": null,
			"currentYear8MonthsActuals": null,
			"currentYear4MonthsProbables": null,
			"previousYearActuals": null,
			"yearMinus1Actuals": 100,
			"yearMinus2Actuals": 200,
			"yearMinus3Actuals": 200,
			"displayOrder": 8.00,
			"majorHeadGroup": "Assets",
			"majorHeadGroupDisplayOrder": 4.00,
			"majorHead": "Accumulated Depreciation",
			"minorHead": "Other Fixed Assets"
		}, {
			"id": 9,
			"code": "740-3230",
			"name": "All",
			"budgetedAmount": 200,
			"currentYear8MonthsActuals": null,
			"currentYear4MonthsProbables": null,
			"previousYearActuals": null,
			"yearMinus1Actuals": 100,
			"yearMinus2Actuals": 200,
			"yearMinus3Actuals": 200,
			"displayOrder": 9.00,
			"majorHeadGroup": "Liability",
			"majorHeadGroupDisplayOrder": 3.00,
			"majorHead": "Grants, Contributions for Specific Purpose (Earmarked Funds)",
			"minorHead": "Government of Maharashtra (Other Diaa(tagnsive mats)"
		}]
	};

	describe('fromContract', () => {
		it('should map year', () => {
			let budget = fromContract(budgetContract);
			expect(budget.year).toBe(2023);
		});

		it('should map major head groups in the right order', () => {
			let budget = fromContract(budgetContract);
			expect(budget.items[0].majorHeadGroup).toBe('Revenue Receipt');
			expect(budget.items[1].majorHeadGroup).toBe('Expenses');
			expect(budget.items[2].majorHeadGroup).toBe('Liability');
			expect(budget.items[3].majorHeadGroup).toBe('Assets');
		});

		it('should map major heads in the right order', () => {
			let budget = fromContract(budgetContract);
			expect(budget.items[0].items[0].majorHead).toBe('Property Tax');
			expect(budget.items[1].items[0].majorHead).toBe('Purchases for Operations and Programme implementation');
			expect(budget.items[2].items[0].majorHead).toBe('Grants, Contributions for Specific Purpose (Earmarked Funds)');
			expect(budget.items[3].items[0].majorHead).toBe('Accumulated Depreciation');
		});

		it('should map minor heads in the right order', () => {
			let budget = fromContract(budgetContract);
			const revenueReceipt = _.find(budget.items, item => item.majorHeadGroup === 'Revenue Receipt');
			expect(revenueReceipt).toBeDefined();
			expect(revenueReceipt.items).toHaveLength(1);
			const propertyTax = _.find(revenueReceipt.items, item => item.majorHead === 'Property Tax')
			expect(propertyTax).toBeDefined();
			expect(propertyTax.items).toHaveLength(4);
			const allConsolidatedTaxOnProperty = _.find(propertyTax.items, item => item.name === 'Consolidated Tax on Property - All');
			expect(allConsolidatedTaxOnProperty).toBeDefined();
			expect(allConsolidatedTaxOnProperty.code).toBe('910-1110');
			expect(allConsolidatedTaxOnProperty.budgetedAmount).toBeNull();
			expect(allConsolidatedTaxOnProperty.currentYear8MonthsActuals).toBeNull()
			expect(allConsolidatedTaxOnProperty.currentYear4MonthsProbables).toBeNull()
			expect(allConsolidatedTaxOnProperty.previousYearActuals).toBeNull()
			expect(allConsolidatedTaxOnProperty.yearMinus1Actuals).toBe(2021);
			expect(allConsolidatedTaxOnProperty.yearMinus2Actuals).toBe(200);
			expect(allConsolidatedTaxOnProperty.displayOrder).toEqual(1);
		});

		it('should map total summary', () => {
			let budget = fromContract(budgetContract);
			const summary = budget.summary;
			expect(summary).toBeDefined();
			expect(summary.budgetedAmount).toBe(210);
			expect(summary.currentYear8MonthsActuals).toBe(0);
			expect(summary.currentYear4MonthsProbables).toBe(0);
			expect(summary.previousYearActuals).toBe(0);
			expect(summary.yearMinus1Actuals).toBe(2821);
			expect(summary.yearMinus2Actuals).toBe(1800);
		});
		it('should get summary for majorHead', () => {
			let budget = fromContract(budgetContract)
			expect(budget.items[0].items[0].summary.budgetedAmount).toBe(10);
			expect(budget.items[0].items[0].summary.currentYear8MonthsActuals).toBe(0);
			expect(budget.items[0].items[0].summary.currentYear4MonthsProbables).toBe(0);
			expect(budget.items[0].items[0].summary.previousYearActuals).toBe(0);
			expect(budget.items[0].items[0].summary.yearMinus1Actuals).toBe(2321);
			expect(budget.items[0].items[0].summary.yearMinus2Actuals).toBe(800);
			expect(budget.items[1].items[0].summary.budgetedAmount).toBe(0);
			expect(budget.items[1].items[0].summary.currentYear8MonthsActuals).toBe(0);
			expect(budget.items[1].items[0].summary.currentYear4MonthsProbables).toBe(0);
			expect(budget.items[1].items[0].summary.previousYearActuals).toBe(0);
			expect(budget.items[1].items[0].summary.yearMinus1Actuals).toBe(200);
			expect(budget.items[1].items[0].summary.yearMinus2Actuals).toBe(400);

		})
	});

	describe('toView', () => {
		it('should get view', () => {
			let budget = fromContract(budgetContract);
			let view = getBudgetView(budget);
			expect(view[0][0].value).toBe('A')
			expect(view[8][0].value).toBe('B')
			console.log(view[0])
		});

		it('should work', () => {
			const budgetView = [[{"value":"A","className":"Spreadsheet-Major-head-group","context":{"type":"sr","key":"sr"},"readOnly":true},{"value":"Revenue Receipt","className":"Spreadsheet-Major-head-group","context":{"type":"header","key":"name"}},{"value":null,"context":{"type":"header","key":"code"}},{"value":null,"context":{"type":"header","key":"yearMinus2Actuals"}},{"value":null,"context":{"type":"header","key":"yearMinus1Actuals"}},{"value":null,"context":{"type":"header","key":"previousYearActuals"}},{"value":null,"context":{"type":"header","key":"currentYear8MonthsActuals"}},{"value":null,"context":{"type":"header","key":"currentYear4MonthsProbables"}},{"value":null,"context":{"type":"header","key":"budgetedAmount"}}],[{"value":null,"className":"Spreadsheet-Major-head","context":{"type":"sr","key":"sr"},"readOnly":true},{"value":"Property Tax","className":"Spreadsheet-Major-head","context":{"type":"header","key":"name"}},{"value":null,"context":{"type":"header","key":"code"}},{"value":null,"context":{"type":"header","key":"yearMinus2Actuals"}},{"value":null,"context":{"type":"header","key":"yearMinus1Actuals"}},{"value":null,"context":{"type":"header","key":"previousYearActuals"}},{"value":null,"context":{"type":"header","key":"currentYear8MonthsActuals"}},{"value":null,"context":{"type":"header","key":"currentYear4MonthsProbables"}},{"value":null,"context":{"type":"header","key":"budgetedAmount"}}],[{"value":1,"className":"Spreadsheet-particulars","context":{"id":10,"type":"detail","key":"sr"},"readOnly":true},{"value":"Consolidated Tax on Property - All","className":"Spreadsheet-particulars","context":{"id":10,"type":"detail","key":"name"},"readOnly":true},{"value":"910-1110","className":"Spreadsheet-number","context":{"id":10,"type":"detail","key":"code"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":10,"type":"detail","key":"yearMinus2Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":10,"type":"detail","key":"yearMinus1Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":10,"type":"detail","key":"previousYearActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":10,"type":"detail","key":"currentYear8MonthsActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":10,"type":"detail","key":"currentYear4MonthsProbables"}},{"value":"1","className":"Spreadsheet-number","context":{"id":10,"type":"detail","key":"budgetedAmount"}}],[{"value":2,"className":"Spreadsheet-particulars","context":{"id":14,"type":"detail","key":"sr"},"readOnly":true},{"value":"Consolidated Tax on Property - Residential Property","className":"Spreadsheet-particulars","context":{"id":14,"type":"detail","key":"name"},"readOnly":true},{"value":"910-1111","className":"Spreadsheet-number","context":{"id":14,"type":"detail","key":"code"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":14,"type":"detail","key":"yearMinus2Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":14,"type":"detail","key":"yearMinus1Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":14,"type":"detail","key":"previousYearActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":14,"type":"detail","key":"currentYear8MonthsActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":14,"type":"detail","key":"currentYear4MonthsProbables"}},{"value":null,"className":"Spreadsheet-number","context":{"id":14,"type":"detail","key":"budgetedAmount"}}],[{"value":3,"className":"Spreadsheet-particulars","context":{"id":17,"type":"detail","key":"sr"},"readOnly":true},{"value":"Advertisement Tax - All","className":"Spreadsheet-particulars","context":{"id":17,"type":"detail","key":"name"},"readOnly":true},{"value":"920-1120","className":"Spreadsheet-number","context":{"id":17,"type":"detail","key":"code"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":17,"type":"detail","key":"yearMinus2Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":17,"type":"detail","key":"yearMinus1Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":17,"type":"detail","key":"previousYearActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":17,"type":"detail","key":"currentYear8MonthsActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":17,"type":"detail","key":"currentYear4MonthsProbables"}},{"value":null,"className":"Spreadsheet-number","context":{"id":17,"type":"detail","key":"budgetedAmount"}}],[{"value":4,"className":"Spreadsheet-particulars","context":{"id":11,"type":"detail","key":"sr"},"readOnly":true},{"value":"Advertisement Tax - Hoarding on Public Lands","className":"Spreadsheet-particulars","context":{"id":11,"type":"detail","key":"name"},"readOnly":true},{"value":"920-1121","className":"Spreadsheet-number","context":{"id":11,"type":"detail","key":"code"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":11,"type":"detail","key":"yearMinus2Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":11,"type":"detail","key":"yearMinus1Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":11,"type":"detail","key":"previousYearActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":11,"type":"detail","key":"currentYear8MonthsActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":11,"type":"detail","key":"currentYear4MonthsProbables"}},{"value":null,"className":"Spreadsheet-number","context":{"id":11,"type":"detail","key":"budgetedAmount"}}],[{"value":null,"className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"sr"},"readOnly":true},{"value":"Property Tax Total","className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"name"},"readOnly":true},{"value":null,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"code"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus2Actuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus1Actuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"previousYearActuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear8MonthsActuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear4MonthsProbables"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"budgetedAmount"},"readOnly":true}],[{"value":null,"className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"sr"},"readOnly":true},{"value":"Revenue Receipt Total","className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"name"},"readOnly":true},{"value":null,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"code"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus2Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus1Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"previousYearActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear8MonthsActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear4MonthsProbables"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"budgetedAmount"},"readOnly":true}],[{"value":"B","className":"Spreadsheet-Major-head-group","context":{"type":"sr","key":"sr"},"readOnly":true},{"value":"Expenses","className":"Spreadsheet-Major-head-group","context":{"type":"header","key":"name"}},{"value":null,"context":{"type":"header","key":"code"}},{"value":null,"context":{"type":"header","key":"yearMinus2Actuals"}},{"value":null,"context":{"type":"header","key":"yearMinus1Actuals"}},{"value":null,"context":{"type":"header","key":"previousYearActuals"}},{"value":null,"context":{"type":"header","key":"currentYear8MonthsActuals"}},{"value":null,"context":{"type":"header","key":"currentYear4MonthsProbables"}},{"value":null,"context":{"type":"header","key":"budgetedAmount"}}],[{"value":null,"className":"Spreadsheet-Major-head","context":{"type":"sr","key":"sr"},"readOnly":true},{"value":"Purchases for Operations and Programme implements tion","className":"Spreadsheet-Major-head","context":{"type":"header","key":"name"}},{"value":null,"context":{"type":"header","key":"code"}},{"value":null,"context":{"type":"header","key":"yearMinus2Actuals"}},{"value":null,"context":{"type":"header","key":"yearMinus1Actuals"}},{"value":null,"context":{"type":"header","key":"previousYearActuals"}},{"value":null,"context":{"type":"header","key":"currentYear8MonthsActuals"}},{"value":null,"context":{"type":"header","key":"currentYear4MonthsProbables"}},{"value":null,"context":{"type":"header","key":"budgetedAmount"}}],[{"value":5,"className":"Spreadsheet-particulars","context":{"id":12,"type":"detail","key":"sr"},"readOnly":true},{"value":"Purchase of Water for Supply - All","className":"Spreadsheet-particulars","context":{"id":12,"type":"detail","key":"name"},"readOnly":true},{"value":"310-2510","className":"Spreadsheet-number","context":{"id":12,"type":"detail","key":"code"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":12,"type":"detail","key":"yearMinus2Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":12,"type":"detail","key":"yearMinus1Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":12,"type":"detail","key":"previousYearActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":12,"type":"detail","key":"currentYear8MonthsActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":12,"type":"detail","key":"currentYear4MonthsProbables"}},{"value":null,"className":"Spreadsheet-number","context":{"id":12,"type":"detail","key":"budgetedAmount"}}],[{"value":6,"className":"Spreadsheet-particulars","context":{"id":13,"type":"detail","key":"sr"},"readOnly":true},{"value":"Purchase of Consumables - All","className":"Spreadsheet-particulars","context":{"id":13,"type":"detail","key":"name"},"readOnly":true},{"value":"314-2520","className":"Spreadsheet-number","context":{"id":13,"type":"detail","key":"code"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":13,"type":"detail","key":"yearMinus2Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":13,"type":"detail","key":"yearMinus1Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":13,"type":"detail","key":"previousYearActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":13,"type":"detail","key":"currentYear8MonthsActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":13,"type":"detail","key":"currentYear4MonthsProbables"}},{"value":null,"className":"Spreadsheet-number","context":{"id":13,"type":"detail","key":"budgetedAmount"}}],[{"value":null,"className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"sr"},"readOnly":true},{"value":"Purchases for Operations and Programme implements tion Total","className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"name"},"readOnly":true},{"value":null,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"code"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus2Actuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus1Actuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"previousYearActuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear8MonthsActuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear4MonthsProbables"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"budgetedAmount"},"readOnly":true}],[{"value":null,"className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"sr"},"readOnly":true},{"value":"Expenses Total","className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"name"},"readOnly":true},{"value":null,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"code"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus2Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus1Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"previousYearActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear8MonthsActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear4MonthsProbables"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"budgetedAmount"},"readOnly":true}],[{"value":"C","className":"Spreadsheet-Major-head-group","context":{"type":"sr","key":"sr"},"readOnly":true},{"value":"Liability","className":"Spreadsheet-Major-head-group","context":{"type":"header","key":"name"}},{"value":null,"context":{"type":"header","key":"code"}},{"value":null,"context":{"type":"header","key":"yearMinus2Actuals"}},{"value":null,"context":{"type":"header","key":"yearMinus1Actuals"}},{"value":null,"context":{"type":"header","key":"previousYearActuals"}},{"value":null,"context":{"type":"header","key":"currentYear8MonthsActuals"}},{"value":null,"context":{"type":"header","key":"currentYear4MonthsProbables"}},{"value":null,"context":{"type":"header","key":"budgetedAmount"}}],[{"value":null,"className":"Spreadsheet-Major-head","context":{"type":"sr","key":"sr"},"readOnly":true},{"value":"Grants, Contributions for Specific Purpose (Earmarked Funds)","className":"Spreadsheet-Major-head","context":{"type":"header","key":"name"}},{"value":null,"context":{"type":"header","key":"code"}},{"value":null,"context":{"type":"header","key":"yearMinus2Actuals"}},{"value":null,"context":{"type":"header","key":"yearMinus1Actuals"}},{"value":null,"context":{"type":"header","key":"previousYearActuals"}},{"value":null,"context":{"type":"header","key":"currentYear8MonthsActuals"}},{"value":null,"context":{"type":"header","key":"currentYear4MonthsProbables"}},{"value":null,"context":{"type":"header","key":"budgetedAmount"}}],[{"value":7,"className":"Spreadsheet-particulars","context":{"id":18,"type":"detail","key":"sr"},"readOnly":true},{"value":"Government of Maharashtra (Urban Develonment Department) - Road Grants","className":"Spreadsheet-particulars","context":{"id":18,"type":"detail","key":"name"},"readOnly":true},{"value":"210-3221","className":"Spreadsheet-number","context":{"id":18,"type":"detail","key":"code"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":18,"type":"detail","key":"yearMinus2Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":18,"type":"detail","key":"yearMinus1Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":18,"type":"detail","key":"previousYearActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":18,"type":"detail","key":"currentYear8MonthsActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":18,"type":"detail","key":"currentYear4MonthsProbables"}},{"value":null,"className":"Spreadsheet-number","context":{"id":18,"type":"detail","key":"budgetedAmount"}}],[{"value":9,"className":"Spreadsheet-particulars","context":{"id":16,"type":"detail","key":"sr"},"readOnly":true},{"value":"Government of Maharashtra (Other Diaa(tagnsive mats) - All","className":"Spreadsheet-particulars","context":{"id":16,"type":"detail","key":"name"},"readOnly":true},{"value":"740-3230","className":"Spreadsheet-number","context":{"id":16,"type":"detail","key":"code"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":16,"type":"detail","key":"yearMinus2Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":16,"type":"detail","key":"yearMinus1Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":16,"type":"detail","key":"previousYearActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":16,"type":"detail","key":"currentYear8MonthsActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":16,"type":"detail","key":"currentYear4MonthsProbables"}},{"value":null,"className":"Spreadsheet-number","context":{"id":16,"type":"detail","key":"budgetedAmount"}}],[{"value":null,"className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"sr"},"readOnly":true},{"value":"Grants, Contributions for Specific Purpose (Earmarked Funds) Total","className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"name"},"readOnly":true},{"value":null,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"code"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus2Actuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus1Actuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"previousYearActuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear8MonthsActuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear4MonthsProbables"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"budgetedAmount"},"readOnly":true}],[{"value":null,"className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"sr"},"readOnly":true},{"value":"Liability Total","className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"name"},"readOnly":true},{"value":null,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"code"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus2Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus1Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"previousYearActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear8MonthsActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear4MonthsProbables"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"budgetedAmount"},"readOnly":true}],[{"value":"D","className":"Spreadsheet-Major-head-group","context":{"type":"sr","key":"sr"},"readOnly":true},{"value":"Assets","className":"Spreadsheet-Major-head-group","context":{"type":"header","key":"name"}},{"value":null,"context":{"type":"header","key":"code"}},{"value":null,"context":{"type":"header","key":"yearMinus2Actuals"}},{"value":null,"context":{"type":"header","key":"yearMinus1Actuals"}},{"value":null,"context":{"type":"header","key":"previousYearActuals"}},{"value":null,"context":{"type":"header","key":"currentYear8MonthsActuals"}},{"value":null,"context":{"type":"header","key":"currentYear4MonthsProbables"}},{"value":null,"context":{"type":"header","key":"budgetedAmount"}}],[{"value":null,"className":"Spreadsheet-Major-head","context":{"type":"sr","key":"sr"},"readOnly":true},{"value":"Accumulated Depreciation","className":"Spreadsheet-Major-head","context":{"type":"header","key":"name"}},{"value":null,"context":{"type":"header","key":"code"}},{"value":null,"context":{"type":"header","key":"yearMinus2Actuals"}},{"value":null,"context":{"type":"header","key":"yearMinus1Actuals"}},{"value":null,"context":{"type":"header","key":"previousYearActuals"}},{"value":null,"context":{"type":"header","key":"currentYear8MonthsActuals"}},{"value":null,"context":{"type":"header","key":"currentYear4MonthsProbables"}},{"value":null,"context":{"type":"header","key":"budgetedAmount"}}],[{"value":8,"className":"Spreadsheet-particulars","context":{"id":15,"type":"detail","key":"sr"},"readOnly":true},{"value":"Other Fixed Assets - Roads & Foot Paths \\Vater Supply System","className":"Spreadsheet-particulars","context":{"id":15,"type":"detail","key":"name"},"readOnly":true},{"value":"315-4234","className":"Spreadsheet-number","context":{"id":15,"type":"detail","key":"code"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":15,"type":"detail","key":"yearMinus2Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":15,"type":"detail","key":"yearMinus1Actuals"},"readOnly":true},{"value":null,"className":"Spreadsheet-number","context":{"id":15,"type":"detail","key":"previousYearActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":15,"type":"detail","key":"currentYear8MonthsActuals"}},{"value":null,"className":"Spreadsheet-number","context":{"id":15,"type":"detail","key":"currentYear4MonthsProbables"}},{"value":null,"className":"Spreadsheet-number","context":{"id":15,"type":"detail","key":"budgetedAmount"}}],[{"value":null,"className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"sr"},"readOnly":true},{"value":"Accumulated Depreciation Total","className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"name"},"readOnly":true},{"value":null,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"code"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus2Actuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus1Actuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"previousYearActuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear8MonthsActuals"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear4MonthsProbables"},"readOnly":true},{"className":"Spreadsheet-total-number","context":{"type":"summary","key":"budgetedAmount"},"readOnly":true}],[{"value":null,"className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"sr"},"readOnly":true},{"value":"Assets Total","className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"name"},"readOnly":true},{"value":null,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"code"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus2Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus1Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"previousYearActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear8MonthsActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear4MonthsProbables"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"budgetedAmount"},"readOnly":true}],[{"value":null,"className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"sr"},"readOnly":true},{"value":"Total","className":"Spreadsheet-total-particulars","context":{"type":"summary","key":"name"},"readOnly":true},{"value":null,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"code"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus2Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"yearMinus1Actuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"previousYearActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear8MonthsActuals"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"currentYear4MonthsProbables"},"readOnly":true},{"value":0,"className":"Spreadsheet-total-number","context":{"type":"summary","key":"budgetedAmount"},"readOnly":true}]];
			const budget = {"year":2023,"items":[{"majorHeadGroup":"Revenue Receipt","items":[{"majorHead":"Property Tax","items":[{"id":10,"code":"910-1110","name":"Consolidated Tax on Property - All","budgetedAmount":null,"currentYear8MonthsActuals":null,"currentYear4MonthsProbables":null,"previousYearActuals":null,"yearMinus1Actuals":null,"yearMinus2Actuals":null,"displayOrder":1,"majorHeadGroup":"Revenue Receipt","majorHeadGroupDisplayOrder":1,"majorHead":"Property Tax","minorHead":"Consolidated Tax on Property"},{"id":14,"code":"910-1111","name":"Consolidated Tax on Property - Residential Property","budgetedAmount":null,"currentYear8MonthsActuals":null,"currentYear4MonthsProbables":null,"previousYearActuals":null,"yearMinus1Actuals":null,"yearMinus2Actuals":null,"displayOrder":2,"majorHeadGroup":"Revenue Receipt","majorHeadGroupDisplayOrder":1,"majorHead":"Property Tax","minorHead":"Consolidated Tax on Property"},{"id":17,"code":"920-1120","name":"Advertisement Tax - All","budgetedAmount":"1","currentYear8MonthsActuals":null,"currentYear4MonthsProbables":null,"previousYearActuals":null,"yearMinus1Actuals":null,"yearMinus2Actuals":null,"displayOrder":3,"majorHeadGroup":"Revenue Receipt","majorHeadGroupDisplayOrder":1,"majorHead":"Property Tax","minorHead":"Advertisement Tax"},{"id":11,"code":"920-1121","name":"Advertisement Tax - Hoarding on Public Lands","budgetedAmount":null,"currentYear8MonthsActuals":null,"currentYear4MonthsProbables":null,"previousYearActuals":null,"yearMinus1Actuals":null,"yearMinus2Actuals":null,"displayOrder":4,"majorHeadGroup":"Revenue Receipt","majorHeadGroupDisplayOrder":1,"majorHead":"Property Tax","minorHead":"Advertisement Tax"}],"summary":{"id":52,"budgetedAmount":1,"currentYear8MonthsActuals":0,"currentYear4MonthsProbables":0,"previousYearActuals":0,"yearMinus1Actuals":0,"yearMinus2Actuals":0}}],"summary":{"id":52,"budgetedAmount":1,"currentYear8MonthsActuals":0,"currentYear4MonthsProbables":0,"previousYearActuals":0,"yearMinus1Actuals":0,"yearMinus2Actuals":0}},{"majorHeadGroup":"Expenses","items":[{"majorHead":"Purchases for Operations and Programme implements tion","items":[{"id":12,"code":"310-2510","name":"Purchase of Water for Supply - All","budgetedAmount":null,"currentYear8MonthsActuals":null,"currentYear4MonthsProbables":null,"previousYearActuals":null,"yearMinus1Actuals":null,"yearMinus2Actuals":null,"displayOrder":5,"majorHeadGroup":"Expenses","majorHeadGroupDisplayOrder":2,"majorHead":"Purchases for Operations and Programme implements tion","minorHead":"Purchase of Water for Supply"},{"id":13,"code":"314-2520","name":"Purchase of Consumables - All","budgetedAmount":null,"currentYear8MonthsActuals":null,"currentYear4MonthsProbables":null,"previousYearActuals":null,"yearMinus1Actuals":null,"yearMinus2Actuals":null,"displayOrder":6,"majorHeadGroup":"Expenses","majorHeadGroupDisplayOrder":2,"majorHead":"Purchases for Operations and Programme implements tion","minorHead":"Purchase of Consumables"}],"summary":{"id":25,"budgetedAmount":0,"currentYear8MonthsActuals":0,"currentYear4MonthsProbables":0,"previousYearActuals":0,"yearMinus1Actuals":0,"yearMinus2Actuals":0}}],"summary":{"id":25,"budgetedAmount":0,"currentYear8MonthsActuals":0,"currentYear4MonthsProbables":0,"previousYearActuals":0,"yearMinus1Actuals":0,"yearMinus2Actuals":0}},{"majorHeadGroup":"Liability","items":[{"majorHead":"Grants, Contributions for Specific Purpose (Earmarked Funds)","items":[{"id":18,"code":"210-3221","name":"Government of Maharashtra (Urban Develonment Department) - Road Grants","budgetedAmount":null,"currentYear8MonthsActuals":null,"currentYear4MonthsProbables":null,"previousYearActuals":null,"yearMinus1Actuals":null,"yearMinus2Actuals":null,"displayOrder":7,"majorHeadGroup":"Liability","majorHeadGroupDisplayOrder":3,"majorHead":"Grants, Contributions for Specific Purpose (Earmarked Funds)","minorHead":"Government of Maharashtra (Urban Develonment Department)"},{"id":16,"code":"740-3230","name":"Government of Maharashtra (Other Diaa(tagnsive mats) - All","budgetedAmount":null,"currentYear8MonthsActuals":null,"currentYear4MonthsProbables":null,"previousYearActuals":null,"yearMinus1Actuals":null,"yearMinus2Actuals":null,"displayOrder":9,"majorHeadGroup":"Liability","majorHeadGroupDisplayOrder":3,"majorHead":"Grants, Contributions for Specific Purpose (Earmarked Funds)","minorHead":"Government of Maharashtra (Other Diaa(tagnsive mats)"}],"summary":{"id":34,"budgetedAmount":0,"currentYear8MonthsActuals":0,"currentYear4MonthsProbables":0,"previousYearActuals":0,"yearMinus1Actuals":0,"yearMinus2Actuals":0}}],"summary":{"id":34,"budgetedAmount":0,"currentYear8MonthsActuals":0,"currentYear4MonthsProbables":0,"previousYearActuals":0,"yearMinus1Actuals":0,"yearMinus2Actuals":0}},{"majorHeadGroup":"Assets","items":[{"majorHead":"Accumulated Depreciation","items":[{"id":15,"code":"315-4234","name":"Other Fixed Assets - Roads & Foot Paths \\Vater Supply System","budgetedAmount":null,"currentYear8MonthsActuals":null,"currentYear4MonthsProbables":null,"previousYearActuals":null,"yearMinus1Actuals":null,"yearMinus2Actuals":null,"displayOrder":8,"majorHeadGroup":"Assets","majorHeadGroupDisplayOrder":4,"majorHead":"Accumulated Depreciation","minorHead":"Other Fixed Assets"}],"summary":{"id":15,"budgetedAmount":0,"currentYear8MonthsActuals":0,"currentYear4MonthsProbables":0,"previousYearActuals":0,"yearMinus1Actuals":0,"yearMinus2Actuals":0}}],"summary":{"id":15,"budgetedAmount":0,"currentYear8MonthsActuals":0,"currentYear4MonthsProbables":0,"previousYearActuals":0,"yearMinus1Actuals":0,"yearMinus2Actuals":0}}],"summary":{"id":126,"budgetedAmount":0,"currentYear8MonthsActuals":0,"currentYear4MonthsProbables":0,"previousYearActuals":0,"yearMinus1Actuals":0,"yearMinus2Actuals":0}};
			// console.log(budgetView[2][8].value);
			// console.log(budget.items[0].items[0].items[0].budgetedAmount);

			updateFromView(budgetView, budget)
			// console.log(budget.items[0].items[0].items[0].budgetedAmount);
		});
	})
})