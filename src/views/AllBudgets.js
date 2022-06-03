import ResponsiveAppBar from "../components/ResponsiveAppBar";
import React from 'react';
import BudgetBox from "../components/BudgetBox";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "./Home";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";

const useStyles = makeStyles(theme => ({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "start",
		paddingTop: "6%",
		paddingLeft: "1%",
		fontFamily: "Lato",
		fontStyle: "normal",
		color: "#616161",
		fontWeight: "700",

	}, leftUserNameText: {
		display: "flex",
		flexDirection: "row",
		fontSize: "11px",
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		marginBottom: "1%"
	}, welcomeText: {
		fontWeight: "400", fontSize: "21px", lineHeight: "25px",
	}, mmbsName: {
		fontStyle: "italic", fontSize: "21px", lineHeight: "25px", color: "black",

	}

}));



const AllBudgets = ({setCurrentBudget}) => {
	setCurrentBudget();

	const classes = useStyles();
	return (
		<div>
			<ResponsiveAppBar/>
			<Container maxWidth="xl">
				<div className={classes.mainContainer}>
					<BudgetBox versionName={"Version 1.0.2"} lastUpdated={"last updated 24 hours ago"}/>
				</div>
			</Container>

		</div>
	)

}
export default withAuthenticationRequired(AllBudgets, {
	onRedirecting: () => <Home/>,
});