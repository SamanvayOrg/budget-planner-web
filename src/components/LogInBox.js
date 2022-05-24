import {makeStyles} from "@mui/styles";
import "../styles/style.css";
import {ReactComponent as ArrowImg} from '../assets/Arrow.svg';
import LoginButton from "./LoginButton";


const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	}, container: {
		display: "flex", flexDirection: "row",

	}, img: {
		flex: "auto",
		width: "50%",
		display: "flex",
		justifyContent:  "flex-end"
	}, box: {
		width: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: "auto",
		boxSizing: "border-box",
		border: "solid 1px #DEDEDE",
		borderRadius: "3px",
		marginTop: "3%",
		marginBottom: "3%",

	}, signInName: {
		position: "absolute",
		fontFamily: 'Lato',
		fontStyle: "normal",
		fontWeight: "700",
		fontSize: "22px",
		fontFeatureSettings: "liga",
		color: "#212121",
		paddingBottom: "10%"
	}, supportText: {
		position: "absolute",
		fontFamily: 'Lato',
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: "13px",
		lineHeight: "160%",
		letterSpacing: "0.01em",
		color: "#919191",
		paddingTop: "10%"

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

}));


const LogInBox = () => {
	const classes = useStyles();
	return (

		<div className={classes.container}>
			<div className={classes.box}>

				<div className={classes.signInName}>
					Sign in to your account
				</div>
				<LoginButton/>
				<div className={classes.supportText}>
					If you are unable to sign in, contact your administrator
					<br/><span className={classes.helpAndSupport}>Help and support</span>
				</div>

			</div>
			<ArrowImg/>

		</div>


	);
}
export default LogInBox;