import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../components/HorizontalMenuDrawer";
import ResponsiveTable from "../components/ResponsiveTable";


const AdminScreen = () => {
    let menus = ['Users'];
    const columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'userName', label: 'UserName', minWidth: 100},
        {id: 'isAdmin', label: 'Is admin', minWidth: 170, align: 'right',}
    ];
    const rows = [
        {name: "sachin", userName: "Sachink", isAdmin: "Yes"}
    ]


    return (
        <Box sx={{display: 'flex'}}>
            <ResponsiveAppBar/>
            <HorizontalMenuDrawer menuList={menus} drawerWidth={240}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <ResponsiveTable columns={columns} rows={rows}/>
            </Box>
        </Box>
    );
}
export default AdminScreen;