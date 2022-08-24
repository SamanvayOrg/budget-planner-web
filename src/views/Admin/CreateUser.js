import {Box, FormControlLabel, Paper, Switch, TextField, Typography} from "@mui/material";
import ActionButton from "../../components/ActionButton";
import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createNewUser} from "../../slices/allUsersReducer";
import {allMunicipalityDetailsSelector} from "../../slices/municipalityReducer";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "../Home";
import Text from "../../components/Text";
import {useTranslation} from "react-i18next";
import _ from "lodash";

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const {currentMunicipality} = useSelector(allMunicipalityDetailsSelector)
    const [status, setStatus] = useState('');
    const {t} = useTranslation();

    const handleChange = (event, type) => {
        if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'email') {
            setEmail(event.target.value);
        } else if (type === 'admin') {
            if (event.target.value === 'on') {
                setIsAdmin(true)
            }
        }
    }

    const handleSave = async () => {
        let newUserOb = {};
        newUserOb = {
            name,
            "email": email,
            "admin": isAdmin,
            "municipalityId": currentMunicipality.id
        };
        const result = await dispatch(createNewUser(newUserOb));
        setStatus(result);
        setTimeout(() => {
            handleClick('Users')
        }, 5000);
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
            case 'Translations':
                navigate('/admin/translations');
                break;
            default:
                navigate('/admin')
        }
    }
    const showStatus = () => {
        if (status === 200) {
            setTimeout(() => {
                handleClick('Users')
            }, 5000);
            return <Text value={t('User added')}/>
        }
        if (status === 409) {
            return <Text style={{color: "red"}} value={t('User already present')}/>
        }
        if (status == 500) {
            return <Text style={{color: "red"}} value={t('Error during User creation')}/>
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
                        <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={"Email"} defaultValue={email}
                                   onChange={(e) => handleChange(e, 'email')}/>
                        <FormControlLabel control={<Switch onChange={(e) => (handleChange(e, 'admin'))}/>}
                                          label="Make this user an administrator"/>
                        <ActionButton
                            disabled={_.isEqual(name, '') || _.isEqual(email, '')}
                            style={!(_.isEqual(name, '') || _.isEqual(email, '')) ? {} : {background: "#b7e1e8"}}
                            label={"Submit"} id={"smallActionButton"} onClick={handleSave}/>
                        {showStatus()}
                    </div>
                </Paper>
            </Box></Box>
    )
}
export default withAuthenticationRequired(CreateUser, {
    onRedirecting: () => <Home/>,
});