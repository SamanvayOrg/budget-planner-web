import {Typography} from "@mui/material";
import ManIcon from "@mui/icons-material/Man";
import {makeStyles} from "@mui/styles";
import _ from "lodash";
import {budgetSummaryData} from "../domain/budgetSummaryMapper";


const styleSheets = makeStyles(theme => ({
	boxWithIcon: {
		display: "flex",
		flexDirection: "row"
	}
}))
const PerPersonRevenue = ({allBudget, budgetYear, municipalityPopulation}) => {

	const classes = styleSheets();

	const getBudgetCount = () => {
		return {
			totalBudget: _.sum([_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedRevenueExpenditure, 100000)), _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedCapitalExpenditure, 100000))]),
			revenueBudget: _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedRevenueExpenditure, 100000)),
			capitalBudget: _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedCapitalExpenditure, 100000)),
			revenuePercentage: _.ceil((_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedRevenueExpenditure, 100000)) / _.sum([_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedRevenueExpenditure, 100000)), _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedCapitalExpenditure, 100000))])) * 100),
			capitalPercentage: _.floor((_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedCapitalExpenditure, 100000)) / _.sum([_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedRevenueExpenditure, 100000)), _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).budgetedCapitalExpenditure, 100000))])) * 100)
		}
	}
	return (<>
		<div className={classes.boxWithIcon}>
			<div>
				<ManIcon sx={{fontSize: 80}} color="primary"/>
			</div>
			<div>
				<Typography color="primary">
								<span
									style={{color: "#333333"}}>Revenue Budget </span> {`Rs.${_.ceil(budgetSummaryData(allBudget, budgetYear).budgetedRevenueIncome / municipalityPopulation)}/
						person`}
				</Typography>
				<Typography color="primary">
								<span
									style={{color: "#333333"}}>Capital Budget </span>{`Rs.${_.ceil(budgetSummaryData(allBudget, budgetYear).budgetedRevenueExpenditure / municipalityPopulation)}/
						person`}
				</Typography>
			</div>
		</div>
	</>)

}
export default PerPersonRevenue;