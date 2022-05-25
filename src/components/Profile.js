import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import LogoutButton from "./LogoutButton";
import * as React from 'react';


const Profile = (user, ...props) => {
	const settings = ['Profile', 'Change password', <LogoutButton/>];


	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	console.log('uss-->', user.user.picture);


	return (<div id="settingOnNavBar">
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
					<Avatar src={user.user.picture}/>
				</IconButton>
			</Tooltip>
			<Menu
				sx={{mt: '45px'}}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top', horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top', horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map((setting) => (<MenuItem key={setting} onClick={handleCloseUserMenu}>
						<Typography textAlign="center">{setting}</Typography>
					</MenuItem>))}
			</Menu>
		</div>)
}
export default Profile;