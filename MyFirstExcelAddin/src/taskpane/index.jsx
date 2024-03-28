import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store/store'; // Import the store
import OfficeContext from "./OfficeContext";

/* global document, Office, module, require */

const title = "Contoso Task Pane Add-in";
const rootElement = document.getElementById("container");

const OfficeApp = () => {
  const [officeContext, setOfficeContext] = useState(undefined);

  useEffect(() => {
    // Ensure Office is initialized
    Office.onReady((info) => {
      // Once Office is ready, set the context
      setOfficeContext(Office.context);
    });
  }, []);

  return (
    <OfficeContext.Provider value={officeContext}>
      <Provider store={store}>
        <FluentProvider theme={webLightTheme}>
          <HashRouter>
            <App title={title} />
          </HashRouter>
        </FluentProvider>
      </Provider>
    </OfficeContext.Provider>
  );
};

const root = createRoot(rootElement);
root.render(<OfficeApp />);

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
