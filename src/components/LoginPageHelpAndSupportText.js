import {makeStyles} from "@mui/styles";
import SelectYears from "./SelectYears";
import ActionButton from "./ActionButton";
import CustomModal from "./CustomModal";
import {style} from "./EmptyBudgetBox";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles(theme => ({
    supportText: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "13px",
        lineHeight: "160%",
        letterSpacing: "0.01em",
        color: "#919191",
        marginTop: "10px"

    }, helpAndSupport: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "12px",
        lineHeight: "24px",
        letterSpacing: "0.4px",
        color: "#166A8C",
        textAlign: "left",
        justifyContent: "flex-start",
        cursor: "pointer"
    }
}))

const LoginPageHelpAndSupportText = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <div className={classes.supportText}>
            If you are unable to sign in, contact your administrator
            <br/><span className={classes.helpAndSupport}>
			<CustomModal
                isButton={false}
                buttonLabel={t("Help & support")}
                modalText={t("Please drop a mail at: citybudgets.support@cept.ac.in")}
                style={style}
            /></span>
        </div>
    )

}
export default LoginPageHelpAndSupportText;