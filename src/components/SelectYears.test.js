import moment from 'moment';
import {render, screen} from '@testing-library/react';
import SelectYears, {getCurrentFinancialYearStart, getYearString} from './SelectYears';

// These cases mirror the server's YearTest one-for-one. The two implementations must agree
// or the picker offers a year the server will reject: this is the FY being PREPARED, which
// is the one after the FY the date falls in.
describe('getCurrentFinancialYearStart', () => {
    it('resolves April–December dates to the FY starting the following calendar year', () => {
        expect(getCurrentFinancialYearStart(moment('2026-04-01'))).toBe(2027);
        expect(getCurrentFinancialYearStart(moment('2026-08-18'))).toBe(2027);
        expect(getCurrentFinancialYearStart(moment('2026-12-31'))).toBe(2027);
    });

    it('keeps January–March on the same answer as the December before it', () => {
        // The budget-preparation window: Jan–Mar 2027 is still preparing FY 2027-28.
        expect(getCurrentFinancialYearStart(moment('2027-01-01'))).toBe(2027);
        expect(getCurrentFinancialYearStart(moment('2027-03-31'))).toBe(2027);
    });

    it('advances only when a new financial year begins in April', () => {
        expect(getCurrentFinancialYearStart(moment('2027-03-31'))).toBe(2027);
        expect(getCurrentFinancialYearStart(moment('2027-04-01'))).toBe(2028);
    });
});

describe('getYearString', () => {
    it('formats as start-year–two-digit-end-year, matching Budget#getFinancialYearString on the server', () => {
        expect(getYearString(2026)).toBe('2026-27');
        expect(getYearString(1999)).toBe('1999-00');
    });
});

describe('<SelectYears/>', () => {
    const expectedYear = getYearString(getCurrentFinancialYearStart());

    it('offers only the current financial year, and locks it', () => {
        render(<SelectYears onChange={jest.fn()}/>);

        // MUI renders a disabled Select as a div[role=button][aria-disabled] plus a hidden
        // native input — there is no [disabled] control to assert on directly.
        const select = screen.getByRole('button', {name: expectedYear});
        expect(select).toHaveAttribute('aria-disabled', 'true');
    });

    // The parent reads the year purely from this callback. If it stops firing on mount,
    // selectedYear stays undefined and the create button silently does nothing.
    it('reports the current financial year to its parent on mount, without interaction', () => {
        const onChange = jest.fn();

        render(<SelectYears onChange={onChange}/>);

        expect(onChange).toHaveBeenCalledWith(expectedYear);
    });

    it('does not blow up when no onChange is supplied', () => {
        expect(() => render(<SelectYears/>)).not.toThrow();
    });
});
