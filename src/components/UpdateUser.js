import {Box, Paper, TextField, Typography} from "@mui/material";
import ActionButton from "./ActionButton";
import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allUsersSelector, saveUser} from "../slices/allUsersReducer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import HorizontalMenuDrawer from "./HorizontalMenuDrawer";
import {adminMenus} from "../config";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate, useParams} from "react-router-dom";
import _ from "lodash";

const UpdateUser = ({data = {name: 'abc', userName: 'sdf'}}) => {
    const {users} = useSelector(allUsersSelector);
    let {userId} = useParams();

    const selectedUser = _.chain(users)
        .filter((e) => e.id == userId)
        .first()
        .value()


    const [name, setName] = useState(selectedUser.name);
    const [userName, setUserName] = useState(selectedUser.userName);
    const dispatch = useDispatch();

    const handleChange = (event, type) => {
        if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'userName') {
            setUserName(event.target.value);
        }
    }
    const handleSave = () => {


        let newUserOb = {};
        newUserOb = {
            "id": selectedUser.id,
            name,
            userName,
            "municipalityId": selectedUser.municipalityId,
            "admin": selectedUser.admin
        };
        console.log('new data', newUserOb);
        dispatch(saveUser(newUserOb));

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

    return (
        <Box sx={{display: 'flex'}}>
            <ResponsiveAppBar/>
            <HorizontalMenuDrawer menuList={adminMenus} drawerWidth={240} onClick={handleClick}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '20px', paddingTop: '20px'}}>
                    <Typography>User details</Typography>
                    <br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        margin: '20px',
                        gap: '20px'
                    }}>
                        <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={"name"} defaultValue={name}
                                   onChange={(e) => handleChange(e, 'name')}/>
                        <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={"User name"} defaultValue={userName}
                                   onChange={(e) => handleChange(e, 'userName')}/>
                        <ActionButton label={"Submit"} id={"smallActionButton"} onClick={handleSave}/>
                    </div>
                </Paper>
            </Box>
        </Box>
    )
}
export default UpdateUser;