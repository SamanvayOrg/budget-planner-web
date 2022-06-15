import axios from "axios";

const getCurrentBudget = async (token) => {
	const headers = {'Authorization': `Bearer ${token}`};
	const result = await axios.get("/api/budget/current", {
		headers
	});
	return result.data;
}


const budgetStub = {
	"budgetYear": "2023-24",
	"budgetLines": [{
		"id": 1,
		"code": "910-1110",
		"name": "All",
		"budgetedAmount": null,
		"currentYear8MonthsActuals": null,
		"currentYear4MonthsProbables": null,
		"previousYearActuals": null,
		"yearMinus1Actuals": 2021,
		"yearMinus2Actuals": 200,
		"yearMinus3Actuals": 200,
		"displayOrder": 1.00,
		"majorHeadGroup": "Revenue Receipt",
		"majorHeadGroupDisplayOrder": 1.00,
		"majorHead": "Property Tax",
		"minorHead": "Consolidated Tax on Property"
	}, {
		"id": 2,
		"code": "910-1111",
		"name": "Residential Property",
		"budgetedAmount": null,
		"currentYear8MonthsActuals": null,
		"currentYear4MonthsProbables": null,
		"previousYearActuals": null,
		"yearMinus1Actuals": 100,
		"yearMinus2Actuals": 200,
		"yearMinus3Actuals": 200,
		"displayOrder": 2.00,
		"majorHeadGroup": "Revenue Receipt",
		"majorHeadGroupDisplayOrder": 1.00,
		"majorHead": "Property Tax",
		"minorHead": "Consolidated Tax on Property"
	}, {
		"id": 3,
		"code": "920-1120",
		"name": "All",
		"budgetedAmount": 10,
		"currentYear8MonthsActuals": null,
		"currentYear4MonthsProbables": null,
		"previousYearActuals": null,
		"yearMinus1Actuals": 100,
		"yearMinus2Actuals": 200,
		"yearMinus3Actuals": 200,
		"displayOrder": 3.00,
		"majorHeadGroup": "Revenue Receipt",
		"majorHeadGroupDisplayOrder": 1.00,
		"majorHead": "Property Tax",
		"minorHead": "Advertisement Tax"
	}, {
		"id": 4,
		"code": "920-1121",
		"name": "Hoarding on Public Lands",
		"budgetedAmount": null,
		"currentYear8MonthsActuals": null,
		"currentYear4MonthsProbables": null,
		"previousYearActuals": null,
		"yearMinus1Actuals": 100,
		"yearMinus2Actuals": 200,
		"yearMinus3Actuals": 200,
		"displayOrder": 4.00,
		"majorHeadGroup": "Revenue Receipt",
		"majorHeadGroupDisplayOrder": 1.00,
		"majorHead": "Property Tax",
		"minorHead": "Advertisement Tax"
	}, {
		"id": 5,
		"code": "310-2510",
		"name": "All",
		"budgetedAmount": null,
		"currentYear8MonthsActuals": null,
		"currentYear4MonthsProbables": null,
		"previousYearActuals": null,
		"yearMinus1Actuals": 100,
		"yearMinus2Actuals": 200,
		"yearMinus3Actuals": 200,
		"displayOrder": 5.00,
		"majorHeadGroup": "Expenses",
		"majorHeadGroupDisplayOrder": 2.00,
		"majorHead": "Purchases for Operations and Programme implementation",
		"minorHead": "Purchase of Water for Supply"
	}, {
		"id": 6,
		"code": "314-2520",
		"name": "All",
		"budgetedAmount": null,
		"currentYear8MonthsActuals": null,
		"currentYear4MonthsProbables": null,
		"previousYearActuals": null,
		"yearMinus1Actuals": 100,
		"yearMinus2Actuals": 200,
		"yearMinus3Actuals": 200,
		"displayOrder": 6.00,
		"majorHeadGroup": "Expenses",
		"majorHeadGroupDisplayOrder": 2.00,
		"majorHead": "Purchases for Operations and Programme implementation",
		"minorHead": "Purchase of Consumables"
	}, {
		"id": 7,
		"code": "210-3221",
		"name": "Road Grants",
		"budgetedAmount": null,
		"currentYear8MonthsActuals": null,
		"currentYear4MonthsProbables": null,
		"previousYearActuals": null,
		"yearMinus1Actuals": 100,
		"yearMinus2Actuals": 200,
		"yearMinus3Actuals": 200,
		"displayOrder": 7.00,
		"majorHeadGroup": "Liability",
		"majorHeadGroupDisplayOrder": 3.00,
		"majorHead": "Grants, Contributions for Specific Purpose (Earmarked Funds)",
		"minorHead": "Government of Maharashtra (Urban Develonment Department)"
	}, {
		"id": 8,
		"code": "315-4234",
		"name": "Roads & Foot Paths \\Vater Supply System",
		"budgetedAmount": null,
		"currentYear8MonthsActuals": null,
		"currentYear4MonthsProbables": null,
		"previousYearActuals": null,
		"yearMinus1Actuals": 100,
		"yearMinus2Actuals": 200,
		"yearMinus3Actuals": 200,
		"displayOrder": 8.00,
		"majorHeadGroup": "Assets",
		"majorHeadGroupDisplayOrder": 4.00,
		"majorHead": "Accumulated Depreciation",
		"minorHead": "Other Fixed Assets"
	}, {
		"id": 9,
		"code": "740-3230",
		"name": "All",
		"budgetedAmount": 200,
		"currentYear8MonthsActuals": null,
		"currentYear4MonthsProbables": null,
		"previousYearActuals": null,
		"yearMinus1Actuals": 100,
		"yearMinus2Actuals": 200,
		"yearMinus3Actuals": 200,
		"displayOrder": 9.00,
		"majorHeadGroup": "Liability",
		"majorHeadGroupDisplayOrder": 3.00,
		"majorHead": "Grants, Contributions for Specific Purpose (Earmarked Funds)",
		"minorHead": "Government of Maharashtra (Other Diaa(tagnsive mats)"
	}]
};


// const getBudget = async (token, year) => {
// 	const headers = {'Authorization': `Bearer ${token}`};
// 	const result = await axios.get(`/api/budget?year=${year}`, {
// 		headers
// 	});
// 	return result.data;
// }

const getBudget = (token, year) => budgetStub;



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

export {
	getCurrentBudget, getBudget, createBudget, getAllBudgets
};