import {useAuth0} from "@auth0/auth0-react";

const UserName = () => {
	const {user} = useAuth0();

	return (user.name)
}
export default UserName;