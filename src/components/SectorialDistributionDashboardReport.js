import {currentYearBudget} from "../domain/functions";
import {ReactComponent as AdminExpenseSvg} from "../assets/admin_expense.svg";
import {ReactComponent as Earmarked} from "../assets/earmarked.svg";
import {ReactComponent as OtherAndM} from "../assets/other_o_and_m.svg";
import {ReactComponent as Road} from "../assets/road_and_construction.svg";
import {ReactComponent as Salary} from "../assets/salary.svg";
import {ReactComponent as SocialWelfare} from "../assets/social_welfare.svg";
import {ReactComponent as WaterAndSanitation} from "../assets/water_and_sanitation.svg";
import _ from "lodash";
import DistributionItem from "./DistributionItem";

const SectorialDistributionDashboardReport = ({budgets, year}) => {

    const getPercentage = (value) => {
        return _.ceil((value / getTotal()) * 100, 2)
    }

    const getTotal = () => {
        return getDataFromFunctionGroupCategory('Administrative Expense') + getDataFromFunctionGroupCategory('Building and Town Planning') + getDataFromFunctionGroupCategory('Roads') + getDataFromFunctionGroupCategory('Water Supply (Public Health and Welfare)') + getDataFromFunctionGroupCategory('Sanitation (Public Health and Welfare)') + getDataFromFunctionGroupCategory('Public Health ') + getDataFromFunctionGroupCategory('Social Welfare ') + getDataFromFunctionGroupCategory('Earmarked Funds')
    }
    const getDataFromFunctionGroupCategory = (category) => {
        if (currentYearBudget(budgets, year)) {
            const total = _.chain(currentYearBudget(budgets, year).budgetLines)
                .filter((e) => e.functionGroupCategory === category)
                .sumBy((e) => e.budgetedAmount)
                .value()
            return _.ceil(total / 100000)
        }
    }
    return (<>
        <DistributionItem amount={getDataFromFunctionGroupCategory('Administrative Expense')} name={'Admin Expense'}
                          percent={getPercentage(getDataFromFunctionGroupCategory('Administrative Expense'))}
                          logo={<AdminExpenseSvg/>}/>
        <DistributionItem amount={getDataFromFunctionGroupCategory('Salary and allowances')}
                          name={'Salaries, Pensions & Allowances'}//todo this is not present in the function group category
                          percent={getPercentage(getDataFromFunctionGroupCategory('Salary and allowances'))}
                          logo={<Salary/>}/>
        <DistributionItem amount={getDataFromFunctionGroupCategory('Roads')}
                          name={'Roads and Construction'}
                          percent={getPercentage(getDataFromFunctionGroupCategory('Roads'))} logo={<Road/>}/>
        <DistributionItem
            amount={getDataFromFunctionGroupCategory('Water Supply (Public Health and Welfare)') + getDataFromFunctionGroupCategory('Sanitation (Public Health and Welfare)') + getDataFromFunctionGroupCategory('Public Health ')}
            name={'Water Supply, Public Health and Welfare'}
            subName={'(Water,Health and sanitation)'}
            percent={getPercentage(getDataFromFunctionGroupCategory('Water Supply (Public Health and Welfare)') + getDataFromFunctionGroupCategory('Sanitation (Public Health and Welfare)') + getDataFromFunctionGroupCategory('Public Health '))}
            logo={<WaterAndSanitation/>}/>
        <DistributionItem amount={getDataFromFunctionGroupCategory('Social Welfare')}
                          name={'Social Welfare'}
                          percent={getPercentage(getDataFromFunctionGroupCategory('Social Welfare'))}
                          logo={<SocialWelfare/>}/>
        <DistributionItem amount={getDataFromFunctionGroupCategory('Earmarked Funds')}
                          name={'Earmarked'} subName={'(Women, Blind & Handicapped, Weaker section)'}
                          percent={getPercentage(getDataFromFunctionGroupCategory('Earmarked Funds'))}
                          logo={<Earmarked/>}/>
        <DistributionItem amount={getDataFromFunctionGroupCategory('Building and Town Planning')}
                          name={'Other O&M'}
                          subName={'(Other establishments + reserves)'}
                          percent={getPercentage(getDataFromFunctionGroupCategory('Building and Town Planning'))}
                          logo={<OtherAndM/>}/>
    </>)
}
export default SectorialDistributionDashboardReport;