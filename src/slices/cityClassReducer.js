import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getCityClasses} from "../api/api";

export const initialState = {
    cityClasses: {}
}
const cityClassesSlice = createSlice({
    name: 'cityClasses',
    initialState,
    reducers: {
        setCityClasses: (state, {payload}) => {
            state.cityClasses = payload;
        }
    }
})
export const {
    setCityClasses
} = cityClassesSlice.actions;

export const cityClassesSelector = state => state.cityClasses;
export default cityClassesSlice.reducer;

export function fetchCityClasses() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken')
        const data = await getCityClasses(token);
        console.log('data',data)
        dispatch(setCityClasses(data));
    }
}