import _ from "lodash";
import {fromContract} from "./budgetContractMapper";
import {currentYearBudget, prevYearBudget} from "./functions";


export const budgetSummaryData = (budgets, year) => {
    const getBudgetedValue = (budget, itemName) => {
        let revenue = 0;
        if (!_.isEqual(budget, undefined)) {
            const revenueIncome = _.chain(fromContract(budget).items)
                .filter((e) => e.majorHeadGroup === itemName)
                .first()
                .value()
            revenue = revenueIncome.summary.budgetedAmount;
        }
        return revenue;
    }

    const getRevisedValue = (budget, itemName) => {
        let revenue = 0;
        if (!_.isEqual(budget, undefined)) {
            const revenueIncome = _.chain(fromContract(budget).items)
                .filter((e) => e.majorHeadGroup === itemName)
                .first()
                .value()
            revenue = _.ceil(revenueIncome.summary.currentYear4MonthsProbables + revenueIncome.summary.currentYear8MonthsActuals);
        }
        return revenue;
    }


    const getBudgetSummaryTableHeadings = () => {
        let headings = [];
        headings.push('');
        headings.push(`FY ${year.substring(0, 4) - 1} - ${year.substring(7, 5) - 1} (Revised Estimates)`);
        headings.push(`FY ${year} (Budgeted Estimates)`);
        return headings
    };

    const getBudgetedTotalSurplusOrDef = () => {
        return (getBudgetedValue(currentYearBudget(budgets, year), 'Revenue Receipt') + getBudgetedValue(currentYearBudget(budgets, year), 'Assets')) - (getBudgetedValue(currentYearBudget(budgets, year), 'Expenses') + getBudgetedValue(currentYearBudget(budgets, year), 'Liability'))
    }
    const getRevisedTotalSurplusOrDef = () => {
        return (getRevisedValue(prevYearBudget(budgets, year), 'Revenue Receipt') + getRevisedValue(prevYearBudget(budgets, year), 'Assets')) - (getRevisedValue(prevYearBudget(budgets, year), 'Expenses') + getRevisedValue(prevYearBudget(budgets, year), 'Liability'))
    }
    const getPrevYearOpeningBalance = () => {
        if (prevYearBudget(budgets, year)) {
            return prevYearBudget(budgets, year).openingBalance;
        }
    }
    const getCurrentYearOpeningBalance = () => {
        if (currentYearBudget(budgets, year)) {
            return currentYearBudget(budgets, year).openingBalance;

        }
    }

    const getBudgetSummaryTableData = () => {
        let dataLine = [];
        const pushInArray = (array, name, revised, budgeted) => {
            array.push({
                name: name, revised: _.ceil(revised / 100000), budgeted: _.ceil(budgeted / 100000)
            })
        }
        pushInArray(dataLine, 'Opening Balance', getPrevYearOpeningBalance(), getCurrentYearOpeningBalance())
        pushInArray(dataLine, 'Revenue Income', getRevisedValue(prevYearBudget(budgets, year), 'Revenue Receipt'), getBudgetedValue(currentYearBudget(budgets, year), 'Revenue Receipt'));
        pushInArray(dataLine, 'Revenue Expenditure', getRevisedValue(prevYearBudget(budgets, year), 'Expenses'), getBudgetedValue(currentYearBudget(budgets, year), 'Expenses'));
        pushInArray(dataLine, 'Capital Income', getRevisedValue(prevYearBudget(budgets, year), 'Assets'), getBudgetedValue(currentYearBudget(budgets, year), 'Assets'));
        pushInArray(dataLine, 'Capital Expenditure', getRevisedValue(prevYearBudget(budgets, year), 'Liability'), getBudgetedValue(currentYearBudget(budgets, year), 'Liability'));
        pushInArray(dataLine, 'Total surplus/deficit', getRevisedTotalSurplusOrDef(prevYearBudget(budgets, year), 'Liability'), getBudgetedTotalSurplusOrDef(currentYearBudget(budgets, year), 'Liability'));
        return dataLine;
    }
    const piechartData = () => {
        let pieData = [];
        pieData.push({
            id: 'Revenue Budget', value: _.ceil(getBudgetedValue(currentYearBudget(budgets, year), 'Expenses') / 100000)
        });
        pieData.push({
            id: 'Capital Budget',
            value: _.ceil(getBudgetedValue(currentYearBudget(budgets, year), 'Liability') / 100000)
        });
        return pieData;
    }
    const getBarGraphData = () => {
        let barData = [];
        barData.push({
            "name": 'Revenue Income',
            "Revenue Income": _.ceil(getBudgetedValue(currentYearBudget(budgets, year), 'Revenue Receipt') / 100000)
        });
        barData.push({
            "name": 'Revenue Expenditure',
            "Revenue Expenditure": _.ceil(getBudgetedValue(currentYearBudget(budgets, year), 'Expenses') / 100000)
        })
        return barData;
    }
    const getPopulation = () => {
        if (currentYearBudget(budgets, year)) {
            return currentYearBudget(budgets, year).population;
        }
        return 0;
    }

    return {
        budgetSummaryTableHeadings: getBudgetSummaryTableHeadings(),
        budgetSummaryTableData: getBudgetSummaryTableData(),
        pieChartData: piechartData(),
        barGraphData: getBarGraphData(),
        budgetedRevenueIncome: getBudgetedValue(currentYearBudget(budgets, year), 'Revenue Receipt'),
        budgetedRevenueExpenditure: getBudgetedValue(currentYearBudget(budgets, year), 'Expenses'),
        budgetedCapitalExpenditure: getBudgetedValue(currentYearBudget(budgets, year), 'Liability'),
        population: getPopulation()

    };
}

