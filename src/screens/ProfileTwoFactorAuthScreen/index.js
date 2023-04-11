import { Button, Input } from "@components/components";
import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CloseIcon } from "../../assets/images/CloseIcon";
import { CopyableTextField } from "../../components";
import { setDocumentTitle } from "../../helpers";
import { alertPush } from "../../modules";
import {
  enableUser2fa,
  generate2faQRFetch,
  selectTwoFactorAuthBarcode,
  selectTwoFactorAuthQR,
  selectTwoFactorAuthSuccess,
  toggle2faFetch,
} from "../../modules/user/profile";
const copy = (id) => {
  const copyText = document.querySelector(`#${id}`);
  if (copyText) {
    copyText.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }
};
class ToggleTwoFactorAuthComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      otpCode: "",
    };
    this.translate = (e) => {
      return this.props.intl.formatMessage({ id: e });
    };
    this.doCopy = () => {
      copy("referral-id");
      this.props.fetchSuccess({
        message: ["page.body.wallets.tabs.deposit.ccy.message.success"],
        type: "success",
      });
    };
    this.renderToggle2fa = (enable2fa) => {
      const { barcode, qrUrl } = this.props;
      const { otpCode } = this.state;
      const secretRegex = /secret=(\w+)/;
      const secretMatch = qrUrl.match(secretRegex);
      const secret = secretMatch ? secretMatch[1] : null;
      const submitHandler = enable2fa
        ? this.handleEnable2fa
        : this.handleDisable2fa;
      return React.createElement(
        "div",
        { className: "container lg:pt-5  p-0" },
          React.createElement(
            "div",
            { className: "col-12 content-area card" },
            React.createElement(
              "div",
              { className: "card-innr" },
              React.createElement(
                "div",
                { className: "card-head" },
                React.createElement(
                  "div",
                  {
                    className:
                      "d-sm-flex justify-content-between align-items-start",
                    style: {
                      display: "flex",
                    },
                  },
                  React.createElement(
                    "div",
                    { className: "order-sm-first" },
                    React.createElement(
                      "h1",
                      { className: "card-title" },
                      this.translate(
                        "page.body.profile.header.account.content.twoFactorAuthentication.header"
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "mt-1 mt-md-2", onClick: this.goBack },
                    // React.createElement("img", {
                    //   src: require("./close.svg"),
                    // })
                    <CloseIcon />
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-12" },
                  React.createElement(
                    "div",
                    { className: "row col-12 pb-3" },
                    React.createElement(
                      "div",
                      { className: "d-inline" },
                      this.translate(
                        "page.body.profile.header.account.content.twoFactorAuthentication.message.1"
                      ),
                      React.createElement(
                        "a",
                        {
                          target: "_blank",
                          href:
                            "https://itunes.apple.com/ru/app/google-authenticator/id388497605?mt=8",
                        },
                        "AppStore "
                      ),
                      this.translate(
                        "page.body.profile.header.account.content.twoFactorAuthentication.message.or"
                      ),
                      React.createElement(
                        "a",
                        {
                          target: "_blank",
                          href:
                            "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl",
                        },
                        "Google play"
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "row col-12 pb-3" },
                    React.createElement(
                      "div",
                      { className: "d-inline" },
                      this.translate(
                        "page.body.profile.header.account.content.twoFactorAuthentication.message.2"
                      ),
                      React.createElement("br", null),
                      this.translate(
                        "page.body.profile.header.account.content.twoFactorAuthentication.message.3"
                      )
                    )
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "row m-0" },
                enable2fa && secret && this.renderSecret(secret)
              ),
              React.createElement(
                "div",
                { className: "row m-0 parent-profile-two-factor-auth__body" },
                React.createElement(
                  "div",
                  {
                    className:
                      "col-12 pl-2 parent-profile-two-factor-auth__body--text d-inline-block",
                  },
                  React.createElement(
                    "div",
                    { className: "row col-12 two-FA-QR-input__wrapper" },
                    React.createElement(
                      "div",
                      { className: "col-12 col-md-4 col-sm-12 pt-3 pt-3 p-0" },
                      enable2fa && this.renderTwoFactorAuthQR(barcode)
                    ),
                    React.createElement(
                      "div",
                      { className: "col-12 col-md-8 col-sm-12 mt-4 pt-3 p-0" },
                      React.createElement(
                        "span",
                        { className: "", htmlFor: "" },
                        this.translate(
                          "page.body.profile.header.account.content.twoFactorAuthentication.message.4"
                        )
                      ),
                      React.createElement(Input, {
                        className: "form-control",
                        onChangeValue: this.handleOtpCodeChange,
                        type: "number",
                        value: otpCode,
                        placeholder: this.translate(
                          "page.body.profile.header.account.content.twoFactorAuthentication.subHeader"
                        ),
                        onKeyPress: this.handleEnterPress,
                      })
                    )
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "row pt-3 pb-3" },
                React.createElement(
                  "div",
                  { className: "col-12 m-0" },
                  React.createElement(Button, {
                    className: "p-2 m-0 btn btn-primary",
                    label: this.translate(
                      "page.body.profile.header.account.content.twoFactorAuthentication.enable"
                    ),
                    onClick: submitHandler,
                  })
                )
              )
            )
          )
      );
    };
    this.handleOtpCodeChange = (value) => {
      this.setState({
        otpCode: value,
      });
    };
    this.handleEnterPress = (event) => {
      const enable2fa = this.get2faAction();
      const submitHandler = enable2fa
        ? this.handleEnable2fa
        : this.handleDisable2fa;
      if (event.key === "Enter") {
        event.preventDefault();
        submitHandler();
      }
    };
    this.handleEnable2fa = () => {
      this.props.toggle2fa({
        code: this.state.otpCode,
        enable: true,
      });
    };
    this.handleDisable2fa = () => {
      this.props.toggle2fa({
        code: this.state.otpCode,
        enable: false,
      });
    };
    this.handleNavigateToProfile = () => {
      this.props.history.push("/profile");
    };
    this.get2faAction = () => {
      const routingState = this.props.history.location.state;
      return routingState ? routingState.enable2fa : false;
    };
  }
  componentDidMount() {
    setDocumentTitle(
      this.props.intl.formatMessage({ id: "page.header.navbar.2fa" })
    );
    document.getElementsByClassName('container-fluid')[0].classList.add('two-fa-mobile__custom');
    document.getElementsByClassName('container-fluid')[0].classList.add('background-image-class');
    const enable2fa = this.get2faAction();
    if (enable2fa) {
      this.props.generateQR();
    }
  }
  componentWillReceiveProps(next) {
    if (!this.props.success && next.success) {
      this.handleNavigateToProfile();
    }
  }
  componentWillUnmount() {
      document.getElementsByClassName('container-fluid')[0].classList.remove('two-fa-mobile__custom');
      document.getElementsByClassName('container-fluid')[0].classList.remove('background-image-class');
  }

    render() {
    const enable2fa = this.get2faAction();
    return React.createElement(
      "div",
      { className: "parent-profile-two-factor-auth pt-md-5 p-4" },
      this.renderToggle2fa(enable2fa)
    );
  }
  componentDidUpdate(prev) {
    if (!prev.success && this.props.success) {
      this.props.enableUser2fa();
    }
  }
  renderTwoFactorAuthQR(barcode) {
    const src = `data:image/png;base64,${barcode}`;
    return (
      barcode.length > 0 &&
      React.createElement("img", {
        className: "parent-profile-two-factor-auth__qr",
        src: src,
      })
    );
  }
  renderSecret(secret) {
    return React.createElement(
      "div",
      { className: "col-12 pt-3 p-0" },
      React.createElement(
        "span",
        null,
        this.translate(
          "page.body.profile.header.account.content.twoFactorAuthentication.message.mfa"
        )
      ),
      secret &&
        React.createElement(CopyableTextField, {
          value: secret,
          fieldId: "secret-2fa",
        })
    );
  }
  goBack() {
    window.history.back();
  }
}
const mapStateToProps = (state) => ({
  qrUrl: selectTwoFactorAuthQR(state),
  barcode: selectTwoFactorAuthBarcode(state),
  success: selectTwoFactorAuthSuccess(state),
});
const mapDispatchToProps = (dispatch) => ({
  generateQR: () => dispatch(generate2faQRFetch()),
  toggle2fa: ({ code, enable }) => dispatch(toggle2faFetch({ code, enable })),
  enableUser2fa: () => dispatch(enableUser2fa()),
  fetchSuccess: (payload) => dispatch(alertPush(payload)),
});
const connected = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ToggleTwoFactorAuthComponent)
);

const ProfileTwoFactorAuthScreen = withRouter(connected);
export { ProfileTwoFactorAuthScreen };
