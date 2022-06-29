import {combineReducers} from 'redux';


import authReducer from './authReducer';
import budgetDashboardReducer from './budgetDashboardReducer';
import budgetReducer from './budgetReducer';
import allBudgetReducer from './allBudgetReducer';
import municipalityReducer from './municipalityReducer';
import metadataReducer from './metadataReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    budgetDashboard: budgetDashboardReducer,
    budget: budgetReducer,
    allBudgets: allBudgetReducer,
    municipalityDetails: municipalityReducer,
    metadata: metadataReducer
});

export default rootReducer;
