import React from 'react';
import {getMajorCapitalItems} from '../domain/budgetSummaryMapper';
import Box from '@mui/material/Box';
import DataTable from './DataTable';

const NotableCapitalHeads = ({budgets, budgetYear}) => {
    let majorCapitalItems = getMajorCapitalItems(budgets, budgetYear);
    return (
        <Box sx={{display: 'flex', width: 1, flexDirection: 'row', marginTop: '16px', marginBottom: '16px'}}>
            <Box sx={{width: 0.5}}>
                <DataTable
                    title={'Capital Income'}
                    headings={['Rank', 'Head', 'Amount (in lakhs)']}
                    rows={majorCapitalItems.capitalIncome.map((item, index) => [index + 1, item.name, item.budgetedAmount])}
                />
            </Box>
            <Box sx={{width: 0.5, marginLeft: '20px'}}>
                <DataTable
                    title={'Capital Expenditure'}
                    headings={['Rank', 'Head', 'Amount (in lakhs)']}
                    rows={majorCapitalItems.capitalExpenditure.map((item, index) => [index + 1, item.name, item.budgetedAmount])}
                />
            </Box>
        </Box>
    );
};

export default NotableCapitalHeads;
