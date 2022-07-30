import {Paper, TextField, Typography} from "@mui/material";
import ActionButton from "./ActionButton";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {saveUser} from "../slices/allUsersReducer";

const EditUser = ({data}) => {
    const [name, setName] = useState(data.name);
    const [userName, setUserName] = useState(data.userName);
    const dispatch = useDispatch();


    const handleChange = (event, type) => {
        console.log('data in edit user', event.target.value, type);
        if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'userName') {
            setUserName(event.target.value);
        }
    }
    const handleSave = () => {


        let newUserOb = {};
        newUserOb = {
            "id": data.id,
            name,
            userName,
            "municipality": {
                "id": data.municipality.id,
                "name": data.municipality.name,
                "state": data.municipality.state
            },
            "admin": data.admin
        };
        console.log('new data', newUserOb);
        dispatch(saveUser(newUserOb));

    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden', paddingLeft: '20px', paddingTop: '20px'}}>
            <Typography>User details</Typography>
            <br/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                margin: '20px',
                gap: '20px'
            }}>
                <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={"name"} defaultValue={name}
                           onChange={(e) => handleChange(e, 'name')}/>
                <TextField sx={{maxWidth: 1 / 4}} variant="standard" label={"User name"} defaultValue={userName}
                           onChange={(e) => handleChange(e, 'userName')}/>
                <ActionButton label={"Submit"} id={"smallActionButton"} onClick={handleSave}/>
            </div>
        </Paper>
    )
}
export default EditUser;