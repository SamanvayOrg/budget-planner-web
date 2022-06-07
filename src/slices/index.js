import {combineReducers} from 'redux'


import authReducer from './authReducer'
import budgetDashboardReducer from "./budgetDashboardReducer";
import budgetReducer from "./budgetReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	budgetDashboard: budgetDashboardReducer,
	budget: budgetReducer
})

export default rootReducer
