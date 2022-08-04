import {createSlice} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const initialState = {
    user: {}, token: '', authDetailsAvailable: false,
    isLoading: false,
    tokenData: {}
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, {payload}) => {
            state.token = payload
            state.authDetailsAvailable = true
            state.tokenData = jwt_decode(payload)
        },
        setUserDetails: (state, {payload}) => {
            state.user = payload
        },
        logOut: (state) => {
            return initialState;
        }
    },
})


export const {
    setToken,
    setUserDetails,
    logOut
} = authSlice.actions
export const authSelector = state => state.auth;
export const tokenSelector = state => state.auth.token;
export default authSlice.reducer;
