import {makeStyles} from "@mui/styles";
import "../styles/style.css";
import img from '../assets/loginPageImg.jpeg';
import LoginButton from "./LoginButton";
import LoginPageHelpAndSupportText from "./LoginPageHelpAndSupportText";


const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	}, container: {
		display: "flex", flexDirection: "row",

	}, img: {
		flex: "auto", width: "50%", display: "flex", justifyContent: "flex-end"
	}, box: {
		width: "50%",
		display: "flex",
		flexDirection:"column",
		justifyContent: "center",
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
		paddingBottom:"20px",
		fontSize:"24px",
		fontWeight: "1000",


	},signInName: {
		fontSize: "22px",
		fontFeatureSettings: "liga",
		color: "#212121",
		paddingBottom: "20px"
	},

}));


const LogInBox = () => {
	const classes = useStyles();
	return (

		<div className={classes.container}>
			<div className={classes.box}>
				<span className={classes.mbsName} >
					Municipality budgeting system
				</span>

				<div className={classes.signInName}>
					Sign in to your account
				</div>
				<LoginButton />
				<LoginPageHelpAndSupportText/>
			</div>
			<img src={img} className={classes.img}/>

		</div>


	);
}
export default LogInBox;