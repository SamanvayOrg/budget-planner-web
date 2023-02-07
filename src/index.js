import React, {Suspense} from "react";
import * as ReactDOMClient from 'react-dom/client';
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react";
import {getConfig} from "./config";
import {Provider} from "react-redux";
import store from "./store/store";
import "./i18n";
import Typography from "@mui/material/Typography";


const config = getConfig();

const providerConfig = {
    domain: config.domain,
    clientId: config.clientId,
    ...(config.audience ? {audience: config.audience} : null),
    redirectUri: window.location.origin,
    cacheLocation: 'localstorage',
    audience: "https://api.budget-planner",
    scope: "openid profile use:app"
};

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
    <Provider store={store}>
        <Auth0Provider {...providerConfig}>
            <Suspense fallback={<div>Loading……</div>}>
                <App/>
                <Typography style={{
                    width: "100%",
                    position: "absolute",
                    bottom: "10px",
                    textAlign: "center",
                }}><a style={{textDecoration: "None", color: "#919191", fontStyle: "italic"}}
                      href={"https://www.samanvayfoundation.org/"}>Powered by Samanvay Foundation</a></Typography>
            </Suspense>
        </Auth0Provider>
    </Provider>
);
