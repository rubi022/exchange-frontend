import { Navigate } from 'react-router-dom'
// import './css/customProfile.css';
// import './js/scripts.js';
import './js/datatables-simple-demo.js'
import './css/styles.css'
// import { useEffect } from 'react';
// import { Helmet } from "react-helmet";
// import React, { useEffect, useState } from "react";
import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios'
// import { getWithExpiry } from "../../helper/utils";
import { Link } from 'react-router-dom'
import DashboardNavbar from './base/DashboardNavbar'
import DashboardLayoutSideNav from './base/DashboardLayoutSideNav.js'
import Cookies from 'js-cookie'

const Market = ({ user, setUser }) => {
    const url = 'https://cp.btfd.cc/api/v2/peatio/public/markets'

    const [marketDetails, setMarketDetails] = useState(null)

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
    //             console.log(
    //                 `An error has occured: ${response.status} - ${response.statusText}`
    //             )
    //         } else {
    //             console.log(
    //                 `it worked: ${response.status} - ${response.statusText}`
    //             )
    //         }
    //         // const data = await response.json();
    //         // console.log(data);
    //         // setBalance(data);
    //         // setBalance(response.json());

    //         console.log(response)
    //     }

    //     getBalanceData()
    // }, [url])

    // useLayoutEffect(
    //     function () {
    //         fetch(url)
    //             .then((res) => res.json())
    //             .then((data) => setMarketDetails(data));


    //     },
    //     [url]
    // )

    useEffect(() => {
        async function getMarketData() {
            const res = await fetch(url)
            const data = await res.json()
            setMarketDetails(data)
        }
        getMarketData()
    }, [])

    console.log(marketDetails);

    // marketDetails.map((market) => {
    //     return console.log(market);
    // })


    // useEffect(() => {
    //     let isMounted = true;               // note mutable flag
    //     someAsyncOperation().then(data => {
    //       if (isMounted) setState(data);    // add conditional check
    //     })
    //     return () => { isMounted = false }; // cleanup toggles value, if unmounted
    //   }, []);     

    if (!user) return <Navigate to="/login" />

    return (
        <div>
            <div className="sb-nav-fixed profilediv">
                <DashboardNavbar user={user} setUser={setUser} />

                <div id="layoutSidenav">
                    <DashboardLayoutSideNav />
                    <div id="layoutSidenav_content">
                        {/* <h1>{JSON.stringify(marketDetails)}</h1> */}
                        <main>
                            <div className="container-fluid px-4">
                                {/* All market details*/}

                                <div className="row mt-4 profile-list-row">
                                    <div className="col-xl-12 col-md-12 profile-list-div">
                                        <ul className="list-group">
                                            <li
                                                className="list-group-item list-group-item-secondary"
                                                aria-current="true"
                                            >
                                                All
                                            </li>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            Market
                                                        </th>
                                                        <th scope="col">
                                                            Last Price
                                                        </th>
                                                        <th scope="col">
                                                            24 Change
                                                        </th>
                                                        <th scope="col">
                                                            24 High
                                                        </th>
                                                        <th scope="col">
                                                            24 Low
                                                        </th>
                                                        <th scope="col">
                                                            24 Volume
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* <tr>
                                                        <td>market</td>

                                                        <td>name</td>
                                                        <td>Succeed</td>
                                                        <td>103.151.2.4</td>
                                                        <td>
                                                            Chrome windows 10
                                                        </td>
                                                        <td>
                                                            Chrome windows 10
                                                        </td>
                                                    </tr> */}

                                                    {
                                                        marketDetails.map(market => {

                                                            return (

                                                                <tr>
                                                                    <td>{market.name}</td>

                                                                    <td>{market.max_price}</td>
                                                                    <td>{market.min_amount}</td>
                                                                    <td>{market.min_price}</td>
                                                                    <td>
                                                                        {market.min_price}
                                                                    </td>
                                                                    <td>
                                                                        {market.min_price}
                                                                    </td>
                                                                </tr>

                                                            )
                                                        })
                                                    }


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
        </div>
    )
}

export default Market
