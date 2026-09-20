import {createNewBudget, dashboardLoading, budgetLoadingFailure, newBudgetCreated} from './budgetDashboardReducer';
import {createBudget} from '../api/api';

jest.mock('../api/api');

const mockGetState = () => ({auth: {token: 'test-token'}});

describe('createNewBudget thunk', () => {
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('calls the API with the current token and year, and resolves with the created budget', async () => {
        const createdBudget = {id: 9, budgetYear: '2026-27'};
        createBudget.mockResolvedValue(createdBudget);
        const dispatch = jest.fn();

        const result = await createNewBudget('2026')(dispatch, mockGetState);

        expect(createBudget).toHaveBeenCalledWith('test-token', '2026');
        expect(result).toBe(createdBudget);
        expect(dispatch).toHaveBeenCalledWith(newBudgetCreated('2026'));
        expect(dispatch).not.toHaveBeenCalledWith(budgetLoadingFailure());
    });

    // Regression guard. dashboardLoading() sets the dashboard-wide `loading` flag, and
    // Dashboard#renderBox returns a full-page <Spinner/> while it is true — which unmounts
    // the box and modal that own this operation's "Creating…" label and error message.
    // Dispatching it here silently made both unreachable.
    it('does not dispatch the dashboard-wide loading flag, which would unmount the modal', async () => {
        createBudget.mockResolvedValue({id: 9});
        const dispatch = jest.fn();

        await createNewBudget('2026')(dispatch, mockGetState);

        expect(dispatch).not.toHaveBeenCalledWith(dashboardLoading());
    });

    it('falls back to the token in localStorage when Redux has not been hydrated', async () => {
        createBudget.mockResolvedValue({id: 9});
        localStorage.setItem('authToken', 'token-from-storage');
        const emptyReduxState = () => ({auth: {token: ''}});

        await createNewBudget('2026')(jest.fn(), emptyReduxState);

        expect(createBudget).toHaveBeenCalledWith('token-from-storage', '2026');
    });

    // The original bug: a failed create propagated as an unhandled rejection with no error
    // state set, so the UI sat there with nothing to tell the user it had failed.
    it('dispatches budgetLoadingFailure and rejects when the create call fails', async () => {
        const apiError = new Error('Budgets can only be created for the current financial year');
        createBudget.mockRejectedValue(apiError);
        const dispatch = jest.fn();

        await expect(createNewBudget('2099')(dispatch, mockGetState)).rejects.toBe(apiError);

        expect(dispatch).toHaveBeenCalledWith(budgetLoadingFailure());
        expect(dispatch).not.toHaveBeenCalledWith(newBudgetCreated(expect.anything()));
    });
});
