import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import ActionButton from './ActionButton';
import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import {Modal} from '@mui/material';
import {useStyles} from './ModalWithButton';
import DropDown from './DropDown';
import {downloadBudgetExcel, updateBudgetStatus} from '../slices/budgetReducer';
import {useDispatch} from 'react-redux';

const styleSheets = makeStyles(theme => ({
    box: {
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        width: '100%',
        background: ' #FFFFFF',
        border: '1px solid #DEDEDE',
        borderRadius: '3px',
        justifyContent: 'space-between',
        marginTop: '2%',
        gap: '2vw',
        paddingTop: '1%',
        paddingBottom: '1%',
        fontSize: '15px',
        fontWeight: '400',
        fontFamily: 'Lato',
    }, insideBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '0.5vw',
        color: '#212121',
        fontSize: '19px',
        marginLeft: '1%',
    }, lastUpdateText: {
        display: 'flex',
        fontSize: '11px',
        textTransform: 'uppercase',
        color: '#616161',
    }, actionButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '11px',
        textTransform: 'uppercase',
        color: '#616161',
        marginRight: '1%',
    }, modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Lato',
        fontStyle: 'normal',
    }, cancelText: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '12px',
        color: '#212121'
    }, modalDiv: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '20%',
        background: 'whitesmoke',
        border: '0px  #000',
        boxShadow: '0px 0px 4px  #000000',
        p: 4,
        gap: '1vw',
        padding: '25px 25px 25px 25px'
    }

}));
const BudgetBox = ({
                       versionName,
                       lastUpdated,
                       index,
                       firstButtonAction,
                       secondButtonAction,
                       budget
                   }) => {
    console.log('budget', budget);
    const dispatch = useDispatch();
    const budgetStatusInfo = budget.budgetStatusAuditContract;
    const {t} = useTranslation();
    const classes = styleSheets();
    const modalClass = useStyles();
    const reportTypes = ['ACTUALS', 'BUDGETED', 'ESTIMATES'];
    const [selectedReport, setSelectedReport] = useState('BUDGETED');
    const budgetAllStatuses = budgetStatusInfo.allowedNextBudgetStatuses;
    const [currentStatus, setCurrentStatus] = useState(budgetStatusInfo.currentBudgetStatus);
    const [changedStatus, setChangedStatus] = useState(currentStatus);
    const [openBudgetStatus, setOpenBudgetStatus] = React.useState(false);
    const handleOpenBudgetStatus = () => setOpenBudgetStatus(true);
    const handleCloseBudgetStatus = () => setOpenBudgetStatus(false);
    const [openBudgetDownload, setOpenBudgetDownload] = React.useState(false);
    const handleOpenBudgetDownload = () => setOpenBudgetDownload(true);
    const handleCloseBudgetDownload = () => setOpenBudgetDownload(false);

    const onStateChange = (e) => {
        console.log('status', e.target.value);
        setCurrentStatus(changedStatus);
        dispatch(updateBudgetStatus(budget.id, changedStatus));
        handleCloseBudgetStatus();
    };

    const onReportDownloadStateChange = (e) => {
        dispatch(downloadBudgetExcel(budget.budgetYear.substring(0, 4), selectedReport));
        handleCloseBudgetDownload();
    };


    return (
        <Box className={classes.box} key={index}>
			<span className={classes.insideBox}>
				<div className={classes.lastUpdateText}>
					{lastUpdated}
				</div>

                {versionName}

                <div>
                <ActionButton label={t(currentStatus)} variant="outlined" onClick={handleOpenBudgetStatus}/>
                <Modal open={openBudgetStatus} onClose={handleCloseBudgetStatus} className={modalClass.modal}>
                        <div className={classes.modalDiv}>
                            <DropDown list={budgetAllStatuses} value={changedStatus}
                                      onSelect={(e) => setChangedStatus(e.target.value)}/>
                            <ActionButton label={t('Save')} id={'addNewBudgetButton'} onClick={onStateChange}/>
                            <span className={classes.cancelText} onClick={handleCloseBudgetStatus}>Cancel</span>
                        </div>
                </Modal>
            </div>


			</span>
            <span className={classes.actionButtons}>
				<ActionButton style={{marginLeft: '10px'}} key={index.key} onClick={handleOpenBudgetDownload}
                              label={t('DOWNLOAD')}
                              id={'smallActionButton'}/>
                <Modal open={openBudgetDownload} onClose={handleCloseBudgetDownload} className={modalClass.modal}>
                        <div className={classes.modalDiv}>
                            <div className={classes.lastUpdateText}>
                                <span>Select the type of report to be downloaded</span>
                            </div>
                            <DropDown list={reportTypes} value={selectedReport}
                                      onSelect={(e) => setSelectedReport(e.target.value)}/>
                            <ActionButton label={t('Save')} id={'downloadReportButton'}
                                          onClick={onReportDownloadStateChange}/>
                            <span className={classes.cancelText} onClick={handleCloseBudgetDownload}>Cancel</span>
                        </div>
                </Modal>

				<ActionButton style={{marginLeft: '10px'}} key={index} onClick={secondButtonAction}
                              label={t('EDIT BUDGET')}
                              id={'smallActionButton'}/>
			</span>
        </Box>

    );
};
export default BudgetBox;
