import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import ActionButton from "./ActionButton";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {Modal} from "@mui/material";
import {useStyles} from "./ModalWithButton";
import DropDown from "./DropDown";

const styleSheets = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "row",
        boxSizing: "border-box",
        width: "100%",
        background: " #FFFFFF",
        border: "1px solid #DEDEDE",
        borderRadius: "3px",
        justifyContent: "space-between",
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
        justifyContent: "flex-start",
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
        justifyContent: "flex-end",
        fontSize: "11px",
        textTransform: "uppercase",
        color: "#616161",
        marginRight: "1%",
    }, modal: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "Lato",
        fontStyle: "normal",
    }, cancelText: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "12px",
        color: "#212121"
    }, modalDiv: {
        position: 'absolute',
        display: "flex",
        flexDirection: "column",
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "20%",
        background: "whitesmoke",
        border: '0px  #000',
        boxShadow: "0px 0px 4px  #000000",
        p: 4,
        gap: "1vw",
        padding: "25px 25px 25px 25px"
    }

}))
const BudgetBox = ({
                       versionName,
                       lastUpdated,
                       index,
                       firstButtonAction,
                       secondButtonAction,
                   }) => {
    const {t} = useTranslation();
    const classes = styleSheets();
    const modalClass = useStyles();
    const [budgetAllStatus, setBudgetAllStatus] = useState(['Draft', 'Approved by GBM', 'Approved by district']);
    const [currentStatus, setCurrentStatus] = useState('Draft');
    const [changedStatus, setChangedStatus] = useState(currentStatus);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onStateChange = () => {
        setCurrentStatus(changedStatus);
        handleClose();
    }


    return (
        <Box className={classes.box} key={index}>
			<span className={classes.insideBox}>
				<div className={classes.lastUpdateText}>
					{lastUpdated}
				</div>

                {versionName}

                <div>
                <ActionButton label={t(currentStatus)} variant="outlined" onClick={handleOpen}/>
                <Modal open={open} onClose={handleClose} className={modalClass.modal}>
                        <div className={classes.modalDiv}>
                            <DropDown list={budgetAllStatus} value={changedStatus}
                                      onSelect={(e) => setChangedStatus(e.target.value)}/>
                            <ActionButton label={t("Save")} id={"addNewBudgetButton"} onClick={onStateChange}/>
                            <span className={classes.cancelText} onClick={handleClose}>Cancel</span>
                        </div>
                    </Modal>
            </div>


			</span>
            <span className={classes.actionButtons}>
				<ActionButton style={{marginLeft: '10px'}} key={index.key} onClick={firstButtonAction}
                              label={t("DOWNLOAD")}
                              id={"smallActionButton"}/>

				<ActionButton style={{marginLeft: '10px'}} key={index} onClick={secondButtonAction}
                              label={t("EDIT BUDGET")}
                              id={"smallActionButton"}/>
			</span>
        </Box>

    )
}
export default BudgetBox;