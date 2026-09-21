import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";
import DropDown from "./DropDown";
import {useDispatch, useSelector} from "react-redux";
import {allBudgetSelector, fetchAllBudgets} from "../slices/allBudgetReducer";
import React, {useEffect, useState} from "react";
import _ from "lodash"
import {useNavigate} from "react-router-dom";
import {fetchMunicipalityDetails} from "../slices/municipalityReducer";
import ReportsDashboard from "../views/ReportsDashboard";
import {t} from 'i18next';
import SelectYears from "./SelectYears";
import CustomModal from "./CustomModal";
import {style} from "./EmptyBudgetBox";
import {createNewBudget} from "../slices/budgetDashboardReducer";
import {CREATED_MESSAGE_MS} from "../config";

const styleSheets = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        boxSizing: "border-box",
        width: "100%",
        background: " #FFFFFF",
        gap: "2vw",
        paddingTop: "10px",
        paddingBottom: "30px",
        fontSize: "15px",
        fontWeight: "400",
        fontFamily: "Lato",
    }, innerBox: {
        display: "flex",
        justifyContent: "flex-start'",
        color: "#212121",
        fontSize: "19px",
    }, text: {
        fontWeight: "700", fontSize: "19px"
    }, actionButtons: {
        display: "flex", justifyContent: "flex-end", fontSize: "11px", textTransform: "uppercase", color: "#616161",
    }, boxWithColumnDirection: {
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "100%",
        borderRadius: "3px",
        gap: "1vw",
        fontFamily: "Lato",
        justifyContent: "center",
        alignItems: "center",
    },
    newBudgetSection: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "19px",
    }
}))
const CurrentBudgetBox = ({year, currentBudgetYear}) => {
    const {allBudgets} = useSelector(allBudgetSelector);
    const dispatch = useDispatch();
    const classes = styleSheets();
    const [budgetYear, setBudgetYear] = useState(year);
    let navigate = useNavigate();
    const [selectedYear, setSelectedYear] = useState();
    const [isCreatingBudget, setIsCreatingBudget] = useState(false);
    const [createBudgetError, setCreateBudgetError] = useState('');
    const [createBudgetSuccess, setCreateBudgetSuccess] = useState('');

    useEffect(() => {
        dispatch(fetchAllBudgets());
        dispatch(fetchMunicipalityDetails());
    }, [dispatch]);

    const getBudgetYears = (allBudgets) => {
        let budgetYears = [];
        _.forEach(allBudgets, budget => {
            budgetYears.push(budget.budgetYear);
        });
        return _.sortBy(budgetYears).reverse();
    };

    const handleChange = (event) => {
        setBudgetYear(event.target.value);
    };
    const goToBudget = () => {
        const year = budgetYear.substring(0, 4)
        navigate(`/budget/${year}`);
    };
    const addBudget = async () => {
        if (!selectedYear) {
            return;
        }
        const targetYear = selectedYear.substring(0, 4);
        setIsCreatingBudget(true);
        setCreateBudgetError('');
        setCreateBudgetSuccess('');
        try {
            // Await so the budget exists before we navigate to it.
            await dispatch(createNewBudget(targetYear));
            setIsCreatingBudget(false);
            setCreateBudgetSuccess(`Budget for ${selectedYear} created successfully.`);
            // Confirm first, then move on — navigating instantly would replace the screen
            // before the user could register that anything succeeded.
            setTimeout(() => navigate(`/budget/${targetYear}`), CREATED_MESSAGE_MS);
        } catch (e) {
            setIsCreatingBudget(false);
            setCreateBudgetError(
                e?.response?.data?.message || 'Could not create the budget. Please try again.'
            );
        }
    }

    return (
        <>
            <Box className={classes.box}>
                <div className={classes.innerBox}>
                    <div className={classes.text}>
                        <DropDown list={getBudgetYears(allBudgets)} value={budgetYear} onSelect={handleChange}/>
                    </div>
                </div>
                {!!!currentBudgetYear &&
                    (<div className={classes.newBudgetSection}>
                        <>This municipality doesnt have budget for current year Click
                        </>
                        <>
                            <CustomModal
                                buttonLabel={"Add budget"}
                                modalText={"Create a new budget"}
                                style={style}
                                dropDown={<SelectYears onChange={(year) => {
                                    setSelectedYear(year);
                                    // SelectYears reports its year on mount, and the modal
                                    // remounts its children each time it opens — so this
                                    // also clears any error left over from a previous
                                    // failed attempt rather than showing it again on open.
                                    setCreateBudgetError('');
                                }}/>}
                                actionButton={
                                    <>
                                        <ActionButton label={isCreatingBudget ? "Creating…" : "CREATE A NEW BUDGET"}
                                                      variant={'contained'} size={"large"} onClick={addBudget}
                                                      disabled={isCreatingBudget || !!createBudgetSuccess}/>
                                        {createBudgetSuccess &&
                                            <Box role="status" sx={{color: 'success.main', fontSize: '13px', mt: 1}}>
                                                {createBudgetSuccess}
                                            </Box>}
                                        {createBudgetError &&
                                            <Box role="alert" sx={{color: 'error.main', fontSize: '13px', mt: 1}}>
                                                {createBudgetError}
                                            </Box>}
                                    </>
                                }
                            />
                        </>
                    </div>)
                }
                <div className={classes.actionButtons}>
                    <ActionButton label={t("Open Budget")} variant={'contained'} onClick={goToBudget} size={"large"}/>
                </div>
            </Box>
            <ReportsDashboard styleSheet={classes} allBudgets={allBudgets} budgetYear={budgetYear}/>
        </>
    );
};
export default CurrentBudgetBox;
