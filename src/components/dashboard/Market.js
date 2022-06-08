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
import MarketList from './MarketList.js'
import { defaultAPI } from '../../api/api.js'

const Market = ({ user, setUser }) => {
    const [marketDetails, setMarketDetails] = useState([])

    useEffect(() => {
        let isMounted = true

        async function getMarketData() {
            const res = await fetch(`${defaultAPI.api.tradeUrl}/public/markets/tickers`)// /tickers
            const data = await res.json()
            if (isMounted) setMarketDetails(data)
        }
        getMarketData()

        return () => {
            isMounted = false
        }
    }, [])


    
    const marketDetailsArr = Object.keys(marketDetails);
   

    const markets = marketDetailsArr.map((market) => {
        return (
            <MarketList
                key={marketDetails[market]["at"]}
                name={[market.toUpperCase()]}
                max_price={marketDetails[market]["ticker"]["high"]}
                min_amount={marketDetails[market]["ticker"]["low"]}
                min_price={marketDetails[market]["ticker"]["volume"]}
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
                                    <div className="col-xl-12 col-md-12 profile-list-div card">
                                        <ul className="list-group card-body">
                                            <li
                                                className="list-group-item list-group-item-dark"
                                                aria-current="true"
                                            >
                                                All Market Items
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
                                                <tbody>{markets}</tbody>
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
