// App.jsx
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import OfficeContext from "../OfficeContext"; // Import the context
import Home from "./Home";
import Scenario from "./Scenario";
import Account from "./Account";

const App = () => {
  const [officeContext, setOfficeContext] = useState(undefined);

  useEffect(() => {
    // Ensure Office is initialized
    Office.onReady((info) => {
      // Once Office is ready, set the context
      // For simplicity, we're directly using Office.context, adjust as needed
      setOfficeContext(Office.context);
    });
  }, []);

  return (
    <OfficeContext.Provider value={officeContext}>
      <div>
        <Switch>
            <Route exact path="/">
              <div><Home title="bhasker" /></div>
            </Route>
            <Route exact path="/home">
              <div><Home title="bhasker" /></div>
            </Route>
            <Route exact path="/Scenario">
              <div><Scenario /></div>
            </Route>
            <Route exact path="/Account">
              <div><Account /></div>
            </Route>
        </Switch>
      </div>
    </OfficeContext.Provider>
  );
};

export default App;
