import * as React from "react";
import ActionButton from "./ActionButton";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {useStyles} from "./ModalWithButton";
import {style} from "./EmptyBudgetBox";


const ModalWithoutButton = (modalText, dropDown, actionButton, cancelButton, openStatus) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
    if (openStatus) {
        handleOpen();
    }
    return (<div>
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
                <span className={classes.cancelText} onClick={handleClose}>Cancel</span>

            </Box>
        </Modal>
    </div>);
}
export default ModalWithoutButton;