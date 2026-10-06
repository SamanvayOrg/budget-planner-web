import Typography from "@mui/material/Typography";
import ManIcon from "@mui/icons-material/Man";
import {budgetedShares, budgetSummaryData, perPersonAmount} from "../domain/budgetSummaryMapper";
import {municipalityDisplayName} from "../domain/functions";
import React from "react";
import {makeStyles} from "@mui/styles";
import {useSelector} from "react-redux";
import {allMunicipalityDetailsSelector} from "../slices/municipalityReducer";

const styleSheets = makeStyles(theme => ({
	boxWithIcon: {
		display: "flex",
		flexDirection: "row"
	}
}))
const PerPersonExpenditure = ({allBudgets, budgetYear, municipalityPopulation}) => {
	const classes = styleSheets();
	const {currentMunicipality} = useSelector(allMunicipalityDetailsSelector);
	const summary = budgetSummaryData(allBudgets, budgetYear);
	const shares = budgetedShares(summary);
	const municipalityName = municipalityDisplayName(currentMunicipality) || 'the municipality';

	return (<><Typography style={{paddingBottom: 10, color: "#333333"}}>
		{`The total budget of ${municipalityName} FY ${budgetYear} is
						expected to be Rs.${shares.totalBudget} lakhs. The
						revenue budget is Rs.${shares.revenueBudget} lakhs (${shares.revenuePercentage}%)
						and	the capital budget is Rs.${shares.capitalBudget} lakhs
						(${shares.capitalPercentage}%).`}
	</Typography>
		<div className={classes.boxWithIcon}>
			<div>
				<ManIcon sx={{fontSize: 80}} color="primary"/>
			</div>
			<div>
				<Typography color="primary">
								<span
									style={{color: "#333333"}}>Revenue Budget </span> {perPersonAmount(summary.budgetedRevenueExpenditure, municipalityPopulation)}
				</Typography>
				<Typography color="primary">
								<span
									style={{color: "#333333"}}>Capital Budget </span>{perPersonAmount(summary.budgetedCapitalExpenditure, municipalityPopulation)}
				</Typography>
			</div>
		</div>
	</>)
}
export default PerPersonExpenditure;
