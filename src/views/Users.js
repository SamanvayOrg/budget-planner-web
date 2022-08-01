import ResponsiveTable from "../components/ResponsiveTable";
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {allUsersSelector, fetchUsers} from "../slices/allUsersReducer";
import _ from "lodash";
import EditUser from "../components/EditUser";
import {Box, Paper, Typography} from "@mui/material";
import CreateUserBox from "../components/CreateUserBox";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../components/HorizontalMenuDrawer";
import {adminMenus} from "../config";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const [user, setUser] = useState(null);
    const [create, setCreate] = useState(null);
    const {users} = useSelector(allUsersSelector);
    const dispatch = useDispatch();
    const rowClick = (data) => {
        console.log('clickedfs---', JSON.stringify(data), data.id);
        setUser(data);
    }
    const columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'userName', label: 'UserName', minWidth: 100},
    ];
    let rows = [];

    useEffect((e) => {
        dispatch(fetchUsers());
    }, [dispatch])
    if (!_.isEmpty(users)) {
        rows = users
    }
    let navigate = useNavigate();
    const handleClick = (data) => {
        switch (data) {
            case 'Users':
                navigate('/admin/users');
                break;
            case 'Municipality':
                navigate('/admin/municipality');
                break;
            default:
                navigate('/admin')
        }
    }


    const renderBox = () => {
        if (_.isNull(user)) {
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
                                color: 'blue',
                                cursor: 'pointer'
                            }}
                                        onClick={event => {
                                            setCreate(1)
                                            console.log('clicked', setUser(null))
                                        }}
                            >+ Create</Typography>
                            <ResponsiveTable columns={columns} rows={rows} onClick={rowClick}/></Paper>
                    </Box>
                </Box>
            );
        } else {
            return (<EditUser data={user}/>);
        }
    }
    if (_.isNull(create)) {
        return renderBox()
    } else return <CreateUserBox/>;
}
export default Users