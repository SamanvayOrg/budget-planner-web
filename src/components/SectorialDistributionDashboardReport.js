import {currentYearBudget} from "../domain/functions";
import {ReactComponent as AdminExpenseSvg} from "../assets/admin_expense.svg";
import {ReactComponent as Earmarked} from "../assets/earmarked.svg";
import {ReactComponent as Electricity} from "../assets/electricity.svg";
import {ReactComponent as OtherAndM} from "../assets/other_o_and_m.svg";
import {ReactComponent as PublicHeathWelfare} from "../assets/public_health_and_welfare.svg";
import {ReactComponent as Road} from "../assets/road_and_construction.svg";
import {ReactComponent as Salary} from "../assets/salary.svg";
import {ReactComponent as SocialWelfare} from "../assets/social_welfare.svg";
import {ReactComponent as WaterAndSanitation} from "../assets/water_and_sanitation.svg";
import _ from "lodash";
import DistributionItem from "./DistributionItem";

const SectorialDistributionDashboardReport = ({budgets, year}) => {
    const getValueFromCategory = (category) => {
        if (currentYearBudget(budgets, year)) {
            const total = _.chain(currentYearBudget(budgets, year).budgetLines)
                .filter((e) => e.category === category)
                .sumBy((e) => e.budgetedAmount)
                .value()

            return _.ceil(total / 100000);
        }
    }
    const getPercentage = () => {

    }

    return (
        <>
            <DistributionItem amount={getValueFromCategory('Administrative Expense')} name={'Admin Expense'}
                              percent={16} logo={<AdminExpenseSvg/>}/>
            <DistributionItem amount={getValueFromCategory('Salary and allowances')}
                              name={'Salaries, Pensions & Allowances'}
                              percent={16} logo={<Salary/>}/>
            <DistributionItem amount={getValueFromCategory('Administrative Expense')} name={'Electricity'}
                              percent={16} logo={<Electricity/>}/>
            <DistributionItem amount={getValueFromCategory('Administrative Expense')} name={'Roads and Construction'}
                              percent={16} logo={<Road/>}/>
            <DistributionItem amount={getValueFromCategory('Administrative Expense')}
                              name={'Public Health & Welfare'}
                              subName={'(Water,Health and sanitation)'}
                              percent={16} logo={<WaterAndSanitation/>}/>
            <DistributionItem amount={getValueFromCategory('Administrative Expense')} name={'Social Welfare'}
                              percent={16} logo={<SocialWelfare/>}/>
            <DistributionItem amount={getValueFromCategory('Administrative Expense')}
                              name={'Earmarked'} subName={'(Women, Blind & Handicapped, Weaker section)'}
                              percent={16} logo={<Earmarked/>}/>
            <DistributionItem amount={getValueFromCategory('Administrative Expense')}
                              name={'Other O&M'}
                              subName={'(Other establishments + reserves)'}
                              percent={16} logo={<OtherAndM/>}/>
        </>
    )
}
export default SectorialDistributionDashboardReport;