import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles(theme => ({
	mainContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",



	},
}));
export default function CircularColor() {
	const classes = useStyles();
	return (
		<Box className={classes.mainContainer}  >
			<CircularProgress />
		</Box>
	);
}