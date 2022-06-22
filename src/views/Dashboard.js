import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import UserName from "../components/UserName";
import EmptyBudgetBox from "../components/EmptyBudgetBox";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "./Home";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {budgetDashboardSelector, createNewBudget, fetchCurrentBudget} from "../slices/budgetDashboardReducer";
import {useNavigate} from "react-router-dom";
import CurrentBudgetBox from "../components/CurrentBudgetBox";
import Spinner from "../components/Spinner";
import {GetMunicipalityName} from "../domain/functions";

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

}))

const Dashboard = () => {
	const classes = useStyles();

	const {loading, currentBudget: {budgetYear}} = useSelector(budgetDashboardSelector)

	let navigate = useNavigate();

	const goToBudget = () => {
		const year = budgetYear.substring(0, 4)
		navigate(`/budget/${year}`);
	}
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentBudget());
	}, [dispatch]);


	const renderBox = () => {
		if (loading) {
			return <Spinner/>;
		}
		if (budgetYear) {
			return <CurrentBudgetBox onClick={goToBudget} year={budgetYear}/>;
		}
		return <EmptyBudgetBox addNewBudget={(year) => dispatch(createNewBudget(year))}/>;
	}

	return (
		<div>
			<ResponsiveAppBar/>
			<Container maxWidth="xl">
				<div className={classes.mainContainer}>
					<div className={classes.leftUserNameText}>
						HELLO <UserName/>
					</div>
					<div><span className={classes.welcomeText}>Welcome to </span>
						<span
							className={classes.mmbsName}><GetMunicipalityName/> Budgeting system</span>
					</div>
					{renderBox()}
				</div>
			</Container>
		</div>
	)
};
// export default Dashboard;
export default withAuthenticationRequired(Dashboard, {
	onRedirecting: () => <Home/>,
});
