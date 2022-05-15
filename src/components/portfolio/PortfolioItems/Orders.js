import React from "react";

const Order = () => {
  return (
    <div>
      <h3 style={{ color: "white", padding: "30px" }}>Order</h3>
      <div
        style={{
          borderTop: "1px solid gray",
          borderBottom: "1px solid gray",
          padding: "10px",
        }}
      >
        <span>Market</span>
        <span>Side</span>
        <span>Size</span>
        <span>Leverage</span>
        <span>Liq. price / oracle</span>
        <span>Unrealized P&L</span>
        <span>Realized P&L</span>
      </div>
      <div>
        <span>You have no open position</span>
      </div>
    </div>
  );
};

export default Order;
