import {createSlice} from "@reduxjs/toolkit";
import {createBudget, getCurrentBudget} from '../api/api';
import {tokenSelector} from "./authReducer";

export const initialState = {
	currentBudget: {},
	loading: false,
	error: false,
	newBudgetCreated: false,
	newBudgetYear: null
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
		})
	},
});


export const {
	dashboardLoading,
	setCurrentBudget,
	newBudgetCreated
} = budgetDashboardSlice.actions

export const budgetDashboardSelector = state => state.budgetDashboard;
export default budgetDashboardSlice.reducer;

export function fetchCurrentBudget() {
	return async (dispatch, getState) => {
		const token = tokenSelector(getState())
		dispatch(dashboardLoading());
		let budget = await getCurrentBudget(token);
		dispatch(setCurrentBudget(budget));
	}
}

export function createNewBudget(year) {
	return async (dispatch, getState) => {
		const token = tokenSelector(getState())
		dispatch(dashboardLoading());
		await createBudget(token, year);
		dispatch(newBudgetCreated(year));
	}
}