import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store/store'; // Import the store

/* global document, Office, module, require */

const title = "Contoso Task Pane Add-in";

const rootElement = document.getElementById("container");
const root = createRoot(rootElement);

/* Render application after Office initializes */
Office.onReady(() => {
  root.render(
    <Provider store={store}> {/* Wrap App component with Provider and pass the store */}
      <FluentProvider theme={webLightTheme}>
        <HashRouter>
          <App title={title} />
        </HashRouter>
      </FluentProvider>
    </Provider>
  );
});

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root.render(
      <Provider store={store}>
        <FluentProvider theme={webLightTheme}>
          <HashRouter>
            <NextApp />
          </HashRouter>
        </FluentProvider>
      </Provider>
    );
  });
}
