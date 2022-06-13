import {combineReducers} from "redux";
import {authReducer} from './authReducer';
import {budgetDashboardReducer} from './budgetDashboardReducer';
import allBudgetReducer from "./allBudgetReducer";

const allReducers = combineReducers({
	auth: authReducer,
	budgetDashboard: budgetDashboardReducer,
	allBudgets: allBudgetReducer


})

export default allReducers;