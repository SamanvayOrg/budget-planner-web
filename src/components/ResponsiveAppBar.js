import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import "../styles/style.css";
import Profile from "./Profile";
import {useAuth0} from "@auth0/auth0-react";
import NavBarNavigationBeforeAuth from "./NavBarNavigationBeforeAuth";
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Logo from './Logo';


const ResponsiveAppBar = () => {
	const {user, isAuthenticated} = useAuth0();

	let endView = <NavBarNavigationBeforeAuth/>;
	if (isAuthenticated) {
		endView = <Profile user={user} />
	}
	const navigate = useNavigate();

	return (
		<AppBar id="navBar" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Button onClick={() => navigate('/')}><Logo/></Button>
					{endView}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
