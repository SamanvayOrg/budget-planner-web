import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import LogInBox from "../components/LogInBox";


const Home = () => {
	const {isAuthenticated} = useAuth0();

	if (isAuthenticated) {
		return <Navigate to='/dashboard'/>
	}

	return (
		<div>
			<ResponsiveAppBar/>
			<div style={{padding: "10%"}}>
				<LogInBox/>
			</div>
		</div>
	);


}
export default Home;