import Typography from "@mui/material/Typography";
import {style} from "./EmptyBudgetBox";
import CustomModal from "./CustomModal";
import {useTranslation} from "react-i18next";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    contact: {
        cursor: "pointer",
        color: "#000000",
        '&:hover': {
            textDecoration: "none"
        }
    }
}));

const Contact = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    return (
        <Typography id="contact" className={classes.contact}>
            <CustomModal
                isButton={false}
                buttonLabel={t("Contact")}
                modalText={t("Please connect with us at: citybudgets.support@cept.ac.in")}
                style={style}
            />
        </Typography>
    )
}

export default Contact;
