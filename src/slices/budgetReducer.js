import {createSlice} from '@reduxjs/toolkit';
import {getBudget, save} from '../api/api';
import {tokenSelector} from './authReducer';
import {fromContract, getBudgetView} from '../domain';
import {updateFromView} from '../domain/updateFromView';
import {toContract} from '../domain/budgetContractMapper';
import _ from 'lodash';

export const initialState = {
    budget: {},
    population: {},
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
            console.log("payment",payload);
            state.loading = false;
            state.budget = fromContract(payload);
            state.error = false;
            state.budgetView = getBudgetView(fromContract(payload));
            state.population = payload.population;
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

            let matchingMajorHead = _.chain(state.budget)
                .get('items')
                .map(group => group.items)
                .flatten()
                .find(head => head.majorHead === majorHead.name)
                .value();

            if(_.isUndefined(matchingMajorHead)) {
                const matchingMajorHeadGroup = _.chain(state.budget)
                    .get('items')
                    .filter((group) => group.majorHeadGroup === majorHeadGroup.name)
                    .value();
                matchingMajorHead = {
                    majorHead:  majorHead.name,
                    summary: {
                        budgetedAmount: 0,
                        currentYear8MonthsActuals: 0,
                        currentYear4MonthsProbables: 0,
                        previousYearActuals: 0,
                        yearMinus1Actuals: 0,
                        yearMinus2Actuals: 0,
                        functionCode: 0,
                        detailedHeadCode: 0
                    },
                    items: []
                }
                matchingMajorHeadGroup[0].items.push(matchingMajorHead)
            }

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

export function saveBudget(population) {
    return async (dispatch, getState) => {
        const state = getState();
        const token = tokenSelector(state);
        const budget = budgetSelector(state).budget;
        dispatch(saveBudgetStatus(false));
        const data = await save(token, {...toContract(budget),population});
        dispatch(saveBudgetStatus(data));
    };
}

export function fetchBudget(year) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        dispatch(budgetLoading());
        let budget = await getBudget(token, year);
        dispatch(setBudget(budget));
    };
}
