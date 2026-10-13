import {render, screen} from '@testing-library/react';
import SectoralDistributionDashboardReport from './SectoralDistributionDashboardReport';

const line = (functionGroupCategory, budgetedAmount) => ({functionGroupCategory, budgetedAmount});
const budgetWith = (budgetLines) => [{budgetYear: '2027-28', budgetLines}];

describe('SectoralDistributionDashboardReport', () => {
    it('shows 0% rather than NaN% for a budget with no figures yet', () => {
        render(<SectoralDistributionDashboardReport budgets={budgetWith([line('Roads', 0)])} year={'2027-28'}/>);

        expect(screen.queryByText(/NaN/)).toBeNull();
        expect(screen.getAllByText('0%')).toHaveLength(7);
    });

    // Social Welfare is one of the sectors shown, so it has to be part of the total the
    // shares are taken from; left out, every sector's share is overstated.
    it('counts Social Welfare in the total the shares are taken from', () => {
        render(<SectoralDistributionDashboardReport
            budgets={budgetWith([line('Roads', 300000), line('Social Welfare', 100000)])} year={'2027-28'}/>);

        expect(screen.getByText('75%')).toBeInTheDocument();
        expect(screen.getByText('25%')).toBeInTheDocument();
    });
});
