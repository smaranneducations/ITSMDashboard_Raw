// App.jsx
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Scenario from "./Scenario";
import Account from "./Account";

const App = () => {
  return (
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
  );
};

export default App;
