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
const PerPersonRevenue = ({allBudgets, budgetYear, municipalityPopulation}) => {

	const classes = styleSheets();

	return (<>
		<div className={classes.boxWithIcon}>
			<div>
				<ManIcon sx={{fontSize: 80}} color="primary"/>
			</div>
			<div>
				<Typography color="primary">
								<span
									style={{color: "#333333"}}>Revenue Budget </span> {`Rs.${_.ceil(budgetSummaryData(allBudgets, budgetYear).budgetedRevenueExpenditure / municipalityPopulation)}/
						person`}
				</Typography>
				<Typography color="primary">
								<span
									style={{color: "#333333"}}>Capital Budget </span>{`Rs.${_.ceil(budgetSummaryData(allBudgets, budgetYear).budgetedCapitalExpenditure / municipalityPopulation)}/
						person`}
				</Typography>
			</div>
		</div>
	</>)

}
export default PerPersonRevenue;
