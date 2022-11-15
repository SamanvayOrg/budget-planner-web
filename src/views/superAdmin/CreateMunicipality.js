import HorizontalMenuDrawer from '../../components/HorizontalMenuDrawer';
import {Box, Paper, TextField, Typography} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import ActionButton from '../../components/ActionButton';
import * as React from 'react';
import {useEffect, useState} from 'react';
import _ from 'lodash';
import DropDown from '../../components/DropDown';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {cityClassesSelector, fetchCityClasses} from '../../slices/cityClassReducer';
import {createNewMunicipality} from '../../slices/municipalityReducer';
import {useNavigate} from 'react-router-dom';
import SuperAdminAppBar from '../../components/SuperAdminAppBar';
import {saveTranslations} from '../../slices/translationsReducer';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import Home from '../Home';
import {superAdminMenus} from '../../config';
import Text from '../../components/Text';
import {fetchState, stateSelector} from '../../slices/stateReducer';

const CreateMunicipality = () => {
    const [name, setName] = useState('');
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {cityClasses} = useSelector(cityClassesSelector);
    const state = 'Maharashtra';
    const [cityClass, setCityClass] = useState('');
    const [translation, setTranslation] = useState('');
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCityClasses());
        dispatch(fetchState());
    }, [dispatch]);
    let cityClassesList = [];
    _.forEach(cityClasses, cityClass => {
        cityClassesList.push(cityClass.name);
    });
    const {stateDetails} = useSelector(stateSelector);


    const handleChange = (event, type) => {
        if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'userName') {
            setCityClass(event.target.value);
        }
    };

    const handleSave = async () => {
        let newUserOb = {};
        newUserOb = {
            'name': name,
            'cityClass': cityClass,
            'state': state,
            'population': 5000
        };
        const translationSaveResult = await dispatch(saveTranslations({
            stateId: stateDetails.id,
            key: name,
            value: translation,
            language: stateDetails.languages.filter(lang => lang.code !== 'en')[0].code
        }));
        if (translationSaveResult.status === 200) {
            const result = await dispatch(createNewMunicipality(newUserOb));
            setStatus(result);
        } else {
            setStatus(translationSaveResult.status);
        }
    };
    const handleClick = (data) => {
        switch (data) {
            case 'Users':
                navigate('/superAdmin/users');
                break;
            case 'Municipality':
                navigate('/superAdmin/municipalities');
                break;
            case 'Usage':
                navigate('/superAdmin/usage');
                break;
            default:
                navigate('/superAdmin');
        }
    };
    const handleTranslation = (event) => {
        setTranslation(event.target.value);
    };
    const formValidation = () => {
        return !_.isEqual(name, '') && !_.isEqual(cityClass, '');
    };
    const showStatus = () => {
        if (status === 200) {
            setTimeout(() => {
                handleClick('Municipality');
            }, 5000);
            return <Text value={t('Municipality added')}/>;
        }
        if (status === 409 || status === 400) {
            return <Text style={{color: 'red'}} value={t('Municipality already present')}/>;
        }
        if (status === 500) {
            return <Text style={{color: 'red'}} value={t('Error during Municipality creation')}/>;
        }
    };

    return (<Box sx={{display: 'flex'}}>
        <SuperAdminAppBar/>
        <HorizontalMenuDrawer menuList={superAdminMenus} drawerWidth={240} onClick={handleClick}/>
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
                              label={t('City class')} list={cityClassesList}
                              onSelect={(e) => setCityClass(e.target.value)}/>
                    <ActionButton label={t('Save')} id={'smallActionButton'}
                                  style={formValidation() ? {} : {background: '#b7e1e8'}}
                                  onClick={handleSave} disabled={!formValidation()}/>
                    {showStatus()}
                </div>
            </Paper>
        </Box></Box>);
};
export default withAuthenticationRequired(CreateMunicipality, {
    onRedirecting: () => <Home/>,
});
