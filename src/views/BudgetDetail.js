import ResponsiveAppBar from '../components/ResponsiveAppBar';
import {makeStyles} from '@mui/styles';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import Home from './Home';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {budgetSelector, fetchBudget, updateBudget} from '../slices/budgetReducer';
import Spreadsheet from 'react-spreadsheet';
import {headers} from '../domain/budgetMapper';
import {GetMunicipalityName} from "../domain/functions";
import HorizontalLine from "../components/HorizontalLine";
import {KeyboardBackspace} from "@mui/icons-material";

const useStyles = makeStyles(theme => ({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "start",
		paddingTop: "70px",
		fontFamily: "Lato",
		fontStyle: "normal",
		color: "#616161",
		fontWeight: "700",
		position: "absolute"
	}, title: {

		fontSize: "21px",
		fontStyle: "italic",
		marginBottom: "10px",
		color: "#212121",
		marginLeft: "5px"
	}, budgetView: {
		marginTop: "10px"
	},
}));

const BudgetDetail = () => {
	const navigate = useNavigate();
	const classes = useStyles();

	const {budgetView = [], budget} = useSelector(budgetSelector);

	let {year} = useParams();

	const dispatch = useDispatch();

	const updateView = (state) => {
		dispatch(updateBudget(state));
	}

	useEffect(() => {
		dispatch(fetchBudget(year));
	}, [dispatch, year]);

	return (
		<>
			<ResponsiveAppBar/>
			<div className={classes.mainContainer}>
                <span className={classes.title}><KeyboardBackspace
	                onClick={() => navigate('/dashboard')} /> <GetMunicipalityName/>
                </span>
				<HorizontalLine width={"100%"}/>
				<div className={classes.budgetView}>
					<Spreadsheet data={budgetView} columnLabels={headers(budget)}
					             onChange={updateView}
					/>
				</div>
			</div>
		</>
	)
};

export default withAuthenticationRequired(BudgetDetail, {
	onRedirecting: () => <Home/>,
});
