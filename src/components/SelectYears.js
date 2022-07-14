import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";

const useStyles = makeStyles(theme => ({
	drop: {
		height: "48px",
	}
}))


const SelectYears = ({onChange}) => {
	const classes = useStyles();

	const [budgetYear, setBudgetYear] = React.useState('');

	const handleChange = (event) => {
		setBudgetYear(event.target.value);
		onChange(event.target.value);
	};
	const getYears = () => {
		let currentYear = moment().year();
		let nextYear = moment().add(1, 'year').year();
		let nextToNextYear = moment().add(2, 'year').year();
		let yearMinus1 = moment().subtract(1, 'year').year();
		let yearMinus2 = moment().subtract(2, 'year').year();
		let yearMinus3 = moment().subtract(3, 'year').year();
		let yearMinus4 = moment().subtract(4, 'year').year();
		let yearMinus5 = moment().subtract(5, 'year').year();

		const getTowDigitYear = (year) => {
			return year.toString().substring(2);
		}
		const getYearString = (year, nextYear) => {
			return year + '-' + getTowDigitYear(nextYear);

		}

		return (
			[
				{value: getYearString(nextYear, nextToNextYear)},
				{value: getYearString(currentYear, nextYear)},
				{value: getYearString(yearMinus1, currentYear)},
				{value: getYearString(yearMinus2, yearMinus1)},
				{value: getYearString(yearMinus3, yearMinus2)},
				{value: getYearString(yearMinus4, yearMinus3)},
				{value: getYearString(yearMinus5, yearMinus4)},
			]
		)

	}


	return (<Box sx={{minWidth: 100}}>
		<FormControl fullWidth>

			<Select className={classes.drop}
			        value={budgetYear}
			        onChange={handleChange}
			>

				{getYears()?.map(option => {
					return (<MenuItem key={option.value} value={option.value}>
						{option.value}
					</MenuItem>);
				})}
			</Select>
		</FormControl>
		<ActionButton/>

	</Box>);

};
export default SelectYears;
export {useStyles};