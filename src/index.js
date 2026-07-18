import React, { Suspense } from "react";
import * as ReactDOMClient from 'react-dom/client';
import App from "./App";

// Auth0 setup
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./config";

// Redux setup
import { Provider } from "react-redux";
import store from "./store/store";

// i18n initialization
import "./i18n";

// UI components
import Typography from "@mui/material/Typography";

// Get Auth0 config values from env/config file
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  cacheLocation: 'localstorage',
  audience: "https://api.budget-planner",
  scope: "openid profile use:app"
};

// Create root element
const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

// Render the application
root.render(
  <Provider store={store}>
    <Auth0Provider {...providerConfig}>
      {/* Suspense is needed for react-i18next dynamic loading */}
      <Suspense fallback={<div>Loading…</div>}>
        <App />

        {/* Footer with attribution link */}
        <Typography
          style={{
            width: "100%",
            bottom: "10px",
            textAlign: "center",
            background: "#FFFFFF"
          }}
        >
          <a
            style={{
              textDecoration: "none",
              color: "#919191",
              fontStyle: "italic"
            }}
            href="https://www.samanvayfoundation.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Samanvay Foundation
          </a>
        </Typography>
      </Suspense>
    </Auth0Provider>
  </Provider>
);
