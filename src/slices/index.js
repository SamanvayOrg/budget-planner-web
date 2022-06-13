import {combineReducers} from 'redux'


import authReducer from './authReducer'
import budgetDashboardReducer from "./budgetDashboardReducer";
import budgetReducer from "./budgetReducer";
import allBudgetReducer from "./allBudgetReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	budgetDashboard: budgetDashboardReducer,
	budget: budgetReducer,
	allBudgets:allBudgetReducer
})

export default rootReducer
