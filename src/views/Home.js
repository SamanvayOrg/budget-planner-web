import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import LogInBox from "../components/LogInBox";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, setToken} from "../slices/authReducer";


const Home = () => {
	const {isAuthenticated, getAccessTokenSilently} = useAuth0();

	const dispatch = useDispatch();
	const {authDetailsAvailable} = useSelector(authSelector);

	const initAuth = () => {
		return async (dispatch) => {
			dispatch(setToken(await getAccessTokenSilently()));
		}
	}

	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch, isAuthenticated]);


	if (authDetailsAvailable) {
		return <Navigate to='/dashboard'/>
	}

	return (<div>
		<ResponsiveAppBar/>
		<div style={{padding: "10%"}}>
			<LogInBox/>
		</div>
	</div>);


}
export default Home;