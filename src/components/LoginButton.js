import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles(theme => ({
	loginButton: {
		width: "316px",
		height: "48px",
	},
}));

const LoginButton = () => {
	const classes = useStyles();
	const {loginWithRedirect} = useAuth0();

	return (<Button id="logButton" type="submit"  className={classes.loginButton} variant="contained"
	                onClick={() => loginWithRedirect({})}>Login </Button>);
};

export default LoginButton;