import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import "../styles/style.css";
import {ReactComponent as MBSLogo} from '../assets/MBSLogo.svg';
import Profile from "./Profile";
import {useAuth0} from "@auth0/auth0-react";
import NavBarNavigationBeforeAuth from "./NavBarNavigationBeforeAuth";
import NavBarMenu from "./NavBarMenu";


const ResponsiveAppBar = () => {
	const {user, isAuthenticated} = useAuth0();

	let endView = <NavBarNavigationBeforeAuth/>;
	if (isAuthenticated) {
		endView =  <Profile user={user}/>
	}


	return (
		<AppBar id="navBar">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<MBSLogo/>
					{endView}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
