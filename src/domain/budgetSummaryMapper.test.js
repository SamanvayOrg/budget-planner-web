import {
    budgetedShares, budgetSummaryData, percentageOf, perPersonAmount
} from './budgetSummaryMapper';
import {municipalityDisplayName} from './functions';

describe('budgetedShares', () => {
    it('reads as 0% rather than NaN% for a budget with no figures yet', () => {
        expect(budgetedShares({budgetedRevenueExpenditure: 0, budgetedCapitalExpenditure: 0})).toEqual({
            revenueBudget: 0, capitalBudget: 0, totalBudget: 0, revenuePercentage: 0, capitalPercentage: 0
        });
    });

    it('treats missing figures as zero', () => {
        expect(budgetedShares({}).totalBudget).toBe(0);
        expect(budgetedShares({}).revenuePercentage).toBe(0);
    });

    it('splits the total into shares that add up to 100', () => {
        const shares = budgetedShares({budgetedRevenueExpenditure: 7500000, budgetedCapitalExpenditure: 2500000});
        expect(shares).toEqual({
            revenueBudget: 75, capitalBudget: 25, totalBudget: 100, revenuePercentage: 75, capitalPercentage: 25
        });
        const uneven = budgetedShares({budgetedRevenueExpenditure: 200000, budgetedCapitalExpenditure: 100000});
        expect(uneven.revenuePercentage + uneven.capitalPercentage).toBe(100);
    });
});

describe('perPersonAmount', () => {
    it('divides by the population once it is set', () => {
        expect(perPersonAmount(250000, 1000)).toBe('Rs.250/person');
    });

    it('does not divide by a missing population', () => {
        expect(perPersonAmount(250000, 0)).toBe('— (population not set)');
        expect(perPersonAmount(250000, undefined)).toBe('— (population not set)');
    });
});

describe('municipalityDisplayName', () => {
    it('joins name and city class', () => {
        expect(municipalityDisplayName({name: 'Khopoli', cityClass: 'Municipal Council'})).toBe('Khopoli Municipal Council');
    });

    it('does not repeat a class the name already ends with', () => {
        expect(municipalityDisplayName({name: 'Satara Municipal Council', cityClass: 'Municipal council'}))
            .toBe('Satara Municipal Council');
    });

    it('still appends the class to a name that lacks it, ignoring stray spaces', () => {
        expect(municipalityDisplayName({name: 'Vita ', cityClass: 'Municipal council'})).toBe('Vita Municipal council');
        expect(municipalityDisplayName({name: 'CWAS', cityClass: 'Municipal corporation'})).toBe('CWAS Municipal corporation');
    });

    it('is empty until the municipality has loaded', () => {
        expect(municipalityDisplayName(undefined)).toBe('');
        expect(municipalityDisplayName({})).toBe('');
    });
});

describe('percentageOf', () => {
    it('is 0 rather than NaN when the total is zero', () => {
        expect(percentageOf(0, 0)).toBe(0);
        expect(percentageOf(undefined, 0)).toBe(0);
    });

    it('rounds a share up to two decimals', () => {
        expect(percentageOf(1, 3)).toBe(33.34);
        expect(percentageOf(50, 200)).toBe(25);
    });
});

describe('budgetSummaryData', () => {
    // A municipality's first budget has no previous year to read an opening balance from.
    it('shows 0 rather than NaN for a previous year that has no budget', () => {
        const firstBudget = {
            budgetYear: '2027-28', budgetLines: [], openingBalance: 0, population: 0,
            budgetStatusAuditContract: {currentBudgetStatus: 'Draft'}
        };
        const rows = budgetSummaryData([firstBudget], '2027-28').budgetSummaryTableData;
        rows.forEach(row => {
            expect(row.revised).not.toBeNaN();
            expect(row.budgeted).not.toBeNaN();
        });
        expect(rows.find(row => row.name === 'Opening Balance')).toEqual({name: 'Opening Balance', revised: 0, budgeted: 0});
    });
});
