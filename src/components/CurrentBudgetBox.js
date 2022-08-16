import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";
import DropDown from "./DropDown";
import {useDispatch, useSelector} from "react-redux";
import {allBudgetSelector, fetchAllBudgets} from "../slices/allBudgetReducer";
import React, {useEffect, useState} from "react";
import _ from "lodash"
import {useNavigate} from "react-router-dom";
import DataTable from "./DataTable";
import {budgetSummaryData} from "../domain/budgetSummaryMapper";
import {Paper} from "@mui/material";
import {fetchMunicipalityDetails} from "../slices/municipalityReducer";
import ResponsiveBarGraph from "./ResponsiveBarGraph";
import ResponsivePieChart from "./ResponsivePieChart";
import PerPersonExpenditure from "./PerPersonExpenditure";
import PerPersonRevenue from "./PerPersonRevenue";

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


    return (<><Box className={classes.box}>
            <div className={classes.innerBox}>
                <div className={classes.text}>
                    <DropDown list={getBudgetYears(allBudget)} value={budgetYear} onSelect={handleChange}/>
                </div>
            </div>
            <div className={classes.actionButtons}>
                <ActionButton label={"Open budget"} id={"addNewBudgetButton"} onClick={goToBudget}/>
            </div>

        </Box>
            <div className={classes.box}>
                <DataTable headings={budgetSummaryData(allBudget, budgetYear).headings}
                           rows={budgetSummaryData(allBudget, budgetYear).data}
                           title={`Budget Summary FY ${budgetYear} (in lakhs)`}/>
                <Paper style={{
                    height: 400, width: '70%', paddingBottom: 20, paddingTop: 15, color: '#616161'
                }}><ResponsivePieChart
                    data={budgetSummaryData(allBudget, budgetYear).pieChartData}
                    title={`Key Budget Highlights FY ${budgetYear} (in lakhs)`}
                /></Paper>
                <Paper style={{
                    height: 400,
                    width: '40%',
                    paddingBottom: 20,
                    paddingTop: 15,
                    color: '#616161',
                    paddingRight: 5,
                    paddingLeft: 5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around"

                }}>
                    <PerPersonExpenditure allBudget={allBudget} budgetYear={budgetYear}
                                          municipalityPopulation={budgetSummaryData(allBudget, budgetYear).population}/>
                </Paper>
            </div>
            <div className={classes.box}>
                <Paper style={{
                    height: 400, width: '50%'
                }}><ResponsiveBarGraph data={budgetSummaryData(allBudget, budgetYear).barGraphData} indexBy={"name"}
                                       keys={['Revenue Income', 'Revenue Expenditure']}/>
                </Paper>
                <Paper style={{
                    height: 400,
                    width: '40%',
                    color: '#616161',
                    paddingRight: 5,
                    paddingLeft: 5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around"

                }}>
                    <PerPersonRevenue allBudget={allBudget} budgetYear={budgetYear}
                                      municipalityPopulation={budgetSummaryData(allBudget, budgetYear).population}/>
                </Paper>
            </div>

        </>

    );
};
export default CurrentBudgetBox;