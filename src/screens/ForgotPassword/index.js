import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { EmailForm } from "../../components";
import {
  EMAIL_REGEX,
  ERROR_INVALID_EMAIL,
  setDocumentTitle,
} from "../../helpers";
import {
  forgotPassword,
  selectCurrentLanguage,
  selectForgotPasswordSuccess,
} from "../../modules";
import {AuthBrand, PoweredBy} from "../../component";
class ForgotPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeEmail = () => {
      const { email } = this.state;
      const { i18n } = this.props;
      this.props.forgotPassword({
        email,
        lang: i18n.toLowerCase(),
      });
    };
    this.handleFocusEmail = () => {
      this.setState({
        emailFocused: !this.state.emailFocused,
      });
    };
    this.handleInputEmail = (value) => {
      this.setState({
        email: value,
      });
    };
    this.validateForm = () => {
      const { email } = this.state;
      const isEmailValid = email ? email.match(EMAIL_REGEX) : true;
      if (!isEmailValid) {
        this.setState({
          emailError: ERROR_INVALID_EMAIL,
        });
        return;
      }
    };
    this.handleComeBack = () => {
      this.props.history.goBack();
    };
    this.state = {
      email: "",
      emailError: "",
      emailFocused: false,
    };
  }
  componentDidMount() {
    setDocumentTitle(
      this.props.intl.formatMessage({ id: "page.forgotPassword" })
    );
  }
  render() {
    const { email, emailFocused, emailError } = this.state;
    return React.createElement(
      "div",
      {
        className: "page-ath-wrap pt-5 pb-5 d-flex justify-content-start align-items-center flex-column position-relative",
      },
      // React.createElement(AuthBrand),
      React.createElement(
        "div",
        { className: "page-ath-content" },
        React.createElement(EmailForm, {
          OnSubmit: this.handleChangeEmail,
          title: this.props.intl.formatMessage({ id: "page.forgotPassword" }),
          description: this.props.intl.formatMessage({
            id: "page.forgotPassword.description",
          }),
          back: this.props.intl.formatMessage({
            id: "page.forgotPassword.back",
          }),
          signUp: this.props.intl.formatMessage({
            id: "page.forgotPassword.signUp",
          }),
          emailLabel: this.props.intl.formatMessage({
            id: "page.forgotPassword.email",
          }),
          buttonLabel: this.props.intl.formatMessage({
            id: "page.forgotPassword.send",
          }),
          email: email,
          emailFocused: emailFocused,
          emailError: emailError,
          message: this.props.intl.formatMessage({
            id: "page.forgotPassword.message",
          }),
          validateForm: this.validateForm,
          handleInputEmail: this.handleInputEmail,
          handleFieldFocus: this.handleFocusEmail,
          handleReturnBack: this.handleComeBack,
        })
      ),
      // React.createElement("div", { className: "gaps-2x" }),
      // React.createElement("div", {
      //     className: "fixed-bottom position-absolute pb-2",
      // },
      //     React.createElement(PoweredBy),
      // )
    );
  }
}
const mapStateToProps = (state) => ({
  success: selectForgotPasswordSuccess(state),
  i18n: selectCurrentLanguage(state),
});
const mapDispatchProps = (dispatch) => ({
  forgotPassword: (credentials) => dispatch(forgotPassword(credentials)),
});

export const ForgotPasswordScreen = injectIntl(
  withRouter(
    connect(mapStateToProps, mapDispatchProps)(ForgotPasswordComponent)
  )
);
