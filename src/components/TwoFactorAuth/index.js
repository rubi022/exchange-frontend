import { Button } from "@components/components";
import cr from "classnames";
import { CustomInput } from "../";
import * as React from "react";
class TwoFactorAuthComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.handleCancel = () => {
      this.props.handleClose2fa();
    };
    this.handleSubmit = () => {
      this.props.onSubmit();
    };
    this.handleEnterPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.handleSubmit();
      }
    };
  }
  render() {
    const {
      errorMessage,
      isLoading,
      title,
      label,
      buttonLabel,
      message,
      error,
      otpCode,
      codeFocused,
    } = this.props;
    const errors = errorMessage || error;
    const buttonWrapperClass = cr("base-email-form__button-wrapper", {
      "base-email-form__button-wrapper--empty": !errors,
    });
    const emailGroupClass = cr("base-email-form__group", {
      "base-email-form__group--focused": codeFocused,
    });
    return React.createElement(
      "div",
      { className: "parent-2fa___form" },
      React.createElement(
        "form",
        null,
        React.createElement(
          "div",
          { className: "base-email-form" },
          React.createElement(
            "div",
            { className: "base-email-form__options-group" },
            React.createElement(
              "div",
              { className: "base-email-form__option" },
              React.createElement(
                "div",
                {
                  className: "base-email-form__option-inner",
                },
                title || "2FA verification",
                React.createElement(
                  "div",
                  {
                    className: "base-email-form__cros-icon",
                    onClick: this.handleCancel,
                  },
                  React.createElement("img", {
                    src: require("../EmailForm/close.svg"),
                  })
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "base-email-form__form-content" },
            React.createElement(
              "div",
              { className: "base-email-form__header" },
              message
            ),
            React.createElement(
              "div",
              { className: emailGroupClass },
              React.createElement(CustomInput, {
                type: "number",
                label: label || "6-digit Google Authenticator Code",
                placeholder: label || "6-digit Google Authenticator Code",
                defaultLabel: "6-digit Google Authenticator Code",
                handleChangeInput: this.props.handleOtpCodeChange,
                inputValue: otpCode,
                handleFocusInput: this.props.handleChangeFocusField,
                classNameLabel: "base-email-form__label",
                classNameInput: "base-email-form__input",
                onKeyPress: this.handleEnterPress,
                autoFocus: true,
              }),
              errorMessage &&
                React.createElement(
                  "div",
                  { className: "base-email-form__error" },
                  errorMessage
                )
            ),
            React.createElement(
              "div",
              { className: buttonWrapperClass },
              React.createElement(Button, {
                label: isLoading
                  ? "Loading..."
                  : buttonLabel
                  ? buttonLabel
                  : "Sign in",
                className: otpCode
                  ? "base-email-form__button"
                  : "base-email-form__button base-email-form__button--disabled",
                disabled: isLoading || !otpCode.match(/.{6}/g),
                onClick: this.handleSubmit,
              })
            )
          )
        )
      )
    );
  }
}
export const TwoFactorAuth = TwoFactorAuthComponent;
