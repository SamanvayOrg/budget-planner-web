import {act, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';
import EmptyBudgetBox from './EmptyBudgetBox';

const renderBox = (addNewBudget) =>
    render(<MemoryRouter><EmptyBudgetBox addNewBudget={addNewBudget}/></MemoryRouter>);

// user-event v13 clicks synchronously and does not wrap the async state updates that
// follow (addBudget awaits before setting state), so drive interactions through act to
// keep the suite free of "not wrapped in act(...)" warnings.
const click = (element) => act(async () => {
    userEvent.click(element);
});

const openModal = async () => {
    await click(screen.getByRole('button', {name: /add a new budget/i}));
    return screen.getByRole('button', {name: /create a new budget/i});
};

describe('<EmptyBudgetBox/> create flow', () => {
    it('waits for the create to finish, then confirms success before navigating', async () => {
        let resolveCreate;
        const addNewBudget = jest.fn(() => new Promise((resolve) => {
            resolveCreate = resolve;
        }));

        renderBox(addNewBudget);
        const createButton = await openModal();
        await click(createButton);

        // Mid-flight: the button reports progress and is disabled, so the create cannot
        // be double-submitted and the user is not silently left wondering.
        await waitFor(() => expect(screen.getByRole('button', {name: /creating/i})).toBeDisabled());

        await act(async () => {
            resolveCreate({id: 9});
        });

        // An explicit confirmation, not just a silent jump to another screen.
        expect(await screen.findByRole('status')).toHaveTextContent(/created successfully/i);
        // Stays disabled through the confirmation — the work is done, not repeatable.
        expect(screen.getByRole('button', {name: /create a new budget/i})).toBeDisabled();
    });

    // Regression test for the real defect: the error branch existed but could never be
    // seen, because dispatching the dashboard-wide loading flag unmounted this component
    // (and its modal) before the rejection was handled. Asserting the message is actually
    // in the document is the only way to catch that class of bug.
    it('shows the server error message when the create fails, and stays on the page', async () => {
        const addNewBudget = jest.fn(() => Promise.reject({
            response: {data: {message: 'Budgets can only be created for the current financial year (2026-2027)'}}
        }));

        renderBox(addNewBudget);
        const createButton = await openModal();
        await click(createButton);

        expect(await screen.findByText(/only be created for the current financial year/i)).toBeInTheDocument();
        // Button is usable again so the user can retry.
        await waitFor(() => expect(screen.getByRole('button', {name: /create a new budget/i})).toBeEnabled());
    });

    it('falls back to a generic message when the failure carries no server message', async () => {
        const addNewBudget = jest.fn(() => Promise.reject(new Error('Network Error')));

        renderBox(addNewBudget);
        const createButton = await openModal();
        await click(createButton);

        expect(await screen.findByText(/could not create the budget/i)).toBeInTheDocument();
    });
});
