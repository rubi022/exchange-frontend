// TODO: add checkbox(not merged)
/* tslint:disable:jsx-no-lambda*/
import cr from "classnames";
import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, Checkbox, Input, Loader } from "../../atoms/";
import {
  EMAIL_REGEX,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_PASSWORD,
  ERROR_PASSWORD_CONFIRMATION,
  PASSWORD_REGEX,
} from "../../constants";
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (value) => {
      this.setState({
        recaptchaConfirmed: true,
        recaptcha_response: value,
      });
    };
    this.handleInput = (value, type) => {
      switch (type) {
        case "email":
          this.setState({
            email: value,
          });
          break;
        case "password":
          this.setState({
            password: value,
          });
          break;
        case "confirmation": {
          this.setState({
            confirmPassword: value,
          });
          break;
        }
        default:
          break;
      }
    };
    this.handleClick = (label, e) => {
      if (e) {
        e.preventDefault();
      }
      if (!this.isValidForm()) {
        this.validateForm();
      } else {
        this.handleSubmitForm();
      }
    };
    this.state = {
      confirmationError: "",
      confirmPassword: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      hasConfirmed: false,
      recaptchaConfirmed: false,
      recaptcha_response: "",
    };
  }
  render() {
    const {
      email,
      emailError,
      password,
      passwordError,
      confirmPassword,
      confirmationError,
      hasConfirmed,
      recaptchaConfirmed,
    } = this.state;
    const { onSignIn, errorMessage, image, isLoading, siteKey } = this.props;
    const buttonWrapperClass = cr("base-sign-in-form__button-wrapper", {
      "base-sign-in-form__button-wrapper--empty": !errorMessage,
    });
    return React.createElement(
      "form",
      null,
      React.createElement(
        "div",
        { className: "base-sign-up-form" },
        image
          ? React.createElement(
              "h1",
              { className: "base-sign-up-form__title" },
              React.createElement("img", {
                className: "base-sign-up-form__image",
                src: image,
                alt: "logo",
              }),
              "Sign-up"
            )
          : React.createElement(
              "h1",
              {
                className: "base-sign-up-form__title",
                style: { marginTop: 119 },
              },
              "Sign-up"
            ),
        React.createElement(
          "div",
          { className: "base-sign-up-form__group" },
          // React.createElement("label", { className: "base-sign-up-form__label" }, "Email"),
          React.createElement(Input, {
            type: "email",
            value: email,
            className: "base-sign-up-form__input",
            onChangeValue: (value) => this.handleInput(value, "email"),
          }),
          emailError &&
            React.createElement(
              "div",
              { className: "base-sign-up-form__error" },
              emailError
            )
        ),
        React.createElement(
          "div",
          { className: "base-sign-up-form__group" },
          // React.createElement("label", { className: "base-sign-up-form__label" }, "Password"),
          React.createElement(Input, {
            type: "password",
            value: password,
            className: "base-sign-up-form__input",
            onChangeValue: (value) => this.handleInput(value, "password"),
          }),
          passwordError &&
            React.createElement(
              "div",
              { className: "base-sign-up-form__error" },
              passwordError
            )
        ),
        React.createElement(
          "div",
          { className: "base-sign-up-form__group" },
          // React.createElement("label", { className: "base-sign-up-form__label" }, "Confirm Password"),
          React.createElement(Input, {
            type: "password",
            value: confirmPassword,
            className: "base-sign-up-form__input",
            onChangeValue: (value) => this.handleInput(value, "confirmation"),
          }),
          confirmationError &&
            React.createElement(
              "div",
              { className: "base-sign-up-form__error" },
              confirmationError
            )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(Checkbox, {
            checked: hasConfirmed,
            className: "base-sign-up-form__checkbox",
            onChange: () => this.handleCheckboxClick(),
            label:
              "By signing up, I confirm that I have read and I agree to the TERMS AND CONDITIONS & PRIVACY POLICY.",
          })
        ),
        hasConfirmed
          ? React.createElement(
              "div",
              { className: "base-sign-up-form__recaptcha" },
              React.createElement(ReCAPTCHA, {
                sitekey: siteKey,
                onChange: this.onChange,
              })
            )
          : null,
        React.createElement(
          "div",
          { className: buttonWrapperClass },
          React.createElement(
            "div",
            { className: "base-sign-in-form__error-message" },
            errorMessage || null
          ),
          React.createElement(
            "div",
            { className: "base-sign-in-form__loader" },
            isLoading ? React.createElement(Loader, null) : null
          ),
          React.createElement(Button, {
            type: "submit",
            className: "base-sign-up-form__button",
            label: isLoading ? "Loading..." : "Sign up",
            disabled: !hasConfirmed || isLoading || !recaptchaConfirmed,
            onClick: this.handleClick,
          })
        ),
        React.createElement(
          "div",
          { className: "base-sign-up-form__footer" },
          React.createElement(
            "p",
            { className: "base-sign-up-form__footer-create" },
            "Already have an account?"
          ),
          React.createElement(
            "span",
            {
              className: "base-sign-up-form__footer-signin",
              onClick: onSignIn,
            },
            "Sign in"
          )
        )
      )
    );
  }
  handleCheckboxClick() {
    this.setState((prev) => ({
      hasConfirmed: !prev.hasConfirmed,
    }));
  }
  handleSubmitForm() {
    const { confirmPassword, email, password, recaptcha_response } = this.state;
    this.setState(
      {
        hasConfirmed: false,
        confirmationError: "",
        emailError: "",
        passwordError: "",
      },
      () => {
        this.props.onSignUp({
          confirmPassword,
          email,
          password,
          recaptcha_response,
        });
      }
    );
  }
  isValidForm() {
    const { email, password, confirmPassword } = this.state;
    const isEmailValid = email.match(EMAIL_REGEX);
    const isPasswordValid = password.match(PASSWORD_REGEX);
    const isConfirmPasswordValid = password === confirmPassword;
    return (
      email &&
      isEmailValid &&
      password &&
      isPasswordValid &&
      confirmPassword &&
      isConfirmPasswordValid
    );
  }
  validateForm() {
    const { email, password, confirmPassword } = this.state;
    const isEmailValid = email.match(EMAIL_REGEX);
    const isPasswordValid = password.match(PASSWORD_REGEX);
    const isConfirmPasswordValid = password === confirmPassword;
    if (!isEmailValid && !isPasswordValid) {
      this.setState({
        confirmationError: "",
        emailError: ERROR_INVALID_EMAIL,
        passwordError: ERROR_INVALID_PASSWORD,
        hasConfirmed: false,
      });
      return;
    }
    if (!isEmailValid) {
      this.setState({
        confirmationError: "",
        emailError: ERROR_INVALID_EMAIL,
        passwordError: "",
        hasConfirmed: false,
      });
      return;
    }
    if (!isPasswordValid) {
      this.setState({
        confirmationError: "",
        emailError: "",
        passwordError: ERROR_INVALID_PASSWORD,
        hasConfirmed: false,
      });
      return;
    }
    if (!isConfirmPasswordValid) {
      this.setState({
        confirmationError: ERROR_PASSWORD_CONFIRMATION,
        emailError: "",
        passwordError: "",
        hasConfirmed: false,
      });
      return;
    }
  }
}
export { SignUpForm };
