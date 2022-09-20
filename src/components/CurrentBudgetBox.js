import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";
import DropDown from "./DropDown";
import {useDispatch, useSelector} from "react-redux";
import {allBudgetSelector, fetchAllBudgets} from "../slices/allBudgetReducer";
import React, {useEffect, useState} from "react";
import _ from "lodash"
import {useNavigate} from "react-router-dom";
import {fetchMunicipalityDetails} from "../slices/municipalityReducer";
import ReportsDashboard from "../views/ReportsDashboard";

const styleSheets = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        boxSizing: "border-box",
        width: "100%",
        background: " #FFFFFF",
        border: "1px solid #DEDEDE",
        borderRadius: "3px",
        marginTop: "30px",
        gap: "2vw",
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingRight: "10px",
        fontSize: "15px",
        fontWeight: "400",
        fontFamily: "Lato",
    }, innerBox: {
        display: "flex",
        justifyContent: "flex-start'",
        gap: "0.5vw",
        color: "#212121",
        fontSize: "19px",
        marginLeft: "1%",
    }, text: {
        fontWeight: "700", fontSize: "19px"
    }, actionButtons: {
        display: "flex", justifyContent: "flex-end", fontSize: "11px", textTransform: "uppercase", color: "#616161",
    },

}))
const CurrentBudgetBox = ({year}) => {
    const {allBudget} = useSelector(allBudgetSelector);
    const dispatch = useDispatch();
    const classes = styleSheets();
    const [budgetYear, setBudgetYear] = useState(year);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllBudgets());
        dispatch(fetchMunicipalityDetails());
    }, [dispatch]);

    const getBudgetYears = (allBudgets) => {
        let budgetYears = [];
        _.forEach(allBudgets, budget => {
            budgetYears.push(budget.budgetYear);
        });
        return _.sortBy(budgetYears).reverse();
    };

    const handleChange = (event) => {
        setBudgetYear(event.target.value);
    };
    const goToBudget = () => {
        const year = budgetYear.substring(0, 4)
        navigate(`/budget/${year}`);
    };

    return (
        <>
            <Box className={classes.box}>
                <div className={classes.innerBox}>
                    <div className={classes.text}>
                        <DropDown list={getBudgetYears(allBudget)} value={budgetYear} onSelect={handleChange}/>
                    </div>
                </div>
                <div className={classes.actionButtons}>
                    <ActionButton label={"Open budget"} id={"addNewBudgetButton"} onClick={goToBudget}/>
                </div>
            </Box>
            <ReportsDashboard styleSheet={classes} allBudget={allBudget} budgetYear={budgetYear}/>
        </>
    );
};
export default CurrentBudgetBox;