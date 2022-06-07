import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../views/Dashboard";
import React from "react";
import Home from "../views/Home";
import BudgetDetail from "../views/BudgetDetail";

const Routing = () => {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/dashboard" element={<Dashboard/>}/>
			<Route path="/budget/:year" element={<BudgetDetail/>}/>
		</Routes>
		</BrowserRouter>)
};

export default Routing;