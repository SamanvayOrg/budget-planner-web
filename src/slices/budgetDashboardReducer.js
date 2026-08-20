import {createSlice} from "@reduxjs/toolkit";
import {createBudget, getCurrentBudget, getLatestBudget} from '../api/api';
import {tokenSelector} from "./authReducer";

export const initialState = {
    currentBudget: {},
    loading: false,
    error: false,
    newBudgetCreated: false,
    newBudgetYear: null,
    latestBudget: {}
}

const budgetDashboardSlice = createSlice({
    name: 'budgetDashboard',
    initialState,
    reducers: {
        dashboardLoading: (state, {payload}) => {
            state.loading = true
            state.error = false
        },
        budgetLoadingFailure: (state, {payload}) => {
            state.loading = false
            state.error = true
        },
        setCurrentBudget: (state, {payload}) => {
            state.loading = false
            state.currentBudget = payload
            state.error = false
        },
        newBudgetCreated: ((state, {payload}) => {
            state.newBudgetCreated = true;
            state.newBudgetYear = payload;
        }),
        setLatestBudget: (state, {payload}) => {
            state.latestBudget = payload
        }
    },
});


export const {
    dashboardLoading,
    budgetLoadingFailure,
    setCurrentBudget,
    newBudgetCreated,
    setLatestBudget
} = budgetDashboardSlice.actions

export const budgetDashboardSelector = state => state.budgetDashboard;
export default budgetDashboardSlice.reducer;

export function fetchCurrentBudget() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken')
        dispatch(dashboardLoading());
        try {
            let budget = await getCurrentBudget(token);
            dispatch(setCurrentBudget(budget));
        } catch (e) {
            console.log(e);
            dispatch(budgetLoadingFailure())
        }
    }
}

export function createNewBudget(year) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken')
        // Deliberately does NOT dispatch dashboardLoading(): that sets the dashboard-wide
        // `loading` flag, and Dashboard#renderBox returns a full-page <Spinner/> while it
        // is true — which unmounts the very box (and modal) that owns this operation's
        // "Creating…" state and error message, so neither could ever be seen. The create
        // flow's loading state is owned locally by the button that started it.
        try {
            const budget = await createBudget(token, year);
            dispatch(newBudgetCreated(year));
            return budget;
        } catch (e) {
            console.log(e);
            dispatch(budgetLoadingFailure());
            // Re-throw so the caller (the "create budget" button) can show a specific
            // error message and avoid navigating to a budget that was never created —
            // silently swallowing this here was the "create fails with no feedback" bug.
            throw e;
        }
    }
}

export const fetchLatestBudget = () => {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        try {
            let budget = await getLatestBudget(token);
            dispatch(setLatestBudget(budget))
        } catch (e) {
            console.log(e)
            dispatch(budgetLoadingFailure())
        }

    }
}