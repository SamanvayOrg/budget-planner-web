import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import LogInBox from "../components/LogInBox";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, setToken} from "../slices/authReducer";
import CircularColor from "../components/Spinner";
import Spinner from "../components/Spinner";


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
		// eslint-disable-next-line
	}, [dispatch, isAuthenticated]);


	let renderInScreeen = <LogInBox/>;


	if (!authDetailsAvailable && isAuthenticated) {
		renderInScreeen = <Spinner/>;
	} else if (authDetailsAvailable && isAuthenticated) {
		return <Navigate to='/dashboard'/>
	}


	return (<div>
		<ResponsiveAppBar/>
		<div style={{padding: "10%"}}>
			{renderInScreeen}
		</div>
	</div>);


}
export default Home;