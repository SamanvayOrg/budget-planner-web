import ResponsiveTable from "../../components/ResponsiveTable";
import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {allUsersSelector, fetchUsers} from "../../slices/allUsersReducer";
import _ from "lodash";
import {Box, Paper, Typography} from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const {users} = useSelector(allUsersSelector);
    const dispatch = useDispatch();
    const rowClick = (data) => {
        handleClick('updateUser', data.id)
    }
    const columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'email', label: 'Email Id', minWidth: 100},
    ];
    let rows = [];

    useEffect((e) => {
        dispatch(fetchUsers());
    }, [dispatch])
    if (!_.isEmpty(users)) {
        rows = users
    }
    let navigate = useNavigate();
    const handleClick = (param, id) => {
        switch (param) {
            case 'Users':
                navigate('/admin/users');
                break;
            case 'Municipality':
                navigate('/admin/municipality');
                break;
            case 'create':
                navigate('/admin/user/create');
                break;
            case 'updateUser':
                navigate(`/admin/user/update/${id}`);
                break;
            case 'Translation':
                navigate('/admin/translation');
                break;
            default:
                navigate('/admin')
        }
    }


    const renderBox = () => {

        return (
            <Box sx={{display: 'flex'}}>
                <ResponsiveAppBar/>
                <HorizontalMenuDrawer menuList={adminMenus} drawerWidth={240} onClick={handleClick}/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Paper sx={{width: '100%', overflow: 'hidden', paddingTop: "40px"}}>
                        <Typography sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginRight: '20px',
                            color: '#4d73db',
                            cursor: 'pointer'
                        }}
                                    onClick={(e) => handleClick('create')}>+ Create</Typography>
                        <ResponsiveTable columns={columns} rows={rows} onClick={rowClick}/></Paper>
                </Box>
            </Box>
        );

    }

    return renderBox();
}
export default Users