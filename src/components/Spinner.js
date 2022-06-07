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
const Spinner = () => {
	const classes = useStyles();
	return (
		<Box className={classes.mainContainer}>
			<CircularProgress style={{color: "#166A8C"}}/>
		</Box>
	);
}
export default Spinner;