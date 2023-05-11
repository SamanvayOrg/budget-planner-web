import validateBudget from './validateBudget';

describe('validateBudget', () => {
    let budget = {};

    beforeEach(() => {
        budget = {
            "items": [
                {
                    "majorHeadGroup": "Revenue Receipt",
                    "summary": {
                        "budgetedAmount": 100,
                    }
                },
                {
                    "majorHeadGroup": "Expenses",
                    "summary": {
                        "budgetedAmount": 100,
                    }
                },
                {
                    "majorHeadGroup": "Assets (Capital Expenditure)",
                    "summary": {
                        "budgetedAmount": 100,
                    }
                },
                {
                    "majorHeadGroup": "Liability (Capital Income)",
                    "summary": {
                        "budgetedAmount": 100,
                    }
                }
            ],
            'summary': {
                'budgetedAmount': 10,
                'currentYear8MonthsActuals': 8,
                'currentYear4MonthsProbables': 2
            }
        };
    });

    it('should validate that when revised estimates is greater than budget', () => {
        budget = {
            ...budget,
            'summary': {
                'budgetedAmount': 9,
                'currentYear8MonthsActuals': 8,
                'currentYear4MonthsProbables': 2
            }
        };
        const validationErrors = validateBudget(budget);
        expect(validationErrors.length).toBeGreaterThan(0);
        expect(validationErrors).toContain("Current year's budget is less than previous year's budget");
    });

    it ('should validate that Revenue income > Revenue expenditure', () => {
        budget = {
            ...budget,
            "items": [
                {
                    "majorHeadGroup": "Revenue Receipt",
                    "summary": {
                        "budgetedAmount": 100,
                    }
                },
                {
                    "majorHeadGroup": "Expenses",
                    "summary": {
                        "budgetedAmount": 200,
                    }
                }
            ]
        };

        const validationErrors = validateBudget(budget);
        expect(validationErrors.length).toBeGreaterThan(0);
        expect(validationErrors).toContain("Revenue Expenditure is greater than revenue Income");
    });
})
