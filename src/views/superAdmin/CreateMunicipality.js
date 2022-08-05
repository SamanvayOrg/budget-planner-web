import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
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
import {createNewMunicipality, saveMunicipality} from "../../slices/municipalityReducer";
import {useNavigate} from "react-router-dom";

const CreateMunicipality = () => {
    const [name, setName] = useState('');
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {cityClasses} = useSelector(cityClassesSelector);
    const [state, setState] = useState('');
    const [cityClass, setCityClass] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCityClasses());
    }, [dispatch]);

    let cityClassesList = [];
    _.forEach(cityClasses, cityClass => {
        cityClassesList.push(cityClass.name)
    })
    let stateList = ['Maharashtra'];


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


    return (<Box sx={{display: 'flex'}}>
        <ResponsiveAppBar/>
        <HorizontalMenuDrawer menuList={adminMenus} drawerWidth={240} onClick={handleMenuClick}/>
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
                    <DropDown error={_.isNull(state)}
                              helperText={!_.isNull(state) ? '' : t('Please select state')}
                              value={state} sx={{maxWidth: 1 / 4}}
                              label={t("State")} list={stateList}
                              onSelect={(e) => setState(e.target.value)}/>
                    <DropDown error={_.isNull(cityClass)}
                              helperText={!_.isNull(cityClass) ? '' : t('Please select cityClass')}
                              value={cityClass} sx={{maxWidth: 1 / 4}}
                              label={t("City class")} list={cityClassesList}
                              onSelect={(e) => setCityClass(e.target.value)}/>
                    <ActionButton label={"Submit"} id={"smallActionButton"} onClick={handleSave}/>
                </div>
            </Paper>
        </Box></Box>)
}
export default CreateMunicipality;