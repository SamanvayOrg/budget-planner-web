import ResponsiveAppBar from '../components/ResponsiveAppBar';
import {makeStyles} from '@mui/styles';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import Home from './Home';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {
    addBudgetLine, budgetSelector, deleteBudgetLine, fetchBudget, saveBudget, updateBudget, updateBudgetProps
} from '../slices/budgetReducer';
import Spreadsheet from 'react-spreadsheet';
import {getBudgetYearString, headers} from '../domain/budgetHeaders';
import {MunicipalityName} from '../domain/functions';
import HorizontalLine from '../components/HorizontalLine';
import {KeyboardBackspace} from '@mui/icons-material';
import ActionButton from '../components/ActionButton';
import {Modal} from '@mui/material';
import {useStyles} from '../components/ModalWithButton';
import {fetchMetadata, metadataSelector} from '../slices/metadataReducer';
import BudgetLineSelector from '../components/BudgetLineSelector';
import {useTranslation} from "react-i18next";
import {fetchTranslations, saveTranslations} from "../slices/translationsReducer";
import BudgetPropertySelector from "../components/BudgetPropertySelector";
import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import _ from "lodash"

const useStylesBudgetDetails = makeStyles(theme => ({

    top: {
        display: "flex",
        flexDirection: "row",
        paddingTop: "70px",
        fontFamily: "Lato",
        fontStyle: "normal",
        color: "#616161",
        fontWeight: "700",
        alignItems: "center",
        justifyContent: "space-between",
    }, topLeft: {
        display: "flex", flexDirection: "row", justifyContent: "flex-start"
    }, topCenter: {
        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "end",


    }, topRight: {
        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    }, mainContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        fontFamily: "Lato",
        fontStyle: "normal",
        color: "#616161",
        fontWeight: "700",
        position: "absolute"
    }, title: {
        fontSize: "21px", fontStyle: "italic", marginBottom: "10px", color: "#212121", marginLeft: "5px"
    }, budgetView: {
        marginTop: "10px",
        float: "left",
        overflow: "auto",
        height: "calc(100vh - 150px)",
        width: "calc(100vw - 10px)",
        marginRight: "30px"
    }, backArrow: {
        cursor: "pointer"
    }
}));

const BudgetDetail = () => {
    const navigate = useNavigate();
    const classes = useStylesBudgetDetails();
    const modalClass = useStyles();
    const {t} = useTranslation();
    const {budgetView = [], budget, saved, population, openingBalance} = useSelector(budgetSelector);

    const {metadata} = useSelector(metadataSelector);

    let {year} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBudget(year));
        dispatch(fetchMetadata());
        dispatch(fetchTranslations());
    }, [dispatch, year]);
    const [open, setOpen] = useState(false);
    const [popupContext, setPopupContext] = useState({});

    const updateView = (state) => {
        dispatch(updateBudget(state));
    }
    const save = () => {
        dispatch(saveBudget());
    }


    const handleOpen = (context) => {
        setPopupContext(context);
        setOpen(true);
    }

    const handleClose = () => {
        setPopupContext({});
        setModal(false);
        setOpen(false);
    }


    const onActivate = (params) => {
        const context = budgetView[params.row][params.column].context;
        const detailCode = budgetView[params.row][params.column].context.detailCode;
        const majorHead = budgetView[params.row][params.column].context.majorHead;
        if (context.key === 'addButton') {
            return (handleOpen(context))
        } else if (context.key === 'deleteButton') {
            if (window.confirm('Are you sure.?')) {
                dispatch(deleteBudgetLine({detailCode, majorHead}));
            }
        }

    }
    const [modal, setModal] = useState(false);
    const onClickProperties = (data) => {
        dispatch(updateBudgetProps(data, budget.id));
    };
    const propertiesStatus = () => {
        return _.isNull(population) || _.isEqual(openingBalance, 0) ? <PriorityHighTwoToneIcon color={"error"}/> :
            <DoneOutlinedIcon color={"success"}/>
    }

    return (<>
        <ResponsiveAppBar/>
        <div>
            <div className={classes.top}>
                <div className={classes.topLeft}>
                <span className={classes.title}><KeyboardBackspace
                    onClick={() => navigate('/dashboard')}
                    className={classes.backArrow}/> <MunicipalityName/> {getBudgetYearString(year, 0)}
                </span>
                </div>
                <div className={classes.topCenter}>
                    <em>{t('All values are in INR')}</em>
                </div>
                <div className={classes.topRight}>
                    {propertiesStatus()}
                    <ActionButton label={'Add Properties'} onClick={() => setModal(true)}/>
                    <ActionButton onClick={save} label={t(saved)} id={'dynamicWidthButton'}/>
                </div>
            </div>
            <div className={classes.mainContainer}>
                <HorizontalLine/>
                <div className={classes.budgetView}>
                    <Spreadsheet data={budgetView} columnLabels={headers(year)}
                                 onChange={(newView) => {
                                     updateView(newView);

                                 }}
                                 onActivate={onActivate}
                                 onModeChange={() => {
                                 }}/>
                </div>
                <div>
                    <Modal open={open} onClose={handleClose} className={modalClass.modal}>
                        <>
                            <BudgetLineSelector metadata={metadata} budget={budget} onSelect={(selectedItem) => {
                                dispatch(addBudgetLine(selectedItem));
                                dispatch(saveTranslations({
                                    modelName: selectedItem.name, value: selectedItem.translation, language: "mr"
                                }));
                                handleClose();
                            }} context={popupContext} onCancel={handleClose}/>
                        </>
                    </Modal>
                </div>
                <div>
                    <Modal open={modal} onClose={handleClose} className={modalClass.modal}>
                        <>
                            <BudgetPropertySelector onClose={handleClose} thePopulation={population}
                                                    openingBal={openingBalance}
                                                    onSelect={(data) => {
                                                        onClickProperties(data);
                                                        handleClose();
                                                    }}/>
                        </>
                    </Modal>
                </div>
            </div>
        </div>
    </>)
};

export default withAuthenticationRequired(BudgetDetail, {
    onRedirecting: () => <Home/>,
});
