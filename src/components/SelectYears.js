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


// The financial year whose budget is currently being PREPARED — the FY after the one we
// are in, because a ULB draws up next year's budget during the current one. Must stay in
// step with the server's Year#currentYearFor; the server re-validates on submit and is the
// source of truth, so a mismatch surfaces as a clear error rather than a wrong budget.
// (moment().month() is 0-indexed, hence the +1 to compare against calendar months.)
const getCurrentFinancialYearStart = (now = moment()) => {
	return now.month() + 1 <= 3 ? now.year() : now.year() + 1;
};

const getTwoDigitYear = (year) => year.toString().substring(2);
const getYearString = (year) => year + '-' + getTwoDigitYear(year + 1);

// New budgets can only be created for the current financial year — there is exactly one
// valid choice, so this no longer needs to be a picker, just a confirmation of what will
// be created.
const SelectYears = ({onChange = () => {}}) => {
	const classes = useStyles();
	const currentFinancialYear = getYearString(getCurrentFinancialYearStart());

	// Reports the year once per mount. The modal that renders this unmounts its children
	// on close (MUI Modal defaults to keepMounted={false}), so "once per mount" is also
	// "once per time the dialog is opened" — which is what the parent needs.
	// Deps must stay empty: both callers pass a fresh inline arrow every render, so adding
	// onChange here would re-fire the effect on every render.
	React.useEffect(() => {
		onChange(currentFinancialYear);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (<Box sx={{minWidth: 100}}>
		<FormControl fullWidth>
			<Select className={classes.drop} value={currentFinancialYear} disabled>
				<MenuItem value={currentFinancialYear}>{currentFinancialYear}</MenuItem>
			</Select>
		</FormControl>
		<ActionButton/>

	</Box>);

};
export default SelectYears;
export {useStyles, getCurrentFinancialYearStart, getYearString};