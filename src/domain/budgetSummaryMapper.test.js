import {budgetedShares, perPersonAmount} from './budgetSummaryMapper';
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

    it('is empty until the municipality has loaded', () => {
        expect(municipalityDisplayName(undefined)).toBe('');
        expect(municipalityDisplayName({})).toBe('');
    });
});
