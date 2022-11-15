import Box from '@mui/material/Box';
import React, {useEffect} from 'react';
import SuperAdminAppBar from '../../components/SuperAdminAppBar';
import HorizontalMenuDrawer from '../../components/HorizontalMenuDrawer';
import {superAdminMenus} from '../../config';
import {useNavigate} from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import {Paper} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {fetchReports, reportsSelector} from '../../slices/reportsReducer';
import {chain} from 'lodash';
import ResponsiveBarGraph from '../../components/ResponsiveBarGraph';
import BigBoldHeading from '../../components/BigBoldHeading';
import ResponsivePieChart from '../../components/ResponsivePieChart';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/Spinner';

const Usage = () => {
    let navigate = useNavigate();
    const {reports, loading, error} = useSelector(reportsSelector);
    const dispatch = useDispatch();
    const order = ['Draft', 'Submitted to GB', 'Approved by GBM', 'Approved by District'];
    const graphData = chain(reports)
        .groupBy('budgetStatus')
        .map((array, name) => ({id: name, Municipalities: array.length}))
        .map((item) => ({...item, order: order.indexOf(item.id)}))
        .sortBy('order')
        .value();

    const tableData = chain(reports)
        .sortBy('municipalityName')
        .map((row, index) => [index + 1, row.municipalityName, row.budgetStatus])
        .value();

    useEffect((e) => {
        dispatch(fetchReports());
    }, [dispatch]);

    const handleClick = (data) => {
        switch (data) {
            case 'Users':
                navigate('/superAdmin/users');
                break;
            case 'Municipality':
                navigate('/superAdmin/municipalities');
                break;
            case 'Usage':
                navigate('/superAdmin/usage');
                break;
            default:
                navigate('/superAdmin');
        }
    };

    if (loading) {
        return <Spinner/>;
    }
    if (!loading && error) {
        return (
            <Box sx={{typography: 'h6', color: 'warning.main'}}>
                Something has gone wrong. Please try refreshing the page or try again later
            </Box>
        )
    }
    return (
        <Box sx={{display: 'flex'}}>
            <SuperAdminAppBar/>
            <HorizontalMenuDrawer menuList={superAdminMenus} drawerWidth={240} onClick={handleClick}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <BigBoldHeading label={'Status of Budgets'} lightBackground/>
                <Box sx={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                    <Paper sx={{
                        width: '50%',
                        marginTop: '20px',
                        height: '280px',
                        marginRight: '10px',
                        paddingBottom: '20px'
                    }}>
                        <ResponsiveBarGraph data={graphData} keys={['Municipalities']} indexBy={'id'}/>
                    </Paper>
                    <Paper sx={{
                        width: '50%',
                        marginTop: '20px',
                        height: '280px',
                        marginLeft: '10px',
                        paddingBottom: '20px'
                    }}>
                        <ResponsivePieChart data={graphData} id={'id'} value={'Municipalities'}/>
                    </Paper>
                </Box>
                <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
                    <DataTable rows={tableData} headings={['No', 'Municipality', 'Status']}
                               title={'Detailed Submission Status'}/>
                </Box>
            </Box>
        </Box>
    );
};

export default Usage;
