import { CryptoIcon } from "@components/components";
import * as React from "react";
import { Decimal } from "../../component/molecules/Decimal/Decimal";
const style = {
  display: "flex",
  justifyContent: "space-between",
};
/**
 * Component for displaying lock icon.
 */
const LockIcon = () => {
  return React.createElement(
    "svg",
    {
      width: "11",
      height: "13",
      viewBox: "0 0 13 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d:
        "M2.27501 4.06251V6.24997H1.30003C0.581781 6.24997 0 6.80935 0 7.49998V13.7501C0 14.4407 0.581781 15 1.30003 15H11.6999C12.4181 15 13 14.4407 13 13.7501V7.49998C13 6.80935 12.4181 6.24997 11.6999 6.24997H10.725V4.06251C10.725 1.81881 8.83335 0 6.5 0C4.16665 0 2.27501 1.81878 2.27501 4.06251ZM3.90001 6.24997V4.06251C3.90001 2.68128 5.06347 1.56246 6.49996 1.56246C7.93646 1.56246 9.09999 2.68128 9.09999 4.06251V6.24997H3.90001ZM5.19997 9.68751C5.19997 8.99692 5.78172 8.43754 6.49996 8.43754C7.21821 8.43754 7.79992 8.99692 7.79992 9.68751C7.79992 10.1282 7.56262 10.5157 7.20523 10.7376C7.20523 10.7376 7.33221 11.4752 7.47501 12.3438C7.47501 12.6031 7.25727 12.8125 6.98749 12.8125H6.01244C5.74269 12.8125 5.52499 12.6031 5.52499 12.3438L5.79477 10.7376C5.43735 10.5157 5.19997 10.1282 5.19997 9.68751Z",
      fill: "#E5E6EF",
    })
  );
};
const renderLocked = (fixed, lockedAmount) => {
  return lockedAmount
    ? React.createElement(
        "div",
        { className: "base-wallet-item__amount-locked" },
        React.createElement(LockIcon, null),
        " ",
        React.createElement(Decimal, { fixed: fixed }, lockedAmount.toString())
      )
    : "";
};
/**
 * Component for displaying information about wallet, including address and amount of currency.
 */
const WalletItem = (props) => {
  const { currency, name, balance, locked, active, fixed, iconUrl, estimatedValue } = props;
  let icon = iconUrl;
  if (!icon) {
    try {
      if (currency == "QUBIT") {
        icon = require("./Icon/QUBIT.png");
      } else {
        icon = require(`./Icon/${currency}.svg`);
      }
    } catch (e) {
      icon = require("./Icon/default.png");
    }
  }

  const cName = `base-wallet-item pl-4 pr-3 ${active ? "base-wallet-item--active" : ""}`;
  return React.createElement(
    "div",
    { style: style, className: cName },
    React.createElement(
      "div",
      { className: "base-wallet-item__info" },
      React.createElement("img", {
        className: "base-wallet-item__icon",
        src: icon,
        currency,
      }),
      React.createElement(
        "div",
        { className: "base-wallet-item__description" },
      React.createElement("span", {className: "text-uppercase"}, currency),
        React.createElement("p", {className: "base-wallet-currency-name text-muted-2"}, name)
      )
    ),
      React.createElement("div", { className: "d-flex justify-content-center align-items-end flex-column"},
          React.createElement(
              "span",
              { className: "base-wallet-item__balance font-weight-bold" },
              React.createElement(Decimal, { fixed: fixed }, balance ? balance.toString() : '0.0'),
          ),
          React.createElement("p", {className: "text-muted-2"}, "$" + estimatedValue),
      ),
  );
};
export { WalletItem };
