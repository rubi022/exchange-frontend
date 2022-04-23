import { Navigate } from 'react-router-dom'
// import './css/customProfile.css';
// import './js/scripts.js';
import './js/datatables-simple-demo.js'
import './css/styles.css'
// import { useEffect } from 'react';
// import { Helmet } from "react-helmet";
// import React, { useEffect, useState } from "react";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { getWithExpiry } from "../../helper/utils";
import { Link } from 'react-router-dom'
import DashboardNavbar from './base/DashboardNavbar'
import DashboardLayoutSideNav from './base/DashboardLayoutSideNav.js'

const Balance = ({ user, setUser }) => {
    const url = 'https://cp.btfd.cc/api/v2/peatio/account/balances'

    const [balance, setBalance] = useState(null)

    // useEffect(() => {
    //     async function getBalanceData() {
    //         let response = await fetch(url, {
    //             mode: 'no-cors',
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Accept: 'application/json',
    //             },
    //         })

    //         if (!response.ok) {
    //             // console.log(
    //             //     `An error has occured: ${response.status} - ${response.statusText}`
    //             // )
    //         } else {
    //             // console.log(
    //             //     `it worked: ${response.status} - ${response.statusText}`
    //             // )
    //         }
    //         // const data = await response.json();
    //         // console.log(data);
    //         // setBalance(data);
    //         // setBalance(response.json());
    //         // cmntd
    //         // console.log(response)
    //     }

    //     getBalanceData()
    // }, [url])

    // useEffect(
    //     function () {
    //         fetch(url)
    //             .then((res) => res.json())
    //             .then((data) => setBalance(data))
    //     },
    //     [url]
    // )

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('Success:', data)
            })
            .catch((error) => {
                // console.error('Error:', error)
            })
    }, [])

    if (!user) return <Navigate to="/login" />

    return (
        <div>
            <div className="sb-nav-fixed profilediv">
                <DashboardNavbar user={user} setUser={setUser} />
                <div id="layoutSidenav">
                    <DashboardLayoutSideNav />
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                {/* api keys */}
                                <div className="row mt-4 profile-list-row">
                                    <div className="col-xl-12 col-md-12 profile-list-div">
                                        <pre>
                                            {JSON.stringify(balance, null, 2)}
                                        </pre>

                                        <ul className="list-group">
                                            <li
                                                className="list-group-item list-group-item-secondary"
                                                aria-current="true"
                                            >
                                                My Balance
                                            </li>
                                            <li className="list-group-item text-center">
                                                show:{' '}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Balance
