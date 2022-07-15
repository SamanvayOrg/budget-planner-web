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
import {MunicipalityName} from "../domain/functions";
import HorizontalLine from "../components/HorizontalLine";
import {Breadcrumbs} from "@mui/material";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(theme => ({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "start",
		paddingTop: "64px",
		fontFamily: "Lato",
		fontStyle: "normal",
		color: "#616161",
		fontWeight: "700",
		marginTop: "25px",

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

	}, title: {
		fontSize: "20px",
		marginBottom: "10px",
		color: "#212121",
		marginLeft: "5px",
		paddingTop: "10px"
	}, link: {
		cursor: "pointer",
		color: "inherit",
		fontSize: "11px"
	}

}));


const AllBudgets = () => {
	const dispatch = useDispatch();
	const {allBudget} = useSelector(allBudgetSelector);
	let navigate = useNavigate();
	const {t}=useTranslation();


	useEffect(() => {
		dispatch(fetchAllBudgets());
	}, [dispatch]);

	function renderBox(allBudget) {
		let budgetBox = [];
		_.forEach(allBudget, (budget,index) => {
			const goToBudget = () => {
				let year = budget.budgetYear.substring(0, 4)
				navigate(`/budget/${year}`);
			}
			budgetBox.push(<BudgetBox action={goToBudget} index={index}
			                          versionName={t("Budget for year") + '-' + t(budget.budgetYear)}
			                          lastUpdated={"last updated 24 hours ago"}/>
			)
		})
		return _.reverse(budgetBox)
	};


	const classes = useStyles();
	return (
		<div>
			<ResponsiveAppBar/>
			<div className={classes.mainContainer}>
				<Breadcrumbs aria-label="breadcrumb" style={{fontSize: "11px", marginLeft: "5px"}}>
					<span className={classes.link} onClick={() => navigate('/dashboard')}>DASHBOARD</span>
					<span>ALL BUDGETS</span>
				</Breadcrumbs>
				<div className={classes.title}>
					<MunicipalityName/>
				</div>
				<HorizontalLine/>
				<Container maxWidth="xl">
					{renderBox(allBudget)}
				</Container>

			</div>

		</div>
	)

}
export default withAuthenticationRequired(AllBudgets, {
	onRedirecting: () => <Home/>,
});