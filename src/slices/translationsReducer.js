import {tokenSelector} from "./authReducer";
import {addTranslations, getTranslations} from "../api/api";
import i18n from "i18next";


export const fetchTranslations = () => async (dispatch, getState) => {
    const token = tokenSelector(getState()) || localStorage.getItem('authToken');
    const translation = await getTranslations(token);
    i18n.addResources('mr', 'translation', translation);
};

export const saveTranslations = (data) => {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        await addTranslations(token, data);
    }
}