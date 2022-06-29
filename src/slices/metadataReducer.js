import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getMetadata} from "../api/api";

export const initialState = {
	metadata: {},
	loading: false,
	error: false
}
const metadataSlice = createSlice({
	name: 'metadata',
	initialState,
	reducers: {
		setMetadata: (state, {payload}) => {
			state.metadata = payload
			state.loading = false
			state.error = false
		},
		loading: (state) => {
			state.loading = true
			state.error = false
		},
		loadingFailure: (state) => {
			state.loading = false
			state.error = true
		}
	}
})
export const {
	setMetadata,
	loading, loadingFailure
} = metadataSlice.actions;

export const metadataSelector = state => state.metadata;
export default metadataSlice.reducer;

export function fetchMetadata() {
	return async (dispatch, getState) => {
		const token = tokenSelector(getState());
		dispatch(loading());
		let data = await getMetadata(token);
		dispatch(setMetadata(data));
		console.log('data--->',data);
	}
}




