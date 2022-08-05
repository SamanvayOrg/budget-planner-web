import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import React from "react";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {superAdminMenus} from "../../config";
import {Box, Paper, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";
import ResponsiveTable from "../../components/ResponsiveTable";
import {useDispatch, useSelector} from "react-redux";
import {allUsersSelector, fetchUsers} from "../../slices/allUsersReducer";
import {useEffect} from "react";
import _ from "lodash";

const AdminUsers = () => {
    const navigate = useNavigate();
    const {users} = useSelector(allUsersSelector);
    const dispatch = useDispatch();

    const columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'email', label: 'Email', minWidth: 100},
        {id: 'municipalityId', label: 'municipalityId', minWidth: 100},

    ];
    let rows = [];

    useEffect((e) => {
        dispatch(fetchUsers());
    }, [dispatch])
    if (!_.isEmpty(users)) {
        rows = users
    }
    const rowClick = (data) => {
        handleClick('updateUser', data.id)
    }
    const handleClick = (e, id) => {
        switch (e) {
            case 'Users':
                navigate('/superAdmin/users');
                break;
            case 'Municipality':
                navigate('/superAdmin/municipalities');
                break;
            case 'updateUser':
                navigate(`/superAdmin/user/update/${id}`);
                break;
            case 'create':
                navigate('/superAdmin/user/create');
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

    )
}
export default AdminUsers;