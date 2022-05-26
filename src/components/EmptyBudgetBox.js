import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";
import BasicModal from "./BasicModal";
import Button from "@mui/material/Button";

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
		alignItems: "center",
		gap: "2vw",
		paddingTop: "1%",
		paddingBottom: "1%",
		fontSize: "15px",
		fontWeight: "400"


	}, notAddedBudgetText: {
		color: "#212121",
		fontSize: "19px"
	}

}))
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const EmptyBudgetBox = () => {
	const classes = styleSheets();

	return (<Box className={classes.box}>
		<text className={classes.notAddedBudgetText}>
			You currently have not added any budgets yet.
		</text>
		<text>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
		</text>
		<BasicModal
			buttonLabel={"Add a new budget"}
			buttonId={"addNewBudgetButton"}
		/>
	</Box>)
}
export default EmptyBudgetBox
