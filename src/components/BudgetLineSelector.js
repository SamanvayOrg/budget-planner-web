import Box from '@mui/material/Box';
import ActionButton from './ActionButton';
import React, {useState} from 'react';
import {useStyles} from './BasicSelect';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {getDetailsForMajorHeadName} from '../domain/metadata';
import _ from 'lodash';
import {FormGroup, InputLabel, TextField, Typography} from '@mui/material';

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    bgcolor: 'background.paper',
    border: '0px  #000',
    boxShadow: '0px 0px 4px  #000000',
    p: 4,
    gap: '1vw'
};


const BudgetLineSelector = ({metadata, onSelect, context, onCancel}) => {
    const {majorHead, majorHeadGroup} = getDetailsForMajorHeadName(metadata, _.get(context, 'majorHead')) || {minorHeads: []};
    const allFunctionGroups = metadata.functionGroups;
    const minorHeadOptions = majorHead.minorHeads;
    const [minorHead, setMinorHead] = useState('');
    const [detailedHead, setDetailedHead] = useState('');
    const [functionGroup, setFunctionGroup] = useState('');
    const [theFunction, setTheFunction] = useState('');
    const [name, setName] = useState('');

    const handleMinorHeadSelection = (event) => {
        setMinorHead(event.target.value);
        event.preventDefault();
    };
    const handleDetailedHeadSelection = (event) => {
        setDetailedHead(event.target.value);
        setName(minorHead.name + ' - ' + event.target.value.name);
        event.preventDefault();
    };
    const handleFunctionGroupSelection = (event) => {
        setFunctionGroup(event.target.value);
        event.preventDefault();
    };
    const handleFunctionSelection = (event) => {
        setTheFunction(event.target.value);
        event.preventDefault();
    };
    useStyles();
    const SelectView = ({list, onSelect, label, value}) => {
        if (_.isEmpty(list)) {
            return undefined;
        }

        return (
            <FormControl style={{marginBottom: 16}}>
                <InputLabel id="label">{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    onChange={onSelect}
                >
                    {list.map((item, index) => {
                        return (
                            <MenuItem
                                selected={value && (value.name === item.name)}
                                key={index}
                                value={item}>
                                {item.name}
                            </MenuItem>);
                    })}
                </Select>
            </FormControl>
        );

    };

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <Box sx={style}>
            <Box sx={{minWidth: 100}}>
                <FormGroup fullWidth>
                    <Typography variant={'h6'} style={{marginTop: 32, marginBottom: 16}}>Budget Head</Typography>
                    <SelectView list={minorHeadOptions} onSelect={handleMinorHeadSelection} label={'Minor Head'}
                                value={minorHead}/>
                    <SelectView list={_.get(minorHead, 'detailedHeads', [])} onSelect={handleDetailedHeadSelection}
                                label={'Detailed Head'} value={detailedHead}/>

                    <Typography variant={'h6'} style={{marginTop: 32, marginBottom: 16}}>Function Code</Typography>
                    <SelectView list={allFunctionGroups} onSelect={handleFunctionGroupSelection}
                                label={'Function Group'} value={functionGroup}/>
                    <SelectView list={_.get(functionGroup, 'functions', [])} onSelect={handleFunctionSelection}
                                label={'Function'} value={theFunction}/>

                    {detailedHead && theFunction && (
                        <>
                            <Typography variant={'h6'} style={{marginTop: 32, marginBottom: 16}}>Name</Typography>
                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                value={name}
                                onChange={onNameChange}
                            />
                        </>)}
                </FormGroup>
                <Box style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <ActionButton label={'Cancel'} onClick={onCancel}
                                  style={{marginRight: 32}} color={'warning'}/>

                    <ActionButton label={'Ok'} onClick={() => onSelect({majorHeadGroup, majorHead, minorHead, detailedHead, theFunction, name})} variant={'contained'}
                                  disabled={!(detailedHead && theFunction)}
                                  style={{marginLeft: 32}} color={'primary'}
                    />
                </Box>
            </Box>
        </Box>
    );
};
export default BudgetLineSelector;
