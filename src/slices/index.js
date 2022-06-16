import {combineReducers} from 'redux'


import authReducer from './authReducer'
import budgetDashboardReducer from "./budgetDashboardReducer";
import budgetReducer from "./budgetReducer";
import allBudgetReducer from "./allBudgetReducer";
import municipalityReducer from "./municipalityReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	budgetDashboard: budgetDashboardReducer,
	budget: budgetReducer,
	allBudgets:allBudgetReducer,
	municipalityDetails:municipalityReducer
})

export default rootReducer
