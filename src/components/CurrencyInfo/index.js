import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Decimal } from "../../component/molecules/Decimal/Decimal";
const CurrencyIcon = (props) => {
  return props.icon
    ? React.createElement("img", {
        className: "base-wallet-item__single__image-icon",
        src: props.icon,
      })
    : React.createElement("span", {
        className: `base-wallet-item__icon-code base-crypto-font-${props.currency}`,
      });
};
const CurrencyInfo = (props) => {
  const balance = (props.wallet || { balance: 0 }).balance.toString();
  const lockedAmount = (props.wallet || { locked: 0 }).locked;
  const currency = (props.wallet || { currency: "" }).currency.toUpperCase();
  const selectedFixed = (props.wallet || { fixed: 0 }).fixed;
  const stringLocked = lockedAmount ? lockedAmount.toString() : undefined;
  let iconUrl = props.wallet ? props.wallet.iconUrl : null;
  if (!iconUrl) {
    try {
      iconUrl = require(`../WalletItem/Icon/${currency}.svg`);
    } catch (e) {}
  }
  return React.createElement(
    "div",
    { className: "base-wallet-item__single pt-4" },
    // React.createElement("img", {
    //   className: "base-wallet-item__icon",
    //   src: iconUrl,
    // }),
    React.createElement("div", {className: "d-flex justify-content-center align-items-center w-100 mb-3 text-bright"},
        React.createElement("h4", { className: "mb-1 font-weight-bold"}, balance + " "),
        React.createElement("h4", {className: "mb-1 ml-2 font-weight-bold"}, currency),
        ),
    React.createElement(
      "div",
      { className: "base-wallet-item__single-balance w-100" },
      React.createElement(
        "div",
          {className: "py-3 px-4 w-50 d-flex justify-content-center align-items-center flex-column"},
          React.createElement(
              "span",
              { className: "base-wallet-item__balance-amount pb-2" },
              React.createElement(Decimal, { fixed: selectedFixed }, balance),
              React.createElement("span", {className: "ml-1"}, currency),
          ),
          React.createElement(
              "span",
              { className: "base-wallet-item__balance justify-content-center" },
              React.createElement(FormattedMessage, {
                  id: "page.body.wallets.balance",
              })
          )
      ),
      React.createElement(
        "div",
        { className: "base-wallet-item__balance-container py-3 px-5 w-50 d-flex justify-content-center align-items-center flex-column" },
          React.createElement(
              "span",
              { className: "base-wallet-item__balance-locked pb-2" },
              React.createElement(Decimal, { fixed: selectedFixed }, stringLocked)
          ),
          React.createElement(
              "div",
              { className: "base-wallet-item__amount-locked justify-content-center mr-0" },
              React.createElement(FormattedMessage, {
                  id: "page.body.wallets.locked",
              })
          ),
      )
    )
  );
};
export { CurrencyInfo };
