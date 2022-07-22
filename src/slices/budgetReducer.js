import {createSlice} from '@reduxjs/toolkit';
import {getBudget, save} from '../api/api';
import {tokenSelector} from './authReducer';
import {fromContract, getBudgetView} from '../domain';
import {updateFromView} from '../domain/updateFromView';
import {toContract} from '../domain/budgetContractMapper';
import _ from 'lodash';

export const initialState = {
    budget: {},
    loading: false,
    error: false,
    saved: '✓ saved'
};

const budgetDashboardSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        budgetLoading: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        budgetLoadingFailure: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        setBudget: (state, {payload}) => {
            state.loading = false;
            state.budget = payload;
            state.error = false;
            state.budgetView = getBudgetView(payload);
        },
        setBudgetView: (state, {payload}) => {
            state.budgetView = payload;
        },
        updateBudget: (state, {payload}) => {
            const budget = updateFromView(payload, state.budget);
            state.budget = budget;
            state.budgetView = getBudgetView(budget);
            state.saved = 'Save the changes';
        },
        saveBudgetStatus: (state, {payload}) => {
            state.saved = payload ? '✓ saved' : 'saving...';
        },
        addBudgetLine: (state, {
            payload: {
                majorHeadGroup,
                theMajorHead: majorHead,
                minorHead,
                detailedHead,
                functionGroup,
                theFunction,
                name
            }
        }) => {
            const matchingMajorHead = _.chain(state.budget)
                .get('items')
                .map(group => group.items)
                .flatten()
                .find(head => head.majorHead === majorHead.name)
                .value();

            matchingMajorHead.items.push({
                code: theFunction.fullCode + '-' + detailedHead.fullCode,
                name,
                functionCode: theFunction.fullCode,
                detailedHeadCode: detailedHead.fullCode,
                majorHeadGroup: majorHeadGroup.name,
                majorHead: majorHead.name,
                minorHead: minorHead.name,
            });
            state.budgetView = getBudgetView(state.budget);
        }
    },
});

export const {
    budgetLoading,
    setBudget,
    setBudgetView,
    updateBudget,
    addBudgetLine,
    saveBudgetStatus
} = budgetDashboardSlice.actions;

export const budgetSelector = state => state.budget;
export default budgetDashboardSlice.reducer;

export function saveBudget() {
    return async (dispatch, getState) => {
        const state = getState();
        const token = tokenSelector(state);
        const budget = budgetSelector(state).budget;
        dispatch(saveBudgetStatus(false));
        const data = await save(token, toContract(budget));
        dispatch(saveBudgetStatus(data));
    };
}

export function fetchBudget(year) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        dispatch(budgetLoading());
        let budget = await getBudget(token, year);
        dispatch(setBudget(fromContract(budget)));
    };
}
