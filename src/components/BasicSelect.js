import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = () => {

	const [budgetYear, setbudgetYear] = React.useState('');
	console.log("budgetYear-->", budgetYear);

	const handleChange = (event) => {
		setbudgetYear(event.target.value);
	};
	const currentBudgetYear= new Date().getFullYear() ;
	const years = [
		{value: currentBudgetYear},
		{value: 'js'},
		{value: 'ts'}
	];

	return (<Box sx={{minWidth: 120}}>
		<FormControl fullWidth>

			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={budgetYear}
				// label="Year"
				onChange={handleChange}
			>

				{years?.map(option => {
					return (
						<MenuItem key={option.value} value={option.value}>
							{option.value}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	</Box>);

};
export default BasicSelect;