import React from "react";
import "./custom.css";
const Position = () => {
  return (
    <div className="position">
      <div className="title">
        <h3
          className="positionTitle"
          style={{ color: "white", padding: "30px" }}
        >
          Open Position
        </h3>
      </div>
      <div
        className="openItem"
        style={{
          borderTop: "1px solid gray",
          borderBottom: "1px solid gray",
          padding: "10px",
        }}
      >
        <span className="singleLink">Market</span>
        <span className="singleLink">Status</span>
        <span className="singleLink">Side</span>
        <span className="singleLink">Amound/Filled</span>
        <span className="singleLink">Price</span>
        <span className="singleLink">Trigger</span>
        <span className="singleLink">Good Till </span>
      </div>
      <div className="positionText">
        <span className="positionText">You have no orders</span>
      </div>
    </div>
  );
};

export default Position;
