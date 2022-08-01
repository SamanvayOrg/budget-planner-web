import {Box, Paper} from "@mui/material";
import _ from "lodash";
import ResponsiveTable from "../components/ResponsiveTable";
import * as React from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import {allMunicipalityDetailsSelector} from "../slices/municipalityReducer";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../components/HorizontalMenuDrawer";
import {adminMenus} from "../config";
import {useNavigate} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";

const Municipality = () => {
    const [municipality, setMunicipality] = useState(null);
    const {details} = useSelector(allMunicipalityDetailsSelector)
    const rowClick = (data) => {
        console.log('clickedfs---', JSON.stringify(data), data.id);
        setMunicipality(data);
    }
    const columns = [{id: 'name', label: 'Municipality name', minWidth: 170}, {
        id: 'state', label: 'State', minWidth: 100
    }, {id: 'population', label: 'Population', minWidth: 100}, {
        id: 'cityClass', label: 'Municipality class', minWidth: 170,
    }];
    let rows = [];
    if (!_.isEmpty(details)) {
        rows = [{
            "name": details.name,
            "state": details.state.name,
            "population": details.population,
            "cityClass": details.cityClass
        }]
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
                    <ResponsiveTable columns={columns} rows={rows} onClick={(data) => {
                        rowClick(data)
                    }}/></Paper>
            </Box>
            </Box>);
    }

    return renderBox();


}
export default Municipality;