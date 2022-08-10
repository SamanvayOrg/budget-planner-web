import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import * as React from "react";
import {useEffect, useState} from "react";
import {Box, Paper, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import ActionButton from "../../components/ActionButton";
import {useDispatch, useSelector} from "react-redux";
import {saveTranslations} from "../../slices/translationsReducer";
import {useTranslation} from "react-i18next";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "../Home";
import {fetchState, stateSelector} from "../../slices/stateReducer";
import _ from "lodash";

const Translation = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [translation, setTranslation] = useState('');
    const [key, setKey] = useState('');
    useEffect(() => {
        dispatch(fetchState())
    }, [dispatch]);
    const {stateDetails} = useSelector(stateSelector);
    const handleClick = (data) => {
        switch (data) {
            case 'Users':
                navigate('/admin/users');
                break;
            case 'Municipality':
                navigate('/admin/municipality');
                break;
            case 'Translation':
                navigate('/admin/translation');
                break;
            default:
                navigate('/admin')
        }
    }


    const handleSave = () => {
        let retStatus = dispatch(saveTranslations({
            stateId: stateDetails.id,
            key,
            value: translation,
            language: stateDetails.languages.filter(lang => lang.code !== 'en')[0].code
        }));
        console.log('ret',retStatus);
    }



    return (<Box sx={{display: 'flex'}}>
            <ResponsiveAppBar/>
            <HorizontalMenuDrawer menuList={adminMenus} drawerWidth={240} onClick={handleClick}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '20px', paddingTop: '20px'}}>
                    <Typography>{t('Add translations')}</Typography>
                    <br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        margin: '20px',
                        gap: '20px'
                    }}>
                        <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={t("Key")} defaultValue={key}
                                   onChange={(e) => setKey(e.target.value)}/>
                        <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={t('Translation')}
                                   defaultValue={translation}
                                   onChange={(e) => setTranslation(e.target.value)}/>
                        <ActionButton label={t('Save')}
                                      disabled={_.isEqual(key, '') || _.isEqual(translation, '')}
                                      style={!(_.isEqual(key, '') || _.isEqual(translation, ''))? {} : {background: "#b7e1e8"}} label={"Submit"}
                                      id={"smallActionButton"} onClick={handleSave}/>
                    </div>
                </Paper>
            </Box>
        </Box>
    )
}
export default withAuthenticationRequired(Translation, {
    onRedirecting: () => <Home/>,
});