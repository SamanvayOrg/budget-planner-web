import {withAuthenticationRequired} from "@auth0/auth0-react";
import localAuthEnabled from "./localAuthEnabled";

// LOCAL DEV ONLY. withAuthenticationRequired guards every protected page by checking
// the Auth0 SDK's own internal session — a session our local-only login (LocalLogin.js,
// #/local-login) never establishes, since it bypasses Auth0 entirely. Without this,
// every protected page redirects to Auth0's real hosted login and fails against the
// placeholder client credentials. See localAuthEnabled for when this is active; in any
// production build it behaves exactly like withAuthenticationRequired.
const requireAuth = (Component, options) =>
    localAuthEnabled ? Component : withAuthenticationRequired(Component, options);

export default requireAuth;
