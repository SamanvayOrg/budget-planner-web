import {BrowserRouter, Route,Routes} from "react-router-dom";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import React from "react";
import AllBudgets from "../views/AllBudgets";

const Routing = () => {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/dashboard" element={<Dashboard/>}/>
			<Route path="/allBudgets" element={<AllBudgets/>}/>
		</Routes>
		</BrowserRouter>)
};

export default Routing;