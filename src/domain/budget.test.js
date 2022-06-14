import {fromContract} from './budget';

describe('budget', () => {
    const budgetContract = {
        "budgetYear": "2023-24",
        "budgetLines": [{
            "code": "910-1110",
            "name": "All",
            "budgetedAmount": null,
            "currentYear8MonthsActuals": null,
            "currentYear4MonthsProbables": null,
            "previousYearActuals": null,
            "yearMinus1Actuals": 100,
            "yearMinus2Actuals": 200,
            "yearMinus3Actuals": 200,
            "displayOrder": 1.00,
            "majorHeadGroup": "Revenue Receipt",
            "majorHeadGroupDisplayOrder": 1.00,
            "majorHead": "Property Tax",
            "minorHead": "Consolidated Tax on Property"
        }, {
            "code": "910-1111",
            "name": "Residential Property",
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
            "code": "920-1120",
            "name": "All",
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
            "code": "920-1121",
            "name": "Hoarding on Public Lands",
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
            "code": "310-2510",
            "name": "All",
            "currentYear8MonthsActuals": null,
            "currentYear4MonthsProbables": null,
            "previousYearActuals": null,
            "yearMinus1Actuals": 100,
            "yearMinus2Actuals": 200,
            "yearMinus3Actuals": 200,
            "displayOrder": 5.00,
            "majorHeadGroup": "Expenses",
            "majorHeadGroupDisplayOrder": 2.00,
            "majorHead": "Purchases for Operations and Programme implements tion",
            "minorHead": "Purchase of Water for Supply"
        }, {
            "code": "314-2520",
            "name": "All",
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
            "code": "210-3221",
            "name": "Road Grants",
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
            "code": "315-4234",
            "name": "Roads & Foot Paths \\Vater Supply System",
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
            "code": "740-3230",
            "name": "All",
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

    it('should map year', () => {
        let budget = fromContract(budgetContract);
        expect(budget.year).toBe(2023);
    });

    it('should map major head groups in the right order', () => {
        let budget = fromContract(budgetContract);
        expect(budget.majorHeadGroups[0].name).toBe('Revenue Receipt');
        expect(budget.majorHeadGroups[1].name).toBe('Expenses');
        expect(budget.majorHeadGroups[2].name).toBe('Liability');
        expect(budget.majorHeadGroups[3].name).toBe('Assets');
    });

    it('should map major heads in the right order', () => {
        let budget = fromContract(budgetContract);
        expect(budget.majorHeadGroups[0].name).toBe('Revenue Receipt');
        expect(budget.majorHeadGroups[1].name).toBe('Expenses');
        expect(budget.majorHeadGroups[2].name).toBe('Liability');
        expect(budget.majorHeadGroups[3].name).toBe('Assets');
    });
})