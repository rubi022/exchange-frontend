import React from 'react'
import { Link } from 'react-router-dom'

function DashboardLayoutSideNav() {
    return (
        <div id="layoutSidenav_nav">
            <nav
                className="sb-sidenav accordion sb-sidenav-dark sb-sidenav-toggled"
                id="sidenavAccordion"
            >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>
                        <Link className="nav-link" to="/">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Profile
                        </Link>
                        <Link className="nav-link" to="/trade">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Trade
                        </Link>
                        <Link className="nav-link" to="/balance">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Balance
                        </Link>
                        <Link className="nav-link" to="/market">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Market
                        </Link>

                        <div className="sb-sidenav-menu-heading">Others</div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default DashboardLayoutSideNav
