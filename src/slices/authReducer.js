import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
	user: {}, token: '', authDetailsAvailable: false,
	isLoading: false
}


const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, {payload}) => {
			state.token = payload
			state.authDetailsAvailable = true
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

export function setAuthToken(token) {
	return async dispatch => {
		dispatch(setToken(token))
		dispatch(setUserDetails(token))
		dispatch(logOut())
	}
}
