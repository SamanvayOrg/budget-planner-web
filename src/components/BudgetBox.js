import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";


const styleSheets = makeStyles(theme => ({
	box: {
		display: "flex",
		flexDirection: "column",
		boxSizing: "border-box",
		width: "100%",
		background: " #FFFFFF",
		border: "1px solid #DEDEDE",
		borderRadius: "3px",
		justifyContent: "space-around",
		marginTop: "2%",
		gap: "2vw",
		paddingTop: "1%",
		paddingBottom: "1%",
		fontSize: "15px",
		fontWeight: "400",
		fontFamily: "Lato",


	}, insideBox: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5vw",
		color: "#212121",
		fontSize: "19px",
		marginLeft: "1%",


	}, lastUpdateText: {
		display: "flex",

		fontSize: "11px",
		textTransform: "uppercase",
		color: "#616161",
	}, actionButtons: {
		display: "flex",
		justifyContent: "end",
		// alignItems:"start",
		fontSize: "11px",
		textTransform: "uppercase",
		color: "#616161",
	}

}))
const BudgetBox = ({versionName, lastUpdated}) => {
	const classes = styleSheets();
	return (
		<Box className={classes.box}>
			<text className={classes.insideBox}>
				<div className={classes.lastUpdateText}>
					{lastUpdated}
				</div>

				{versionName}
			</text>
			<text className={classes.actionButtons}>
				<ActionButton label={"EDIT BUDGET"} id={"smallActionButton"}/>
			</text>
		</Box>

	)
}
export default BudgetBox;