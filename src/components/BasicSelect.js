import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";

const useStyles = makeStyles(theme => ({
	drop:{
		height:"48px",
	}
}))


const BasicSelect = ({onChange}) => {
	const classes = useStyles();

	const [budgetYear, setBudgetYear] = React.useState('');

	const handleChange = (event) => {
		setBudgetYear(event.target.value);
		onChange(event.target.value);
	};
	let nextYear = moment().add(1, 'years').year();
	let nextToNextYear = moment().add(2, 'years').year();
	let twoDigitYear = nextToNextYear.toString().substring(2);
	const currentBudgetYear = nextYear + '-' + twoDigitYear;
	const years = [{value: currentBudgetYear}];

	return (<Box sx={{minWidth: 100}}>
		<FormControl fullWidth>

			<Select className={classes.drop}
				value={budgetYear}
				// label="Year"
				onChange={handleChange}
			>

				{years?.map(option => {
					return (<MenuItem key={option.value} value={option.value}>
						{option.value}
					</MenuItem>);
				})}
			</Select>
		</FormControl>
		<ActionButton/>

	</Box>);

};
export default BasicSelect;