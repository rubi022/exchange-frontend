import { Button, Dropdown } from "@components/components";
import cr from "classnames";
import * as React from "react";
import { injectIntl } from "react-intl";
import MaskInput from "react-maskinput";
import { connect } from "react-redux";
import { isDateInFuture } from "../../../helpers";
import { selectCurrentLanguage, selectUserInfo } from "../../../modules";
import {
  selectSendIdentitySuccess,
  sendIdentity,
} from "../../../modules/user/kyc/identity";
import { labelFetch } from "../../../modules/user/kyc/label";
import { nationalities } from "../../../translations/nationalities";
import countries from "i18n-iso-countries";
import { get } from "lodash";

class IdentityComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.formatDate = (date) => {
      const [day, month, year] = date.split("/");
      let formatDay = day ? day : "";
      formatDay =
        formatDay === "" || parseFloat(formatDay) <= 31 ? formatDay : "31";
      let formatMonth = month ? month : "";
      formatMonth =
        formatMonth === "" || parseFloat(formatMonth) <= 12
          ? formatMonth
          : "12";
      const formatYear = year ? parseFloat(year) : "";
      return formatDay && formatMonth && formatYear
        ? `${formatDay}/${formatMonth}/${formatYear}`
        : date;
    };
    this.formatDateFormProfile = (date) => {
      const [year, day, month] = date.split("-");
      let formatDay = day ? day : "";
      formatDay =
        formatDay === "" || parseFloat(formatDay) <= 31 ? formatDay : "31";
      let formatMonth = month ? month : "";
      formatMonth =
        formatMonth === "" || parseFloat(formatMonth) <= 12
          ? formatMonth
          : "12";
      const formatYear = year ? parseFloat(year) : "";
      return formatDay && formatMonth && formatYear
        ? `${formatDay}/${formatMonth}/${formatYear}`
        : date;
    };
    let defaultState = {
      city: "",
      countryOfBirth: "",
      dateOfBirth: "",
      firstName: "",
      lastName: "",
      nationality: "",
      postcode: "",
      residentialAddress: "",
    };
    let mergeState = {
      city: get(this.props.userData, "profile.city", ""),
      countryOfBirth: get(this.props.userData, "profile.country", ""),
      dateOfBirth: this.formatDateFormProfile(
        get(this.props.userData, "profile.dob", "")
      ),
      firstName: get(this.props.userData, "profile.first_name", ""),
      lastName: get(this.props.userData, "profile.last_name", ""),
      nationality: get(this.props.userData, "profile.metadata.nationality", ""),
      postcode: get(this.props.userData, "profile.postcode", ""),
      residentialAddress: get(this.props.userData, "profile.address", ""),
    };

    this.state = {
      ...defaultState,
      ...mergeState,
      cityFocused: false,
      dateOfBirthFocused: false,
      firstNameFocused: false,
      lastNameFocused: false,
      postcodeFocused: false,
      residentialAddressFocused: false,
    };
    this.translate = (e) => {
      return this.props.intl.formatMessage({ id: e });
    };
    this.scrollToElement = (displayedElem) => {
      const element = document.getElementsByClassName(
        "parent-confirm__content-identity-col-row"
      )[displayedElem];
      element &&
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
    };
    this.handleFieldFocus = (field) => {
      return () => {
        switch (field) {
          case "city":
            this.setState({
              cityFocused: !this.state.cityFocused,
            });
            this.scrollToElement(6);
            break;
          case "dateOfBirth":
            this.setState({
              dateOfBirthFocused: !this.state.dateOfBirthFocused,
            });
            this.scrollToElement(2);
            break;
          case "firstName":
            this.setState({
              firstNameFocused: !this.state.firstNameFocused,
            });
            this.scrollToElement(0);
            break;
          case "lastName":
            this.setState({
              lastNameFocused: !this.state.lastNameFocused,
            });
            this.scrollToElement(1);
            break;
          case "postcode":
            this.setState({
              postcodeFocused: !this.state.postcodeFocused,
            });
            this.scrollToElement(7);
            break;
          case "residentialAddress":
            this.setState({
              residentialAddressFocused: !this.state.residentialAddressFocused,
            });
            this.scrollToElement(4);
            break;
          default:
            break;
        }
      };
    };
    this.handleChange = (key) => {
      return (e) => {
        this.setState({
          [key]: e.target.value,
        });
      };
    };
    this.handleConfirmEnterPress = (event) => {
      if (event.key === "Enter" && !this.handleCheckButtonDisabled()) {
        event.preventDefault();
        this.sendData();
      }
    };
    this.handleChangeDate = (e) => {
      this.setState({
        dateOfBirth: this.formatDate(e.target.value),
      });
    };
    this.selectNationality = (value) => {
      this.setState({
        nationality: value,
      });
    };
    this.selectCountry = (value) => {
      this.setState({
        countryOfBirth: countries.getAlpha2Code(value, this.props.lang),
      });
    };
    this.handleCheckButtonDisabled = () => {
      const {
        city,
        dateOfBirth,
        firstName,
        lastName,
        postcode,
        residentialAddress,
        countryOfBirth,
        nationality,
      } = this.state;
      return (
        !firstName ||
        !lastName ||
        !dateOfBirth ||
        !nationality ||
        !residentialAddress ||
        !countryOfBirth ||
        !city ||
        !postcode
      );
    };
    this.sendData = () => {
      const dob = !isDateInFuture(this.state.dateOfBirth)
        ? this.state.dateOfBirth
        : "";
      const profileInfo = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        dob,
        address: this.state.residentialAddress,
        postcode: this.state.postcode,
        city: this.state.city,
        country: this.state.countryOfBirth,
        metadata: JSON.stringify({ nationality: this.state.nationality }),
        confirm: true,
      };
      this.props.sendIdentity(profileInfo);
    };
  }

  componentDidUpdate(prev) {
    if (!prev.success && this.props.success) {
      this.props.labelFetch();
    }
  }

  render() {
    const {
      city,
      dateOfBirth,
      firstName,
      lastName,
      postcode,
      residentialAddress,
      cityFocused,
      dateOfBirthFocused,
      firstNameFocused,
      lastNameFocused,
      postcodeFocused,
      residentialAddressFocused,
      countryOfBirth,
      nationality,
    } = this.state;
    const { success, lang } = this.props;
    const cityGroupClass = cr(
      "parent-confirm__content-identity-col-row-content",
      {
        "parent-confirm__content-identity-col-row-content--focused": cityFocused,
      }
    );
    const dateOfBirthGroupClass = cr(
      "parent-confirm__content-identity-col-row-content",
      {
        "parent-confirm__content-identity-col-row-content--focused": dateOfBirthFocused,
      }
    );
    const firstNameGroupClass = cr(
      "parent-confirm__content-identity-col-row-content",
      {
        "parent-confirm__content-identity-col-row-content--focused": firstNameFocused,
      }
    );
    const lastNameGroupClass = cr(
      "parent-confirm__content-identity-col-row-content",
      {
        "parent-confirm__content-identity-col-row-content--focused": lastNameFocused,
      }
    );
    const postcodeGroupClass = cr(
      "parent-confirm__content-identity-col-row-content",
      {
        "parent-confirm__content-identity-col-row-content--focused": postcodeFocused,
      }
    );
    const residentialAddressGroupClass = cr(
      "parent-confirm__content-identity-col-row-content",
      {
        "parent-confirm__content-identity-col-row-content--focused": residentialAddressFocused,
      }
    );
    const dataNationalities = nationalities.map((value) => {
      return this.translate(value);
    });
    const onSelectNationality = (value) =>
      this.selectNationality(dataNationalities[value]);

    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    countries.registerLocale(require("i18n-iso-countries/langs/ru.json"));
    countries.registerLocale(require("i18n-iso-countries/langs/zh.json"));

    const dataCountries = Object.values(countries.getNames(lang));
    const onSelectCountry = (value) => this.selectCountry(dataCountries[value]);
    return React.createElement(
      "div",
      {
        className:
          "form-step identity-card form-step1 col-12 col-md-8 mt-3 container card",
      },
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
              this.translate("page.body.kyc.identity.head")
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "form-step-fields card-innr pt-1 pb-5 no-border-radius" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-12 col-md-6" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              this.translate("page.body.kyc.identity.firstName")
            ),
            React.createElement("input", {
              className: "input-confirmation-number ",
              type: "text",
              placeholder: this.translate("page.body.kyc.identity.firstName"),
              value: firstName,
              onChange: this.handleChange("firstName"),
              onFocus: this.handleFieldFocus("firstName"),
              onBlur: this.handleFieldFocus("firstName"),
              autoFocus: true,
            })
          ),
          React.createElement(
            "div",
            { className: "col-12 col-md-6" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              this.translate("page.body.kyc.identity.lastName")
            ),
            React.createElement("input", {
              className: "input-confirmation-number ",
              type: "text",
              placeholder: this.translate("page.body.kyc.identity.lastName"),
              value: lastName,
              onChange: this.handleChange("lastName"),
              onFocus: this.handleFieldFocus("lastName"),
              onBlur: this.handleFieldFocus("lastName"),
            })
          ),
          React.createElement(
            "div",
            { className: "col-12 col-md-6 mt-3" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              this.translate("page.body.kyc.identity.dateOfBirth")
            ),
            React.createElement(MaskInput, {
              className: "input-confirmation-number ",
              maskString: "00/00/0000",
              mask: "00/00/0000",
              onChange: this.handleChangeDate,
              onFocus: this.handleFieldFocus("dateOfBirth"),
              onBlur: this.handleFieldFocus("dateOfBirth"),
              value: dateOfBirth,
              placeholder: this.translate("page.body.kyc.identity.dateOfBirth"),
            })
          ),
          React.createElement(
            "div",
            { className: "col-12 col-md-6 mt-3" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              this.translate("page.body.kyc.identity.nationality")
            ),
            React.createElement(Dropdown, {
              className: "dropdown_list_white",
              list: dataNationalities,
              onSelect: onSelectNationality,
              placeholder: this.translate("page.body.kyc.identity.nationality"),
            })
          ),
          React.createElement(
            "div",
            { className: "col-12 col-md-6 mt-3" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              this.translate("page.body.kyc.identity.residentialAddress")
            ),
            React.createElement("input", {
              className: "input-confirmation-number ",
              type: "text",
              placeholder: this.translate(
                "page.body.kyc.identity.residentialAddress"
              ),
              value: residentialAddress,
              onChange: this.handleChange("residentialAddress"),
              onFocus: this.handleFieldFocus("residentialAddress"),
              onBlur: this.handleFieldFocus("residentialAddress"),
            })
          ),
          React.createElement(
            "div",
            { className: "col-12 col-md-6 mt-3" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              this.translate("page.body.kyc.identity.CoR")
            ),
            React.createElement(Dropdown, {
              className: "dropdown_list_white",
              list: dataCountries,
              onSelect: onSelectCountry,
              placeholder: this.translate("page.body.kyc.identity.CoR"),
            })
          ),
          React.createElement(
            "div",
            { className: "col-12 col-md-6 mt-3" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              this.translate("page.body.kyc.identity.city")
            ),
            React.createElement("input", {
              className: "input-confirmation-number ",
              type: "string",
              placeholder: this.translate("page.body.kyc.identity.city"),
              value: city,
              onChange: this.handleChange("city"),
              onFocus: this.handleFieldFocus("city"),
              onBlur: this.handleFieldFocus("city"),
            })
          ),
          React.createElement(
            "div",
            { className: "col-12 col-md-6 mt-3" },
            React.createElement(
              "label",
              { className: "input-item-label" },
              this.translate("page.body.kyc.identity.postcode")
            ),
            React.createElement("input", {
              className: "input-confirmation-number ",
              type: "string",
              placeholder: this.translate("page.body.kyc.identity.postcode"),
              value: postcode,
              onChange: this.handleChange("postcode"),
              onFocus: this.handleFieldFocus("postcode"),
              onBlur: this.handleFieldFocus("postcode"),
              onKeyPress: this.handleConfirmEnterPress,
            })
          ),
          React.createElement(
            "div",
            { className: "col-12 col-md-6 mt-3" },
            React.createElement(
              "button",
              {
                className: "btn btn-primary",
                onClick: this.sendData,
                disabled: this.handleCheckButtonDisabled(),
              },
              this.translate("page.body.kyc.next")
            )
          )
        )
      )
    );
  }
}

const mapStateToProps = (state) => ({
  success: selectSendIdentitySuccess(state),
  lang: selectCurrentLanguage(state),
  userData: selectUserInfo(state),
});
const mapDispatchProps = (dispatch) => ({
  sendIdentity: (payload) => dispatch(sendIdentity(payload)),
  labelFetch: () => dispatch(labelFetch()),
});

export const Identity = injectIntl(
  connect(mapStateToProps, mapDispatchProps)(IdentityComponent)
);
