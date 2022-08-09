import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import {Box, Paper, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ResponsiveTable from "../../components/ResponsiveTable";
import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allMunicipalityDetailsSelector, fetchAllMunicipalities} from "../../slices/municipalityReducer";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import SuperAdminAppBar from "../../components/SuperAdminAppBar";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "../Home";

const SuperAdminMunicipalities = () => {
    const {allMunicipalities} = useSelector(allMunicipalityDetailsSelector);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchAllMunicipalities());
    }, [dispatch]);

    const columns = [
        {id: 'name', label: 'Municipality name', minWidth: 170},
        {id: 'state', label: 'State', minWidth: 100},
        {id: 'cityClass', label: 'Municipality class', minWidth: 170,}
    ];

    let rows = [];
    if (!_.isEmpty(allMunicipalities)) {
        rows = allMunicipalities
    }
    const rowClick = (data) => {
        // handleClick('updateMunicipality', data.id)
    }
    const handleClick = (param, id) => {
        switch (param) {
            case 'Users':
                navigate('/superAdmin/users');
                break;
            case 'Municipality':
                navigate('/superAdmin/municipalities');
                break;
            case 'updateMunicipality':
                navigate(`/superAdmin/municipality/update/${id}`);
                break;
            case 'create':
                navigate('/superAdmin/municipality/create');
                break;
            default:
                navigate('/superAdmin')
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <SuperAdminAppBar/>
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
                    }} onClick={(e) => handleClick('create')}>+ Create</Typography>
                    <ResponsiveTable columns={columns} rows={rows} onClick={rowClick}/></Paper>
            </Box>
        </Box>
    )
}
export default withAuthenticationRequired(SuperAdminMunicipalities, {
    onRedirecting: () => <Home/>,
});