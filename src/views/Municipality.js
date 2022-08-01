import {Paper} from "@mui/material";
import _ from "lodash";
import ResponsiveTable from "../components/ResponsiveTable";
import * as React from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import {allMunicipalityDetailsSelector} from "../slices/municipalityReducer";

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
    console.log('details-->', details);
    if (!_.isEmpty(details)) {
        rows = [{
            "name": details.name,
            "state": details.state.name,
            "population": details.population,
            "cityClass": details.cityClass
        }]
    }

    const renderBox = () => {

        return (<Paper sx={{width: '100%', overflow: 'hidden', paddingTop: "40px"}}>
            <ResponsiveTable columns={columns} rows={rows} onClick={(data) => {
                rowClick(data)
            }}/></Paper>);
    }

    return renderBox();


}
export default Municipality;