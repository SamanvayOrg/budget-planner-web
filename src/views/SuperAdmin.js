import ResponsiveAppBar from "../components/ResponsiveAppBar";
import React from "react";
import HorizontalMenuDrawer from "../components/HorizontalMenuDrawer";
import {superAdminMenus} from "../config";
import {Paper, Box} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";

const SuperAdmin = () => {
    const navigate = useNavigate();


    const handleClick = (e) => {
        switch (e) {
            case 'Users':
                navigate('/superAdmin/users');
                break;
            case 'Municipality':
                navigate('/superAdmin/municipality');
                break;
            default:
                navigate('/superAdmin')
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <ResponsiveAppBar/>
            <HorizontalMenuDrawer menuList={superAdminMenus} drawerWidth={240} onClick={handleClick}/>

            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>

                <Paper><h1>Welcome to super admin </h1>
                </Paper>
            </Box>
        </Box>

    )
}
export default SuperAdmin;