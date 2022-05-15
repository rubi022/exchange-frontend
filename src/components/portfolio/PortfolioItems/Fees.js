import React from "react";

const Fees = () => {
  return (
    <div>
      <div>
        <h3 style={{ color: "white", padding: "30px" }}> History</h3>
        <div>
          <span>
            Free (30days) <br /> -
          </span>
          <div>
            <span>Market Fee</span>
            <span>Taker Fee</span>
          </div>
        </div>
      </div>
      <div>
        <h3>
          Trailing Volume <br /> -
        </h3>
        <div>
          <span>over the last 30 days</span>
        </div>
      </div>
      <div>
        <h3>Wallet Balance</h3>
        <div>
          <h3>-</h3>
          <br />
          <span> currently held</span>
        </div>
      </div>
    </div>
  );
};

export default Fees;
