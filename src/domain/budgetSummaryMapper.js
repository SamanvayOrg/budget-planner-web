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
        dataLine.push({
            name: 'Opening Balance',
            revised: _.ceil(getPrevYearOpeningBalance() / 100000),
            budgeted: _.ceil(getCurrentYearOpeningBalance() / 100000)
        })
        dataLine.push({
            name: 'Revenue Income',
            revised: _.ceil(getRevisedValue(prevYearBudget(budgets, year), 'Revenue Receipt') / 100000),
            budgeted: _.ceil(getBudgetedValue(currentYearBudget(budgets, year), 'Revenue Receipt') / 100000)
        });
        dataLine.push({
            name: 'Revenue Expenditure',
            revised: _.ceil(getRevisedValue(prevYearBudget(budgets, year), 'Expenses') / 100000),
            budgeted: _.ceil(getBudgetedValue(currentYearBudget(budgets, year), 'Expenses') / 100000)
        });
        dataLine.push({
            name: 'Capital Income',
            revised: _.ceil(getRevisedValue(prevYearBudget(budgets, year), 'Assets') / 100000),
            budgeted: _.ceil(getBudgetedValue(currentYearBudget(budgets, year), 'Assets') / 100000)
        });
        dataLine.push({
            name: 'Capital Expenditure',
            revised: _.ceil(getRevisedValue(prevYearBudget(budgets, year), 'Liability') / 100000),
            budgeted: _.ceil(getBudgetedValue(currentYearBudget(budgets, year), 'Liability') / 100000)
        });
        dataLine.push({
            name: 'Total surplus/deficit',
            revised: _.ceil(getRevisedTotalSurplusOrDef(prevYearBudget(budgets, year), 'Liability') / 100000),
            budgeted: _.ceil(getBudgetedTotalSurplusOrDef(currentYearBudget(budgets, year), 'Liability') / 100000)
        });
        return dataLine;
    }
    const piechartData = () => {
        let pieData = [];
        pieData.push({
            id: 'Revenue Budget',
            value: _.ceil(getBudgetedValue(currentYearBudget(budgets, year), 'Expenses') / 100000)
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

export const revenueIncomeSummaryData = (budgets, year) => {


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
        sr: 'A',
        name: 'Revenue Income',
        unit: '(In lakhs)'
    })
    let totalRevenueIncome = 0;
    _.forEach(revenueIncomeCategories, category => {
        totalRevenueIncome += getValue(category);
        dataLines.push({
            sr: '',
            name: category,
            amount: _.ceil(getValue(category) / 100000)
        })
    })
    dataLines.push({
        sr: '',
        name: 'Total Revenue Income',
        amount: _.ceil(totalRevenueIncome / 100000)
    })

    dataLines.push({
        sr: 'B',
        name: 'Revenue Expenditure',
        unit: '(In lakhs)'
    })

    dataLines.push({
        sr: '',
        name: 'Admin Expenses',
        unit: _.ceil(getValue('Administrative Expense') / 100000)
    })

    dataLines.push({
        sr: '',
        name: 'Establishment Expenses',
        unit: _.ceil(getValue('Salary and allowances') / 100000)
    })

    dataLines.push({
        sr: '',
        name: 'Operations & Maintenance',
        unit: _.ceil(getValue('Operations and Maintenance') + getValue('Water Supply (Public Health and Welfare)') / 100000)
    })

    dataLines.push({
        sr: '',
        name: 'Others',
        unit: _.ceil(getValue('Others') + getValue('Social Welfare') / 100000)
    })
    dataLines.push({
        sr: '',
        name: 'Total Revenue Expenditure',
        unit: _.ceil((getValue('Others') +
            getValue('Social Welfare') +
            getValue('Operations and Maintenance') +
            getValue('Water Supply (Public Health and Welfare)') +
            getValue('Salary and allowances') +
            getValue('Administrative Expense')) / 100000)
    })


    return {
        data: dataLines
    };
}



