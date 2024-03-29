import * as React from 'react';
import Box from '@mui/material/Box';
import {Modal} from '@mui/material';
import ActionButton from './ActionButton';
import {makeStyles} from '@mui/styles';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "Lato",
        fontStyle: "normal",
    },
    modalHeading: {
        display: "flex",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "22px",
        color: "#212121",
    },
    modalSecondaryText: {
        display: "flex",
        justifyContent: "center",
        fontWeight: "400",
        fontSize: "14px",
        color: "#919191"

    },
    cancelText: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "12px",
        color: "#212121"
    }
}));

const CustomModal = ({
                         isButton = true,
                         buttonLabel,
                         buttonId,
                         style,
                         modalText,
                         dropDown,
                         actionButton,
                         cancelButton
                     }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {t} = useTranslation();

    return (<div>
        {isButton ? <ActionButton label={t(buttonLabel)} id={buttonId} onClick={handleOpen}/> :
            <div onClick={handleOpen}>{t(buttonLabel)}
            </div>}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={classes.modal}
        >
            <Box sx={style}>
				<span className={classes.modalHeading}>
					{modalText}
				</span>
                {dropDown}
                {actionButton}
                {cancelButton}
                <span className={classes.cancelText} onClick={handleClose}>{t("Close")}</span>
            </Box>
        </Modal>
    </div>);
}
export default CustomModal;
export {useStyles}