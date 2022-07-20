import { Navigate } from "react-router-dom";
// import './css/customProfile.css';
// import './js/scripts.js';
import "./js/datatables-simple-demo.js";
import "./css/styles.css";
// import { useEffect } from 'react';
// import { Helmet } from "react-helmet";
// import React, { useEffect, useState } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { getWithExpiry } from "../../helper/utils";
import { Link } from "react-router-dom";
import DashboardNavbar from "./base/DashboardNavbar";
import DashboardLayoutSideNav from "./base/DashboardLayoutSideNav.js";
import { defaultAPI } from "../../api/api.js";
// import BalanceList from "./BalanceList.js";

const Order = ({ user, setUser }) => {


 
  useEffect(() => {
    async function getOrderData() {
      let result = await fetch(`${defaultAPI.api.tradeUrl}/market/orders?limit=25&page=1&state=wait`, {
        // let result = await fetch('https://cp.btfd.cc/api/v2/peatio/market/orders?limit=25&page=1&state=wait', {
        method: "GET",
        withCredentials: "true",
        mode: 'no-cors',
        cookie: user,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "session": "_barong_session"
        },
      });
      result = await result.json();
      console.log("my result for the order",result);
    }

    getOrderData();
    console.log("1");
  }, []);

  

  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <div className="sb-nav-fixed profilediv">
        <DashboardNavbar user={user} setUser={setUser} />

        <div id="layoutSidenav">
          <DashboardLayoutSideNav />
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4 balance-container">
                <div className="row balance-switch-search ">
                 
                  order page
                
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
