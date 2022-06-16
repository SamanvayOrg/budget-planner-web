import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getCurrentBudget, getMunicipalityDetails} from "../api/api";
import {budgetLoadingFailure, dashboardLoading, setCurrentBudget} from "./budgetDashboardReducer";

export const initialState = {
	details: {},
	loading: false,
	error: false
}
const municipalityDetailsSlice = createSlice({
	name: 'municipalityDetails',
	initialState,
	reducers: {
		setDetails: (state, {payload}) => {
			state.details = payload
			state.loading = false
			state.error = false
		},
		loading: (state) => {
			state.loading = true
			state.error = false
		},
		loadingFailure: (state, {}) => {
			state.loading = false
			state.error = true
		}
	}
})
export const {
	setDetails,
	loading, loadingFailure
} = municipalityDetailsSlice.actions;

export const allMunicipalityDetailsSelector = state => state.municipalityDetails;
export default municipalityDetailsSlice.reducer;

export function fetchMunicipalityDetails() {
	return async (dispatch, getState) => {
		const token = tokenSelector(getState());
		dispatch(setDetails());
		let details = await getMunicipalityDetails(token);
		dispatch(setDetails(details));
		console.log('reducer der22-->', details)


	}
}




