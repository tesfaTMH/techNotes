import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const TMHFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleGoHomeClick = () => navigate("/tmh");

  let goHomeButton = null;
  if (pathname !== "/tmh") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={handleGoHomeClick}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  return (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
};

export default TMHFooter;
