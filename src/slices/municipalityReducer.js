import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {createMunicipality, getAllMunicipalities, getMunicipalityDetails, updateMunicipality} from "../api/api";

export const initialState = {
    currentMunicipality: {},
    allMunicipalities: {},
    loading: false,
    error: false,
    saved: false
}
const municipalityDetailsSlice = createSlice({
    name: 'municipalityDetails',
    initialState,
    reducers: {
        setCurrentMunicipalityDetails: (state, {payload}) => {
            state.currentMunicipality = payload
            state.loading = false
            state.error = false
        },
        setAllMunicipalities: (state, {payload}) => {
            state.allMunicipalities = payload
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
    setCurrentMunicipalityDetails,
    loading, loadingFailure, saveStatus, setAllMunicipalities
} = municipalityDetailsSlice.actions;

export const allMunicipalityDetailsSelector = state => state.municipalityDetails;
export default municipalityDetailsSlice.reducer;

export function fetchMunicipalityDetails() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        dispatch(setCurrentMunicipalityDetails());
        let details = await getMunicipalityDetails(token);
        dispatch(setCurrentMunicipalityDetails(details));
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


export function fetchAllMunicipalities() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        let data = await getAllMunicipalities(token);
        dispatch(setAllMunicipalities(data));
    }
}

export function createNewMunicipality(data) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        await createMunicipality(token, data);
    }
}



