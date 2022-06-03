import {applyMiddleware} from "redux";
import {legacy_createStore as createStore} from 'redux'
import allReducers from "../reducers/allReducers";
import thunk from "redux-thunk";

console.log("createStore");

const store = createStore(allReducers, {}, applyMiddleware(thunk));
export default store;
