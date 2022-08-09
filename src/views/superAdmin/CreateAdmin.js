import {Box, Paper, TextField, Typography} from "@mui/material";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {superAdminMenus} from "../../config";
import Toolbar from "@mui/material/Toolbar";
import ActionButton from "../../components/ActionButton";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {createNewAdmin} from "../../slices/allUsersReducer";
import {useDispatch, useSelector} from "react-redux";
import {allMunicipalityDetailsSelector, fetchAllMunicipalities} from "../../slices/municipalityReducer";
import DropDown from "../../components/DropDown";
import _ from "lodash";
import SuperAdminAppBar from "../../components/SuperAdminAppBar";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "../Home";

const CreateAdmin = () => {
    const {t} = useTranslation();
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [municipality, setMunicipality] = useState('');
    const isAdmin = true;
    const dispatch = useDispatch();
    const {allMunicipalities} = useSelector(allMunicipalityDetailsSelector);
    useEffect((e) => {
        dispatch(fetchAllMunicipalities())
    }, [dispatch])

    const handleChange = (event, type) => {
        if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'email') {
            setEmail(event.target.value);
        }
    }

    let municipalityList = [];
    _.forEach(allMunicipalities, municipality => {
        municipalityList.push(municipality.name);
    })
    const handleSave = () => {
        let newUserOb = {};
        const selectedMunicipality = _.chain(allMunicipalities)
            .filter((e) => e.name === municipality)
            .first()
            .value()

        newUserOb = {
            name,
            "email": email,
            "admin": isAdmin,
            "municipalityId": selectedMunicipality.id
        };
        dispatch(createNewAdmin(newUserOb, selectedMunicipality.id));
    }
    const handleClick = (data) => {
        switch (data) {
            case 'Users':
                navigate('/superAdmin/users');
                break;
            case 'Municipality':
                navigate('/superAdmin/municipalities');
                break;
            default:
                navigate('/superAdmin')
        }
    }
    const formValidation = () => {
        return !_.isEqual(name, '') && !_.isEqual(email, '') && !_.isEqual(municipality, '');
    }

    return (
        <Box sx={{display: 'flex'}}>
            <SuperAdminAppBar/>
            <HorizontalMenuDrawer menuList={superAdminMenus} drawerWidth={240} onClick={handleClick}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '20px', paddingTop: '20px'}}>
                    <Typography>{t('Create new admin')}</Typography>
                    <br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        margin: '20px',
                        gap: '20px'
                    }}>
                        <TextField required
                                   sx={{maxWidth: 1 / 4}} variant="standard" label={"Name"} defaultValue={name}
                                   onChange={(e) => handleChange(e, 'name')}/>
                        <TextField required
                                   sx={{maxWidth: 1 / 4}} variant="standard" label={"Email id"} defaultValue={email}
                                   onChange={(e) => handleChange(e, 'email')}/>
                        <DropDown error={_.isEqual(municipality, '')}
                                  helperText={!_.isEqual(municipality, '') ? '' : t('Please select municipality')}
                                  value={municipality} sx={{maxWidth: 1 / 4}}
                                  label={t("Municipality")} list={municipalityList}
                                  onSelect={(e) => setMunicipality(e.target.value)}/>
                        <ActionButton label={"Submit"} id={"smallActionButton"} disabled={!formValidation()}
                                      onClick={handleSave}/>
                    </div>
                </Paper>
            </Box></Box>
    )
}
export default withAuthenticationRequired(CreateAdmin, {
    onRedirecting: () => <Home/>,
});