import React from 'react'
import { Link } from 'react-router-dom'

function DashboardLayoutSideNav() {
  const handleLogout = async () => {
    localStorage.removeItem('user-info')
    setTimeout(() => {
        setUser('')
    }, 100)
}
    return (
        // <div id="layoutSidenav_nav">
        //     <nav
        //         className="sb-sidenav accordion sb-sidenav-dark sb-sidenav-toggled"
        //         id="sidenavAccordion"
        //     >
        //         <div className="sb-sidenav-menu">
        //             <div className="nav">
        //                 <div className="sb-sidenav-menu-heading">Core</div>
        //                 <Link className="nav-linka" to="/">
        //                     <div className="sb-nav-linka-icon">
        //                         <i className="fas fa-tachometer-alt"></i>
        //                     </div>
        //                     Profile
        //                 </Link>
        //                 <Link className="nav-linka" to="/trade">
        //                     <div className="sb-nav-linka-icon">
        //                         <i className="fas fa-tachometer-alt"></i>
        //                     </div>
        //                     Trade
        //                 </Link>
        //                 <Link className="nav-linka" to="/balance">
        //                     <div className="sb-nav-linka-icon">
        //                         <i className="fas fa-tachometer-alt"></i>
        //                     </div>
        //                     Balance
        //                 </Link>
        //                 <Link className="nav-linka" to="/market">
        //                     <div className="sb-nav-linka-icon">
        //                         <i className="fas fa-tachometer-alt"></i>
        //                     </div>
        //                     Market
        //                 </Link>

        //                 <div className="sb-sidenav-menu-heading">Others</div>
        //             </div>
        //         </div>
        //     </nav>
        // </div>
        <>
        {/* Main Sidebar Container */}
        <aside
            className="main-sidebar elevation-4"
            style={{ backgroundColor: "#4723d9" }}
          >
            {/* Brand Logo */}
            <Link
              to="/"
              className="brand-link pb-3"
              style={{ color: "#fbfafc" }}
            >
              <i className="bx bx-layer nav_logo-icon" />
              <span className="brand-text">BBBootstrap</span>
            </Link>
            {/* Sidebar */}
            <div className="sidebar">
              {/* Sidebar user panel (optional) */}
              {/* Sidebar Menu */}
              <nav className="mt-3 pb-3 mb-3 d-flex">
                <ul
                  className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
                  <li className="nav-item pb-3">
                    <Link to="/" className="nav-linka">
                      <i className="bx bx-grid-alt nav-icon" />
                      <p>Dashboard</p>
                    </Link>
                  </li>
                  <li className="nav-item pb-3">
                    <Link to="/trade" className="nav-linka">
                      <i className="nav-icon bx bx-user" />
                      <p>Trade</p>
                    </Link>
                  </li>
                  <li className="nav-item pb-3">
                    <Link to="/balance" className="nav-linka">
                      <i className="nav-icon bx bx-message-square-detail" />
                      <p>Balance</p>
                    </Link>
                  </li>
                  <li className="nav-item pb-3">
                    <Link to="/market" className="nav-linka">
                      <i className="nav-icon bx bx-dollar" />
                      <p>Market</p>
                    </Link>
                  </li>
                  <li className="nav-item pb-3 out">
                    <a
                      href="/"
                      onClick={handleLogout}
                      className="nav-linka"
                    >
                      <i className="nav-icon bx bx-log-out" />
                      <p className="nav_name">Sign Out</p>
                    </a>
                  </li>
                </ul>
              </nav>
              {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
          </aside>
        </>
    )
}

export default DashboardLayoutSideNav
