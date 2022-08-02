import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {getUsers, updateUser} from "../api/api";

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
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');
        dispatch(setUsers());
        let users = await getUsers(token);
        dispatch(setUsers(users));
    }
}


export function saveUser(data) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        console.log('daata in save reducer', data);
        await updateUser(token, data)
    }
}



