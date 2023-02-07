import {makeStyles} from "@mui/styles";
import "../styles/style.css";
import loginBoxMainImage from '../assets/loginImage.jpeg';
import cwasLogo from '../assets/cwas_logo.png';
import LoginButton from "./LoginButton";
import LoginPageHelpAndSupportText from "./LoginPageHelpAndSupportText";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    }, container: {
        display: "flex",
        flexDirection: "row",
    }, img: {
        flex: "auto", width: "50%", display: "flex", justifyContent: "flex-end"
    }, box: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: "auto",
        boxSizing: "border-box",
        border: "solid 1px #DEDEDE",
        borderRadius: "3px",
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: "700",

    },
    mbsName: {
        display: "flex",
        paddingBottom: "20px",
        fontSize: "24px",
        fontWeight: "1000",


    }, signInName: {
        fontSize: "22px",
        fontFeatureSettings: "liga",
        color: "#212121",
        paddingBottom: "20px"
    },
    cwasLogo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        bottom: 0
    }
}));


const LogInBox = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (

        <div className={classes.container}>
            <div className={classes.box}>
				<span className={classes.mbsName}>
					{t('City Budgets')}
				</span>

                <div className={classes.signInName}>
                    {t('Sign in to your account')}
                </div>
                <LoginButton/>
                <LoginPageHelpAndSupportText/>
                <div className={classes.cwasLogo}>
                    <img alt={'login'} src={cwasLogo} className={classes.img}/>
                </div>
            </div>
            <img alt={'login'} src={loginBoxMainImage} className={classes.img}/>
        </div>
    );
}
export default LogInBox;
