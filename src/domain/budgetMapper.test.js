describe("Stuff", () => {
    test('should map current budget into arrays', () => {
        const budget = {
            "budgetYear": "2023-24",
            "budgetLines": [{
                "code": "10-1116",
                "name": "Central Government Property",
                "plannedAmount": 1001.00,
                "revisedAmount": 0.00,
                "actualAmount": 0.00,
                "yearMinus1ActualAmount": 900.00,
                "yearMinus2ActualAmount": 900.00,
                "yearMinus3ActualAmount": 900.00,
                "displayOrder": 19.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHead": "Property Tax",
                "minorHead": "Consolidated Tax on Property"
            }, {
                "code": "10-1117",
                "name": "Open lands INA.)",
                "plannedAmount": 1001.00,
                "revisedAmount": 0.00,
                "actualAmount": 0.00,
                "yearMinus1ActualAmount": 900.00,
                "yearMinus2ActualAmount": 900.00,
                "yearMinus3ActualAmount": 900.00,
                "displayOrder": 20.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHead": "Property Tax",
                "minorHead": "Consolidated Tax on Property"
            }, {
                "code": "11-1118",
                "name": "Agricultural lands",
                "plannedAmount": 1001.00,
                "revisedAmount": 0.00,
                "actualAmount": 0.00,
                "yearMinus1ActualAmount": 900.00,
                "yearMinus2ActualAmount": 900.00,
                "yearMinus3ActualAmount": 900.00,
                "displayOrder": 21.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHead": "Property Tax",
                "minorHead": "Consolidated Tax on Property"
            }, {
                "code": "11-1119",
                "name": "Others",
                "plannedAmount": 1001.00,
                "revisedAmount": 0.00,
                "actualAmount": 0.00,
                "yearMinus1ActualAmount": 900.00,
                "yearMinus2ActualAmount": 900.00,
                "yearMinus3ActualAmount": 900.00,
                "displayOrder": 22.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHead": "Property Tax",
                "minorHead": "Consolidated Tax on Property"
            }, {
                "code": "12-1120",
                "name": "All",
                "plannedAmount": 1001.00,
                "revisedAmount": 0.00,
                "actualAmount": 0.00,
                "yearMinus1ActualAmount": 900.00,
                "yearMinus2ActualAmount": 900.00,
                "yearMinus3ActualAmount": 900.00,
                "displayOrder": 23.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHead": "Property Tax",
                "minorHead": "Advertisement Tax"
            }, {
                "code": "10-1121",
                "name": "Hoarding on Public Lands",
                "plannedAmount": 1001.00,
                "revisedAmount": 0.00,
                "actualAmount": 0.00,
                "yearMinus1ActualAmount": 900.00,
                "yearMinus2ActualAmount": 900.00,
                "yearMinus3ActualAmount": 900.00,
                "displayOrder": 24.00,
                "majorHeadGroup": "Revenue Receipt",
                "majorHead": "Property Tax",
                "minorHead": "Advertisement Tax"
            }]
        };

        const toArray = budget.budgetLines.map((line) => [
            {value: line.name}, {value: line.code},
            {value: line.yearMinus3ActualAmount, readOnly: true},
            {value: line.yearMinus2ActualAmount, readOnly: true},
            {value: line.yearMinus1ActualAmount, readOnly: true},
            {value: line.plannedAmount},
            {value: line.revisedAmount},
            {value: line.actualAmount},
        ]).sort((a, b) => a.displayOrder < b.displayOrder);

    });
})