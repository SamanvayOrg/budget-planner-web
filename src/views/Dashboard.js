import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import UserName from "../components/UserName";
import EmptyBudgetBox from "../components/EmptyBudgetBox";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "./Home";

const useStyles = makeStyles(theme => ({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "start",
		paddingTop: "6%",
		paddingLeft: "1%",
		fontFamily: "Lato",
		fontStyle: "normal",
		color: "#616161",
		fontWeight: "700",

	}, leftUserNameText: {
		display: "flex",
		flexDirection: "row",
		fontSize: "11px",
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		marginBottom: "1%"
	}, welcomeText: {
		fontWeight: "400", fontSize: "21px", lineHeight: "25px",
	}, mmbsName: {
		fontStyle: "italic", fontSize: "21px", lineHeight: "25px", color: "black",

	}

}))

const Dashboard = () => {
	const classes = useStyles();
	return (
		<div>
			<ResponsiveAppBar/>
			<Container maxWidth="xl">
				<div className={classes.mainContainer}>
					<div className={classes.leftUserNameText}>
						HELLO <UserName/>
					</div>
					<div><span className={classes.welcomeText}>Welcome to </span>
						<span className={classes.mmbsName}>Maharashtra Municipality budgeting system.</span>
					</div>
					<EmptyBudgetBox/>
				</div>
			</Container>
		</div>
	)
};
// export default Dashboard;
export default withAuthenticationRequired(Dashboard, {
	onRedirecting: () => <Home />,
});
