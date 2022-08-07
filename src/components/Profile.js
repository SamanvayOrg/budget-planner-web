import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutButton from "./LogoutButton";
import * as React from 'react';
import NavBarMenu from "./NavBarMenu";
import LangSelector from "./LangSelector";


const Profile = ({user, isSuperUser}) => {
    const settings = ['Profile', <LogoutButton/>];


    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    let navBarMenu = <NavBarMenu/>;
    if (isSuperUser) {
        navBarMenu = <LangSelector/>;
    }


    return (<div id="settingOnNavBar">
        {navBarMenu}
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar src={user.picture}/>
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
                <span>{setting}</span>
            </MenuItem>))}
        </Menu>
    </div>)
}
export default Profile;