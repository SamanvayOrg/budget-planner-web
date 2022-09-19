import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import Typography from "@mui/material/Typography";
import {logOut} from "../slices/authReducer";
import {useDispatch} from "react-redux";

const LogoutButton = () => {
	const {logout} = useAuth0();
	const dispatch = useDispatch();

	const onPressLogout = () => {
		localStorage.removeItem('authToken');
		dispatch(logOut());
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