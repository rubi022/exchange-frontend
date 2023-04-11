import { Button } from "@components/components";
import cr from "classnames";
import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CustomInput, EmailForm } from "../../components";
import {
  EMAIL_REGEX,
  ERROR_INVALID_PASSWORD,
  PASSWORD_REGEX,
  setDocumentTitle,
} from "../../helpers";
import {
  changeForgotPasswordFetch,
  changeLanguage,
  selectChangeForgotPasswordSuccess,
} from "../../modules";
class ChangeForgottenPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = () => {
      const { password, confirmPassword } = this.state;
      return !password || !confirmPassword;
    };
    this.handleFieldFocus = (field) => {
      return () => {
        switch (field) {
          case "password":
            this.setState({
              passwordFocused: !this.state.passwordFocused,
            });
            break;
          case "confirmPassword":
            this.setState({
              confirmPasswordFocused: !this.state.confirmPasswordFocused,
            });
            break;
          default:
            break;
        }
      };
    };
    this.handleSendNewPassword = () => {
      const { password, confirmPassword, confirmToken } = this.state;
      const isPasswordValid = password.match(PASSWORD_REGEX);
      const isConfirmPasswordValid = password === confirmPassword;
      this.setState(
        {
          error: !(isPasswordValid && isConfirmPasswordValid),
        },
        () => {
          if (!this.state.error) {
            this.props.changeForgotPasswordFetch({
              reset_password_token: confirmToken,
              password: password,
              confirm_password: confirmPassword,
            });
          }
        }
      );
    };
    this.handleChange = (key, value) => {
      this.setState({
        [key]: value,
      });
    };
    this.state = {
      error: false,
      confirmToken: "",
      password: "",
      passwordFocused: false,
      confirmPassword: "",
      confirmPasswordFocused: false,
    };
  }
  componentDidMount() {
    setDocumentTitle(this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.change'}));
    const { history } = this.props;
    const token = new URLSearchParams(history.location.search).get(
      "reset_token"
    );
    const lang = new URLSearchParams(history.location.search).get("lang");
    if (token) {
      this.setState({
        confirmToken: token,
      });
    }
    if (lang) {
      this.props.changeLanguage(lang.toLowerCase());
    }
  }
  componentWillReceiveProps(next) {
    if (next.changeForgotPassword && !this.props.changeForgotPassword) {
      this.props.history.push("/signin");
    }
  }
  render() {
    const {
      error,
      password,
      passwordFocused,
      confirmPassword,
      confirmPasswordFocused,
    } = this.state;
    const passwordFocusedClass = cr("base-email-form__group", {
      "base-email-form__group--focused": passwordFocused,
    });
    const confirmPasswordFocusedClass = cr("base-email-form__group", {
      "base-email-form__group--focused": confirmPasswordFocused,
    });
    const updatePassword = (e) => this.handleChange("password", e);
    const updateConfirmPassword = (e) =>
      this.handleChange("confirmPassword", e);
    return React.createElement(
      "div",
      {
        className: "page-ath-wrap pt-3 pb-5",
        style: {
          justifyContent: "center",
          alignItems: "center",
          background:
            // "linear-gradient(270deg, rgb(13, 16, 22), rgb(34, 46, 91), rgb(13, 16, 22))",
            "var(--auth-content-bg)",
        },
      },
      React.createElement(
        "div",
        { className: "page-ath-content" },
        React.createElement(
          "div",
          { className: "page-ath-form" },
          React.createElement(
            "h2",
            { className: "page-ath-heading" },
            "Reset password "
          ),
          React.createElement(
            "form",
            null,
            React.createElement(
              "div",
              { className: "input-item" },
              React.createElement(CustomInput, {
                type: "password",
                label: this.props.intl.formatMessage({
                  id: "page.header.signIn.resetPassword.newPassword",
                }),
                placeholder: this.props.intl.formatMessage({
                  id: "page.header.signIn.resetPassword.newPassword",
                }),
                defaultLabel: "New password",
                handleChangeInput: updatePassword,
                inputValue: password,
                handleFocusInput: this.handleFieldFocus("password"),
                classNameLabel: "base-email-form__label",
                classNameInput: "base-email-form__input",
                autoFocus: true,
              }),
              React.createElement(
                "div",
                { className: "base-sign-up-form__info" },
                this.props.intl.formatMessage({ id: ERROR_INVALID_PASSWORD })
              )
            ),
            React.createElement(
              "div",
              { className: "input-item" },
              React.createElement(CustomInput, {
                type: "password",
                label: this.props.intl.formatMessage({
                  id: "page.header.signIn.resetPassword.repeatPassword",
                }),
                placeholder: this.props.intl.formatMessage({
                  id: "page.header.signIn.resetPassword.repeatPassword",
                }),
                defaultLabel: "Repeat password",
                handleChangeInput: updateConfirmPassword,
                inputValue: confirmPassword,
                handleFocusInput: this.handleFieldFocus("confirmPassword"),
                classNameLabel: "base-email-form__label",
                classNameInput: "base-email-form__input",
                autoFocus: false,
              })
            ),
            React.createElement(
              "div",
              {
                className: "d-flex justify-content-between align-items-center",
              },
              React.createElement(
                "div",
                { className: "input-item text-left" },
                null
              ),
              React.createElement(
                "div",
                null,
                // React.createElement("a", {onClick: () => onForgotPassword(email)}, "Forgot password?"),
                React.createElement("div", { className: "gaps-2x" })
              )
            ),
            React.createElement(
              "div",
              {
                className: "flex-md-row flex-column d-flex justify-content-between align-items-center",
              },
              React.createElement(
                "div",
                null,
                // React.createElement("button", {class: "btn btn-primary btn-block"}, "Send Reset Link"),
                React.createElement(Button, {
                  label: this.props.intl.formatMessage({
                    id: "page.header.signIn.resetPassword.button",
                  }),
                  className: !this.disableButton()
                    ? "base-email-form__button"
                    : "base-email-form__button base-email-form__button--disabled",
                  disabled: this.disableButton(),
                  onClick: this.handleSendNewPassword,
                })
              )
            )
          ),
          React.createElement("div", { className: "gaps-2x" }),
          React.createElement("div", { className: "gaps-2x" }),
          React.createElement(
            "div",
            { className: "form-note" },
            "Don\u2019t have an account? ",
            React.createElement(
              "a",
              { href: "/signup" },
              " ",
              React.createElement("strong", null, "Sign up here")
            )
          )
        )
      )
      //   React.createElement(
      //     "div",
      //     { className: "page-ath-gfx" },
      //     React.createElement(
      //       "div",
      //       { className: "w-100 d-flex justify-content-center" },
      //       React.createElement(
      //         "div",
      //         { className: "col-md-8 col-xl-5" },
      //         React.createElement("img", {
      //           src: "/images/ath-gfx.png",
      //           alt: "image",
      //         })
      //       )
      //     )
      //   )
    );
  }
}
const mapStateToProps = (state) => ({
  changeForgotPassword: selectChangeForgotPasswordSuccess(state),
});
const mapDispatchProps = (dispatch) => ({
  changeForgotPasswordFetch: (credentials) =>
    dispatch(changeForgotPasswordFetch(credentials)),
  changeLanguage: (lang) => dispatch(changeLanguage(lang)),
});

const ChangeForgottenPasswordScreen = withRouter(
  injectIntl(
    connect(mapStateToProps, mapDispatchProps)(ChangeForgottenPasswordComponent)
  )
);
export { ChangeForgottenPasswordScreen };
