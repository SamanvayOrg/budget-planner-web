import {combineReducers} from 'redux';
import authReducer from './authReducer';
import budgetDashboardReducer from './budgetDashboardReducer';
import budgetReducer from './budgetReducer';
import allBudgetReducer from './allBudgetReducer';
import municipalityReducer from './municipalityReducer';
import metadataReducer from './metadataReducer';
import i18nReducer from './i18nReducer';
import allUsersReducer from "./allUsersReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	budgetDashboard: budgetDashboardReducer,
	budget: budgetReducer,
	allBudgets: allBudgetReducer,
	municipalityDetails: municipalityReducer,
	metadata: metadataReducer,
	i18Lang: i18nReducer,
	allUsers: allUsersReducer
});

export default rootReducer;
