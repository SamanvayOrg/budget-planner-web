import axios from "axios";
import React from 'react';



const getCurrentBudget = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get("/api/budget/current",
		{
			headers
		});
	return result.data;
}


const getBudget = async (token, year) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/budget?year=${year}`,
		{
			headers
		});
	return result.data;
}


export {
	getCurrentBudget,
	getBudget
};