export const revenueIncomeAndExpenditureSummaryData = (budgets, year) => {
    const getValue = (category) => {
        if (currentYearBudget(budgets, year)) {
            return _.chain(currentYearBudget(budgets, year).budgetLines)
                .filter((e) => e.category === category)
                .sumBy((e) => e.budgetedAmount)
                .value();
        }
    }
    const dataLines = [];
    const revenueIncomeCategories = ['Revenue Grants', 'Own Tax', 'Non Tax'];
    dataLines.push({
        sr: 'A', name: 'Revenue Income', unit: '(In lakhs)'
    })
    let totalRevenueIncome = 0;
    _.forEach(revenueIncomeCategories, category => {
        totalRevenueIncome += getValue(category);
        dataLines.push({
            sr: '', name: category, amount: _.ceil(getValue(category) / 100000)
        })
    })

    const pushDataInArray = (array, sr, col1, col2) => {
        array.push({
            sr: sr, name: col1, amount: col2
        })
    }

    pushDataInArray(dataLines, '', 'Total Revenue Income', _.ceil(totalRevenueIncome / 100000));
    pushDataInArray(dataLines, 'B', 'Revenue Expenditure', '(In lakhs)');
    pushDataInArray(dataLines, '', 'Admin Expenses', _.ceil(getValue('Administrative Expense') / 100000));
    pushDataInArray(dataLines, '', 'Establishment Expenses', _.ceil(getValue('Salary and allowances') / 100000));
    pushDataInArray(dataLines, '', 'Operations & Maintenance', _.ceil(getValue('Operations and Maintenance') + getValue('Water Supply (Public Health and Welfare)') / 100000));
    pushDataInArray(dataLines, '', 'Others', _.ceil(getValue('Others') + getValue('Social Welfare') / 100000));
    pushDataInArray(dataLines, '', 'Total Revenue Expenditure', _.ceil((getValue('Others') + getValue('Social Welfare') + getValue('Operations and Maintenance') + getValue('Water Supply (Public Health and Welfare)') + getValue('Salary and allowances') + getValue('Administrative Expense')) / 100000));

    return {
        data: dataLines
    };
}

