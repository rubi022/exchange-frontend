import * as React from "react";
import { CopyableTextField } from "../../atoms";
import { QRCode } from "../QRCode/QRCode";
const DepositInfo = (props) => {
  return React.createElement(
    "p",
    { className: "base-deposit-info" },
    props.data
  );
};
/**
 *  Component that displays wallet details that can be used to deposit cryptocurrency.
 */
class DepositCrypto extends React.Component {
  render() {
    const { data, dimensions = "lg", error, text } = this.props;
    return React.createElement(
      "div",
      { className: "base-deposit-crypto" },
      React.createElement(
        "div",
        null,
        React.createElement(DepositInfo, { data: text }),
        React.createElement(
          "form",
          { className: "base-deposit-crypto__copyable" },
          React.createElement(
            "fieldset",
            { className: "base-copyable-text-field" },
            React.createElement(
              "legend",
              { className: "base-deposit-crypto__copyable-title" },
              "Deposit by Wallet Address"
            ),
            data
              ? React.createElement(CopyableTextField, {
                  className: "base-deposit-crypto__copyable-area",
                  value: data,
                  fieldId: "copy_deposit_1",
                })
              : React.createElement(CopyableTextField, {
                  className: "base-deposit-crypto__copyable-area",
                  fieldId: "copy_deposit_2",
                  value: error,
                })
          )
        )
      ),
      React.createElement(
        "div",
        null,
        React.createElement(QRCode, { dimensions: dimensions, data: data })
      )
    );
  }
}
export { DepositInfo, DepositCrypto };
