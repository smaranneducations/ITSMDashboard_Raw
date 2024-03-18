import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import { Tree, makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScenarioComponent from "./ScenarioComponent";

import CreateExcelTable1  from "./CreateExcelTable";
import {NestedSubmenusControlled} from "./NestedSubmenusControlled";



const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
  content : {
    height: '85vh',
    backgroundColor: 'lightgrey',
    border: '1px solid black',
    fontFamily: 'Arial, sans-serif', // Example font family
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto', // Add scroll option if content overflows vertically
  },
});
const App = (props) => {
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems = [
    {
      icon: <Ribbon24Regular />,
      primaryText: "Achieve more with Office integration",
    },
    {
      icon: <LockOpen24Regular />,
      primaryText: "Unlock features and functionality",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "Create and visualize like a pro",
    },
  ];

  return (
    <div className={styles.root}>
      <Header logo="assets/logo-filled.png" title={props.title} message="ITSM Dashboard" />
      <div>
      <Routes>        
        <Route path="taskpane/taskpane.html" element={<ScenarioComponent/>} />
      </Routes>
    </div>
      <div className={styles.content}>
        {/* Your main content goes here */}
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;