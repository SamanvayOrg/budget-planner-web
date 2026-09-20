import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";
import CustomModal from "./CustomModal";
import SelectYears from "./SelectYears";
import ActionButton from "./ActionButton";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {CREATED_MESSAGE_MS} from "../config";

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
    const [isCreatingBudget, setIsCreatingBudget] = useState(false);
    const [createBudgetError, setCreateBudgetError] = useState('');
    const [createBudgetSuccess, setCreateBudgetSuccess] = useState('');
    let navigate = useNavigate();


    const addBudget = async () => {
        if (!selectedYear) {
            return;
        }
        const targetYear = selectedYear.substring(0, 4);
        setIsCreatingBudget(true);
        setCreateBudgetError('');
        setCreateBudgetSuccess('');
        try {
            // Await before navigating — see CurrentBudgetBox.addBudget for why this
            // matters: firing-and-forgetting sent users to a budget page before the
            // budget existed.
            await addNewBudget(targetYear);
            setIsCreatingBudget(false);
            setCreateBudgetSuccess(`Budget for ${selectedYear} created successfully.`);
            setTimeout(() => navigate(`/budget/${targetYear}`), CREATED_MESSAGE_MS);
        } catch (e) {
            setIsCreatingBudget(false);
            setCreateBudgetError(
                e?.response?.data?.message || 'Could not create the budget. Please try again.'
            );
        }
    }

    return (<Box className={classes.box}>
		<span className={classes.notAddedBudgetText}>
			You currently have not added any budgets yet.
		</span>
        <span>
			You can add a new budget by clicking on the Add New Budget button.
		</span>
        <CustomModal
            buttonLabel={"Add a new budget"}
            buttonId={"addNewBudgetButton"}
            modalText={"Create a new budget"}
            style={style}
            dropDown={<SelectYears onChange={(year) => {
                setSelectedYear(year);
                // Also clears a leftover error from a previous failed attempt — see
                // CurrentBudgetBox for why mounting is the right moment to do this.
                setCreateBudgetError('');
            }}/>}
            actionButton={
                <>
                    <ActionButton label={isCreatingBudget ? "Creating…" : "CREATE A NEW BUDGET"}
                                  id={"addNewBudgetButton"} onClick={addBudget}
                                  disabled={isCreatingBudget || !!createBudgetSuccess}/>
                    {createBudgetSuccess &&
                        <Box role="status" sx={{color: 'success.main', fontSize: '13px', mt: 1}}>
                            {createBudgetSuccess}
                        </Box>}
                    {createBudgetError &&
                        <Box role="alert" sx={{color: 'error.main', fontSize: '13px', mt: 1}}>{createBudgetError}</Box>}
                </>
            }
        />
    </Box>)
}
export default EmptyBudgetBox;
export {style}
