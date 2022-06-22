import {createSlice} from '@reduxjs/toolkit';
import {getBudget, save} from '../api/api';
import {tokenSelector} from './authReducer';
import {fromContract, getView} from '../domain';
import {updateFromView} from '../domain/updateFromView';
import {toContract} from '../domain/contractMapper';

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
			state.budgetView = getView(payload)
		},
		setBudgetView: (state, {payload}) => {
			state.budgetView = payload
		},
		updateBudget: (state, {payload}) => {
			const budget = updateFromView(payload, state.budget);
			state.budget = budget
			state.budgetView = getView(budget);
		}
	},
});

export const {
	budgetLoading,
	setBudget,
	setBudgetView,
	updateBudget,
} = budgetDashboardSlice.actions

export const budgetSelector = state => state.budget;
export default budgetDashboardSlice.reducer;

export function saveBudget() {
	return async (dispatch, getState) => {
		console.log('saving stuff');
		const state = getState();
		const token = tokenSelector(state);
		const budget = budgetSelector(state).budget;
		await save(token, toContract(budget));
	}
}

export function fetchBudget(year) {
	return async (dispatch, getState) => {
		const token = tokenSelector(getState())
		dispatch(budgetLoading());
		let budget = await getBudget(token, year);
		dispatch(setBudget(fromContract(budget)));
	}
}
