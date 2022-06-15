import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {makeStyles} from "@mui/styles";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "./Home";
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {budgetSelector, fetchBudget} from "../slices/budgetReducer";
import Spreadsheet from "react-spreadsheet";
import {headers} from "../domain/budgetMapper";
import _ from "lodash";
import {updateFromView} from '../domain/updateFromView';
import {getView} from '../domain';

const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        paddingTop: "70px",
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

const BudgetDetail = () => {
    const classes = useStyles();

    const {budgetView = [], budget} = useSelector(budgetSelector);

    const [view, setView] = useState([]);

    const updateView = (state) => {
        const newBudget = updateFromView(state, budget);
        const newState = getView(newBudget);
        setView(newState);
    }

    useEffect(() => {
        if (budgetView.length > 0) {
            setView(budgetView);
        }
    }, [budgetView]);

    let {year} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBudget(year));
    }, [dispatch, year]);

    return (
        <>
            <ResponsiveAppBar/>
            <div className={classes.mainContainer}>
                <Spreadsheet data={view} columnLabels={headers(budget)}
                             onChange={updateView}
                />
            </div>
        </>
    )
};

export default withAuthenticationRequired(BudgetDetail, {
    onRedirecting: () => <Home/>,
});
