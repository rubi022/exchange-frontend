import { Button } from "@components/components";
import cx from "classnames";
import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { captchaType, siteKey } from "../../api";
import { Modal, SignUpForm } from "../../components";
import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_PASSWORD,
  ERROR_PASSWORD_CONFIRMATION,
  PASSWORD_REGEX,
  setDocumentTitle,
  ERROR_INVALID_USERNAME,
} from "../../helpers";
import {
  selectCurrentLanguage,
  selectSignUpRequireVerification,
  signUp,
} from "../../modules";
import {AuthBrand, PoweredBy} from "../../component";
export const extractRefID = (props) =>
  new URLSearchParams(props.location.search).get("refid");
class SignUp extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showModal: false,
      email: "",
      password: "",
      confirmPassword: "",
      recaptcha_response: "",
      recaptchaConfirmed: false,
      refId: "",
      hasConfirmed: false,
      usernameError: "",
      emailError: "",
      passwordError: "",
      confirmationError: "",
      emailFocused: false,
      passwordFocused: false,
      confirmPasswordFocused: false,
      refIdFocused: false,
      username: '',
      userNameFocussed: false,
    };
    this.handleCheckboxClick = () => {
      this.setState({
        hasConfirmed: !this.state.hasConfirmed,
      });
    };
    this.onChange = (value) => {
      this.setState({
        recaptchaConfirmed: true,
        recaptcha_response: value,
      });
    };
    this.handleChangeUserName = (value) => {
      this.setState({
        username: value,
      });
    };
    this.handleChangeEmail = (value) => {
      this.setState({
        email: value,
      });
    };
    this.handleChangePassword = (value) => {
      this.setState({
        password: value,
      });
    };
    this.handleChangeConfirmPassword = (value) => {
      this.setState({
        confirmPassword: value,
      });
    };
    this.handleChangeRefId = (value) => {
      this.setState({
        refId: value,
      });
    };
    this.handleFocusEmail = () => {
      this.setState({
        emailFocused: !this.state.emailFocused,
      });
    };
    this.handleFocusPassword = () => {
      this.setState({
        passwordFocused: !this.state.passwordFocused,
      });
    };
    this.handleFocusConfirmPassword = () => {
      this.setState({
        confirmPasswordFocused: !this.state.confirmPasswordFocused,
      });
    };
    this.handleFocusUserName = () => {
      this.setState({
        username: !this.state.username,
      });
    };
    this.handleFocusRefId = () => {
      this.setState({
        refIdFocused: !this.state.refIdFocused,
      });
    };
    this.handleSignIn = () => {
      return "/signin";
      this.props.history.push("/signin");
    };
    this.handleSignUp = () => {
      const { email, password, recaptcha_response, refId, username } = this.state;
      const { i18n } = this.props;
      if (refId) {
        switch (captchaType()) {
          case "none":
            this.props.signUp({
              username,
              email,
              password,
              refid: refId,
              lang: i18n.toUpperCase(),
              recaptcha_response: recaptcha_response,
            });
            break;
          case "recaptcha":
          case "geetest":
          default:
            this.props.signUp({
              username,
              email,
              password,
              recaptcha_response,
              refid: refId,
              lang: i18n.toUpperCase(),
            });
            break;
        }
      } else {
        switch (captchaType()) {
          case "none":
            this.props.signUp({
              username,
              email,
              password,
              lang: i18n.toUpperCase(),
            });
            break;
          case "recaptcha":
          case "geetest":
          default:
            this.props.signUp({
              username,
              email,
              password,
              recaptcha_response,
              lang: i18n.toUpperCase(),
            });
            break;
        }
      }
    };
    this.renderModalHeader = () => {
      return React.createElement(
        "div",
        { className: "parent-exchange-modal-submit-header" },
        this.props.intl.formatMessage({ id: "page.header.signUp.modal.header" })
      );
    };
    this.renderModalBody = () => {
      return React.createElement(
        "div",
        { className: "parent-exchange-modal-submit-body" },
        React.createElement(
          "h2",
          null,
          this.props.intl.formatMessage({ id: "page.header.signUp.modal.body" })
        )
      );
    };
    this.renderModalFooter = () => {
      return React.createElement(
        "div",
        { className: "parent-exchange-modal-submit-footer" },
        React.createElement(Button, {
          className: "parent-exchange-modal-submit-footer__button-inverse",
          label: "OK",
          onClick: this.closeModal,
        })
      );
    };
    this.closeModal = () => {
      this.setState({ showModal: false });
      this.props.history.push("/signin");
    };
    this.extractRefID = (url) => new URLSearchParams(url).get("refid");
    this.handleValidateForm = () => {
      const { username, email, password, confirmPassword } = this.state;
      const isUsernameValid = username.match(USERNAME_REGEX);
      const isEmailValid = email.match(EMAIL_REGEX);
      const isPasswordValid = password.match(PASSWORD_REGEX);
      const isConfirmPasswordValid = password === confirmPassword;
      if (!isUsernameValid) {
        this.setState({
          confirmationError: "",
          usernameError: this.props.intl.formatMessage({
            id: ERROR_INVALID_USERNAME,
          }),
          emailError: "",
          passwordError: "",
          hasConfirmed: false,
        });
        return;
      }
      if (!isEmailValid && !isPasswordValid) {
        this.setState({
          confirmationError: "",
          usernameError: "",
          emailError: this.props.intl.formatMessage({
            id: ERROR_INVALID_EMAIL,
          }),
          passwordError: this.props.intl.formatMessage({
            id: ERROR_INVALID_PASSWORD,
          }),
          hasConfirmed: false,
        });
        return;
      }
      if (!isEmailValid) {
        this.setState({
          confirmationError: "",
          usernameError: "",
          emailError: this.props.intl.formatMessage({
            id: ERROR_INVALID_EMAIL,
          }),
          passwordError: "",
          hasConfirmed: false,
        });
        return;
      }
      if (!isPasswordValid) {
        this.setState({
          confirmationError: "",
          usernameError: "",
          emailError: "",
          passwordError: this.props.intl.formatMessage({
            id: ERROR_INVALID_PASSWORD,
          }),
          hasConfirmed: false,
        });
        return;
      }
      if (!isConfirmPasswordValid) {
        this.setState({
          confirmationError: this.props.intl.formatMessage({
            id: ERROR_PASSWORD_CONFIRMATION,
          }),
          usernameError: "",
          emailError: "",
          passwordError: "",
          hasConfirmed: false,
        });
        return;
      }
    };
  }
  componentDidMount() {
    setDocumentTitle(
      this.props.intl.formatMessage({ id: "page.header.navbar.signUp" })
    );
    const referralCode = this.extractRefID(this.props.location.search) || "";
    this.setState({
      refId: referralCode,
    });
  }
  componentWillReceiveProps(props) {
    if (props.requireVerification) {
      props.history.push("/email-verification", { email: this.state.email });
    }
  }
  render() {
    const {
      email,
      password,
      confirmPassword,
      refId,
      recaptcha_response,
      recaptchaConfirmed,
      hasConfirmed,
      usernameError,
      emailError,
      passwordError,
      confirmationError,
      emailFocused,
      passwordFocused,
      confirmPasswordFocused,
      refIdFocused,
      userNameFocussed,
      username,
    } = this.state;
    const { loading } = this.props;
    const className = cx("parent-sign-up-screen__container", { loading });
    const exchangeName = window.env.name || "Exchange";
    return (
      <div
        className="page-ath-wrap pt-5 pb-5 d-flex justify-content-start align-items-center flex-column"
      >
        {/*<AuthBrand />*/}
        <div
          className="page-ath-content"
        >
          {React.createElement(SignUpForm, {
            labelSignIn: this.props.intl.formatMessage({
              id: "page.header.signIn",
            }),
            labelSignUp: this.props.intl.formatMessage({
              id: "page.header.signUp",
            }),
            emailLabel: this.props.intl.formatMessage({
              id: "page.header.signUp.email",
            }),
            passwordLabel: this.props.intl.formatMessage({
              id: "page.header.signUp.password",
            }),
            confirmPasswordLabel: this.props.intl.formatMessage({
              id: "page.header.signUp.confirmPassword",
            }),
            referalCodeLabel: this.props.intl.formatMessage({
              id: "page.header.signUp.referalCode",
            }),
            termsMessage: this.props.intl.formatMessage({
              id: "page.header.signUp.terms",
            }),
            termsNSText: this.props.intl.formatMessage({
              id: "page.signUp.termsAndService.text",
            }),
            refId: refId,
            handleChangeRefId: this.handleChangeRefId,
            isLoading: loading,
            onSignIn: this.handleSignIn,
            onSignUp: this.handleSignUp,
            siteKey: siteKey(),
            captchaType: captchaType(),
            email: email,
            handleChangeEmail: this.handleChangeEmail,
            password: password,
            handleChangePassword: this.handleChangePassword,
            confirmPassword: confirmPassword,
            handleChangeConfirmPassword: this.handleChangeConfirmPassword,
            recaptchaConfirmed: recaptchaConfirmed,
            recaptcha_response: recaptcha_response,
            recaptchaOnChange: this.onChange,
            hasConfirmed: hasConfirmed,
            clickCheckBox: this.handleCheckboxClick,
            validateForm: this.handleValidateForm,
            usernameError,
            emailError: emailError,
            passwordError: passwordError,
            passwordMessage: this.props.intl.formatMessage({
              id: ERROR_INVALID_PASSWORD,
            }),
            confirmationError: confirmationError,
            confirmPasswordFocused: confirmPasswordFocused,
            refIdFocused: refIdFocused,
            emailFocused: emailFocused,
            passwordFocused: passwordFocused,
            handleFocusEmail: this.handleFocusEmail,
            handleFocusPassword: this.handleFocusPassword,
            handleFocusConfirmPassword: this.handleFocusConfirmPassword,
            handleFocusRefId: this.handleFocusRefId,
            signInText: this.props.intl.formatMessage({
              id: "page.signUp.signin",
            }),
            signInExists: this.props.intl.formatMessage({
              id: "page.signUp.signinExists",
            }),
            exchangeSignUpText: this.props.intl.formatMessage(
              { id: "page.signUp.description" },
              { exchange_name: exchangeName }
            ),
            username,
            userNameFocussed: userNameFocussed,
            handleChangeUserName: this.handleChangeUserName,
            userNameLabel: this.props.intl.formatMessage({
              id: "page.header.signUp.username",
            }),
            buttonText: this.props.intl.formatMessage({
              id: "page.signUp.button",
            }),
          })}
        </div>
        {/* <div className="position-absolute fixed-bottom pb-2">
          <PoweredBy />
        </div> */}
        {/* <div className="page-ath-gfx">
                    <div className="w-100 d-flex justify-content-center">
                        <div className="col-md-8 col-xl-5"><img src="/images/ath-gfx.png" alt="image" /></div>
                    </div>
                </div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  requireVerification: selectSignUpRequireVerification(state),
  i18n: selectCurrentLanguage(state),
});
const mapDispatchProps = (dispatch) => ({
  signUp: (credentials) => dispatch(signUp(credentials)),
});

const SignUpScreen = injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchProps)(SignUp))
);
export { SignUpScreen };
