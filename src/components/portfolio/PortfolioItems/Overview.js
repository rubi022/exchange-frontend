import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

import "./custom.css";
import OverviewDataTable from "./Table/OverviewDataTable";

const Overview = () => {
  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Box
              style={{
                margin: "15px",
                textAlign: "center",
                border: "0.5px solid gray",
                padding: "15px",
              }}
            >
              <p>Portfolio value</p>
              <h4>$ 0.00</h4>
              <p>Past Weak</p>
            </Box>
            <div>
              <Box style={{ justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "flex", height: "100%" }}>
                  <p
                    style={{
                      marginLeft: "15px",
                      textAlign: "center",
                      border: "0.5px solid gray",
                      padding: "15px",
                      width: "150px",
                    }}
                  >
                    Margin usages
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      border: "0.5px solid gray",
                      padding: "15px",
                      width: "150px",
                    }}
                  >
                    Free Collateral
                  </p>
                </div>
                <div
                  style={{ display: "flex", height: "100%", margin: "15px" }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      border: "1px solid gray",
                      padding: "15px",
                      width: "150px",
                    }}
                  >
                    Leverage
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      border: "1px solid gray",
                      padding: "15px",
                      width: "150px",
                    }}
                  >
                    Buying Power
                  </p>
                </div>
              </Box>
            </div>
          </Grid>
          {/* <div className="itemBtn">
            <Grid
              className="btn"
              item
              xs={4}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              {
                <Box className="">
                  <span>
                    Connect your Ethereum wallet to deposit funds & start
                    trading.
                  </span>
                  <Button
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    Connect Wallet
                  </Button>
                </Box>
              }
            </Grid>
          </div> */}
        </Grid>
        <div>
          <div className="markets">
            <div>
              <h2 className="market">Market</h2>
              <h3 className="marketmtot">
                Discover new assets available to trade on dYdX
              </h3>
            </div>

            <div className="allBtn">
              <div className="singleThree">
                <Button className=" all eEAla button">All</Button>
                <Button className="eEAla button">Layer</Button>
                <Button className="eEAla button">DeFi</Button>
              </div>
              <span>
                <SearchIcon />
              </span>
            </div>
          </div>
          <div className="trade">
            <div className="tradeValume trValue">
              <span className="tradeText">Trading Volume</span>
              <h2>$615,645,786</h2>
              <span className="trtext">exchanged in the last 24h</span>
            </div>
            <div className=" trValue">
              <span className="tradeText">Open Interest</span>
              <h2>$618,055,421</h2>
              <span className="trtext">in open positions on dYdX</span>
            </div>
            <div className=" trValue">
              <span className="tradeText">Trades</span>
              <h2>171,537</h2>
              <span className="trtext">executed in the last 24h</span>
            </div>
          </div>
        </div>
      </div>
      <OverviewDataTable />
    </>
  );
};

export default Overview;
