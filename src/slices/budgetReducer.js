import {createSlice} from '@reduxjs/toolkit';
import {
    changeBudgetStatus,
    downloadBudgetReport,
    getBudget,
    save,
    updateBudgetProperties as backendUpdateBudgetProperties
} from '../api/api';
import {tokenSelector} from './authReducer';
import {fromContract, getBudgetView} from '../domain';
import {updateFromView} from '../domain/updateFromView';
import {toContract} from '../domain/budgetContractMapper';
import _ from 'lodash';
import validateBudget from '../domain/validateBudget';

export const initialState = {
    budget: {},
    population: null,
    closingBalance: null,
    openingBalance: null,
    loading: false,
    error: false,
    submitWithWarning: false,
    showValidationResults: false,
    saved: '✓ saved',
    validationResults: []
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
            state.budget = fromContract(payload);
            state.error = false;
            state.budgetView = getBudgetView(fromContract(payload));
            state.population = payload.population;
            state.openingBalance = payload.openingBalance;
            state.closingBalance = payload.closingBalance;
        },
        setBudgetView: (state, {payload}) => {
            state.budgetView = payload;
        },
        setValidationResults: (state, {payload}) => {
            state.validationResults = payload;
            if (state.validationResults.length > 0 && !state.submitWithWarning) {
                state.showValidationResults = true;
            }
        },
        hideValidationResults: (state) => {
            console.log('hiding validation results');
            state.showValidationResults = false;
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
        allowSubmitWithWarning: (state) => {
            state.submitWithWarning = true;
            state.showValidationResults = false;
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

            if (_.isUndefined(matchingMajorHead)) {
                const matchingMajorHeadGroup = _.chain(state.budget)
                    .get('items')
                    .filter((group) => group.majorHeadGroup === majorHeadGroup.name)
                    .value();
                matchingMajorHead = {
                    majorHead: majorHead.name,
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
                };
                matchingMajorHeadGroup[0].items.push(matchingMajorHead);
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
        },
        deleteBudgetLine: (state, {
            payload: {
                detailCode,
                majorHead,
            }
        }) => {
            let matchingMajorHead = _.chain(state.budget)
                .get('items')
                .map(group => group.items)
                .flatten()
                .find(head => head.majorHead === majorHead)
                .value();

            if (_.isUndefined(matchingMajorHead)) {
                console.log('couldn\'t find matching majorHead to delete from');
            }
            const matchingMajorHeadCopy = Object.assign({}, matchingMajorHead);
            let matchingItemIdx = matchingMajorHeadCopy.items.findIndex(item => item.code === detailCode);
            matchingMajorHead.items[matchingItemIdx].voided = true;
            state.budgetView = getBudgetView(state.budget);
            state.saved = 'Save the changes';
        },
        setBudgetProps: (state, {payload}) => {
            state.population = payload.population;
            state.openingBalance = payload.openingBalance;
            state.closingBalance = payload.closingBalance;
        }
    },
});

export const {
    budgetLoading,
    setBudget,
    setBudgetView,
    updateBudget,
    addBudgetLine,
    saveBudgetStatus,
    allowSubmitWithWarning,
    deleteBudgetLine,
    setBudgetProps,
    setValidationResults,
    hideValidationResults
} = budgetDashboardSlice.actions;

export const budgetSelector = state => state.budget;
export default budgetDashboardSlice.reducer;

export function submitBudget(submitWithWarning = false) {
    return async (dispatch, getState) => {
        if (submitWithWarning) {
            dispatch(allowSubmitWithWarning());
        }
        await dispatch(saveBudget());

        const state = getState();
        const budget = budgetSelector(state).budget;
        const validationResults = validateBudget(budget);
        dispatch(setValidationResults(validationResults));

        if (validationResults.length === 0 || submitWithWarning) {
            await dispatch(updateBudgetStatus(budget.id, 'Submitted to GB'));
            dispatch(hideValidationResults());
        }
        dispatch(fetchBudget(budget.year));
    };
}

export function saveBudget() {
    return async (dispatch, getState) => {
        const state = getState();
        const budget = budgetSelector(state).budget;

        dispatch(saveBudgetStatus(false));
        const token = tokenSelector(state);
        const data = await save(token, toContract(budget));
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

export function updateBudgetProperties(data, id) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        let result = await backendUpdateBudgetProperties(token, data, id);
        dispatch(setBudgetProps(result));
    };
}

export function updateBudgetStatus(id, data) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        return await changeBudgetStatus(token, id, data);
    };
}

export function downloadBudgetExcel(year, reportType) {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        return await downloadBudgetReport(token, year, reportType, localStorage.getItem('language'));
    };
}
