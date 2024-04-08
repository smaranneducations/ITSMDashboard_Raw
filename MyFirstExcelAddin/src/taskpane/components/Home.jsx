// testcopy.jsx
import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { makeStyles } from "@fluentui/react-components";
import { HomeBody } from "./HomeBody";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const Home = (props) => {
  const styles = useStyles();

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
      <HomeBody />
      <Footer />
    </div>
  );
};

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Home;
