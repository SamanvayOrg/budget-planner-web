import {toArray} from "./budgetMapper";

describe("Stuff", () => {
    test('should map current budget into arrays', () => {
        const budget = {
            "budgetYear": "2023-24",
            "budgetLines": [{
                "code": "910-1110",
                "name": "All",
                "plannedAmount": null,
                "revisedAmount": null,
                "actualAmount": null,
                "yearMinus1ActualAmount": null,
                "yearMinus2ActualAmount": null,
                "yearMinus3ActualAmount": null,
                "displayOrder": 1.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHeadGroupDisplayOrder": 1.00,
                "majorHead": "Property Tax",
                "minorHead": "Consolidated Tax on Property"
            }, {
                "code": "910-1111",
                "name": "Residential Property",
                "plannedAmount": null,
                "revisedAmount": null,
                "actualAmount": null,
                "yearMinus1ActualAmount": null,
                "yearMinus2ActualAmount": null,
                "yearMinus3ActualAmount": null,
                "displayOrder": 2.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHeadGroupDisplayOrder": 1.00,
                "majorHead": "Property Tax",
                "minorHead": "Consolidated Tax on Property"
            }, {
                "code": "920-1120",
                "name": "All",
                "plannedAmount": 120,
                "revisedAmount": null,
                "actualAmount": null,
                "yearMinus1ActualAmount": null,
                "yearMinus2ActualAmount": null,
                "yearMinus3ActualAmount": null,
                "displayOrder": 3.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHeadGroupDisplayOrder": 1.00,
                "majorHead": "Property Tax",
                "minorHead": "Advertisement Tax"
            }, {
                "code": "920-1121",
                "name": "Hoarding on Public Lands",
                "plannedAmount": 230,
                "revisedAmount": null,
                "actualAmount": null,
                "yearMinus1ActualAmount": null,
                "yearMinus2ActualAmount": null,
                "yearMinus3ActualAmount": null,
                "displayOrder": 4.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHeadGroupDisplayOrder": 1.00,
                "majorHead": "Property Tax",
                "minorHead": "Advertisement Tax"
            }, {
                "code": "310-2510",
                "name": "All",
                "plannedAmount": null,
                "revisedAmount": null,
                "actualAmount": null,
                "yearMinus1ActualAmount": null,
                "yearMinus2ActualAmount": null,
                "yearMinus3ActualAmount": null,
                "displayOrder": 5.00,
                "majorHeadGroup": "Expenses",
                "majorHeadGroupDisplayOrder": 2.00,
                "majorHead": "Purchases for Operations and Programme implements tion",
                "minorHead": "Purchase of Water for Supply"
            }, {
                "code": "314-2520",
                "name": "All",
                "plannedAmount": null,
                "revisedAmount": null,
                "actualAmount": null,
                "yearMinus1ActualAmount": null,
                "yearMinus2ActualAmount": null,
                "yearMinus3ActualAmount": null,
                "displayOrder": 6.00,
                "majorHeadGroup": "Expenses",
                "majorHeadGroupDisplayOrder": 2.00,
                "majorHead": "Purchases for Operations and Programme implements tion",
                "minorHead": "Purchase of Consumables"
            }, {
                "code": "210-3221",
                "name": "Road Grants",
                "plannedAmount": 210,
                "revisedAmount": null,
                "actualAmount": null,
                "yearMinus1ActualAmount": 100,
                "yearMinus2ActualAmount": null,
                "yearMinus3ActualAmount": null,
                "displayOrder": 7.00,
                "majorHeadGroup": "Liability",
                "majorHeadGroupDisplayOrder": 3.00,
                "majorHead": "Grants, Contributions for Specific Purpose (Earmarked Funds)",
                "minorHead": "Government of Maharashtra (Urban Develonment Department)"
            }, {
                "code": "315-4234",
                "name": "Roads & Foot Paths \\Vater Supply System",
                "plannedAmount": 90,
                "revisedAmount": null,
                "actualAmount": null,
                "yearMinus1ActualAmount": 12,
                "yearMinus2ActualAmount": null,
                "yearMinus3ActualAmount": null,
                "displayOrder": 8.00,
                "majorHeadGroup": "Assets",
                "majorHeadGroupDisplayOrder": 4.00,
                "majorHead": "Accumulated Depreciation",
                "minorHead": "Other Fixed Assets"
            }, {
                "code": "740-3230",
                "name": "All",
                "plannedAmount": 10,
                "revisedAmount": 20,
                "actualAmount": 30,
                "yearMinus1ActualAmount": 40,
                "yearMinus2ActualAmount": 50,
                "yearMinus3ActualAmount": 60,
                "displayOrder": 9.00,
                "majorHeadGroup": "Liability",
                "majorHeadGroupDisplayOrder": 3.00,
                "majorHead": "Grants, Contributions for Specific Purpose (Earmarked Funds)",
                "minorHead": "Government of Maharashtra (Other Diaa(tagnsive mats)"
            }]
        };

        console.log(toArray(budget));
    });
})