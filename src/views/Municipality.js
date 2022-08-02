import {Box, Paper} from "@mui/material";
import _ from "lodash";
import ResponsiveTable from "../components/ResponsiveTable";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {allMunicipalityDetailsSelector, fetchMunicipalityDetails} from "../slices/municipalityReducer";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../components/HorizontalMenuDrawer";
import {adminMenus} from "../config";
import {useNavigate} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import {useEffect} from "react";

const Municipality = () => {
    const {details} = useSelector(allMunicipalityDetailsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMunicipalityDetails());
    }, [dispatch]);

    const columns = [
        {id: 'name', label: 'Municipality name', minWidth: 170},
        {id: 'state', label: 'State', minWidth: 100},
        {id: 'cityClass', label: 'Municipality class', minWidth: 170,}
    ];

    let rows = [];
    if (!_.isEmpty(details)) {
        rows = [
            {
                "name": details.name,
                "state": details.state,
                "cityClass": details.cityClass
            }
        ]
    }
    let navigate = useNavigate();
    const handleClick = (data) => {
        switch (data) {
            case 'Users':
                navigate('/admin/users');
                break;
            case 'Municipality':
                navigate('/admin/municipality');
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
                        <ResponsiveTable columns={columns} rows={rows}/></Paper>
                </Box>
            </Box>);
    }

    return renderBox();


}
export default Municipality;