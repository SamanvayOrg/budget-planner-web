import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";
import DropDown from "./DropDown";
import {useDispatch, useSelector} from "react-redux";
import {allBudgetSelector, fetchAllBudgets} from "../slices/allBudgetReducer";
import React, {useEffect, useState} from "react";
import _ from "lodash"
import {useNavigate} from "react-router-dom";
import DataTable from "./DataTable";
import {budgetSummaryData} from "../domain/budgetSummaryMapper";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {allMunicipalityDetailsSelector} from "../slices/municipalityReducer";
import ManIcon from '@mui/icons-material/Man';
import ResponsiveBarGraph from "./ResponsiveBarGraph";
import ResponsivePieChart from "./ResponsivePieChart";

const styleSheets = makeStyles(theme => ({
	box: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		boxSizing: "border-box",
		width: "100%",
		background: " #FFFFFF",
		border: "1px solid #DEDEDE",
		borderRadius: "3px",
		marginTop: "30px",
		gap: "2vw",
		paddingTop: "15px",
		paddingBottom: "15px",
		paddingRight: "10px",
		fontSize: "15px",
		fontWeight: "400",
		fontFamily: "Lato",
	}, innerBox: {
		display: "flex",
		justifyContent: "flex-start'",
		gap: "0.5vw",
		color: "#212121",
		fontSize: "19px",
		marginLeft: "1%",
	}, text: {
		fontWeight: "700",
		fontSize: "19px"
	}, actionButtons: {
		display: "flex",
		justifyContent: "flex-end",
		fontSize: "11px",
		textTransform: "uppercase",
		color: "#616161",
	}, boxWithIcon: {
		display: "flex",
		flexDirection: "row"
	}

}))
const CurrentBudgetBox = ({year}) => {
	const {allBudget} = useSelector(allBudgetSelector);
	const dispatch = useDispatch();
	const classes = styleSheets();
	const [budgetYear, setBudgetYear] = useState(year);
	let navigate = useNavigate();
	const {details} = useSelector(allMunicipalityDetailsSelector);

	useEffect(() => {
		dispatch(fetchAllBudgets());
	}, [dispatch]);

	const getBudgetYears = (allBudgets) => {
		let budgetYears = [];
		_.forEach(allBudgets, budget => {
			budgetYears.push(budget.budgetYear);
		});
		return budgetYears;
	};

	const handleChange = (event) => {
		setBudgetYear(event.target.value);
	};
	const goToBudget = () => {
		const year = budgetYear.substring(0, 4)
		navigate(`/budget/${year}`);
	};
	const getBudgetCount = () => {
		return {
			totalBudget: _.sum([_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).revenueBudget, 100000)), _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).capitalBudget, 100000))]),
			revenueBudget: _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).revenueBudget, 100000)),
			capitalBudget: _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).capitalBudget, 100000)),
			revenuePercentage: _.ceil((_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).revenueBudget, 100000)) / _.sum([_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).revenueBudget, 100000)), _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).capitalBudget, 100000))])) * 100),
			capitalPercentage: _.floor((_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).capitalBudget, 100000)) / _.sum([_.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).revenueBudget, 100000)), _.ceil(_.divide(budgetSummaryData(allBudget, budgetYear).capitalBudget, 100000))])) * 100)
		}
	}


	return (
		<><Box className={classes.box}>
			<div className={classes.innerBox}>
				<div className={classes.text}>
					<DropDown list={getBudgetYears(allBudget)} value={budgetYear} onSelect={handleChange}/>
				</div>
			</div>
			<div className={classes.actionButtons}>
				<ActionButton label={"Open budget"} id={"addNewBudgetButton"} onClick={goToBudget}/>
			</div>

		</Box>
			<div className={classes.box}>
				<DataTable headings={budgetSummaryData(allBudget, budgetYear).headings}
				           rows={budgetSummaryData(allBudget, budgetYear).data}
				           title={`Budget Summary FY ${budgetYear} (in lakhs)`}/>
				<Paper style={{
					height: 400,
					width: '70%',
					paddingBottom: 20,
					paddingTop: 15,
					color: '#616161'
				}}><ResponsivePieChart
					data={budgetSummaryData(allBudget, budgetYear).pieChartData}
					title={`Key Budget Highlights FY ${budgetYear} (in lakhs)`}
				/></Paper>
				<Paper style={{
					height: 400,
					width: '40%',
					paddingBottom: 20,
					paddingTop: 15,
					color: '#616161',
					paddingRight: 5,
					paddingLeft: 5,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-around"

				}}>
					<Typography style={{paddingBottom: 10, color: "#333333"}}>
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
									style={{color: "#333333"}}>Revenue Budget </span> {`Rs.${_.ceil(budgetSummaryData(allBudget, budgetYear).revenueBudget / details.population)}/
						person`}
							</Typography>
							<Typography color="primary">
								<span
									style={{color: "#333333"}}>Capital Budget </span>{`Rs.${_.ceil(budgetSummaryData(allBudget, budgetYear).capitalBudget / details.population)}/
						person`}
							</Typography>
						</div>
					</div>
				</Paper>
			</div>
			<div className={classes.box}>
				<Paper style={{
					height: 400,
					width: '50%'
				}}><ResponsiveBarGraph data={budgetSummaryData(allBudget, budgetYear).barGraphData} indexBy={"name"}
				                       keys={['Revenue Income', 'Revenue Expenditure']}/>
				</Paper>
				<Paper style={{
					height: 400,
					width: '40%',
					color: '#616161',
					paddingRight: 5,
					paddingLeft: 5,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-around"

				}}>
					<Typography style={{paddingBottom: 10, color: "#333333"}}>
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
									style={{color: "#333333"}}>Revenue Budget </span> {`Rs.${_.ceil(budgetSummaryData(allBudget, budgetYear).revenueBudget / details.population)}/
						person`}
							</Typography>
							<Typography color="primary">
								<span
									style={{color: "#333333"}}>Capital Budget </span>{`Rs.${_.ceil(budgetSummaryData(allBudget, budgetYear).capitalBudget / details.population)}/
						person`}
							</Typography>
						</div>
					</div>
				</Paper>
			</div>

		</>

	);
};
export default CurrentBudgetBox;