import Typography from "@mui/material/Typography";
import * as React from "react";

const HeaderText = () => {
	return (<Typography
		variant="h6"
		noWrap
		component="a"
		href="/"
		sx={{
			mr: 2,
			display: {xs: 'none', md: 'flex'},
			fontFamily: '',
			fontWeight: 700,
			color: 'inherit',
			textDecoration: 'none',
		}}
	>
		City Budgets
	</Typography>)
		;
}
export default HeaderText;