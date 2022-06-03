import axios from "axios";
import React from 'react';


const Budget = () => {
	const baseURL = "http://localhost:8080/budget";
	const [data, setData] = React.useState(null);
	const [error, setError] = React.useState(null);
	React.useEffect(() => {
		axios.get(baseURL).then((response) => {
			setData(response.data);
		}).catch(error => {
			setError(error);
		});
	}, []);
return data;
}
export default Budget;