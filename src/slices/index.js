import {combineReducers} from 'redux'


import authReducer from './authReducer'
import budgetDashboardReducer from "./budgetDashboardReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	budgetDashboard: budgetDashboardReducer
})

export default rootReducer
