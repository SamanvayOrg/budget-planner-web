import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import {ReactComponent as MBSLogo} from "../assets/MBSLogo.svg";
import * as React from "react";
import Profile from "./Profile";
import {useAuth0} from "@auth0/auth0-react";

const SuperAdminAppBar = () => {
    const {user} = useAuth0();
    return (
        <AppBar id="navBar" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a href="/dashboard"><MBSLogo/></a>
                    <Profile user={user} isSuperUser={'true'}/>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default SuperAdminAppBar;