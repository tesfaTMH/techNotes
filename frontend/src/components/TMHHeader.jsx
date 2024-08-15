import React from "react";
import { Link } from "react-router-dom";

const TMHHeader = () => {
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to={"/tmh"}>
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav"></nav>
      </div>
    </header>
  );
};

export default TMHHeader;
