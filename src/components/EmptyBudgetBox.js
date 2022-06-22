import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ModalWithButton from "./ModalWithButton";
import BasicSelect from "./BasicSelect";
import ActionButton from "./ActionButton";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
		fontWeight: "400",
		fontFamily: "Lato"


	}, notAddedBudgetText: {
		color: "#212121",
		fontSize: "19px"
	}

}))
const style = {
	position: 'absolute',
	display: "flex",
	flexDirection: "column",
	top: '30%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "20%",
	bgcolor: 'background.paper',
	border: '0px  #000',
	boxShadow: "0px 0px 4px  #000000",
	p: 4,
	gap: "1vw"
};

const EmptyBudgetBox = ({addNewBudget}) => {
	const classes = styleSheets();

	const [selectedYear, setSelectedYear] = useState();
	let navigate = useNavigate();


	const addBudget = () => {
		if (selectedYear) {
			addNewBudget(selectedYear.substring(0, 4));
			navigate(`/budget/${selectedYear.substring(0, 4)}`);
		}
	}

	return (<Box className={classes.box}>
		<span className={classes.notAddedBudgetText}>
			You currently have not added any budgets yet.
		</span>
		<span>
			You can add a new budget by clicking on the Add New Budget button.
		</span>
		<ModalWithButton
			buttonLabel={"Add a new budget"}
			buttonId={"addNewBudgetButton"}
			modalText={"Create a new budget"}
			style={style}
			dropDown={<BasicSelect onChange={setSelectedYear}/>}
			actionButton={<ActionButton label={"CREATE A NEW BUDGET"} id={"addNewBudgetButton"} onClick={addBudget} />}
		/>
	</Box>)
}
export default EmptyBudgetBox;
export {style}
