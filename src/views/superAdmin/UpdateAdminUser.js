import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import HorizontalMenuDrawer from "../../components/HorizontalMenuDrawer";
import {superAdminMenus} from "../../config";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import {useEffect, useState} from "react";
import {Box, Paper, TextField, Typography} from "@mui/material";
import ActionButton from "../../components/ActionButton";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {allUsersSelector, saveUser} from "../../slices/allUsersReducer";
import _ from "lodash";
import DropDown from "../../components/DropDown";
import {allMunicipalityDetailsSelector, fetchAllMunicipalities} from "../../slices/municipalityReducer";
import {useTranslation} from "react-i18next";


const UpdateAdminUser = () => {
    const navigate = useNavigate();
    const {users} = useSelector(allUsersSelector);
    let {userId} = useParams();
    const selectedUser = _.chain(users)
        .filter((e) => e.id == userId)
        .first()
        .value()

    console.log('selectedUser', selectedUser)
    const [name, setName] = useState(selectedUser.name);
    const [email, setEmail] = useState(selectedUser.userName);
    const [editUser, setEditUser] = useState(false);
    const {allMunicipalities} = useSelector(allMunicipalityDetailsSelector);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect((e) => {
        dispatch(fetchAllMunicipalities())
    }, [dispatch])
    let municipalityList = [];
    _.forEach(allMunicipalities, municipality => {
        municipalityList.push(municipality.name);
    })

    const currentMunicipality = _.chain(allMunicipalities)
        .filter((municipality) => municipality.id === selectedUser.municipalityId)
        .first()
        .value()
    console.log('currentMunicipality',currentMunicipality)
    const [municipality, setMunicipality] =useState(currentMunicipality.name);


    const handleChange = (event, type) => {
        if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'email') {
            setEmail(event.target.value);
        }
    }
    const handleClick = (data) => {
        switch (data) {
            case 'Users':
                navigate('/superAdmin/users');
                break;
            case 'Municipality':
                navigate('/superAdmin/municipality');
                break;
            default:
                navigate('/superAdmin')
        }
    }
    const handleSave = () => {
        let newUserOb = {};
        newUserOb = {
            "id": selectedUser.id,
            name,
            email,
            "municipalityId": municipality,
            "admin": selectedUser.admin
        };
        setEditUser(false);
        dispatch(saveUser(newUserOb));

    }

    return (
        <Box sx={{display: 'flex'}}>
            <ResponsiveAppBar/>
            <HorizontalMenuDrawer menuList={superAdminMenus} drawerWidth={240} onClick={handleClick}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '20px', paddingTop: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Typography sx={{
                            display: 'flex', fontSize: '18px'
                        }}>User details</Typography>
                        {!editUser && <Typography sx={{
                            display: 'flex',

                            marginRight: '30px',
                            color: '#4d73db',
                            cursor: 'pointer',
                            fontSize: '18px'
                        }} onClick={(e) => setEditUser(true)}>Edit user</Typography>}
                    </div>

                    <br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        margin: '20px',
                        gap: '20px'
                    }}>
                        <TextField disabled={!editUser} sx={{maxWidth: 1 / 4}} variant="standard"
                                   label={"name"} defaultValue={name}
                                   onChange={(e) => handleChange(e, 'name')}/>
                        <TextField disabled={!editUser} inputProps={{readOnly: !editUser}} sx={{maxWidth: 1 / 4}}
                                   variant="standard"
                                   label={"Email"} defaultValue={email}
                                   onChange={(e) => handleChange(e, 'email')}/>
                        <DropDown
                            disabled={!editUser} inputProps={{readOnly: !editUser}}
                            value={municipality} sx={{maxWidth: 1 / 4}}
                            label={t("Municipality class")} list={municipalityList}
                            onSelect={(e) => setMunicipality(e.target.value)}/>
                        <ActionButton disabled={!editUser}
                                      style={editUser ? {} : {background: "#b7e1e8"}} label={"Submit"}
                                      id={"smallActionButton"}
                                      onClick={handleSave}/>
                    </div>
                </Paper>
            </Box>
        </Box>
    )
}
export default UpdateAdminUser;