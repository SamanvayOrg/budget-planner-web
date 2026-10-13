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
});
