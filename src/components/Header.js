import React from "react";
import logo from "../images/top__logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="AROUND the us logo" className="header__logo" />
    </header>
  );
};
export default Header;
