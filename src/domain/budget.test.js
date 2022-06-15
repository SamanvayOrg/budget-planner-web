import {fromContract} from './index';
import getView from './getView'
import _ from "lodash";
import {updateBudget} from '../slices/budgetReducer';
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
			expect(budget.items[0].items[1].majorHead).toBe('Property Tax');
			expect(budget.items[0].items[2].majorHead).toBe('Property Tax');
			expect(budget.items[0].items[3].majorHead).toBe('Property Tax');
			expect(budget.items[1].items[0].majorHead).toBe('Purchases for Operations and Programme implementation');
			expect(budget.items[1].items[1].majorHead).toBe('Purchases for Operations and Programme implementation');
			expect(budget.items[2].items[0].majorHead).toBe('Grants, Contributions for Specific Purpose (Earmarked Funds)');
			expect(budget.items[2].items[1].majorHead).toBe('Grants, Contributions for Specific Purpose (Earmarked Funds)');
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
			expect(allConsolidatedTaxOnProperty.yearMinus1Actuals).toBe(100);
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
			expect(summary.yearMinus1Actuals).toBe(900);
			expect(summary.yearMinus2Actuals).toBe(1800);
		});
	});

	describe('toView', () => {
		it('should get view',()=>{
			let budget= fromContract(budgetContract);
			let view = getView(budget);
			// console.log(budget.items[0].items[0].items[0]);
			// console.log(view[2][6].value);

			view[2][6].value = 2022;
			// console.log(view[2][6].value);

			updateFromView(view, budget)
			// view = getView(budget);
			// console.log(budget.items[0].items[0].items[0]);
			// console.log(view[2][6].value);

			// console.log(getView(budget));
			// expect(getView(budget)).toBeDefined();
			// expect(getView(budget)).toHaveLength(4);
		})
	})
})