import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
	language: localStorage.getItem("language"),
	loading: false,
	error: false
}
const i18LangSlice = createSlice({
	name: 'i18Lang',
	initialState,
	reducers: {
		seti18Lang: (state, {payload}) => {
			state.language = payload
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
	seti18Lang,
	loading, loadingFailure
} = i18LangSlice.actions;

export const i18LangSelector = state => state.i18Lang;
export default i18LangSlice.reducer;

export function fetchLanguage(lang) {
	return async (dispatch) => {
		dispatch(loading());
		dispatch(seti18Lang(lang));
		console.log('language--->', lang);
	}
}




