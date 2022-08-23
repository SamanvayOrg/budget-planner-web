import {createSlice} from "@reduxjs/toolkit";
import {tokenSelector} from "./authReducer";
import {createAdminFromSuperUser, createUser, getAdminUsers, getUsers, updateUser} from "../api/api";

export const initialState = {
    users: {},
    adminUsers: {}
}
const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        setUsers: (state, {payload}) => {
            state.users = payload;
        },
        setAdminUsers: (state, {payload}) => {
            state.adminUsers = payload;
        }
    }
})
export const {setUsers, setAdminUsers} = allUsersSlice.actions;

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
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');;
        await updateUser(token, data)
    }
}

export function createNewUser(data) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');;
        return await createUser(token, data);
    }
}

export function fetchAdminUser() {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState())  || localStorage.getItem('authToken');;
        dispatch(setAdminUsers());
        let users = await getAdminUsers(token);
        dispatch(setAdminUsers(users));
    }
}

export function createNewAdmin(data, municipalityId) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState()) || localStorage.getItem('authToken');;
        return await createAdminFromSuperUser(token, municipalityId, data);
    }
}


