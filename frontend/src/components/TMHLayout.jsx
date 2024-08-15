import React from "react";
import { Outlet } from "react-router-dom";
import TMHHeader from "./TMHHeader";
import TMHFooter from "./TMHFooter";

const TMHLayout = () => {
  return (
    <div>
      <TMHHeader />
      <div className="dash-container">
        <Outlet />
      </div>
      <TMHFooter />
    </div>
  );
};

export default TMHLayout;
