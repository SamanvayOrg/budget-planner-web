import {Box, FormGroup, TextField} from "@mui/material";
import React, {useState} from "react";
import ActionButton from "./ActionButton";
import CancelButton from './CancelButton';

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    border: '0px  #000',
    boxShadow: '0px 0px 4px  #000000',
    p: 4,
    gap: '1vw',
    overflow: 'scroll',
    maxHeight: '80%'
};

const BudgetPropertySelector = ({onClose, onSelect, thePopulation, openingBal}) => {
    const [population, setPopulation] = useState(thePopulation);
    const [openingBalance, setOpeningBalance] = useState(openingBal);
    return (
        <Box sx={style}>
            <Box sx={{minWidth: 50}}>
                <FormGroup fullwidth="true"  style={{margin: 5, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <TextField
                        id="outlined-required"
                        label="Population"
                        value={population}
                        onChange={(e) => setPopulation(e.target.value)}
                    />
                    <br/>
                    <TextField
                        id="outlined-required"
                        label="Opening Balance"
                        value={openingBalance}
                        onChange={(e) => setOpeningBalance(e.target.value)}
                    />
                </FormGroup>
                <Box style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <CancelButton onClick={onClose} style={{marginRight: 32}} />
                    <ActionButton label={'Ok'} onClick={() => onSelect({population, openingBalance})} variant={'contained'}
                        // disabled={!(detailedHead && theFunction && isAbleToAddNewLine())}
                                  style={{marginLeft: 32}} color={'primary'}
                    />
                </Box>
            </Box>
        </Box>
    )
}
export default BudgetPropertySelector;
