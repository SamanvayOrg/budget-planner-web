import {BrowserRouter, Route,Routes} from "react-router-dom";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import React from "react";

const Routing = () => {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/dashboard" element={<Dashboard/>}/>
		</Routes>
		</BrowserRouter>)
};

export default Routing;