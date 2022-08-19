import ResponsiveTable from "../../components/ResponsiveTable";
import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    allTranslationsSelector,
    getAllTranslations,
    removeTranslation,
    setCurrentTranslation
} from "../../slices/translationsReducer";
import _ from "lodash";
import {Box, Paper, Typography} from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "../Home";
import {useTranslation} from "react-i18next";

const Translations = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const columns = [
        {id: 'language', label: 'Language', minWidth: 100},
        {id: 'key', label: 'Key', minWidth: 100},
        {id: 'value', label: 'Translation', minWidth: 100},
    ];
    const rowClick = (data) => {
        dispatch(setCurrentTranslation(data));
        handleClick('updateTranslations', data.id)
    }
    let rows = [];

    useEffect((e) => {
        dispatch(getAllTranslations());
    }, [dispatch])
    const {translations} = useSelector(allTranslationsSelector);
    if (!_.isEmpty(translations)) {
        rows = translations
    }
    let navigate = useNavigate();
    const handleClick = (param, id) => {
        switch (param) {
            case 'Users':
                navigate('/admin/users');
                break;
            case 'Municipality':
                navigate('/admin/municipality');
                break;
            case 'create':
                navigate('/admin/translation/create');
                break;
            case 'updateTranslations':
                navigate(`/admin/translation/update/${id}`);
                break;
            case 'Translations':
                navigate('/admin/translations');
                break;
            default:
                navigate('/admin')
        }
    }
    const onDelete = (data) => {
        console.log('onDelete', data);
        if (window.confirm(t('Are you sure'))) {
            dispatch(removeTranslation(data.id))
        }

    }


    const renderBox = () => {

        return (
            <Box sx={{display: 'flex'}}>
                <ResponsiveAppBar/>
                <HorizontalMenuDrawer menuList={adminMenus} drawerWidth={240} onClick={handleClick}/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Paper sx={{width: '100%', overflow: 'hidden', paddingTop: "40px"}}>
                        <Typography sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginRight: '20px',
                            color: '#4d73db',
                            cursor: 'pointer'
                        }}
                                    onClick={(e) => handleClick('create')}>+ Create</Typography>
                        <ResponsiveTable columns={columns} rows={rows} onClick={rowClick} actionHeaders={true}
                                         action={'Delete'} actionClick={onDelete}/></Paper>
                </Box>
            </Box>
        );

    }

    return renderBox();
}
export default withAuthenticationRequired(Translations, {
    onRedirecting: () => <Home/>,
});