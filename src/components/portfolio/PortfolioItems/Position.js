import React from "react";

const Position = () => {
  return (
    <div>
      <h3 style={{ color: "white", padding: "30px" }}> Position</h3>
      <div
        style={{
          borderTop: "1px solid gray",
          borderBottom: "1px solid gray",
          padding: "10px",
        }}
      >
        <span>Market</span>
        <span>Status</span>
        <span>Side</span>
        <span>Amound/Filled</span>
        <span>Price</span>
        <span>Trigger</span>
        <span>Good Till </span>
      </div>
      <div>
        <span>You have no orders</span>
      </div>
    </div>
  );
};

export default Position;
