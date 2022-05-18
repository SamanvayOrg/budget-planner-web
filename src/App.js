import React from 'react';
// import {Routing, Route, BrowserRouter} from 'react-router-dom';
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Routing from "./routes/Routing";
import {BrowserRouter} from "react-router-dom";


const App = () => {
	return (
		<Routing/>
	)
};

export default App;