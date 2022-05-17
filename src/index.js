import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react";
import {getConfig} from "./config";


const config = getConfig();



const providerConfig = {
	domain: config.domain,
	clientId: config.clientId,
	...(config.audience ? {audience: config.audience} : null),
	redirectUri: window.location.origin
};

ReactDOM.render(
	<Auth0Provider {...providerConfig}>
		<App/>
	</Auth0Provider>,
	document.getElementById("root")
);
