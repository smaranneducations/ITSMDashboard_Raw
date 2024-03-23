import React from "react";
import PropTypes from "prop-types";
import { Image } from "@fluentui/react-components";
import { NestedSubmenusControlled } from "./NestedSubmenusControlled";
import "./HeaderStyles.css"; // Import CSS file for styles

const Header = (props) => {
  const { title, logo, message } = props;

  return (
    <section className="welcome__header">
      {/* Column 1: NestedSubmenusControlled */}
      <div className="column NestedSubmenusControlled" >
        <NestedSubmenusControlled />
      </div>

      {/* Column 2: Message */}
<div className="column" >
  <h1 className="message" >
    {message}
  </h1>
</div>

      {/* Column 3: Logo */}
      <div className="column" >
        <div className="logoContainer">
          <Image src={logo} alt={title} className="logo" />
        </div>
      </div>
    </section>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  message: PropTypes.string,
};

export default Header;
