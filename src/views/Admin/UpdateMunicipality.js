import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import {Box, Paper, TextField, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ActionButton from "../../components/ActionButton";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {allMunicipalityDetailsSelector, saveMunicipality} from "../../slices/municipalityReducer";
import DropDown from "../../components/DropDown";
import {useTranslation} from "react-i18next";
import {cityClassesSelector, fetchCityClasses} from "../../slices/cityClassReducer";
import _ from "lodash";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "../Home";

const UpdateMunicipality = () => {
    const {currentMunicipality} = useSelector(allMunicipalityDetailsSelector);
    const {t} = useTranslation();
    const [name, setName] = useState(currentMunicipality.name);
    const [cityClass, setCityClass] = useState(currentMunicipality.cityClass);
    const dispatch = useDispatch();
    const [editMunicipality, setEditMunicipality] = useState(false);
    let navigate = useNavigate();
    const {cityClasses} = useSelector(cityClassesSelector);

    useEffect(() => {
        dispatch(fetchCityClasses());
    }, [dispatch]);
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
            "id": currentMunicipality.id,
            "name": name,
            "cityClass": cityClass,
            "population": currentMunicipality.population
        };
        dispatch(saveMunicipality(newUserOb));
        setEditMunicipality(false);

    }
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

    let cityClassesList = [];
    _.forEach(cityClasses, cityClass => {
        cityClassesList.push(cityClass.name)
    })

    return (
        <Box sx={{display: 'flex'}}>
            <ResponsiveAppBar/>
            <HorizontalMenuDrawer menuList={adminMenus} drawerWidth={240} onClick={handleClick}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '10px', paddingTop: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Typography sx={{
                            display: 'flex', fontSize: '18px'
                        }}>{t('Municipality details')}</Typography>
                        {!editMunicipality && <Typography sx={{
                            display: 'flex',

                            marginRight: '30px',
                            color: '#4d73db',
                            cursor: 'pointer',
                            fontSize: '18px'
                        }} onClick={(e) => setEditMunicipality(true)}>{t('Edit municipality')}</Typography>}
                    </div>

                    <br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        margin: '20px',
                        gap: '20px'
                    }}>
                        <TextField disabled={!editMunicipality} sx={{maxWidth: 1 / 4}} variant="standard"
                                   label={t("Municipality name")} defaultValue={name}
                                   onChange={(e) => handleChange(e, 'name')}/>
                        <DropDown disabled={!editMunicipality} value={cityClass} sx={{maxWidth: 1 / 4}}
                                  label={t("Municipality class")} list={cityClassesList}
                                  onSelect={(e) => setCityClass(e.target.value)}/>
                        <ActionButton disabled={!editMunicipality}
                                      style={editMunicipality ? {} : {background: "#b7e1e8"}} label={"Submit"}
                                      id={"smallActionButton"}
                                      onClick={handleSave}/>
                    </div>
                </Paper>
            </Box>
        </Box>
    )
}

export default withAuthenticationRequired(UpdateMunicipality, {
    onRedirecting: () => <Home/>,
});