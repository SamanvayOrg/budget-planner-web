import _ from "lodash";

const toArray = ({budgetLines}) => {
    const orderedMajorHeadGroups = _.chain(budgetLines)
      .map(({majorHeadGroup, majorHeadGroupDisplayOrder}) => ({majorHeadGroup, majorHeadGroupDisplayOrder}))
      .uniqBy('majorHeadGroup')
      .sortBy(['majorHeadGroupDisplayOrder'])
      .map(({majorHeadGroup}) => majorHeadGroup)
      .value();

    const addAmounts = (lines, key) => _.reduce(lines, (accumulator, line) => {
        return accumulator + line[key]
    }, 0);

    const getLineName = line => line.minorHead + ' - ' + line.name;

    let finalArray = [];
    _.forEach(orderedMajorHeadGroups, (majorHeadGroup) => {
        finalArray.push([
            {value: majorHeadGroup, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
            {value: null, className: 'Spreadsheet-Major-head-group', details: {line: null, type: 'majorHeadGroup'}},
        ]);
        const matchingLines = _.filter(budgetLines, line => line.majorHeadGroup === majorHeadGroup);
        _.forEach(matchingLines, line =>
          finalArray.push([
              {value: getLineName(line), className: 'Spreadsheet-particulars', details: {line, type: 'name'}},
              {value: line.code, className: 'Spreadsheet-number', details: {line, type: 'code'}},
              {value: line.yearMinus3ActualAmount, className: 'Spreadsheet-number', details: {line, type: 'yearMinus3ActualAmount'}},
              {value: line.yearMinus2ActualAmount, className: 'Spreadsheet-number'},
              {value: line.yearMinus1ActualAmount, className: 'Spreadsheet-number'},
              {value: line.plannedAmount, className: 'Spreadsheet-number', details: {line, type: 'plannedAmount'}},
              {value: line.revisedAmount, className: 'Spreadsheet-number'},
              {value: line.actualAmount, className: 'Spreadsheet-number'},
              {value: null, className: 'Spreadsheet-number'},
          ]));

        finalArray.push([
              {value: `Total ${majorHeadGroup}`, className: 'Spreadsheet-total-particulars'},
              {value: null, className: 'Spreadsheet-total-number'},
              {value: addAmounts(matchingLines, 'yearMinus3ActualAmount'), className: 'Spreadsheet-total-number'},
              {value: addAmounts(matchingLines, 'yearMinus2ActualAmount'), className: 'Spreadsheet-total-number'},
              {value: addAmounts(matchingLines, 'yearMinus1ActualAmount'), className: 'Spreadsheet-total-number'},
              {value: addAmounts(matchingLines, 'plannedAmount'), className: 'Spreadsheet-total-number'},
              {value: addAmounts(matchingLines, 'revisedAmount'), className: 'Spreadsheet-total-number'},
              {value: addAmounts(matchingLines, 'actualAmount'), className: 'Spreadsheet-total-number'},
              {value: null, className: 'Spreadsheet-total-number'},
          ]
        );
    });

    return finalArray;
};

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
                "majorHeadGroup": "Liability (Capital Income)",
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
                "majorHeadGroup": "Assets (Capital Expenditure)",
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
                "majorHeadGroup": "Liability (Capital Income)",
                "majorHeadGroupDisplayOrder": 3.00,
                "majorHead": "Grants, Contributions for Specific Purpose (Earmarked Funds)",
                "minorHead": "Government of Maharashtra (Other Diaa(tagnsive mats)"
            }]
        };

        console.log(toArray(budget));
    });
})