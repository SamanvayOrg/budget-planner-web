import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getUsers} from "../api/api";

export const initialState = {
    users: {},
}
const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        setUsers: (state, {payload}) => {
            state.users = payload;
        }
    }
})
export const {setUsers} = allUsersSlice.actions;

export const allUsersSelector = state => state.allUsers;
export default allUsersSlice.reducer;

export function fetchUsers() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        dispatch(setUsers());
        let users = await getUsers(token);
        dispatch(setUsers(users));
    }
}




