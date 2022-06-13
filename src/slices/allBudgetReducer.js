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
		setBudget: (state, {payload}) => {
			state.allBudget = payload
			state.error = false
			state.loading = false
		},
		budgetLoading: (state, {}) => {
			state.loading = false
			state.error = true
		}
	},
});

export const {
	setBudget,
	budgetLoading
} = allBudgetSlice.actions

export const allBudgetSelector = state => state.allBudgets;
export default allBudgetSlice.reducer;

export function fetchAllBudgets() {
	return async (dispatch, getState) => {
		const token = tokenSelector(getState());
		console.log(token);
		dispatch(setBudget());
		let budget = await getAllBudgets(token);
		dispatch(setBudget(budget));
	}
}
