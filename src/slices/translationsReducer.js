import {tokenSelector} from "./authReducer";
import {getTranslations} from "../api/api";
import i18n from "i18next";


export const fetchTranslations = () => async (dispatch, getState) => {
	const token = tokenSelector(getState());
	const translation = await getTranslations(token);
	i18n.addResources('mr', 'translation', translation);
};
