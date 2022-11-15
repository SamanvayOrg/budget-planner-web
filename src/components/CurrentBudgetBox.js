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
import {t} from 'i18next';

const styleSheets = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        boxSizing: "border-box",
        width: "100%",
        background: " #FFFFFF",
        gap: "2vw",
        paddingTop: "10px",
        paddingBottom: "30px",
        fontSize: "15px",
        fontWeight: "400",
        fontFamily: "Lato",
    }, innerBox: {
        display: "flex",
        justifyContent: "flex-start'",
        color: "#212121",
        fontSize: "19px",
    }, text: {
        fontWeight: "700", fontSize: "19px"
    }, actionButtons: {
        display: "flex", justifyContent: "flex-end", fontSize: "11px", textTransform: "uppercase", color: "#616161",
    }, boxWithColumnDirection: {
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "100%",
        borderRadius: "3px",
        gap: "1vw",
        fontFamily: "Lato",
        justifyContent: "center",
        alignItems: "center",
    }

}))
const CurrentBudgetBox = ({year}) => {
    const {allBudgets} = useSelector(allBudgetSelector);
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
                        <DropDown list={getBudgetYears(allBudgets)} value={budgetYear} onSelect={handleChange}/>
                    </div>
                </div>
                <div className={classes.actionButtons}>
                    <ActionButton label={t("Open Budget")} variant={'contained'} onClick={goToBudget} size={"large"}/>
                </div>
            </Box>
            <ReportsDashboard styleSheet={classes} allBudgets={allBudgets} budgetYear={budgetYear}/>
        </>
    );
};
export default CurrentBudgetBox;
