import {tokenSelector} from "./authReducer";
import {
    addTranslations,
    getTranslations,
    modifyTranslations,
    getAllTranslationsData,
    deleteTranslation
} from "../api/api";
import i18n from "i18next";
import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    translations: {},
    currentTranslation: {}
}
const allTranslationsSlice = createSlice({
    name: 'allTranslations',
    initialState,
    reducers: {
        setTranslations: (state, {payload}) => {
            state.translations = payload;
        },
        setCurrentTranslation: (state, {payload}) => {
            state.currentTranslation = payload;
        }
    }
})
export const {setTranslations, setCurrentTranslation} = allTranslationsSlice.actions;

export const allTranslationsSelector = state => state.allTranslations;
export default allTranslationsSlice.reducer;

export const fetchTranslations = () => async (dispatch, getState) => {
    const token = tokenSelector(getState()) || localStorage.getItem('authToken');
    const translation = await getTranslations(token);
    i18n.addResources('mr', 'translation', translation);
};

export const saveTranslations = (data) => {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        return await addTranslations(token, data);
    }
}

export function getAllTranslations() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        dispatch(setTranslations());
        let translationsData = await getAllTranslationsData(token);
        dispatch(setTranslations(translationsData));
    }
}

export const updateTranslations = (data) => {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        return await modifyTranslations(token, data);
    }
}

export const removeTranslation = (id) => {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        const result = await deleteTranslation(token, id);
        dispatch(getAllTranslations());
    }
}