import React from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";


const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/dashboard" elgit ement={<Dashboard/>}/>
			</Routes>
		</BrowserRouter>
	)
};

export default App;