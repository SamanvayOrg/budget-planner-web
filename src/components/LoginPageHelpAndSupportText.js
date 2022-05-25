import {makeStyles} from "@mui/styles";


const useStyles = makeStyles(theme => ({
	supportText: {
		position: "absolute",
		fontFamily: 'Lato',
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: "13px",
		lineHeight: "160%",
		letterSpacing: "0.01em",
		color: "#919191",
		marginTop: "10%"

	}, helpAndSupport: {
		position: "absolute",
		fontFamily: 'Lato',
		fontStyle: "normal",
		fontWeight: "700",
		fontSize: "12px",
		lineHeight: "24px",
		letterSpacing: "0.4px",
		color: "#166A8C",
		textAlign: "left",
		justifyContent: "flex-start",
	}
}))

const LoginPageHelpAndSupportText = () => {
	const classes = useStyles();
	return (
		<div className={classes.supportText}>
			If you are unable to sign in, contact your administrator
			<br/><span className={classes.helpAndSupport}>Help and support</span>
		</div>
	)

}
export default LoginPageHelpAndSupportText;