import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";


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
		paddingRight:"10px",
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
	}

}))
const CurrentBudgetBox = ({onClick}) => {
	const classes = styleSheets();
	return (
		<Box className={classes.box}>
			<div className={classes.innerBox}>
				<div className={classes.text}>
					<span>You currently have not added any budgets yet.</span>
				</div>

			</div>
			<div className={classes.actionButtons}>
				<ActionButton label={"Go to current budget"} id={"addNewBudgetButton"} onClick={onClick}/>
			</div>
		</Box>

	)
}
export default CurrentBudgetBox;