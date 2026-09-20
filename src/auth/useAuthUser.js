import {useAuth0} from "@auth0/auth0-react";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../slices/currentUserReducer";
import localAuthEnabled from "./localAuthEnabled";

// LOCAL DEV ONLY. In local-auth mode, useAuth0().user/isAuthenticated are always
// undefined/false — the bypass never actually signs into the real Auth0 SDK, only into
// this app's own backend. Components that read those directly (SuperAdminAppBar,
// ResponsiveAppBar) either crash (`user.picture` on undefined) or silently show the
// logged-out nav. This substitutes Redux's currentUser (populated from GET /api/user)
// so those components see a user shaped the way they expect.
const useAuthUser = () => {
    const auth0 = useAuth0();
    const {user: localUser} = useSelector(currentUserSelector);

    if (!localAuthEnabled) {
        return auth0;
    }

    const isAuthenticated = !!localStorage.getItem("authToken");
    return {
        ...auth0,
        isAuthenticated,
        user: isAuthenticated && localUser && localUser.name
            ? {name: localUser.name, email: localUser.email}
            : undefined,
    };
};

export default useAuthUser;
