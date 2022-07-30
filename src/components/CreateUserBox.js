import {FormControlLabel, Paper, Switch, TextField, Typography} from "@mui/material";
import ActionButton from "./ActionButton";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveUser} from "../slices/allUsersReducer";
import {allMunicipalityDetailsSelector} from "../slices/municipalityReducer";

const CreateUserBox = () => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const {details} = useSelector(allMunicipalityDetailsSelector)

    const handleChange = (event, type) => {
        console.log('data in edit user', event.target.value, type);
        if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'userName') {
            setUserName(event.target.value);
        } else if (type === 'admin') {
            if (event.target.value === 'on') {
                setIsAdmin(true)
            }
        }
    }

    const handleSave = () => {
        let newUserOb = {};
        newUserOb = {
            name, userName, "municipality": {
                "id": details.id, "name": details.name, "state": details.state
            }, "admin": isAdmin
        };
        dispatch(saveUser(newUserOb));
    }

    return (<Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '20px', paddingTop: '20px'}}>
        <Typography>Create new user</Typography>
        <br/>
        <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'space-around', margin: '20px', gap: '20px'
        }}>
            <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={"Name"} defaultValue={name}
                       onChange={(e) => handleChange(e, 'name')}/>
            <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={"User name"} defaultValue={userName}
                       onChange={(e) => handleChange(e, 'userName')}/>
            <FormControlLabel control={<Switch onChange={(e) => (handleChange(e, 'admin'))}/>}
                              label="Make this user an administrator"/>
            <ActionButton label={"Submit"} id={"smallActionButton"} onClick={handleSave}/>
        </div>
    </Paper>)
}
export default CreateUserBox;