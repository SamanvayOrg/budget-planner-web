import {createSlice} from "@reduxjs/toolkit";
import {getAllBudgets} from '../api/api';
import {tokenSelector} from "./authReducer";

export const initialState = {
	allBudget:{},
	loading: true,
	error: false
}

const allBudgetSlice = createSlice({
	name: 'allBudgets',
	initialState,
	reducers: {
		setAllBudgets: (state, {payload}) => {
			state.allBudget = payload
			state.error = false
			state.loading = false
		},
		budgetLoading: (state) => {
			state.loading = false
			state.error = true
		}
	},
});

export const {
	setAllBudgets,
	budgetLoading
} = allBudgetSlice.actions

export const allBudgetSelector = state => state.allBudgets;
export default allBudgetSlice.reducer;

export function fetchAllBudgets() {
	return async (dispatch, getState) => {
		const token = tokenSelector(getState());
		dispatch(setAllBudgets());
		let budgets = await getAllBudgets(token);
		dispatch(setAllBudgets(budgets));
	}
}
