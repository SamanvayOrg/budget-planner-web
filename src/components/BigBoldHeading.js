import Box from '@mui/material/Box';
import React from 'react';
import {darken} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {t} from 'i18next';

const BigBoldHeading = ({label, width = 1, lightBackground}) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{
                width,
                background: darken(theme.palette.primary.main, lightBackground? 0.4: 0.6),
                height: '60px',
                justifyContent: 'center',
                fontSize: 20,
                alignItems: 'center',
                display: 'flex',
                color: '#ffffff',
            }}>{t(label)}
            </Box>
        </>
    );
};

export default BigBoldHeading;
