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

const getMetadata = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/metadata`, {headers});
	return result.data;

}
const getTranslations = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/translations`, {headers});
	return result.data;
}

const getUsers = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/users`, {headers});
	return result.data;
}

const updateUser = async (token, data) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.put(`/api/user/${data.id}`, data, {headers})
	return result.status === 200;
}

const getCurrentUser = async (token, data)=>{
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/user`,{headers})
	return result.data;
}

const getCityClasses = async (token) => {
    const headers = {'Authorization': `Bearer ${token}`};
    const result = await axios.get(`/api/cityclasses`, {headers});
    return result.data;
}


const updateMunicipality = async (token, data) => {
    const headers = {'Authorization': `Bearer ${token}`};
    const result = await axios.put(`/api/municipality/${data.id}`, data, {headers})
    return result.status === 200;
}

const createUser = async (token, data) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.post(`/api/user`, data, {headers})
	return result.status === 200;
}

const getAllMunicipalities = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/allMunicipalities`,{headers})
	return result.data;
}
const createMunicipality = async (token, data) => {
    const headers = {'Authorization': `Bearer ${token}`};
    const result = await axios.post(`api/municipality`, data, {headers});
    return result.status === 200;
}
const getAdminUsers = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`api/municipality/admins`, {headers});
	return result.data;
}

const createAdminFromSuperUser = async (token, municipalityId, data) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.post(`api/municipality/${municipalityId}/adminUser`, data, {headers});
	return result.status === 200;
}

const addTranslations = async (token, data) => {
	console.log(' in api',data)

	const headers = {'Authorization': `Bearer ${token}`};
    const result = await axios.post('/api/translation', data, {headers});
    return result.status === 200;
}

export {
	getCurrentBudget, getBudget, createBudget, getAllBudgets, getMunicipalityDetails, save, getMetadata,
	getTranslations, getUsers, updateUser, getCurrentUser, getCityClasses, updateMunicipality, createUser,
	getAllMunicipalities, createMunicipality, getAdminUsers, createAdminFromSuperUser, addTranslations
};