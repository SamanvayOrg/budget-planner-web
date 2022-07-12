import {makeStyles} from "@mui/styles";
import {NavLink} from "react-router-dom";
import {t} from "i18next";
import LangSelector from "./LangSelector";


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
			<LangSelector/>
			<NavLink to="/dashboard" className={classes.links}>{t('Dashboard')}</NavLink>
			<NavLink to="/allBudgets" className={classes.links}>{t('All budgets')}</NavLink>

		</div>
	)
}
export default NavBarMenu;