import {HashRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../views/Dashboard";
import React from "react";
import Home from "../views/Home";
import BudgetDetail from "../views/BudgetDetail";
import AllBudgets from "../views/AllBudgets";
import Users from "../views/Users";
import Municipality from "../views/Municipality";

const Routing = () => {
	return (<HashRouter>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/dashboard" element={<Dashboard/>}/>
			<Route path="/budget/:year" element={<BudgetDetail/>}/>
			<Route path="/allBudgets" element={<AllBudgets/>}/>
            <Route path="/admin/users" element={<Users/>}/>
            <Route path="/admin/municipality" element={<Municipality/>}/>
		</Routes>
	</HashRouter>)
};

export default Routing;