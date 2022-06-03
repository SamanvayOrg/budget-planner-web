import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../views/Dashboard";
import React from "react";
import Home from "../views/Home";

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