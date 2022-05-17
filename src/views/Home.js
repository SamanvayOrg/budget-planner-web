import LoginButton from "../components/LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";


const Home = () => {

	const {isAuthenticated} = useAuth0();
	if (isAuthenticated) {
		return <Navigate to='/dashboard'/>
	}

	return (
		<div>
			<div style={{padding: "10%"}}>
				<center><h1>Welcome to Budget planner</h1>
					<LoginButton/></center>
			</div>
		</div>
	);


}
export default Home;