import DataTable from "../components/DataTable";
import {
    budgetSummaryData,
    getRevenueIncomeSummaryData,
    revenueIncomeAndExpenditureSummaryData
} from "../domain/budgetSummaryMapper";
import {Paper} from "@mui/material";
import ResponsivePieChart from "../components/ResponsivePieChart";
import PerPersonExpenditure from "../components/PerPersonExpenditure";
import ResponsiveBarGraph from "../components/ResponsiveBarGraph";
import PerPersonRevenue from "../components/PerPersonRevenue";
import React from "react";
import {useTranslation} from "react-i18next";
import SectorialDistributionDashboardReport from "../components/SectorialDistributionDashboardReport";

const ReportsDashboard = ({styleSheet, allBudget, budgetYear}) => {
    const classes = styleSheet;
    const {t} = useTranslation();
    return (
        <div>

            <div className={classes.box}>
                <DataTable headings={budgetSummaryData(allBudget, budgetYear).budgetSummaryTableHeadings}
                           rows={budgetSummaryData(allBudget, budgetYear).budgetSummaryTableData}
                           title={t(`Budget Summary FY ${budgetYear} (in lakhs)`)}/>
                <Paper style={{
                    height: 440, width: '70%', paddingBottom: 20, paddingTop: 15, color: '#616161'
                }}><ResponsivePieChart
                    data={budgetSummaryData(allBudget, budgetYear).pieChartData}
                    title={t(`Key Budget Highlights FY ${budgetYear} (in lakhs)`)}
                /></Paper>
                <Paper style={{
                    height: 440,
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
                    height: 400, width: '100%'
                }}>
                    <Paper style={{
                        height: 400, width: '100%'
                    }}>
                        <ResponsiveBarGraph data={budgetSummaryData(allBudget, budgetYear).barGraphData}
                                            indexBy={"name"}
                                            keys={['Revenue Income', 'Revenue Expenditure']}/>
                    </Paper>
                    <Paper style={{
                        height: 230,
                        width: '100%',
                        color: '#616161',
                        paddingRight: 5,
                        paddingLeft: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        marginTop: 10
                    }}>
                        <PerPersonRevenue allBudget={allBudget} budgetYear={budgetYear}
                                          municipalityPopulation={budgetSummaryData(allBudget, budgetYear).population}/>
                    </Paper>
                </Paper>
                <DataTable
                    rows={revenueIncomeAndExpenditureSummaryData(allBudget, budgetYear).data}
                    title={t(`Revenue Income And Expenditure Summary FY ${budgetYear} (in lakhs)`)}/>
            </div>
            <div className={classes.box}>
                <Paper style={{
                    height: 440, width: '70%', paddingBottom: 20, paddingTop: 15, color: '#616161'
                }}><ResponsivePieChart
                    data={getRevenueIncomeSummaryData(allBudget, budgetYear).pieChartData}
                    title={t(`Revenue Income Summary FY ${budgetYear} (in lakhs)`)}
                /></Paper>
                <DataTable
                    headings={getRevenueIncomeSummaryData(allBudget, budgetYear).headers}
                    rows={getRevenueIncomeSummaryData(allBudget, budgetYear).data}
                    title={t(`Revenue Income Summary FY ${budgetYear} (in lakhs)`)}/>
            </div>
            <div className={classes.boxWithColumnDirection} style={{background: " #079CA3"}}>
                <span style={{
                    fontSize: 20,
                    paddingTop: 5,
                    color: "whitesmoke"
                }}>{t(`Revenue Expenditure Sectoral Distribution FY ${budgetYear}`)}</span>
                <div className={classes.box} style={{width: "100%"}}>
                    <SectorialDistributionDashboardReport budgets={allBudget} year={budgetYear}/>
                </div>
            </div>
        </div>
    );
}
export default ReportsDashboard;