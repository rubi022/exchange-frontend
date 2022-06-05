import { Navigate } from "react-router-dom";
// import './css/customProfile.css';
// import './js/scripts.js';
import "./js/datatables-simple-demo.js";
import "./css/styles.css";
// import { useEffect } from 'react';
// import { Helmet } from "react-helmet";
// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
// import axios from 'axios';
// import { getWithExpiry } from "../../helper/utils";
import { Link } from "react-router-dom";
import DashboardNavbar from "./base/DashboardNavbar";
import DashboardLayoutSideNav from "./base/DashboardLayoutSideNav.js";
import axios from "axios";
import { defaultAPI } from "../../api/api.js";

const ProfilePage = ({ user, setUser }) => {
  const getIteminfo = JSON.parse(localStorage.getItem("user-info"));
  // for change password

  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  // submit chnage password modal form
  const onPasswordChangeModalSubmit = async (e) => {
    e.preventDefault();

    let item = { old_password, new_password, confirm_password };

    console.log(item);
    // console.log(user);

    let result = await axios.put(
      `${defaultAPI.api.authUrl}/resource/users/password`,
      JSON.stringify(item),
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getIteminfo.value.csrf_token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }
    );

    if (!result.ok) {
      console.log(
        `An error has occured: ${result.status} - ${result.statusText}`
      );
    } else {
      const data = await result.json();
      console.log(data);
    }

  };

  if (!user) return <Navigate to="/login" />;

  // console.log(user);
  // for the coming user
  const { email, state, role, uid } = user;
  // let reset_password_token = csrf_token;

  // state for verify email
  let verifyEmailButtonForPending = false;

  // if (state == 'pending') {
  if (state === "pending") {
    verifyEmailButtonForPending = true;
  }

  return (
    <div>
      <div className="sb-nav-fixed profilediv">
        <DashboardNavbar user={user} setUser={setUser} />
        <div id="layoutSidenav">
          <DashboardLayoutSideNav />
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                {/* profiles details */}
                <div className="row  mt-4 profile-list-row">
                  <div className="col-xl-6 col-md-6 profile-list-div ">
                    <ul className="list-group card">
                      <li
                        className="list-group-item list-group-item-dark"
                        aria-current="true"
                      >
                        User Details
                      </li>
                      <li className="list-group-item">Email: {email}</li>
                      <li className="list-group-item">UID: {uid}</li>
                      <li className="list-group-item">Role: {role}</li>
                      <li className="list-group-item">
                        State:
                        {/* <span className="badge bg-primary rounded-pill">{state}</span> */}
                        {verifyEmailButtonForPending ? (
                          <button className="btn btn-danger float-end">
                            Verify Email
                          </button>
                        ) : (
                          <span className="badge bg-primary rounded-pill">
                            {state}
                          </span>
                        )}
                      </li>
                      <li className="list-group-item">
                        Password
                        {/* <button className="btn btn-primary float-end">Change</button> */}
                        <button
                          type="button"
                          className="btn btn-primary float-end"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Change
                        </button>
                      </li>

                      <li className="list-group-item">
                        2FA{" "}
                        <button className="btn btn-primary float-end">
                          Enable 2FA
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="col-xl-6 col-md-6 profile-list-div">
                    <ul className="list-group card">
                      <li
                        className="list-group-item list-group-item-dark"
                        aria-current="true"
                      >
                        Profile Verification
                      </li>
                      <li className="list-group-item">
                        Email Address{" "}
                        <span className="float-end ">
                          Verified <i className="fa-solid fa-check"></i>
                        </span>
                      </li>
                      <li className="list-group-item">
                        Verify Phone number{" "}
                        <span className=" float-end">
                          Verified <i className="fa-solid fa-check"></i>
                        </span>{" "}
                      </li>
                      <li className="list-group-item">
                        Complete your profile{" "}
                        <button className="btn btn-primary float-end">
                          Verify
                        </button>
                      </li>
                      <li className="list-group-item">
                        Verify your identity{" "}
                        <button className="btn btn-primary float-end">
                          Verify
                        </button>
                      </li>
                      <li className="list-group-item">
                        Verify proof of residence{" "}
                        <button className="btn btn-primary float-end">
                          Verify
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* api keys */}
                <div className="row mt-4 profile-list-row">
                  <div className="col-xl-12 col-md-12 profile-list-div">
                    <ul className="list-group card">
                      <li
                        className="list-group-item list-group-item-dark"
                        aria-current="true"
                      >
                        My API Keys
                      </li>
                      <li className="list-group-item text-center">
                        Please enable Two-factor authentication
                      </li>
                    </ul>
                  </div>
                </div>

                {/* account activity */}
                <div className="row mt-4 profile-list-row">
                  <div className="col-xl-12 col-md-12 profile-list-div">
                    <ul className="list-group card">
                      <li
                        className="list-group-item list-group-item-dark"
                        aria-current="true"
                      >
                        Account Activity
                      </li>
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
              </div>
            </main>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content card">
            <form onSubmit={onPasswordChangeModalSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  CHANGE PASSWORD
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <br />

                <input
                  type="password"
                  value={old_password}
                  onChange={(e) => setOld_password(e.target.value)}
                  className="form-control"
                  placeholder="Old Password"
                />
                <br />
                <input
                  type="password"
                  value={new_password}
                  onChange={(e) => setNew_password(e.target.value)}
                  className="form-control"
                  placeholder="New Password"
                />
                <br />
                <input
                  type="password"
                  value={confirm_password}
                  onChange={(e) => setConfirm_password(e.target.value)}
                  className="form-control"
                  placeholder="Password Confirmation"
                />

                {/* 
                <div className="btn-group">


                  <input type="submit" value="Sign Up" className="btn btn-sign" />

                </div> */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <input
                  type="submit"
                  value="Save changes"
                  className="btn btn-primary"
                />

                {/* <button type="submit" className="btn btn-primary">Save changes</button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
