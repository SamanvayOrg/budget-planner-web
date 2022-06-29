import {combineReducers} from "redux";
import {authReducer} from './authReducer';
import {budgetDashboardReducer} from './budgetDashboardReducer';
import allBudgetReducer from "./allBudgetReducer";
import MunicipalityReducer from "./municipalityReducer";
import metadataReducer from "./metadataReducer";

const allReducers = combineReducers({
	auth: authReducer,
	budgetDashboard: budgetDashboardReducer,
	allBudgets: allBudgetReducer,
	municipalityReducer:MunicipalityReducer,
	metadataReducer:metadataReducer


})

export default allReducers;