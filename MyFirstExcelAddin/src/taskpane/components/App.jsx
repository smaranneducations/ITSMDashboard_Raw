// App.jsx
import React from "react";
import Testcopy from "./testcopy"; // Correct the import path
import { Switch, Route } from "react-router-dom";
import Test123 from "./Test123";

const App = () => {
  return (
    <div>
      <Switch>
      <Route exact path="/">
            <div><Testcopy title="bhasker" /></div>
          </Route>
          <Route exact path="/test">
            <div><Test123 /></div>
          </Route>
      </Switch>
    </div>
  );
};

export default App;
