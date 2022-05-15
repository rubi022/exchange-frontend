import React from "react";

const History = () => {
  return (
    <div>
      <div>
        <h3 style={{ color: "white", padding: "30px" }}> History</h3>
        <h3 style={{ color: "white", padding: "30px" }}> Transfer</h3>
        <h3 style={{ color: "white", padding: "30px" }}> Funding</h3>
      </div>
      <div
        style={{
          borderTop: "1px solid gray",
          borderBottom: "1px solid gray",
          padding: "10px",
        }}
      >
        <span>Time</span>
        <span>Market</span>
        <span>Side</span>
        <span>Amound/ Price</span>
        <span>Total/ Fee</span>
        <span>Type</span>
        <span>Liquidity</span>
      </div>
      <div>
        <span>You have no trade history</span>
      </div>
    </div>
  );
};

export default History;
