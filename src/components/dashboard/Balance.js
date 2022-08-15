import { Navigate } from "react-router-dom";
import "./js/datatables-simple-demo.js";
import "./css/styles.css";
import React, { useState, useEffect } from "react";
import DashboardNavbar from "./base/DashboardNavbar";
import DashboardLayoutSideNav from "./base/DashboardLayoutSideNav.js";
import { defaultAPI } from "../../api/api.js";
import BalanceList from "./BalanceList.js";

const Balance = ({ user, setUser }) => {
  const [balanceDetails, setBalanceDetails] = useState([]);

  async function getBalanceData() {
    let result = await fetch(`${defaultAPI.api.tradeUrl}/public/currencies`, {
      method: "GET",
      withCredentials: "true",
      cookie: user,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        session: "_barong_session",
      },
    });
    result = await result.json();
    console.log(result);
    setBalanceDetails(result);
  }

  useEffect(() => {
    getBalanceData();
    console.log("1");
  }, []);

  console.log(balanceDetails);

  const balances = balanceDetails.map((balance) => {
    return (
      <BalanceList
        currencyId={balance.id}
        currencyName={balance.name}
        currencyAvailable={balance.price}
        locked={balance.deposit_fee}
        icon_url={balance.icon_url}
      />
    );
  });

  if (!user) return <Navigate to="/login" />;

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
                  <div class="col"></div>
                  <div class="col-md-auto">
                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        Hide empty wallets
                      </label>
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
                  <div className="col-xl-12 col-md-12 profile-list-div ">
                    <table className="table">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">CURRENCY</th>
                          {/* <th scope="col">
                                                            NAME
                                                        </th> */}

                          <th scope="col">NAME</th>
                          <th scope="col">AVAILABLE</th>
                          <th scope="col">LOCKED</th>
                          <th scope="col">ACTION</th>
                        </tr>
                      </thead>
                      <tbody>{balances}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
