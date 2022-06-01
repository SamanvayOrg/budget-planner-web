import {makeStyles} from "@mui/styles";
import {NavLink} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import {Link, Menu} from "@mui/material";


const useStyles = makeStyles(theme => ({
	mainContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		// paddingTop: "6%",
		paddingRight: "1%",
		fontFamily: "Lato",
		fontStyle: "normal",
		color: "#616161",
		fontWeight: "700",
		fontSize: "13px",

	}, links: {
		marginRight: "1%",
		color: "#616161",
		textDecoration: 'none'

	}

}))
const NavBarMenu = () => {
	const classes = useStyles();
	return (
		<div id="navBarRightNavigation" className={classes.mainContainer}>
			<NavLink to="/dashboard" className={classes.links}>Dashboard</NavLink>
			<NavLink to="/allBudgets" className={classes.links}>All budgets</NavLink>

		</div>
	)
}
export default NavBarMenu;