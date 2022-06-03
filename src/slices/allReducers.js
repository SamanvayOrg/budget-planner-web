import {combineReducers} from "redux";
import {authReducer} from './authReducer';
import {budgetDashboardReducer} from './budgetDashboardReducer';

const allReducers = combineReducers({
	auth: authReducer,
	budgetDashboard: budgetDashboardReducer,
})

export default allReducers;