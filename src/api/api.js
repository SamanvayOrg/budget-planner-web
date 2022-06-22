import axios from "axios";

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

// const getBudget = (token, year) => budgetStub;


const getAllBudgets = async (token, year) => {
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

const save = async(token, budget) => {
	const headers = {'Authorization': `Bearer ${token}`};
	await axios.post(`/api/budget/actuals`, budget, {headers});
	await axios.post(`/api/budget/estimates`, budget, {headers});
	await axios.post(`/api/budget/budgeted`, budget, {headers});
}

export {
	getCurrentBudget, getBudget, createBudget, getAllBudgets, getMunicipalityDetails, save
};