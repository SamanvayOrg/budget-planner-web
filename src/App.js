import React from 'react';
import Routing from './routes/Routing';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import './App.css';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['Lato', 'sans-serif'],
    },
    palette: {
        primary: {
            main: '#00A3BA',
        }
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
                <Routing/>
            </StyledEngineProvider>
        </ThemeProvider>
    );
};

export default App;
