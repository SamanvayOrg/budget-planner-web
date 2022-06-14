import ResponsiveAppBar from "../components/ResponsiveAppBar";
import React from 'react';
import BudgetBox from "../components/BudgetBox";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "./Home";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {allBudgetSelector, fetchAllBudgets} from "../slices/allBudgetReducer";
import {useEffect} from "react";
import _ from "lodash";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(theme => ({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "start",
		paddingTop: "64px",

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


const AllBudgets = () => {
	const dispatch = useDispatch();
	const {allBudget} = useSelector(allBudgetSelector);
	let navigate = useNavigate();


	useEffect(() => {
		dispatch(fetchAllBudgets());
	}, [dispatch]);

	console.log('budget-->', allBudget);


	function renderBox(allBudget) {
		let budgetBox = [];
		_.forEach(allBudget, (budget) => {
			const goToBudget = () => {
				let year = budget.budgetYear.substring(0, 4)
				navigate(`/budget/${year}`);
			}
			budgetBox.push(<BudgetBox action={goToBudget} keys={budget.budgetYear}
			                          versionName={"Budget for year " + budget.budgetYear}
			                          lastUpdated={"last updated 24 hours ago"}/>
			)
		})
		return _.reverse(budgetBox)
	};


	const classes = useStyles();
	return (
		<div>
			<ResponsiveAppBar/>
			<Container maxWidth="xl">
				<div className={classes.mainContainer}>
					{renderBox(allBudget)}
				</div>
			</Container>

		</div>
	)

}
export default withAuthenticationRequired(AllBudgets, {
	onRedirecting: () => <Home/>,
});