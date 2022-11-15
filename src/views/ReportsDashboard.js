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
import SectoralDistributionDashboardReport from '../components/SectoralDistributionDashboardReport';
import Box from '@mui/material/Box';
import BigBoldHeading from '../components/BigBoldHeading';
import * as PropTypes from 'prop-types';
import BudgetTrends from '../components/BudgetTrends';
import NotableCapitalHeads from '../components/NotableCapitalHeads';

BudgetTrends.propTypes = {budgets: PropTypes.any};
const ReportsDashboard = ({styleSheet, allBudgets, budgetYear}) => {
    const classes = styleSheet;
    const {t} = useTranslation();

    return (
        <Box>
            <BigBoldHeading label={'Summary'}/>
            <Box className={classes.box}>
                <Box style={{width: '40%'}}>
                    <DataTable headings={budgetSummaryData(allBudgets, budgetYear).budgetSummaryTableHeadings}
                               style={{background: 'red'}}
                               highlight={true}
                               rows={budgetSummaryData(allBudgets, budgetYear).budgetSummaryTableData}
                               title={t('budgetSummaryHeading', {budgetYear})}/>
                </Box>
                <Paper style={{
                    height: 440, width: '30%', paddingBottom: 20, paddingTop: 15
                }}><ResponsivePieChart
                    data={budgetSummaryData(allBudgets, budgetYear).pieChartData}
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
                    <PerPersonExpenditure allBudgets={allBudgets} budgetYear={budgetYear}
                                          municipalityPopulation={budgetSummaryData(allBudgets, budgetYear).population}/>
                </Paper>
            </Box>
            <BigBoldHeading label={'Revenue Income and Expenditure'}/>
            <Box className={classes.box}>
                <Paper style={{width: '40%'}}>
                    <DataTable
                        rows={revenueIncomeAndExpenditureSummaryData(allBudgets, budgetYear).data}
                        title={t(`Revenue Income And Expenditure Summary FY ${budgetYear} (in lakhs)`)}/>
                </Paper>
                <Paper style={{height: 400, width: '30%'}}>
                    <ResponsiveBarGraph data={budgetSummaryData(allBudgets, budgetYear).barGraphData}
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
                    <PerPersonRevenue allBudgets={allBudgets} budgetYear={budgetYear}
                                      municipalityPopulation={budgetSummaryData(allBudgets, budgetYear).population}/>
                </Paper>
            </Box>

            <BigBoldHeading label={'Revenue Income Summary'}/>
            <Box className={classes.box}>
                <Paper width={'50%'}>
                    <DataTable
                        headings={getRevenueIncomeSummaryData(allBudgets, budgetYear).headers}
                        rows={getRevenueIncomeSummaryData(allBudgets, budgetYear).data}
                        title={t(`Revenue Income Summary FY ${budgetYear} (in lakhs)`)}/>
                </Paper>
                <Paper style={{
                    height: 440, width: '50%', paddingBottom: 20, paddingTop: 15
                }}><ResponsivePieChart
                    data={getRevenueIncomeSummaryData(allBudgets, budgetYear).pieChartData}
                    title={t(`Revenue Income Summary FY ${budgetYear} (in lakhs)`)}
                /></Paper>
            </Box>

            <BigBoldHeading label={t(`Revenue Expenditure Sectoral Distribution FY ${budgetYear}`)}/>
            <Box className={classes.boxWithColumnDirection}>
                <div className={classes.box} style={{width: '100%'}}>
                    <SectoralDistributionDashboardReport budgets={allBudgets} year={budgetYear}/>
                </div>
            </Box>

            <BigBoldHeading label={t(`Capital Budget Summary FY ${budgetYear}`)}/>
            <Box className={classes.boxWithColumnDirection}>
                <Box className={classes.box} style={{width: '100%'}}>
                    <Paper style={{
                        height: 400, width: '50%'
                    }}>
                        <DataTable
                            rows={capitalBudgetSummaryData(allBudgets, budgetYear).tableRows}
                            title={t(`Capital Budget Summary FY ${budgetYear} (in lakhs)`)}/>
                    </Paper>
                    <Paper style={{
                        height: 426, width: '50%'
                    }}>
                        <ResponsiveBarGraph data={capitalBudgetSummaryData(allBudgets, budgetYear).barGraphData}
                                            indexBy={'name'}
                                            keys={['Capital Income', 'Capital Expenditure']}/>
                    </Paper>

                </Box>
            </Box>
            <BigBoldHeading label={t(`Notable Capital Income and Expenditure FY ${budgetYear}`)}/>
            <Box style={{width: '100%'}}>
                <NotableCapitalHeads budgets={allBudgets} budgetYear={budgetYear}/>
            </Box>
            <BigBoldHeading label={t(`Trends`)}/>
            <Box style={{width: '100%'}}>
                <BudgetTrends budgets={allBudgets}/>
            </Box>
        </Box>
    )
        ;
};
export default ReportsDashboard;
