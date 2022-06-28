import ResponsiveAppBar from '../components/ResponsiveAppBar';
import {makeStyles} from '@mui/styles';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import Home from './Home';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {budgetSelector, fetchBudget, saveBudget, updateBudget} from '../slices/budgetReducer';
import Spreadsheet from 'react-spreadsheet';
import {headers} from '../domain/budgetMapper';
import {GetMunicipalityName} from "../domain/functions";
import HorizontalLine from "../components/HorizontalLine";
import {KeyboardBackspace} from "@mui/icons-material";
import ActionButton from '../components/ActionButton';
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {style} from "../components/EmptyBudgetBox";
import {useStyles} from "../components/ModalWithButton";
import {GetCategory} from "../domain/functions";


const useStylesBudgetDetails = makeStyles(theme => ({

	top: {
		display: "flex",
		flexDirection: "row",
		paddingTop: "70px",
		fontFamily: "Lato",
		fontStyle: "normal",
		color: "#616161",
		fontWeight: "700",
		alignItems: "center",
		justifyContent: "space-between",
	},
	topLeft: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start"
	},topCenter: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "end",


	},
	topRight: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
		mainContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "start",
		fontFamily: "Lato",
		fontStyle: "normal",
		color: "#616161",
		fontWeight: "700",
		position: "absolute"
	},
	title: {
		fontSize: "21px",
		fontStyle: "italic",
		marginBottom: "10px",
		color: "#212121",
		marginLeft: "5px"
	}, budgetView: {
		marginTop: "10px",
		float: "left",
		overflow: "auto",
		height: "calc(100vh - 150px)",
		width: "calc(100vw - 10px)",
		marginRight: "30px"
	}, backArrow: {
		cursor: "pointer"
	}
}));

const BudgetDetail = () => {
	const navigate = useNavigate();
	const classes = useStylesBudgetDetails();
	const modalClass = useStyles();

	const {budgetView = [], budget, saved} = useSelector(budgetSelector);
	const [category, setCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [categoryDetail, setCategoryDetail] = useState('');

	let {year} = useParams();

	const dispatch = useDispatch();

	const updateView = (state) => {
		dispatch(updateBudget(state));
	}

	const save = () => {
		dispatch(saveBudget());
	}

	useEffect(() => {
		dispatch(fetchBudget(year));
	}, [dispatch, year]);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);


	const onActivate = (params) => {
		const context = budgetView[params.row][params.column].context;
		if (context.key === 'addButton') {
			return (
				handleOpen()
			)
		}
	}

	return (
		<>
			<ResponsiveAppBar/>
			<div>
				<div className={classes.top}>
					<div className={classes.topLeft}>
                <span className={classes.title}><KeyboardBackspace
	                onClick={() => navigate('/dashboard')} className={classes.backArrow}/> <GetMunicipalityName/>
                </span>
					</div>
					<div className={classes.topCenter}>
						<em>All values are in INR</em>
					</div>
					<div className={classes.topRight}>
						<ActionButton onClick={save} label={saved} id={'dynamicWidthButton'}/>
					</div>
				</div>
				<div className={classes.mainContainer}>
					<HorizontalLine/>
					<div className={classes.budgetView}>
						<Spreadsheet data={budgetView} columnLabels={headers(budget)}
						             onChange={(newView) => updateView(newView)}
						             onActivate={onActivate}/>
					</div>
					<div>
						<Modal open={open} onClose={handleClose} className={modalClass.modal}>
							<Box sx={style}>
								<span className={modalClass.modalHeading}>Add a new entry</span>
								{GetCategory(setCategory)}
								{/*{getSubCategory}*/}
								{/*{getCategoryByCodeOrParticular()}*/}
								<ActionButton label={"ADD A NEW ENTRY"} id={"addNewBudgetButton"}/>
								<span className={modalClass.cancelText} onClick={handleClose}>Cancel</span>

							</Box>
						</Modal>
					</div>
				</div>
			</div>
		</>
	)
};

export default withAuthenticationRequired(BudgetDetail, {
	onRedirecting: () => <Home/>,
});
