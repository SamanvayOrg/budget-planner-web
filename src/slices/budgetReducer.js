import {createSlice} from "@reduxjs/toolkit";
import {getBudget, getCurrentBudget} from '../api/api';
import {tokenSelector} from "./authReducer";
import {toArray} from "../domain/budgetMapper";

export const initialState = {
	budget: {},
	loading: false,
	error: false
}

const budgetDashboardSlice = createSlice({
	name: 'budget',
	initialState,
	reducers: {
		budgetLoading: (state, {payload}) => {
			state.loading = true
			state.error = false
		},
		budgetLoadingFailure: (state, {payload}) => {
			state.loading = false
			state.error = true
		},
		setBudget: (state, {payload}) => {
			state.loading = false
			state.budget = payload
			state.error = false
			state.budgetView = toArray(payload)
		},
	},
});

export const {
	budgetLoading,
	setBudget
} = budgetDashboardSlice.actions

export const budgetSelector = state => state.budget;
export default budgetDashboardSlice.reducer;

export function fetchBudget(year) {
	return async (dispatch, getState) => {
		const token = tokenSelector(getState())
		dispatch(budgetLoading());
		let budget = await getBudget(token, year);
		console.log("budget--->",budget);
		dispatch(setBudget(budget));
	}
}
