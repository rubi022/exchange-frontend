import { Button } from "@components/components";
import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import {
  resendCode,
  selectVerifyPhoneSuccess,
  sendCode,
  verifyPhone,
} from "../../../modules/user/kyc/phone";
import { changeUserLevel, selectUserInfo } from "../../../modules/user/profile";
import { last } from "lodash";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import countryCodes from "country-codes-list";
class PhoneComponent extends React.Component {
  constructor(props) {
    super(props);
    this.translate = (e) => {
      return this.props.intl.formatMessage({ id: e });
    };
    this.handleFieldFocus = (field) => {
      return () => {
        switch (field) {
          case "phoneNumber":
            this.addPlusSignToPhoneNumber();
            this.setState({
              phoneNumberFocused: !this.state.phoneNumberFocused,
            });
            break;
          case "confirmationCode":
            this.setState({
              confirmationCodeFocused: !this.state.confirmationCodeFocused,
            });
            break;
          default:
            break;
        }
      };
    };
    this.handleConfirmEnterPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.confirmPhone();
      }
    };
    this.handleSendEnterPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.handleSendCode();
      }
    };
    this.confirmPhone = () => {
      const requestProps = {
        phone_number: String(this.state.phoneNumber),
        verification_code: String(this.state.confirmationCode),
      };
      this.props.verifyPhone(requestProps);
    };
    this.addPlusSignToPhoneNumber = () => {
      if (this.state.phoneNumber.length === 0) {
        this.setState({
          phoneNumber: this.state.value.dialCode,
        });
      }
    };
    this.handleChangePhoneNumber = (e, v, t, f) => {
      if (this.inputPhoneNumber(v) || v === "") {
        this.setState({
          phoneNumber: `+${t.dialCode}${v}`,
          value: v,
          resendCode: false,
        });
      }
      this.ifPhoneNumberExists(t.dialCode + v);
    };

    this.handleChangeCountry = (e, v, t, f) => {
      if (this.inputPhoneNumber(t) || t === "") {
        this.setState({
          phoneNumber: `+${v.dialCode}${t}`,
          value: f,
          resendCode: false,
        });
      }
      this.ifPhoneNumberExists(v.dialCode + t);
    };
    this.ifPhoneNumberExists = (number) => {
      if (_.find(this.props.userData.phones, { number: number })) {
        this.setState({ resendCode: true });
      }
    };
    this.handleChangeConfirmationCode = (e) => {
      if (this.inputConfirmationCode(e)) {
        this.setState({
          confirmationCode: e.target.value,
        });
      }
    };
    this.inputPhoneNumber = (e) => {
      const convertedText = e.trim();
      // const convertedText = e.target.value.trim();
      const condition = new RegExp("^\\d*?$");
      return condition.test(convertedText);
    };
    this.inputConfirmationCode = (e) => {
      const convertedText = e.target.value.trim();
      const condition = new RegExp("^\\d*?$");
      return condition.test(convertedText);
    };
    this.handleSendCode = () => {
      const requestProps = {
        phone_number: String(this.state.phoneNumber),
      };
      if (!this.state.resendCode) {
        this.props.sendCode(requestProps);
        this.setState({
          resendCode: true,
        });
      } else {
        this.props.resendCode(requestProps);
      }
    };
    this.getPhoneNumberFromProps = () => {
      try {
        const numberWithExt = last(this.props.userData.phones).number;
        const country = last(this.props.userData.phones).country;
        const dialCode = countryCodes.filter("countryCode", country);
        return {
          numberWithExt: numberWithExt,
          phone: numberWithExt.slice(dialCode.length, numberWithExt.length),
          dialCode: dialCode,
          country: country,
        };
      } catch (e) {
        return {
          numberWithExt: "",
          phone: "",
          dialCode: "",
          country: "",
        };
      }
    };
    const defaultCountryCode = this.getPhoneNumberFromProps().country || "US";
    this.state = {
      phoneNumber: "+" + this.getPhoneNumberFromProps().numberWithExt,
      phoneNumberFocused: false,
      confirmationCode: "",
      confirmationCodeFocused: false,
      resendCode: !!this.getPhoneNumberFromProps(),
      defaultCountry: defaultCountryCode.toLowerCase(),
      value: this.getPhoneNumberFromProps().phone,
    };
  }
  componentDidUpdate(prev) {
    if (!prev.verifyPhoneSuccess && this.props.verifyPhoneSuccess) {
      this.props.changeUserLevel({ level: 2 });
    }
  }

  render() {
    const { confirmationCode } = this.state;
    const { verifyPhoneSuccess } = this.props;
    const inputProps = {
      type: "text",
      className: "copy-address",
      placeholder: this.translate("page.body.kyc.phone.phoneNumber"),
      onClick: this.addPlusSignToPhoneNumber,
      onKeyPress: this.handleSendEnterPress,
      autoFocus: true,
    };
    return React.createElement(
      "div",
      { className: "form-step form-step1 col-md-6 container card" },
      React.createElement(
        "div",
        { className: "card-innr no-border-radius" },
        React.createElement(
          "div",
          { className: "step-head" },
          React.createElement(
            "div",
            { className: "step-number text-white" },
            "01"
          ),
          React.createElement(
            "div",
            { className: "step-head-text" },
            React.createElement(
              "h3",
              { className: "text-white" },
              this.translate("page.body.kyc.phone.head")
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "form-step-fields card-innr pt-1 no-border-radius" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-12 col-md-6" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              "1. ",
              this.translate("page.body.kyc.phone.enterPhone")
            ),
            React.createElement(
              "div",
              { className: "" },
              React.createElement(
                "div",
                { className: "copy-wrap mgb-0-5x" },
                React.createElement("span", { className: "copy-feedback" }),
                // React.createElement("em",{className:"fas fa-comment "}),
                // React.createElement("input",{type:"text",className:"copy-address",placeholder: this.translate('page.body.kyc.phone.phoneNumber'), value: phoneNumber, onClick: this.addPlusSignToPhoneNumber, onChange: this.handleChangePhoneNumber, onFocus: this.handleFieldFocus('phoneNumber'), onBlur: this.handleFieldFocus('phoneNumber'), onKeyPress: this.handleSendEnterPress, autoFocus: true }),
                <IntlTelInput
                  placeholder={this.translate(
                    "page.body.kyc.phone.phoneNumber"
                  )}
                  inputProps={inputProps}
                  defaultValue={this.state.value}
                  onPhoneNumberChange={this.handleChangePhoneNumber}
                  format={false}
                  formatOnInit={false}
                  defaultCountry={this.state.defaultCountry}
                  onSelectFlag={this.handleChangeCountry}
                  onKeyPress={this.handleSendEnterPress}
                  autoFocus={true}
                />,
                React.createElement(
                  "button",
                  {
                    className: "copy-trigger copy-clipboard",
                    type: "button",
                    onClick: this.handleSendCode,
                  },
                  this.state.resendCode
                    ? React.createElement("em", { className: "fas fa-redo" })
                    : React.createElement("em", {
                        className: "fab fa-telegram-plane",
                      })
                )
              )
            )
          ),

          React.createElement(
            "div",
            { className: "col-12 col-md-6" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              "2. ",
              this.translate("page.body.kyc.phone.enterCode")
            ),
            React.createElement("input", {
              className: "input-confirmation-number",
              type: "text",
              placeholder: this.translate("page.body.kyc.phone.code"),
              value: confirmationCode,
              onChange: this.handleChangeConfirmationCode,
              onFocus: this.handleFieldFocus("confirmationCode"),
              onBlur: this.handleFieldFocus("confirmationCode"),
              onKeyPress: this.handleConfirmEnterPress,
            })
          ),
          verifyPhoneSuccess &&
            React.createElement(
              "p",
              { className: "parent-confirm__success" },
              verifyPhoneSuccess
            ),
          React.createElement(
            "div",
            { className: "" },
            React.createElement(Button, {
              className: "btn btn-primary",
              label: this.translate("page.body.kyc.next"),
              onClick: this.confirmPhone,
            })
          )
        )
      )
    );
  }
}
const mapStateToProps = (state) => ({
  verifyPhoneSuccess: selectVerifyPhoneSuccess(state),
  userData: selectUserInfo(state),
});
const mapDispatchProps = (dispatch) => ({
  resendCode: (phone) => dispatch(resendCode(phone)),
  sendCode: (phone) => dispatch(sendCode(phone)),
  verifyPhone: (payload) => dispatch(verifyPhone(payload)),
  changeUserLevel: (payload) => dispatch(changeUserLevel(payload)),
});

export const Phone = injectIntl(
  connect(mapStateToProps, mapDispatchProps)(PhoneComponent)
);
