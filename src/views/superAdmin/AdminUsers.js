import React, {useEffect} from "react";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {superAdminMenus} from "../../config";
import {Box, Paper, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";
import ResponsiveTable from "../../components/ResponsiveTable";
import {useDispatch, useSelector} from "react-redux";
import {allUsersSelector, fetchAdminUser} from "../../slices/allUsersReducer";
import _ from "lodash";
import {allMunicipalityDetailsSelector, fetchAllMunicipalities} from "../../slices/municipalityReducer";
import SuperAdminAppBar from "../../components/SuperAdminAppBar";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Home from "../Home";

const AdminUsers = () => {
    const navigate = useNavigate();
    const {adminUsers} = useSelector(allUsersSelector);

    const dispatch = useDispatch();
    const {allMunicipalities} = useSelector(allMunicipalityDetailsSelector);

    const columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'email', label: 'Email', minWidth: 100},
        {id: 'municipality', label: 'Municipality', minWidth: 100},

    ];
    let rows = [];

    useEffect((e) => {
        dispatch(fetchAllMunicipalities());
        dispatch(fetchAdminUser());
    }, [dispatch])


    if (!_.isEmpty(adminUsers)) {
        _.forEach(adminUsers, user => {
            const userMunicipality = _.chain(allMunicipalities)
                .filter((municipality) => municipality.id === user.municipalityId)
                .first()
                .value()
            if (userMunicipality) {
                rows.push({...user, municipality: userMunicipality.name});
            }
        });
    }
    const rowClick = (data) => {
        handleClick('updateUser', data.id)
    }
    const handleClick = (e, id) => {
        switch (e) {
            case 'Users':
                navigate('/superAdmin/users');
                break;
            case 'Municipality':
                navigate('/superAdmin/municipalities');
                break;
            case 'updateUser':
                navigate(`/superAdmin/user/update/${id}`);
                break;
            case 'create':
                navigate('/superAdmin/user/create');
                break;
            default:
                navigate('/superAdmin')
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <SuperAdminAppBar/>
            <HorizontalMenuDrawer menuList={superAdminMenus} drawerWidth={240} onClick={handleClick}/>

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
                    <ResponsiveTable columns={columns} rows={rows} onClick={rowClick}/></Paper>

            </Box>
        </Box>

    )
}
export default withAuthenticationRequired(AdminUsers, {
    onRedirecting: () => <Home/>,
});