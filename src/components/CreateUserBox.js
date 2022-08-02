import {Box, FormControlLabel, Paper, Switch, TextField, Typography} from "@mui/material";
import ActionButton from "./ActionButton";
import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveUser} from "../slices/allUsersReducer";
import {allMunicipalityDetailsSelector} from "../slices/municipalityReducer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import HorizontalMenuDrawer from "./HorizontalMenuDrawer";
import {adminMenus} from "../config";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";

const CreateUserBox = () => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const {details} = useSelector(allMunicipalityDetailsSelector)

    const handleChange = (event, type) => {
        console.log('data in edit user', event.target.value, type);
        if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'userName') {
            setUserName(event.target.value);
        } else if (type === 'admin') {
            if (event.target.value === 'on') {
                setIsAdmin(true)
            }
        }
    }

    const handleSave = () => {
        let newUserOb = {};
        newUserOb = {
            name,
            userName,
            "admin": isAdmin
        };
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
                    <Typography>Create new user</Typography>
                    <br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        margin: '20px',
                        gap: '20px'
                    }}>
                        <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={"Name"} defaultValue={name}
                                   onChange={(e) => handleChange(e, 'name')}/>
                        <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={"User name"} defaultValue={userName}
                                   onChange={(e) => handleChange(e, 'userName')}/>
                        <FormControlLabel control={<Switch onChange={(e) => (handleChange(e, 'admin'))}/>}
                                          label="Make this user an administrator"/>
                        <ActionButton label={"Submit"} id={"smallActionButton"} onClick={handleSave}/>
                    </div>
                </Paper>
            </Box></Box>
    )
}
export default CreateUserBox;