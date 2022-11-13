import {Dialog, DialogActions, DialogContent, DialogTitle, ListItem} from '@mui/material';
import Box from '@mui/material/Box';
import ActionButton from './ActionButton';
import React from 'react';
import CancelButton from './CancelButton';
import List from '@mui/material/List';
import {t} from 'i18next';


const BudgetSaveError = ({validationResults = [], open, onClose, onContinue}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Issues were found in your submission</DialogTitle>
            <DialogContent>
                <List>
                    {validationResults.map((error, index) => {
                        return (
                            <ListItem disablePadding key={index}>
                                <Box sx={{typography: 'body1'}}>{t(index + 1)}. {t(error)}</Box>
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <CancelButton label={'Back to Budget'} onClick={onClose}/>
                <ActionButton label={'Continue to Save'} onClick={onContinue}/>
            </DialogActions>
        </Dialog>
    );
};

export default BudgetSaveError;
