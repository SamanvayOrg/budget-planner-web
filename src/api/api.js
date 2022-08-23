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
	const result = await axios.post(`/api/user`, data, {headers}).catch(function (error) {
		return error.response
	});
	return result.status;
}

const getAllMunicipalities = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/allMunicipalities`,{headers})
	return result.data;
}
const createMunicipality = async (token, data) => {
    const headers = {'Authorization': `Bearer ${token}`};
    const result = await axios.post(`api/municipality`, data, {headers}).catch(function (error) {
		return error.response
	});
	return result.status;
}
const getAdminUsers = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`api/municipality/admins`, {headers});
	return result.data;
}

const createAdminFromSuperUser = async (token, municipalityId, data) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.post(`api/municipality/${municipalityId}/adminUser`, data, {headers})
		.catch(function (error) {
			return error.response
		});
	return result.status;
}

/** API Used to do the translation */
const getTranslations = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/translations`, {headers});
	return result.data;
}

const addTranslations = async (token, data) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.post('/api/translation', data, {headers}).catch(function (error) {
		return error.response
	});
	return result;
}

const modifyTranslations = async (token, data) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const url = '/api/translation/'+data.id;
	const result = await axios.put(url, data, {headers}).catch(function (error) {
		return error.response
	});
	return result;
}

/** API used to list out Translations for Admin User View / Update */
const getAllTranslationsData = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/translation/all`, {headers});
	return result.data;
}

const getStateDetails = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get(`/api/state`, {headers});
	return result.data;
}

const updateBudgetProperties = async (token, data, id) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.put(`/api/budget/${id}/properties`, data,{headers});
	return result.data;
}

const deleteTranslation = async (token, id) => {
    const headers = {'Authorization': `Bearer ${token}`};
    const result = await axios.delete(`/api/translation/${id}`, {headers});
    return result.status;
}
const changeBudgetStatus = async (token, id, status) => {
	console.log(id, status)
    const headers = {'Authorization': `Bearer ${token}`};
    const result = await axios.put(`/api/budget/${id}/status?budgetStatus=${status}`,null,{headers});
    return result.status;
}

export {
	getCurrentBudget, getBudget, createBudget, getAllBudgets, getMunicipalityDetails, save, getMetadata,
	getTranslations, getUsers, updateUser, getCurrentUser, getCityClasses, updateMunicipality, createUser,
	getAllMunicipalities, createMunicipality, getAdminUsers, createAdminFromSuperUser, addTranslations,
	modifyTranslations, getAllTranslationsData, getStateDetails, updateBudgetProperties, deleteTranslation,
	changeBudgetStatus
};