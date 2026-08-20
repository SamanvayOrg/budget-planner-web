import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import LogInBox from "../components/LogInBox";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, setToken} from "../slices/authReducer";
import Spinner from "../components/Spinner";
import {fetchAllBudgets} from "../slices/allBudgetReducer";
import localAuthEnabled from "../auth/localAuthEnabled";


// LOCAL DEV ONLY: when enabled, a token already sitting in localStorage (placed there
// by LocalLogin.js, #/local-login) is treated as an authenticated session instead of
// asking the real Auth0 SDK, which the local bypass never actually signs into.
const isLocalAuth = localAuthEnabled;

const Home = () => {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();

    const dispatch = useDispatch();
    const {authDetailsAvailable} = useSelector(authSelector);

    const initAuth = () => {
        return async (dispatch) => {
            if (isLocalAuth) {
                const localToken = localStorage.getItem('authToken');
                if (localToken) {
                    dispatch(setToken(localToken));
                }
                return;
            }
            let token = await getAccessTokenSilently();
            localStorage.setItem('authToken', token);
            dispatch(setToken(token));
        }
    }

    useEffect(() => {
        dispatch(initAuth());
        // eslint-disable-next-line
    }, [dispatch, isAuthenticated]);

    const effectivelyAuthenticated = isLocalAuth ? !!localStorage.getItem('authToken') : isAuthenticated;

    let renderInScreen = <LogInBox/>;

    if (!authDetailsAvailable && effectivelyAuthenticated) {
        renderInScreen = <Spinner/>;
    } else if (authDetailsAvailable && effectivelyAuthenticated) {
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