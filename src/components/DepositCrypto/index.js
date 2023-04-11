import { QRCode } from "@components/components";
import classnames from "classnames";
import * as React from "react";
import { CopyableTextField } from "../CopyableTextField";
/**
 *  Component that displays wallet details that can be used to deposit cryptocurrency.
 */
const DepositCrypto = (props) => {
  const QR_SIZE = 118;
  const {
    data,
    dimensions,
    error,
    text,
    copiableTextFieldText,
    copyButtonText,
    handleOnCopy,
    disabled,
    minDepositAmount,
    depositEnabled,
    depositFee,
      min_deposit_warning,
      mining_deposit_warning,
    currency,
  } = props;
  const size = dimensions || QR_SIZE;
  // const onCopy = !disabled ? handleOnCopy : undefined;
  const className = classnames({
    "base-copyable-text-field__disabled": data === "",
  });
  return React.createElement(
    "div",
    { className: className },
    React.createElement(
      "div",
      { className: "base-deposit-crypto" },
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "base-deposit-info" }, text),
        data
          ? React.createElement(
              "div",
              { className: "d-none d-md-block qr-code-wrapper" },
              React.createElement(QRCode, { dimensions: size, data: data })
            )
          : null
      ),
      React.createElement(
        "div",
        {
          style: {
            flex: 1,
            width: "100%",
          },
        },
        React.createElement(
          "div",
          { className: "base-deposit-crypto__copyable" },
          React.createElement(CopyableTextField, {
            className: "base-deposit-crypto__copyable-area",
            value: data ? data : error,
            fieldId: data ? "copy_deposit_1" : "copy_deposit_2",
            copyButtonText: copyButtonText,
            disabled: disabled,
            copyMessage: handleOnCopy,
          }),
            <div className={'min-deposit-text__wrapper alert alert-warning'}>
                <div className={'text-center d-block'}>
                    {min_deposit_warning}
                </div>
                <div className={'text-center'}>
                    {mining_deposit_warning}
                </div>
            </div>
        )
      )
    )
  );
};
export { DepositCrypto };
