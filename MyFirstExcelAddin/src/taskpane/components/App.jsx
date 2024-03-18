import * as React from "react";
import PropTypes from "prop-types";
// import Header from "./Header";
import HeroList from "./HeroList";
import FileSystemNavigator from "./Test";
import { Tree, makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { TreeView } from "@mui/x-tree-view";
import CreateExcelTable1  from "./CreateExcelTable";
import {Header} from "./NavBar/Header";



const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
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
      {/* <Header logo="assets/logo-filled.png" title={props.title} message="ITSM " /> */}
     
    <Header/>
      {/* <FileSystemNavigator/>
      <CreateExcelTable1/> */}
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
