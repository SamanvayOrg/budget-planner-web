import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getCurrentUser} from "../api/api";
import jwt_decode from "jwt-decode";

export const initialState = {
    user: {},
    authToken: {}
}
const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, {payload}) => {
            state.user = payload
        },
        setAuth: (state, {payload}) => {
            state.authToken = jwt_decode(payload)
        }
    }
})
export const {
    setCurrentUser,
    setAuth
} = currentUserSlice.actions;

export const currentUserSelector = state => state.currentUser;
export default currentUserSlice.reducer;

export function fetchCurrentUser() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        let details = await getCurrentUser(token);
        dispatch(setCurrentUser(details));
        dispatch(setAuth(token));
    }
}