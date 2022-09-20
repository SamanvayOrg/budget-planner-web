import DataTable from "../components/DataTable";
import {budgetSummaryData} from "../domain/budgetSummaryMapper";
import {Paper} from "@mui/material";
import ResponsivePieChart from "../components/ResponsivePieChart";
import PerPersonExpenditure from "../components/PerPersonExpenditure";
import ResponsiveBarGraph from "../components/ResponsiveBarGraph";
import PerPersonRevenue from "../components/PerPersonRevenue";
import React from "react";

const ReportsDashboard = ({styleSheet,allBudget,budgetYear}) => {
    const classes =styleSheet;
    return (
        <div>

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
        </div>
    );
}
export default ReportsDashboard;