import React from 'react';
import ResponsiveBarGraph from './ResponsiveBarGraph';
import {summaryData} from '../domain/budgetSummaryMapper';
import Box from '@mui/material/Box';
import BigBoldHeading from './BigBoldHeading';
import Paper from '@mui/material/Paper';

const BudgetTrends = ({budgets}) => {
    const data = summaryData(budgets);
    return (
        <Box sx={{width: 1, flexDirection: 'row', display: 'flex', paddingBottom: '144px'}}>
            <Paper sx={{height: '440px', width: 0.5, paddingBottom: '72px'}}>
                <BigBoldHeading label={'Revenue Trends (in lakhs)'} lightBackground/>
                <ResponsiveBarGraph data={data} keys={['Revenue Income', 'Revenue Expenditure']} indexBy={'budgetYear'}
                                    groupMode={'grouped'}/>
            </Paper>
            <Paper sx={{height: '440px', width: 0.5, marginLeft: '20px', paddingBottom: '72px'}}>
                <BigBoldHeading label={'Capital Trends (in lakhs)'} lightBackground/>
                <ResponsiveBarGraph data={data} keys={['Capital Income', 'Capital Expenditure']} indexBy={'budgetYear'}
                                    groupMode={'grouped'}/>
            </Paper>
        </Box>
    );
};

export default BudgetTrends;
