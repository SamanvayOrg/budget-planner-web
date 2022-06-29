import axios from 'axios';


const getCurrentBudget = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get("/api/budget/current", {
		headers
	});
	return result.data;
}
const getMunicipalityDetails = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get("/api/municipality", {headers});
	return result.data;

}
const getBudget = async (token, year) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/budget?year=${year}`, {
		headers
	});
	return result.data;
}


const getAllBudgets = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/budgets`, {
		headers
	});
	return result.data;
}

const createBudget = async (token, year) => {
	const headers = {'Authorization': `Bearer ${token}`};
	await axios.post(`/api/budget?year=${year}`, null, {headers});
}

const save = async (token, budget) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const actuals = await axios.post(`/api/budget/actuals`, budget, {headers});
	const estimate = await axios.post(`/api/budget/estimates`, budget, {headers});
	const budgeted = await axios.post(`/api/budget/budgeted`, budget, {headers});

	let saveApiStatus = actuals.status === 200 && estimate.status === 200 && budgeted.status === 200;
	return saveApiStatus;

}

const getMetadata = async (token ) => {
	const headers={'Authorization':`Bearer ${token}`};
	const result= await axios.get(`/api/metadata`,{headers});
	return result.data;

}


export {
	getCurrentBudget, getBudget, createBudget, getAllBudgets, getMunicipalityDetails, save,getMetadata
};