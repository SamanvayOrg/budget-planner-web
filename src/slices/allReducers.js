import {combineReducers} from "redux";
import {authReducer} from './authReducer';
import {budgetDashboardReducer} from './budgetDashboardReducer';
import allBudgetReducer from "./allBudgetReducer";
import MunicipalityReducer from "./municipalityReducer";

const allReducers = combineReducers({
	auth: authReducer,
	budgetDashboard: budgetDashboardReducer,
	allBudgets: allBudgetReducer,
	municipalityReducer:MunicipalityReducer


})

export default allReducers;