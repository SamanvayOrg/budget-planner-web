import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import Typography from "@mui/material/Typography";
import {logOut} from "../slices/authReducer";
import {useDispatch} from "react-redux";
import localAuthEnabled from "../auth/localAuthEnabled";

const isLocalAuth = localAuthEnabled;

const LogoutButton = () => {
	const {logout} = useAuth0();
	const dispatch = useDispatch();

	const onPressLogout = () => {
		localStorage.removeItem('authToken');
		dispatch(logOut());
		if (isLocalAuth) {
			// Real Auth0 logout() redirects to the hosted logout endpoint, which fails
			// against the placeholder client credentials in local-auth mode.
			window.location.hash = "#/local-login";
			window.location.reload();
			return;
		}
		logout({returnTo: ""});
	}

	return (
		<Typography
			onClick={onPressLogout}>
			Log Out
		</Typography>
	);
};

export default LogoutButton;