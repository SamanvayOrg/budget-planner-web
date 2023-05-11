import {useDispatch, useSelector} from "react-redux";
import {allMunicipalityDetailsSelector, saveMunicipality} from "../../slices/municipalityReducer";
import {useTranslation} from "react-i18next";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {cityClassesSelector, fetchCityClasses} from "../../slices/cityClassReducer";
import _ from "lodash";
import {Box, Paper, TextField, Typography} from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import Toolbar from "@mui/material/Toolbar";
import DropDown from "../../components/DropDown";
import ActionButton from "../../components/ActionButton";
import {makeStyles} from "@mui/styles";

const SuperAdminUpdateMunicipality = () => {
    const {allMunicipalities} = useSelector(allMunicipalityDetailsSelector);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [editMunicipality, setEditMunicipality] = useState(false);
    let navigate = useNavigate();
    const {cityClasses} = useSelector(cityClassesSelector);
    let {id} = useParams();
    const currentMunicipality = _.chain(allMunicipalities)
        .filter(municipality => municipality.id == id)
        .first()
        .value()
    const [name, setName] = useState(currentMunicipality.name);
    const [cityClass, setCityClass] = useState(currentMunicipality.cityClass);

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
                navigate('/superAdmin/users');
                break;
            case 'Municipality':
                navigate('/superAdmin/municipalities');
                break;
                navigate('/superAdmin')
        }
    }

    let cityClassesList = [];
    _.forEach(cityClasses, cityClass => {
        cityClassesList.push(cityClass.name)
    })

    function deleteMunicipality(id) {
        console.log('delete==', id)
    }

    return (<Box sx={{display: 'flex'}}>
        <ResponsiveAppBar/>
        <HorizontalMenuDrawer menuList={adminMenus} drawerWidth={240} onClick={handleClick}/>
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <Toolbar/>
            <Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '10px', paddingTop: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Typography sx={{
                        display: 'flex', fontSize: '18px'
                    }}>{t('Municipality details')}
                    </Typography>
                    <div>
                        {!editMunicipality &&
                            <ActionButton style={{background: "#00A3BA", color: "White", marginRight: 10}}
                                          onClick={(e) => setEditMunicipality(true)} label={'Edit'}/>}
                        <ActionButton style={{background: "#f44336", color: "White", marginRight: 10}}
                                      label={"Delete"}
                                      onClick={() => deleteMunicipality(currentMunicipality.id)}
                        />

                    </div>
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
    </Box>)

}

const useStyles = makeStyles(theme => ({
    deleteButton: {
        background: "#00A3BA",

    }, editButton: {
        background: "#00A3BA",

    }
}))

export default SuperAdminUpdateMunicipality;