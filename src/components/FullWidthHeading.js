import Box from '@mui/material/Box';
import React from 'react';
import {darken, lighten} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {t} from 'i18next';
import HorizontalLine from './HorizontalLine';

const FullWidthHeading = ({label}) => {
    const theme = useTheme();

    return (
        <>
            <HorizontalLine/>
            <Box sx={{
                width: 1,
                background: darken(theme.palette.primary.main, 0.6),
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

export default FullWidthHeading;
