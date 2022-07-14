import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getTranslations} from "../api/api";
import i18n from "i18next";

export const initialState = {
	translations: {},
	loading: false,
	error: false
}
const translationsSlice = createSlice({
	name: 'translation',
	initialState,
	reducers: {
		setTranslations: (state, {payload}) => {
			state.translations = payload
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
	setTranslations, loading, loadingFailure
} = translationsSlice.actions

export const translationSelector = state => state.translation;
export default translationsSlice.reducer;


export const fetchTranslations = () => async (dispatch, getState) => {
	const token = tokenSelector(getState());
	dispatch(setTranslations());
	const translation = await getTranslations(token);
	i18n.addResources('mr', 'translation', translation);
	dispatch(setTranslations(translation));
};
