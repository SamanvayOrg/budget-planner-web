import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getCurrentUser} from "../api/api";

export const initialState = {
    user: {}
}
const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, {payload}) => {
            state.user = payload
        }
    }
})
export const {
    setCurrentUser
} = currentUserSlice.actions;

export const currentUserSelector = state => state.currentUser;
export default currentUserSlice.reducer;

export function fetchCurrentUser() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        dispatch(setCurrentUser());
        let details = await getCurrentUser(token);
        dispatch(setCurrentUser(details));
    }
}