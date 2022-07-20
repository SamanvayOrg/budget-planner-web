import Typography from "@mui/material/Typography";
import ManIcon from "@mui/icons-material/Man";
import _ from "lodash";
import {budgetSummaryData} from "../domain/budgetSummaryMapper";
import React from "react";
import {makeStyles} from "@mui/styles";

const styleSheets = makeStyles(theme => ({
	boxWithIcon: {
		display: "flex",
		flexDirection: "row"
	}
}))
const PerPersonExpenditure = ({allBudget, budgetYear, municipalityPopulation}) => {
	console.log(budgetYear)
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
	return (<><Typography style={{paddingBottom: 10, color: "#333333"}}>
		{`The total budget of WMC FY ${budgetYear} is
						expected to be Rs.${getBudgetCount().totalBudget} lakhs.The
						revenue budget is Rs.${getBudgetCount().revenueBudget} lakhs (${getBudgetCount().revenuePercentage}%)
						and	the capital budget is Rs.${getBudgetCount().capitalBudget} lakhs
						(${getBudgetCount().capitalPercentage}%).`}
	</Typography>
		<div className={classes.boxWithIcon}>
			<div>
				<ManIcon sx={{fontSize: 80}} color="primary"/>
			</div>
			<div>
				<Typography color="primary">
								<span
									style={{color: "#333333"}}>Revenue Budget </span> {`Rs.${_.ceil(budgetSummaryData(allBudget, budgetYear).budgetedRevenueExpenditure / municipalityPopulation)}/
						person`}
				</Typography>
				<Typography color="primary">
								<span
									style={{color: "#333333"}}>Capital Budget </span>{`Rs.${_.ceil(budgetSummaryData(allBudget, budgetYear).budgetedCapitalExpenditure / municipalityPopulation)}/
						person`}
				</Typography>
			</div>
		</div>
	</>)
}
export default PerPersonExpenditure;