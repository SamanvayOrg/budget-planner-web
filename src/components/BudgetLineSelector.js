import Box from '@mui/material/Box';
import ActionButton from './ActionButton';
import React, {useState} from 'react';
import {useStyles} from './SelectYears';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {getDetailsForMajorHeadName} from '../domain/metadata';
import _ from 'lodash';
import {FormGroup, InputLabel, TextField, Typography} from '@mui/material';
import {useTranslation} from "react-i18next";

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '0px  #000',
    boxShadow: '0px 0px 4px  #000000',
    p: 4,
    gap: '1vw',
    overflow: 'scroll',
    maxHeight: '80%'
};


const BudgetLineSelector = ({metadata, onSelect, context, onCancel, budget}) => {
    const {majorHeadGroup} = getDetailsForMajorHeadName(metadata, _.get(context, 'majorHead')) || {minorHeads: []};
    const allFunctionGroups = metadata.functionGroups;
    const allMajorHeadOption = majorHeadGroup.majorHeads;
    const [minorHead, setMinorHead] = useState('');
    const [detailedHead, setDetailedHead] = useState('');
    const [functionGroup, setFunctionGroup] = useState('');
    const [theFunction, setTheFunction] = useState('');
    const [name, setName] = useState('');
    const [theMajorHead, setTheMajorHead] = useState('');
    const {t} = useTranslation();
    const [translation, setTranslation] = useState('');

    const handleMajorHeadSelection = (event) => {
        setTheMajorHead(event.target.value);
        event.preventDefault();
    };
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
                                key={index}
                                value={item}>
                                {`${item.name} (${item.code})`}
                            </MenuItem>);
                    })}
                </Select>
            </FormControl>
        );

    };
    let budgetLineItems = []
    _.forEach(budget.items, majorHead => {
        _.forEach(majorHead.items, minorHead => {
            _.forEach(minorHead.items, detailedHead => {
                budgetLineItems.push(detailedHead.name);
            })
        })
    })

    const isAbleToAddNewLine = () => {
        if (_.includes(budgetLineItems, name)) {
            return false;
        }
        return true
    }

    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const handleTranslation = (event) => {
        setTranslation(event.target.value);
    }

    return (
        <Box sx={style}>
            <Box sx={{minWidth: 100}}>
                <FormGroup fullwidth="true">
                    <Typography variant={'h6'} style={{marginTop: 32, marginBottom: 16}}>Budget Head</Typography>
                    <SelectView list={allMajorHeadOption} onSelect={handleMajorHeadSelection} label={'Major Head'}
                                value={theMajorHead}/>
                    <SelectView list={_.get(theMajorHead, 'minorHeads')} onSelect={handleMinorHeadSelection}
                                label={'Minor Head'}
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
                            <TextField error={!isAbleToAddNewLine()}
                                       helperText={isAbleToAddNewLine() ? '' : t('Particular name must be unique')}
                                       required
                                       id="outlined-required"
                                       label="Name"
                                       value={name}
                                       onChange={onNameChange}/>
                            <br/>
                            <TextField required
                                       id="outlined-required"
                                       label={t('Name in marathi')}
                                       value={translation}
                                       onChange={handleTranslation}/>
                        </>)}
                </FormGroup>
                <Box style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <ActionButton label={'Cancel'} onClick={onCancel}
                                  style={{marginRight: 32}} color={'warning'}/>

                    <ActionButton label={'Ok'} onClick={() => onSelect({
                        majorHeadGroup,
                        theMajorHead,
                        minorHead,
                        detailedHead,
                        theFunction,
                        name,
                        translation
                    })} variant={'contained'}
                                  disabled={!(detailedHead && theFunction && isAbleToAddNewLine())}
                                  style={{marginLeft: 32}} color={'primary'}
                    />
                </Box>
            </Box>
        </Box>
    );
};
export default BudgetLineSelector;
