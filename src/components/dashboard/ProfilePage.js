import { Navigate } from "react-router-dom";
// import './css/customProfile.css';
// import './js/scripts.js';
import './js/datatables-simple-demo.js';
import './css/styles.css';
// import { useEffect } from 'react';
// import { Helmet } from "react-helmet";
// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
// import axios from 'axios';


const ProfilePage = ({ user, setUser }) => {

  // const cors = require('cors');
  // const corsOptions = {
  //   origin: 'https://cp.btfd.cc/api/v2/peatio/market/orders',
  //   credentials: true,            //access-control-allow-credentials:true
  //   optionSuccessStatus: 200
  // }
  // app.use(cors(corsOptions));
  const [market, setMarket] = useState("");
  const [side, setSide] = useState("");
  const [ord_type, setOrd_type] = useState("");
  const [price, setPrice] = useState("");
  const [volume, setVolume] = useState("");


  // submit buy sell form
  const onSubmitBuySell = async (e) => {
    e.preventDefault();

    let item = { market, side, ord_type, price, volume };
    const { csrf_token } = user;


    console.log(item);


    // let result = await fetch(
    //   "https://cp.btfd.cc/api/v2/peatio/market/orders",

    //   {

    //     mode: 'no-cors',
    //     withCredentials: 'true',
    //     method: "POST",
    //     body: JSON.stringify(item),
    //     headers: {

    //       "Content-Type": "application/json",
    //       "Accept": "application/json",
    //       "Access-Control-Allow-Origin": "*"
    //     },
    //   }
    // );

    // new request
    let result = await fetch("https://cp.btfd.cc/api/v2/peatio/market/orders",
      {
        mode: 'no-cors',
        method: "POST",
        withCredentials: 'true',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache': 'no-cache',
          Authorization: csrf_token || undefined,
        },
        credentials: 'include',
        body: JSON.stringify(item),

      })


    console.log(result);

    // result = await result.json();
    // console.log({ result });
    // console.log(result);

    // if (!result.ok) {
    //   result = await result.json();
    //   console.log(result);


    // }
  }



  if (!user) return <Navigate to="/login" />;


  const handleLogout = async () => {
    localStorage.removeItem("user-info");
    setTimeout(() => {
      setUser("");
    }, 100);
  };





  // console.log(user);
  // for the coming user
  const { email, state, role, uid } = user;
  // state for verify email
  let verfiEmailButtonForPending = false;

  // if (state == 'pending') {
  if (state === 'pending') {

    verfiEmailButtonForPending = true;
  }




  return (

    <div>



      <div className="sb-nav-fixed profilediv">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark" id="main">
          {/* <!-- Navbar Brand--> */}
          <a className="navbar-brand ps-3" href="index.html">Admin Panel</a>
          {/* <!-- Sidebar Toggle--> */}

          {/* not working toggle */}
          <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>

          {/* <!-- Navbar Search--> */}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
              <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
            </div>
          </form>
          {/* <!-- Navbar--> */}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#!">Settings</a></li>
                <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                <li><hr className="dropdown-divider" /></li>
                {/* <li><a className="dropdown-item" href="#!">Logout</a></li> */}
                <li><a className="dropdown-item" href="/" onClick={handleLogout}>Logout</a></li>

              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark sb-sidenav-toggled" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Core</div>
                  <a className="nav-link" href="index.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Profile
                  </a>
                  <div className="sb-sidenav-menu-heading">Interface</div>
                  <a className="nav-link collapsed" href="/" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Layouts
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                  </a>
                  <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" href="layout-static.html">Static Navigation</a>
                      <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                    </nav>
                  </div>
                  <a className="nav-link collapsed" href="/" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                    Pages
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                  </a>
                  <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                      <a className="nav-link collapsed" href="/" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                        Authentication
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </a>
                      <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                        <nav className="sb-sidenav-menu-nested nav">
                          <a className="nav-link" href="login.html">Login</a>
                          <a className="nav-link" href="register.html">Register</a>
                          <a className="nav-link" href="password.html">Forgot Password</a>
                        </nav>
                      </div>
                      <a className="nav-link collapsed" href="/" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                        Error
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </a>
                      <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                        <nav className="sb-sidenav-menu-nested nav">
                          <a className="nav-link" href="401.html">401 Page</a>
                          <a className="nav-link" href="404.html">404 Page</a>
                          <a className="nav-link" href="500.html">500 Page</a>
                        </nav>
                      </div>
                    </nav>
                  </div>
                  <div className="sb-sidenav-menu-heading">Addons</div>
                  <a className="nav-link" href="charts.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                    Charts
                  </a>
                  <a className="nav-link" href="tables.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    Tables
                  </a>
                </div>
              </div>
              {/* <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              {email}
            </div> */}
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">

                {/* profiles details */}
                <div className="row mt-4 profile-list-row">
                  <div className="col-xl-6 col-md-6 profile-list-div">



                    <ul className="list-group">
                      <li className="list-group-item list-group-item-secondary" aria-current="true">User Details</li>
                      <li className="list-group-item">Email: {email}</li>
                      <li className="list-group-item">UID: {uid}</li>
                      <li className="list-group-item">Role: {role}</li>
                      <li className="list-group-item">State:
                        {/* <span className="badge bg-primary rounded-pill">{state}</span> */}

                        {

                          verfiEmailButtonForPending ?
                            (<button className="btn btn-danger float-end">Verify Email</button>)
                            : (<span className="badge bg-primary rounded-pill">{state}</span>)




                        }
                      </li>
                      <li className="list-group-item">Password
                        {/* <button className="btn btn-primary float-end">Change</button> */}
                        <button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Change
                        </button>
                      </li>

                      <li className="list-group-item">2FA <button className="btn btn-primary float-end">Enable 2FA</button></li>

                    </ul>




                  </div>

                  <div className="col-xl-6 col-md-6 profile-list-div">

                    <ul className="list-group">
                      <li className="list-group-item list-group-item-secondary" aria-current="true">Profile Verification</li>
                      <li className="list-group-item">Email Address <span className="float-end ">Verified <i className="fa-solid fa-check"></i></span></li>
                      <li className="list-group-item">Verify Phone number <span className=" float-end">Verified <i className="fa-solid fa-check"></i></span> </li>
                      <li className="list-group-item">Complete your profile <button className="btn btn-primary float-end">Verify</button></li>
                      <li className="list-group-item">Verify your identity <button className="btn btn-primary float-end">Verify</button></li>
                      <li className="list-group-item">Verify proof of residence    <button className="btn btn-primary float-end">Verify</button></li>

                    </ul>




                  </div>
                </div>

                {/* api keys */}
                <div className="row mt-4 profile-list-row">
                  <div className="col-xl-12 col-md-12 profile-list-div">



                    <ul className="list-group">
                      <li className="list-group-item list-group-item-secondary" aria-current="true">My API Keys</li>
                      <li className="list-group-item text-center">Please enable Two-factor authentication</li>

                    </ul>




                  </div>


                </div>

                {/* account activity */}
                <div className="row mt-4 profile-list-row">
                  <div className="col-xl-12 col-md-12 profile-list-div">



                    <ul className="list-group">
                      <li className="list-group-item list-group-item-secondary" aria-current="true">Account Activity</li>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                            <th scope="col">Result</th>
                            <th scope="col">Address IP</th>
                            <th scope="col">User Agent</th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>7/3/22</td>

                            <td>Login</td>
                            <td>Succeed</td>
                            <td>103.151.2.4</td>
                            <td>Chrome windows 10</td>

                          </tr>
                          <tr>
                            <td>7/3/22</td>

                            <td>Login</td>
                            <td>Succeed</td>
                            <td>103.151.2.4</td>
                            <td>Chrome windows 10</td>

                          </tr>
                          <tr>
                            <td>7/3/22</td>

                            <td>Login</td>
                            <td>Succeed</td>
                            <td>103.151.2.4</td>
                            <td>Chrome windows 10</td>

                          </tr>
                        </tbody>
                      </table>



                    </ul>




                  </div>


                </div>

                {/* for a user form */}

                <div className="row mt-4  mt-5 ">
                  <div className="col-md-6 offset-md-3 profile-user-form-div">
                    <h3 className="text-center"> One Click Buy/Sell</h3>

                    <form
                      onSubmit={onSubmitBuySell}
                    >

                      <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect"
                          aria-label="Floating label select example"

                          value={market}
                          onChange={(e) => setMarket(e.target.value)}
                          name="market">
                          <option value="BTC">BTC</option>
                          <option value="ETH">ETH</option>
                          <option value="aaveusdt">AAVE</option>
                        </select>
                        <label htmlFor="floatingSelect">Market</label>
                      </div>
                      <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example"

                          value={side}
                          onChange={(e) => setSide(e.target.value)}
                          name="side">
                          <option value="buy">Buy</option>
                          <option value="sell">Sell</option>
                        </select>
                        <label htmlFor="floatingSelect">Order Side</label>
                      </div>
                      <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect"
                          aria-label="Floating label select example"

                          value={ord_type}
                          onChange={(e) => setOrd_type(e.target.value)}
                          name="ord_type">
                          <option value="limit">Limit</option>
                          <option value="market">Market</option>
                        </select>
                        <label htmlFor="floatingSelect">Order Type</label>
                      </div>

                      <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Price"
                          aria-label="Recipient's username" aria-describedby="basic-addon2"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          name="price"
                        />
                        <span className="input-group-text" id="basic-addon2">USDT</span>
                      </div>
                      <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Amount"
                          aria-label="Recipient's username" aria-describedby="basic-addon2"
                          value={volume}
                          onChange={(e) => setVolume(e.target.value)}
                          name="volume" />
                        <span className="input-group-text" id="basic-addon2">AAVE</span>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <ul className="list-group">
                            <li className="list-group-item">Total  <span className=" float-end">{price * volume}.0000000000 USDT</span></li>
                            <li className="list-group-item">Available  <span className=" float-end">9892.98970000 USDT</span></li>

                          </ul>
                        </div>

                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12">

                          <div className="d-grid gap-2">
                            {/* <button className="btn btn-primary" type="button">Buy</button> */}
                            <input type="submit" value="Buy" className="btn btn-primary" />

                          </div>
                        </div>

                      </div>


                    </form>

                  </div>
                </div>


              </div>
            </main>

          </div>
        </div>

      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">


          <div className="modal-content">

            <form action="" className="register-form" >

              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">CHANGE PASSWORD</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* <form action="" className="register-form" onSubmit={onSubmit}> */}


                <br />

                <input
                  type="password"
                  // value={changeOldPassword}
                  // onChange={(e) => setChangeOldPassword(e.target.value)}
                  className="form-control"
                  placeholder="Old Password"
                />
                <br />
                <input
                  type="password"
                  // value={newChangePassword}
                  // onChange={(e) => setNewChangePassword(e.target.value)}
                  className="form-control"
                  placeholder="New Password"
                />
                <br />
                <input
                  type="password"
                  // value={confirmChangePassword}
                  // onChange={(e) => setConfirmChangePassword(e.target.value)}
                  className="form-control"
                  placeholder="Password Confirmation"
                />

                {/* 
                <div className="btn-group">


                  <input type="submit" value="Sign Up" className="btn btn-sign" />

                </div> */}




              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>

          </div>
        </div>
      </div>


    </div>

  );
};

export default ProfilePage;
