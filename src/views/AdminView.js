import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../components/HorizontalMenuDrawer";


const AdminScreen = () => {
    let menus = ['Users'];
    return (
        <Box sx={{display: 'flex'}}>
            <ResponsiveAppBar/>
            <HorizontalMenuDrawer menuList={menus} drawerWidth={240}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                
            </Box>
        </Box>
    );
}
export default AdminScreen;