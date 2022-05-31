import Spreadsheet from "react-spreadsheet";
import {useEffect, useState} from "react";
import axios from "axios";
import React from 'react';



const SampleBudget = () => {
	let row1 = [];
	let row2 = [];
	let row3 = [];
	let row4 = [];
	let row5 = [];
	let row6 = [];
	let row7 = [];
	let row8 = [];
	let row9 = [];
	let row10 = [];
	let row11 = [];
	let row12 = [];
	let row13 = [];
	let row14 = [];

	let finalData = [];

	const [data, loadData] = useState([]);
	useEffect(() => {
		const dataRes = async () => await axios
			.get("http://localhost:8080/budget")
			.then((res) => res.data)
			.then((data) => loadData(data));
		dataRes();
	}, []);
	if (data.budgetYear) {
console.log(data);
		for (let i = 0; i < data.headings.length; i++) {
			console.log('for==', data.openingBalance[i]);
			row2.push({'value': data.openingBalance[i]});
			row3.push({'value': data.npTax[i]});
			row4.push({'value': data.propTax[i]});
			row5.push({'value': data.fireTax[i]});
			row6.push({'value': data.cleanTax[i]});
			row7.push({'value': data.theaterTax[i]});
			row8.push({'value': data.penalty[i]});
			row9.push({'value': data.waterTax[i]});
			row10.push({'value': data.advTax[i]});
			row11.push({'value': data.wasteTax[i]});
			row12.push({'value': data.mailaTax[i]});
			row13.push({'value':data.treeTax[i]});
			row14.push({'value':data.totalA[i]});
		}

		finalData = [row2, row3, row4, row5, row6, row7, row8, row9, row10,row11,row12,row13,row14];



		console.log("finalData-->", finalData);


	}


	return <Spreadsheet
		// columnLabels={row1}
		data={finalData}
	/>;

}
export default SampleBudget;