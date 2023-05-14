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
        const token = tokenSelector(getState())
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
        const token = tokenSelector(getState())
        dispatch(dashboardLoading());
        await createBudget(token, year);
        try {
            dispatch(newBudgetCreated(year));
        } catch (e) {
            console.log(e);
            dispatch(budgetLoadingFailure())
        }
    }
}

export const fetchLatestBudget = () => {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        try {
            let budget = await getLatestBudget(token);
            dispatch(setLatestBudget(budget))
        } catch (e) {
            console.log(e)
            dispatch(budgetLoadingFailure())
        }

    }
}