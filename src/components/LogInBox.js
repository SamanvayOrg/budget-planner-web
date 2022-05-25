import {makeStyles} from "@mui/styles";
import "../styles/style.css";
import {ReactComponent as ArrowImg} from '../assets/Arrow.svg';
import LoginButton from "./LoginButton";
import LoginPageHelpAndSupportText from "./LoginPageHelpAndSupportText";


const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	}, container: {
		display: "flex", flexDirection: "row",

	}, img: {
		flex: "auto",
		width: "50%",
		display: "flex",
		justifyContent: "flex-end"
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
	},

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
				<LoginPageHelpAndSupportText/>


			</div>
			<ArrowImg/>

		</div>


	);
}
export default LogInBox;