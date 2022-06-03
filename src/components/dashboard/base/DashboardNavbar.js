import React from "react";
import { Link } from "react-router-dom";


import logo from "../img/main.jpg";

function DashboardNavbar({ user, setUser }) {
  const handleLogout = async () => {
    localStorage.removeItem("user-info");
    setTimeout(() => {
      setUser("");
    }, 100);
  };

  return (
    <>
      <header className="header" id="header">
        <div className="header_toggle">
          <i className="bx bx-menu" id="header-toggle"></i>
        </div>
        <div className="header_img">
          <img src={logo} alt="" />
        </div>
        
      </header>
    </>
  );
}

export default DashboardNavbar;