export const getRevenueIncomeSummaryData = (budgets, year) => {
    const getValueFromCategory = (category) => {
        if (currentYearBudget(budgets, year)) {
            return _.chain(currentYearBudget(budgets, year).budgetLines)
                .filter((e) => e.category === category)
                .sumBy((e) => e.budgetedAmount)
                .value();
        }
    }
    const getValueFromMajorHead = (majorHead) => {
        console.log('budget', budgets)

        if (currentYearBudget(budgets, year)) {
            return _.chain(currentYearBudget(budgets, year).budgetLines)
                .filter((e) => e.majorHead === majorHead)
                .sumBy((e) => e.budgetedAmount)
                .value();
        }
    }

    let headers = ['', 'Revenue Income', '(In lakhs)']
    let dataLines = [];
    const pushDataInArray = (array, sr, col1, col2) => {
        array.push({
            sr: sr, name: col1, amount: col2
        })
    }
    pushDataInArray(dataLines, 'A', 'Revenue Grants', _.ceil(getValueFromCategory('Revenue Grants') / 100000));
    pushDataInArray(dataLines, 'B', 'Own Tax Income', '');
    pushDataInArray(dataLines, '', 'Property Tax', _.ceil(getValueFromMajorHead('Consolidated Tax on Property') / 100000));
    pushDataInArray(dataLines, '', 'Water Tax', '');
    pushDataInArray(dataLines, '', 'Others(Sanitation tax, SWM, Advertisement tax, Cinema tax etc.)', '');
    pushDataInArray(dataLines, 'C', 'Non Tax Income', '');
    pushDataInArray(dataLines, '', 'Fees & User Charges', _.ceil(getValueFromMajorHead('Fees,User Charges & Fines') / 100000));
    pushDataInArray(dataLines, '', 'Reserve Funds', '');//Todo  add Reserves
    pushDataInArray(dataLines, '', 'Other Non-Tax Income (sales & interest)', '');//todo Sales and Hire Charges and Income from Interest
    pushDataInArray(dataLines, '', 'Rental Income', _.ceil(getValueFromMajorHead('Rental Income from Municipal Properties') / 100000));
    pushDataInArray(dataLines, '', 'Total Revenue Income', '');
    const pieChartData = () => {
        let pieData = [];
        pieData.push({id: 'Revenue Grants', value: _.ceil(getValueFromCategory('Revenue Grants') / 100000)});
        pieData.push({id: 'Own-Tax Income', value: _.ceil(getValueFromCategory('Own Tax') / 100000)});
        pieData.push({id: 'Non-Tax Income', value: _.ceil(getValueFromCategory('Non Tax') / 100000)});
        return pieData;
    }

    return {
        headers, data: dataLines, pieChartData: pieChartData()
    }
}

export const capitalBudgetSummaryData = (budgets, year) => {

    const getData = (majorHeadName) => {
        if (currentYearBudget(budgets, year)) {
            return _.chain(currentYearBudget(budgets, year).budgetLines)
                .filter((line) => line.majorHeadGroup === majorHeadName)
                .sumBy((line) => line.budgetedAmount)
                .value();
        }
    }

    const getBarGraphData = () => {
        let barData = [];
        barData.push({
            "name": 'Capital Income', "Capital Income": _.ceil(getData('Assets') / 100000)
        });
        barData.push({
            "name": 'Capital Expenditure', "Capital Expenditure": _.ceil(getData('Liability') / 100000)
        })
        return barData;
    }

    let tableRows = [];
    const pushDataInArray = (array, sr, name, data) => {
        array.push({
            sr: sr, name: name, data: data
        });
    }
    pushDataInArray(tableRows, 'A', 'Capital Income (INR lakhs)', '');
    pushDataInArray(tableRows, '', 'Central State Schemes & Grants', 5420);
    pushDataInArray(tableRows, '', 'Deposits', 134);
    pushDataInArray(tableRows, '', 'Recovery', 0);
    pushDataInArray(tableRows, 'B', 'Capital Expenditure (INR lakhs)', '');
    pushDataInArray(tableRows, '', 'Capital Projects', 5315);
    pushDataInArray(tableRows, '', 'Loan, Advance and Deposit Repayment', 805);

    return {
        barGraphData: getBarGraphData(), tableRows
    }
}

