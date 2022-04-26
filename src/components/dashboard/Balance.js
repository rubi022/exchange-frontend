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
                // `${defaultAPI.api.tradeUrl}/account/balances`
                `${defaultAPI.api.tradeUrl}/public/currencies`
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
                // currency={balance.currency}
                // balance={balance.balance}
                // locked={balance.locked}
                currencyId={balance.id}
                currencyName={balance.name}
                currencyAvailable={balance.price}
                locked={balance.deposit_fee}
                icon_url={balance.icon_url}
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

                            <div className="container-fluid px-4 balance-container">

                                <div className="row balance-switch-search ">

                                    <div class="col">

                                    </div>
                                    <div class="col-md-auto">
                                        <div class="form-check form-switch ">
                                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                            <label class="form-check-label" for="flexSwitchCheckDefault">Hide empty wallets</label>
                                        </div>
                                    </div>
                                    <div class="col col-lg-2">
                                        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                            <div className="input-group">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Search for..."
                                                    aria-label="Search for..."
                                                    aria-describedby="btnNavbarSearch"
                                                />
                                                <button
                                                    className="btn btn-primary"
                                                    id="btnNavbarSearch"
                                                    type="button"
                                                >
                                                    <i className="fas fa-search"></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* <div className="col-md-6">   </div> */}
                                    {/* <div className="col-md-6">
                                       </div> */}

                                </div>



                                {/* All market details*/}

                                <div className="row mt-4 profile-list-row">
                                    <div className="col-xl-12 col-md-12 profile-list-div card">
                                        <ul className="list-group card-body">
                                            <li
                                                className="list-group-item list-group-item-dark"
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
                                                            NAME
                                                        </th>
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
