import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../components/HorizontalMenuDrawer";
import AllUsers from "./AllUsers";
import {useState} from "react";
import Municipalities from "./Municipalities";


const AdminScreen = () => {
    let menus = ['Users', 'Municipality'];
    const [selectedMenu, setSelectedMenu] = useState('Users');
    const handleClick = (data) => {
        setSelectedMenu(data)

    }

    const renderBox = () => {
        if (selectedMenu === 'Users') {
            return <AllUsers/>
        }
        if (selectedMenu === 'Municipality') {
            return <><Municipalities/></>
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <ResponsiveAppBar/>
            <HorizontalMenuDrawer menuList={menus} drawerWidth={240} onClick={handleClick}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                {renderBox()}
            </Box>
        </Box>
    );
}
export default AdminScreen;