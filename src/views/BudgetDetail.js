import ResponsiveAppBar from '../components/ResponsiveAppBar';
import {makeStyles} from '@mui/styles';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import Home from './Home';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {budgetSelector, fetchBudget, updateBudget} from '../slices/budgetReducer';
import Spreadsheet from 'react-spreadsheet';
import {headers} from '../domain/budgetMapper';

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

    let {year} = useParams();

    const dispatch = useDispatch();

    const updateView = (state) => {
        dispatch(updateBudget(state));
    }

    useEffect(() => {
        dispatch(fetchBudget(year));
    }, [dispatch, year]);

    return (
        <>
            <ResponsiveAppBar/>
            <div className={classes.mainContainer}>
                <Spreadsheet data={budgetView} columnLabels={headers(budget)}
                             onChange={updateView}
                />
            </div>
        </>
    )
};

export default withAuthenticationRequired(BudgetDetail, {
    onRedirecting: () => <Home/>,
});
