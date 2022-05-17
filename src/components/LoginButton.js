import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const LoginButton = () => {
	const {loginWithRedirect} = useAuth0();

	return (<Button variant="contained" onClick={() => loginWithRedirect({})}>Login </Button>);
};

export default LoginButton;