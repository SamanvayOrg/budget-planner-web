import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import EmptyBudgetBox from "../components/EmptyBudgetBox";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "./Home";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    budgetDashboardSelector,
    createNewBudget,
    fetchCurrentBudget,
    fetchLatestBudget
} from "../slices/budgetDashboardReducer";
import CurrentBudgetBox from "../components/CurrentBudgetBox";
import Spinner from "../components/Spinner";
import {MunicipalityName} from "../domain/functions";
import {fetchTranslations} from "../slices/translationsReducer";
import {useTranslation} from "react-i18next";
import {currentUserSelector, fetchCurrentUser} from "../slices/currentUserReducer";
import {authSelector} from "../slices/authReducer";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import {allBudgetSelector, fetchAllBudgets} from "../slices/allBudgetReducer";


const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        paddingTop: "64px",
        paddingLeft: "0%",
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
        fontWeight: "400", fontSize: "21px", lineHeight: "64px"
    }, mmbsName: {
        fontStyle: "italic", fontSize: "21px", lineHeight: "25px", color: "black",
    }

}))

const Dashboard = () => {
    const classes = useStyles();
    const {loading, currentBudget: {budgetYear}, latestBudget} = useSelector(budgetDashboardSelector);
    const {user} = useSelector(currentUserSelector);
    const {tokenData} = useSelector(authSelector);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {allBudgets} = useSelector(allBudgetSelector);


    useEffect(() => {
        dispatch(fetchCurrentBudget());
        dispatch(fetchLatestBudget())
        dispatch(fetchTranslations());
        dispatch(fetchCurrentUser());
        dispatch(fetchAllBudgets());
        if (tokenData && _.includes(tokenData.permissions, 'superAdmin')) {
            navigate('/superAdmin')
        }
    }, [dispatch, navigate, tokenData]);

    const getCurrentUserName = () => {
        if (user) return user.name
    }

    const renderBox = () => {
        const getLatestBudgetYear = () => {
            if (budgetYear) {
                return budgetYear
            }
            return latestBudget.budgetYear;
        }
        if (loading) {
            return <Spinner/>;
        }
        if (budgetYear || !_.isEmpty(latestBudget)) {
            return <CurrentBudgetBox year={getLatestBudgetYear} currentBudgetYear={budgetYear}/>;
        }
        return <EmptyBudgetBox addNewBudget={(year) => dispatch(createNewBudget(year))} allBudgets={allBudgets}/>;
    }

    return (
        <div>
            <ResponsiveAppBar/>
            <Container maxWidth="xl">
                <div className={classes.mainContainer}>
                    <div className={classes.leftUserNameText}>
                        {t('HELLO')} {getCurrentUserName()}
                    </div>
                    <div><span className={classes.welcomeText}>Welcome to </span>
                        <span
                            className={classes.mmbsName}><MunicipalityName/> Budgeting system</span>
                    </div>
                    {renderBox()}
                </div>
            </Container>
        </div>
    )
};
export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <Home/>,
});
