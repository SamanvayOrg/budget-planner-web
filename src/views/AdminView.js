import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../components/HorizontalMenuDrawer";
import ResponsiveTable from "../components/ResponsiveTable";
import {useDispatch, useSelector} from "react-redux";
import {allUsersSelector, fetchUsers} from "../slices/allUsersReducer";
import _ from "lodash";


const AdminScreen = () => {
    let menus = ['Users'];
    const columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'userName', label: 'UserName', minWidth: 100},
        {id: 'admin', label: 'Is admin', minWidth: 170, align: 'right',}
    ];
    let rows = [];

    const {users} = useSelector(allUsersSelector);
    const dispatch = useDispatch();
    useEffect((e) => {
        dispatch(fetchUsers());
    }, [dispatch])
    if (!_.isEmpty(users)) {
        rows = users
    }

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