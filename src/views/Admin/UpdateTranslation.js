import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import {Box, Paper, TextField, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ActionButton from "../../components/ActionButton";
import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {allTranslationsSelector, updateTranslations} from "../../slices/translationsReducer";
import {useTranslation} from "react-i18next";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "../Home";
import _ from "lodash";
import Text from "../../components/Text";

const UpdateTranslation = () => {
    const {currentTranslation} = useSelector(allTranslationsSelector);
    const {t} = useTranslation();
    const [key, setKey] = useState(currentTranslation.key);
    const [value, setValue] = useState(currentTranslation.value);
    const [language, setLanguage] = useState(currentTranslation.language);
    const dispatch = useDispatch();
    const [editTranslation, setEditTranslation] = useState(false);
    const [status, setStatus] = useState('');
    let navigate = useNavigate();

    const handleSave = async () => {
        let newTranslationOb = {};
        newTranslationOb = {
            "id" : currentTranslation.id,
            "stateId": currentTranslation.stateId,
            "key": key,
            "value": value,
            "language": language
        }
        let retStatus = await dispatch(updateTranslations(newTranslationOb));
        setStatus(retStatus.status);
        setEditTranslation(false);
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

    const showStatus = () => {
        if (status === 200) {
            return <Text value={t('Translation modified')}/>
        }
        if (status === 404) {
            return <Text style={{color: "red"}} value={t('Translation not found')}/>
        }
    }

    return (<Box sx={{display: 'flex'}}>
        <ResponsiveAppBar/>
        <HorizontalMenuDrawer menuList={adminMenus} drawerWidth={240} onClick={handleClick}/>
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <Toolbar/>
            <Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '20px', paddingTop: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Typography sx={{
                        display: 'flex', fontSize: '18px'
                    }}>{t('Translation details')}</Typography>
                    {!editTranslation && <Typography sx={{
                        display: 'flex',

                        marginRight: '30px',
                        color: '#4d73db',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }} onClick={(e) => setEditTranslation(true)}>{t('Edit Translation')}</Typography>}
                </div>

                <br/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    margin: '20px',
                    gap: '20px'
                }}>
                    <TextField disabled={!editTranslation} sx={{maxWidth: 1 / 4}} variant="standard" label={t("Key")} defaultValue={key}
                               onChange={(e) => setKey(e.target.value)}/>
                    <TextField disabled={!editTranslation} sx={{maxWidth: 1 / 4}} variant="standard" label={t('Translation')}
                               defaultValue={value}
                               onChange={(e) => setValue(e.target.value)}/>
                    <TextField disabled={!editTranslation} sx={{maxWidth: 1 / 4}} variant="standard" label={t('Language')}
                               defaultValue={language}
                               onChange={(e) => setLanguage(e.target.value)}/>
                    <ActionButton disabled={!(editTranslation && !_.isEqual(key, '') && !_.isEqual(value, '') && !_.isEqual(language, ''))}
                                  style={editTranslation && !_.isEqual(key, '') && !_.isEqual(value, '') && !_.isEqual(language, '') ? {} : {background: "#b7e1e8"}}
                                  label={"Submit"}
                                  id={"smallActionButton"}
                                  onClick={handleSave}/>
                    {showStatus()}
                </div>
            </Paper>
        </Box>
    </Box>)
}
export default withAuthenticationRequired(UpdateTranslation, {
    onRedirecting: () => <Home/>,
});
