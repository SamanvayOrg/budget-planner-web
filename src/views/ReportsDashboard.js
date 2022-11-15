import DataTable from '../components/DataTable';
import {
    budgetSummaryData,
    capitalBudgetSummaryData,
    getRevenueIncomeSummaryData,
    revenueIncomeAndExpenditureSummaryData
} from '../domain/budgetSummaryMapper';
import {Paper} from '@mui/material';
import ResponsivePieChart from '../components/ResponsivePieChart';
import PerPersonExpenditure from '../components/PerPersonExpenditure';
import ResponsiveBarGraph from '../components/ResponsiveBarGraph';
import PerPersonRevenue from '../components/PerPersonRevenue';
import React from 'react';
import {useTranslation} from 'react-i18next';
import SectorialDistributionDashboardReport from '../components/SectorialDistributionDashboardReport';
import Box from '@mui/material/Box';
import FullWidthHeading from '../components/FullWidthHeading';

const ReportsDashboard = ({styleSheet, allBudget, budgetYear}) => {
    const classes = styleSheet;
    const {t} = useTranslation();
    return (
        <Box>
            <FullWidthHeading label={'Summary'}/>
            <Box className={classes.box}>
                <Box style={{width: '40%'}}>
                    <DataTable headings={budgetSummaryData(allBudget, budgetYear).budgetSummaryTableHeadings}
                               style={{background: 'red'}}
                               highlight={true}
                               rows={budgetSummaryData(allBudget, budgetYear).budgetSummaryTableData}
                               title={t('budgetSummaryHeading', {budgetYear})}/>
                </Box>
                <Paper style={{
                    height: 440, width: '30%', paddingBottom: 20, paddingTop: 15
                }}><ResponsivePieChart
                    data={budgetSummaryData(allBudget, budgetYear).pieChartData}
                    title={t('keyBudgetHighlights', {budgetYear})}
                /></Paper>
                <Paper style={{
                    height: 440,
                    width: '30%',
                    paddingBottom: 20,
                    paddingTop: 15,
                    paddingRight: 5,
                    paddingLeft: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <PerPersonExpenditure allBudget={allBudget} budgetYear={budgetYear}
                                          municipalityPopulation={budgetSummaryData(allBudget, budgetYear).population}/>
                </Paper>
            </Box>
            <FullWidthHeading label={'Revenue Income and Expenditure'}/>
            <div className={classes.box}>
                <Paper style={{width: '40%'}}>
                    <DataTable
                        rows={revenueIncomeAndExpenditureSummaryData(allBudget, budgetYear).data}
                        title={t(`Revenue Income And Expenditure Summary FY ${budgetYear} (in lakhs)`)}/>
                </Paper>
                <Paper style={{height: 400, width: '30%'}}>
                    <ResponsiveBarGraph data={budgetSummaryData(allBudget, budgetYear).barGraphData}
                                        indexBy={'name'}
                                        keys={['Revenue Income', 'Revenue Expenditure']}/>
                </Paper>
                <Paper style={{
                    height: 230,
                    width: '30%',
                    color: '#616161',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    marginTop: 10
                }}>
                    <PerPersonRevenue allBudget={allBudget} budgetYear={budgetYear}
                                      municipalityPopulation={budgetSummaryData(allBudget, budgetYear).population}/>
                </Paper>
            </div>

            <FullWidthHeading label={'Revenue Income Summary'}/>
            <div className={classes.box}>
                <Paper width={'50%'}>
                    <DataTable
                        headings={getRevenueIncomeSummaryData(allBudget, budgetYear).headers}
                        rows={getRevenueIncomeSummaryData(allBudget, budgetYear).data}
                        title={t(`Revenue Income Summary FY ${budgetYear} (in lakhs)`)}/>
                </Paper>
                <Paper style={{
                    height: 440, width: '50%', paddingBottom: 20, paddingTop: 15
                }}><ResponsivePieChart
                    data={getRevenueIncomeSummaryData(allBudget, budgetYear).pieChartData}
                    title={t(`Revenue Income Summary FY ${budgetYear} (in lakhs)`)}
                /></Paper>
            </div>

            <FullWidthHeading label={t(`Revenue Expenditure Sectoral Distribution FY ${budgetYear}`)}/>
            <div className={classes.boxWithColumnDirection}>
                <div className={classes.box} style={{width: '100%'}}>
                    <SectorialDistributionDashboardReport budgets={allBudget} year={budgetYear}/>
                </div>
            </div>

            <FullWidthHeading label={t(`Capital Budget Summary ${budgetYear}`)}/>
            <div className={classes.boxWithColumnDirection}>
                <div className={classes.box} style={{width: '100%'}}>
                    <Paper style={{
                        height: 400, width: '50%'
                    }}>
                        <DataTable
                            rows={capitalBudgetSummaryData(allBudget, budgetYear).tableRows}
                            title={t(`Capital Budget Summary FY ${budgetYear} (in lakhs)`)}/>
                    </Paper>
                    <Paper style={{
                        height: 426, width: '50%'
                    }}>
                        <ResponsiveBarGraph data={capitalBudgetSummaryData(allBudget, budgetYear).barGraphData}
                                            indexBy={'name'}
                                            keys={['Capital Income', 'Capital Expenditure']}/>
                    </Paper>

                </div>
            </div>
        </Box>
    )
        ;
};
export default ReportsDashboard;
