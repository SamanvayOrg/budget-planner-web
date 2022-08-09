import {Box, Paper} from "@mui/material";
import _ from "lodash";
import ResponsiveTable from "../../components/ResponsiveTable";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {allMunicipalityDetailsSelector, fetchMunicipalityDetails} from "../../slices/municipalityReducer";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {adminMenus} from "../../config";
import {useNavigate} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import {useEffect} from "react";

const Municipality = () => {
    const {currentMunicipality} = useSelector(allMunicipalityDetailsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMunicipalityDetails());
    }, [dispatch]);

    const columns = [
        {id: 'name', label: 'Municipality name', minWidth: 170},
        {id: 'state', label: 'State', minWidth: 100},
        {id: 'cityClass', label: 'Municipality class', minWidth: 170,}
    ];

    const rowClick = (data) => {
        handleClick('updateMunicipality', data.id)
    }

    let rows = [];
    if (!_.isEmpty(currentMunicipality)) {
        rows = [currentMunicipality]
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
            case 'updateMunicipality':
                navigate(`/admin/municipality/update/${id}`);
                break;
            case 'Translation':
                navigate('/admin/translation');
                break;
            default:
                navigate('/admin')
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
                        <ResponsiveTable columns={columns} rows={rows} onClick={rowClick}/></Paper>
                </Box>
            </Box>);
    }

    return renderBox();


}
export default Municipality;