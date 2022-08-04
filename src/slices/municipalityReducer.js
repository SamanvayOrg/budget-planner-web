import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getMunicipalityDetails, updateMunicipality} from "../api/api";

export const initialState = {
    details: {},
    loading: false,
    error: false,
    saved: false
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
        loadingFailure: (state) => {
            state.loading = false
            state.error = true
        },
        saveStatus: (state) => {
            state.saved = true
            state.error = false
        }

    }
})
export const {
    setDetails,
    loading, loadingFailure, saveStatus
} = municipalityDetailsSlice.actions;

export const allMunicipalityDetailsSelector = state => state.municipalityDetails;
export default municipalityDetailsSlice.reducer;

export function fetchMunicipalityDetails() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        dispatch(setDetails());
        let details = await getMunicipalityDetails(token);
        dispatch(setDetails(details));
    }
}

export function saveMunicipality(data) {
    return async (dispatch, getState) => {
        const state = getState();
        const token = tokenSelector(state) || localStorage.getItem('authToken');
        const status = await updateMunicipality(token, data);
        dispatch(saveStatus(status));
    }
}




