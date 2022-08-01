import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../components/HorizontalMenuDrawer";
import Users from "./Users";
import Municipality from "./Municipality";


const AdminScreen = () => {
    let menus = ['Users', 'Municipality'];
    const [selectedMenu, setSelectedMenu] = useState('Users');
    const handleClick = (data) => {
        setSelectedMenu(data)

    }

    const renderBox = () => {
        switch (selectedMenu) {
            case 'Users':
                return <Users/>
                break;
            case 'Municipality':
                return <Municipality/>
                break;
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