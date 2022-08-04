import {Box, FormControlLabel, Paper, Switch, TextField, Typography} from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import Toolbar from "@mui/material/Toolbar";
import ActionButton from "../../components/ActionButton";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {createNewUser} from "../../slices/allUsersReducer";
import {useDispatch, useSelector} from "react-redux";
import {allMunicipalityDetailsSelector, fetchAllMunicipalities} from "../../slices/municipalityReducer";
import DropDown from "../../components/DropDown";
import _ from "lodash";

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
        newUserOb = {
            name,
            "email": email,
            "isAdmin": isAdmin,
            "municipalityId": municipality.id
        };
    }
    const handleClick = (data) => {
        switch (data) {
            case 'Users':
                navigate('/admin/users');
                break;
            case 'Municipality':
                navigate('/admin/municipality');
                break;
            default:
                navigate('/superAdmin')
        }
    }
    return (
        <Box sx={{display: 'flex'}}>
            <ResponsiveAppBar/>
            <HorizontalMenuDrawer menuList={adminMenus} drawerWidth={240} onClick={handleClick}/>
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
                        <TextField error={_.isEqual(name,'')}
                                   helperText={!_.isEqual(name,'') ? '' : t('Please enter name')} sx={{maxWidth: 1 / 4}} variant="standard" label={"Name"} defaultValue={name}
                                   onChange={(e) => handleChange(e, 'name')}/>
                        <TextField error={_.isEqual(email,'')}
                                   helperText={!_.isEqual(email,'') ? '' : t('Please enter email')}
                            sx={{maxWidth: 1 / 4}} variant="standard" label={"Email id"} defaultValue={email}
                                   onChange={(e) => handleChange(e, 'email')}/>
                        <DropDown error={_.isEqual(municipality,'')}
                                  helperText={!_.isEqual(municipality,'') ? '' : t('Please enter email')}
                                  value={municipality} sx={{maxWidth: 1 / 4}}
                                  label={t("Municipality class")} list={municipalityList}
                                  onSelect={(e) => setMunicipality(e.target.value)}/>
                        <ActionButton label={"Submit"} id={"smallActionButton"} onClick={handleSave}/>
                    </div>
                </Paper>
            </Box></Box>
    )
}
export default CreateAdmin;