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
import { defaultAPI } from '../../api/api.js'
import BalanceList from './BalanceList.js'

const Balance = ({ user, setUser }) => {
    const [balanceDetails, setBalanceDetails] = useState([])

    // useEffect(() => {
    //     fetch(`${defaultAPI.api.tradeUrl}/account/balances`, {
    //         method: 'GET',
    //         mode: 'no-cors',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // console.log('Success:', data)
    //         })
    //         .catch((error) => {
    //             // console.error('Error:', error)
    //         })
    // }, []);

    useEffect(() => {
        let isMounted = true

        async function getBalanceData() {
            const res = await fetch(
                `${defaultAPI.api.tradeUrl}/account/balances`
            )
            const data = await res.json()
            if (isMounted) setBalanceDetails(data)
        }
        getBalanceData()

        return () => {
            isMounted = false
        }
    }, [])

    const balances = balanceDetails.map((balance) => {
        return (
            <BalanceList
                // key={balance.id}
                currency={balance.currency}
                balance={balance.balance}
                locked={balance.locked}
                // min_price={balance.min_price}
            />
        )
    })

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
                                                All Balance Items
                                            </li>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            CURRENCY
                                                        </th>
                                                        {/* <th scope="col">
                                                            NAME
                                                        </th> */}
                                                        <th scope="col">
                                                            AVAILABLE
                                                        </th>
                                                        <th scope="col">
                                                            LOCKED
                                                        </th>
                                                        <th scope="col">
                                                            ACTION
                                                        </th>
                                                        {/* <th scope="col">
                                                            24 Volume
                                                        </th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {balances}
                                                    {/* <tr>
                                                        <td>currency</td>

                                                        <td>balance</td>
                                                        <td>locked</td>
                                                        <td>
                                                            <button className="btn btn-primary ">
                                                                Deposit
                                                            </button>
                                                            <button className="btn btn-primary btn-withdrw">
                                                                Withdraw
                                                            </button>
                                                        </td>
                                                    </tr> */}
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

export default Balance
