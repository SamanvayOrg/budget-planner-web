import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getStateDetails} from "../api/api";

export const initialState = {
    stateDetails: {}
}
const stateSlice = createSlice({
    name: 'stateDetailsSlice',
    initialState,
    reducers: {
        setState: (state, {payload}) => {
            state.stateDetails = payload;
        }
    }
})
export const {
    setState
} = stateSlice.actions;

export const stateSelector = state => state.stateDetailsSlice;
export default stateSlice.reducer;

export function fetchState() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken')
        const data = await getStateDetails(token);
        dispatch(setState(data));
    }
}