import {createSlice} from "@reduxjs/toolkit";
import {getCurrentBudget}  from  '../api/api';
import {tokenSelector} from "./authReducer";

export const initialState = {
	currentBudget: {},
	loading: false,
	error: false
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
	},
});


export const {
	dashboardLoading,
	setCurrentBudget
} = budgetDashboardSlice.actions

export const budgetDashboardSelector = state => state.budgetDashboard;
export default budgetDashboardSlice.reducer;

export function fetchCurrentBudget() {
	return async (dispatch, getState) => {
		const token = tokenSelector(getState())
		console.log('selected token', token);
		dispatch(dashboardLoading());
		let budget = await getCurrentBudget(token);
		dispatch(setCurrentBudget(budget));
	}
}
