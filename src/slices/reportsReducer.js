import {createSlice} from '@reduxjs/toolkit';
import {tokenSelector} from './authReducer';
import {getReports} from '../api/api';

export const initialState = {
    reports: [],
    loading: false,
    error: false
}
const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        setReports: (state, {payload}) => {
            state.reports = payload
            state.loading = false
            state.error = false
        },
        loading: (state) => {
            state.loading = true
            state.error = false
        },
        loadingFailure: (state) => {
            state.loading = false
            state.error = true
        }
    }
});

export const {
    setReports,
    loading, loadingFailure
} = reportsSlice.actions;

export const reportsSelector = state => state.reports;
export default reportsSlice.reducer;

export function fetchReports() {
    return async (dispatch, getState) => {
        try {
            const token = tokenSelector(getState()) || localStorage.getItem('authToken');
            dispatch(loading());
            const reports = await getReports(token);
            dispatch(setReports(reports));
        } catch(e) {
            dispatch(loadingFailure());
        }
    }
};


