import axios from "axios";

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

const createBudget = async (token, year) => {
	const headers = {'Authorization': `Bearer ${token}`};
	await axios.post(`/api/budget?year=${year}`,
		null,
		{headers});
}

export {
	getCurrentBudget,
	getBudget,
	createBudget,
};