import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutButton from "./LogoutButton";
import * as React from 'react';
import NavBarMenu from "./NavBarMenu";
import LangSelector from "./LangSelector";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {currentUserSelector} from "../slices/currentUserReducer";
import {roleLabelFor} from "../config";


const Profile = ({user = {}, isSuperUser}) => {
    // Read the signed-in user from our own API rather than from the Auth0 profile: Auth0
    // knows nothing about municipality roles, so under real Auth0 the `user` prop has no
    // role on it at all. This is the same source NavBarMenu uses for its admin check.
    const {user: currentUser} = useSelector(currentUserSelector);
    const {t} = useTranslation();
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
            <Box sx={{px: 2, py: 1, minWidth: 200}}>
                <Typography variant="subtitle2" sx={{fontWeight: 600}}>
                    {currentUser?.name || user.name || ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {currentUser?.email || ''}
                </Typography>
                <Typography variant="body2" sx={{mt: 0.5}} data-testid="profile-role">
                    {t('Role')}: {roleLabelFor(currentUser?.role)}
                </Typography>
            </Box>
            <Divider/>
            {settings.map((setting) => (<MenuItem key={setting} onClick={handleCloseUserMenu}>
                <span>{setting}</span>
            </MenuItem>))}
        </Menu>
    </div>)
}
export default Profile;