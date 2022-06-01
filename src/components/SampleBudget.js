import Spreadsheet from "react-spreadsheet";
import {useEffect, useState} from "react";
import axios from "axios";
import React from 'react';
import SampleData from "../assets/SampleData";
import {useAuth0} from "@auth0/auth0-react";


const SampleBudget = () => {
	const {getAccessTokenSilently} = useAuth0();

	const printAccessToken = async () => {
		let token = await getAccessTokenSilently();
		return token;

	}
	const [data, loadData] = useState([]);

	useEffect(() => {
		const dataRes = async () => {
			const token = await printAccessToken();
			axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
			axios
				.get("/budget?year=2022")
				.then((res) => res.data)
				.then((data) => loadData(data));
		}
		dataRes();
	}, []);
	console.log('data--->', data);
	console.log('data.budgetLine--->', data.budgetLines)


	// if (data.budgetLines) {
	// 	data.budgetLines.forEach(showLines())
	//
	// 	function showLines(line) {
	// 		console.log("line--->", line)
	// 	}}





	return <Spreadsheet
		// columnLabels={row1}
		data={SampleData}
	/>;

}
export default SampleBudget;