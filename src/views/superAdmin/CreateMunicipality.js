import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {Box, Paper, TextField, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ActionButton from "../../components/ActionButton";
import * as React from "react";
import {useEffect, useState} from "react";
import _ from "lodash";
import DropDown from "../../components/DropDown";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {cityClassesSelector, fetchCityClasses} from "../../slices/cityClassReducer";
import {createNewMunicipality} from "../../slices/municipalityReducer";
import {useNavigate} from "react-router-dom";
import SuperAdminAppBar from "../../components/SuperAdminAppBar";
import {saveTranslations} from "../../slices/translationsReducer";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "../Home";
import {superAdminMenus} from "../../config";

const CreateMunicipality = () => {
    const [name, setName] = useState('');
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {cityClasses} = useSelector(cityClassesSelector);
    const [state, setState] = useState('Maharashtra');
    const [cityClass, setCityClass] = useState('');
    const [translation, setTranslation] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCityClasses());
    }, [dispatch]);

    let cityClassesList = [];
    _.forEach(cityClasses, cityClass => {
        cityClassesList.push(cityClass.name)
    })


    const handleChange = (event, type) => {
        if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'userName') {
            setCityClass(event.target.value);
        }
    }

    const handleSave = () => {
        let newUserOb = {};
        newUserOb = {
            "name": name,
            "cityClass": cityClass,
            "state": state,
            "population": 5000
        };
        dispatch(createNewMunicipality(newUserOb));
        dispatch(saveTranslations({
            modelName: name,
            value: translation,
            language: "mr"
        }))
    }
    const handleMenuClick = (data) => {
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
    const handleTranslation = (event) => {
        setTranslation(event.target.value);
    }
    const formValidation = () => {
        return !_.isEqual(name, '') && !_.isEqual(cityClass, '');
    }

    return (<Box sx={{display: 'flex'}}>
        <SuperAdminAppBar/>
        <HorizontalMenuDrawer menuList={superAdminMenus} drawerWidth={240} onClick={handleMenuClick}/>
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <Toolbar/>
            <Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '20px', paddingTop: '20px'}}>
                <Typography>Create new municipality</Typography>
                <br/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    margin: '20px',
                    gap: '20px'
                }}>
                    <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={t('Name')} defaultValue={t(name)}
                               onChange={(e) => handleChange(e, 'name')}/>
                    <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={t('Municipality name in marathi')}
                               defaultValue={translation}
                               onChange={handleTranslation}
                    />
                    <DropDown value={cityClass} sx={{maxWidth: 1 / 4}}
                              label={t("City class")} list={cityClassesList}
                              onSelect={(e) => setCityClass(e.target.value)}/>
                    <ActionButton label={t('Save')} id={"smallActionButton"}
                                  style={formValidation() ? {} : {background: "#b7e1e8"}}
                                  onClick={handleSave} disabled={!formValidation()}/>
                </div>
            </Paper>
        </Box></Box>)
}
export default withAuthenticationRequired(CreateMunicipality, {
    onRedirecting: () => <Home/>,
});