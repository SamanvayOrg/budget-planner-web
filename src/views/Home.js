import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import LogInBox from "../components/LogInBox";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, setToken} from "../slices/authReducer";
import Spinner from "../components/Spinner";
import {fetchAllBudgets} from "../slices/allBudgetReducer";


const Home = () => {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();

    const dispatch = useDispatch();
    const {authDetailsAvailable} = useSelector(authSelector);

    const initAuth = () => {
        return async (dispatch) => {
            let token = await getAccessTokenSilently();
            localStorage.setItem('authToken', token);
            dispatch(setToken(token));
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(initAuth());
        }
        // eslint-disable-next-line
    }, [dispatch, isAuthenticated]);


    let renderInScreen = <LogInBox/>;

    if (!authDetailsAvailable && isAuthenticated) {
        renderInScreen = <Spinner/>;
    } else if (authDetailsAvailable && isAuthenticated) {
        dispatch(fetchAllBudgets());
        return <Navigate to='/dashboard'/>
    }


    return (<div>
        <ResponsiveAppBar/>
        <div style={{padding: "10%"}}>
            {renderInScreen}
        </div>
    </div>);


}
export default Home;
