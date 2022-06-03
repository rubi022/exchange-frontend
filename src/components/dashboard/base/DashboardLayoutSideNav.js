import React from "react";
import { NavLink,Link } from "react-router-dom";

function DashboardLayoutSideNav() {
  const handleLogout = async () => {
    localStorage.removeItem("user-info");
    setTimeout(() => {
      setUser("");
    }, 100);
  };

  return (
    // <div id="layoutSidenav_nav">
    //     <nav
    //         className="sb-sidenav accordion sb-sidenav-dark sb-sidenav-toggled"
    //         id="sidenavAccordion"
    //     >
    //         <div className="sb-sidenav-menu">
    //             <div className="nav">
    //                 <div className="sb-sidenav-menu-heading">Core</div>
    //                 <Link className="nav-link" to="/">
    //                     <div className="sb-nav-link-icon">
    //                         <i className="fas fa-tachometer-alt"></i>
    //                     </div>
    //                     Profile
    //                 </Link>
    //                 <Link className="nav-link" to="/trade">
    //                     <div className="sb-nav-link-icon">
    //                         <i className="fas fa-tachometer-alt"></i>
    //                     </div>
    //                     Trade
    //                 </Link>
    //                 <Link className="nav-link" to="/balance">
    //                     <div className="sb-nav-link-icon">
    //                         <i className="fas fa-tachometer-alt"></i>
    //                     </div>
    //                     Balance
    //                 </Link>
    //                 <Link className="nav-link" to="/market">
    //                     <div className="sb-nav-link-icon">
    //                         <i className="fas fa-tachometer-alt"></i>
    //                     </div>
    //                     Market
    //                 </Link>

    //                 <div className="sb-sidenav-menu-heading">Others</div>
    //             </div>
    //         </div>
    //     </nav>
    // </div>

    <div className="l-navbar" id="nav-bar">
      <nav className="nav">
        <div>
          <Link to="/" className="nav_logo">
            <i className="bx bx-layer nav_logo-icon"></i>
            <span className="nav_logo-name">BBBootstrap</span>
          </Link>
          <div className="nav_list">
            <NavLink to="/" className="nav_link">
              <i className="bx bx-grid-alt nav_icon"></i>
              <span className="nav_name">Dashboard</span>
            </NavLink>
            <NavLink to="/trade" className="nav_link">
              <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span className="nav_name">Trade</span>
            </NavLink>
            <NavLink to="/balance" className="nav_link">
              <i className="bx bx-dollar nav_icon"></i>
              <span className="nav_name">Users</span>
            </NavLink>
            <NavLink to="/market" className="nav_link">
              <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span className="nav_name">Messages</span>
            </NavLink>
          </div>
        </div>
        <a href="/" className="nav_link" onClick={handleLogout}>
          <i className="bx bx-log-out nav_icon"></i>
          <span className="nav_name">SignOut</span>
        </a>
        
      </nav>
    </div>
  );
}

export default DashboardLayoutSideNav;
