import { Button, Divider, Grid } from "@mui/material";
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
                textAlign: "left",
                border: "0.5px solid gray",
                padding: "15px",
                marginBottom: "0rem",
                width: "300px",
              }}
            >
              <p style={{ color: "#6f6e84", marginBottom: "14px" }}>
                Portfolio value
              </p>
              <h4
                style={{
                  color: "white",
                  fontSize: "26px",
                  lineHeight: "32px",
                  color: " #f7f7f7",
                }}
              >
                $0.00
              </h4>
              <p style={{ color: "#6f6e84" }}>
                <span style={{ color: "#3fb68b", marginTop: "4px" }}>
                  $0.00 (0.00%)
                </span>{" "}
                Past Weak
              </p>
            </Box>

            <div>
              <Box
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "0px",
                  /*   width: "100%", */
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    marginBottom: "0px",
                    marginLeft: "15px",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      border: "0.5px solid gray",
                      padding: "15px",
                      color: "#6f6e84",
                      width: "150px",
                      marginBottom: "0rem",
                    }}
                  >
                    Margin usages
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      border: "0.5px solid gray",
                      padding: "15px",
                      color: "#6f6e84",
                      width: "150px",
                      marginBottom: "0rem",
                    }}
                  >
                    Free Collateral
                  </p>
                </div>
                {/*    <Divider style={{ color: "white" }} />  */}
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    color: "#6f6e84",
                    margin: "15px",
                    marginTop: "0px",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      border: "1px solid gray",
                      color: "#6f6e84",
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
                      color: "#6f6e84",

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
              <h2
                style={{ fontSize: "20px", color: "white" }}
                className="market"
              >
                Market
              </h2>
              <h3 style={{ color: "#6f6e84" }} className="marketmtot">
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
              <span style={{ color: "#6f6e84" }} className="tradeText">
                Trading Volume
              </span>
              <h2>$615,645,786</h2>
              <span style={{ color: "#6f6e84" }} className="trtext">
                exchanged in the last 24h
              </span>
            </div>
            <div className=" trValue">
              <span style={{ color: "#6f6e84" }} className="tradeText">
                Open Interest
              </span>
              <h2>$618,055,421</h2>
              <span style={{ color: "#6f6e84" }} className="trtext">
                in open positions on dYdX
              </span>
            </div>
            <div className=" trValue">
              <span style={{ color: "#6f6e84" }} className="tradeText">
                Trades
              </span>
              <h2>171,537</h2>
              <span style={{ color: "#6f6e84" }} className="trtext">
                executed in the last 24h
              </span>
            </div>
          </div>
        </div>
        <OverviewDataTable />
      </div>
    </>
  );
};

export default Overview;
