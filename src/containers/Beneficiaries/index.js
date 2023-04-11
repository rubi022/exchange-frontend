import { Button, Checkbox, Table } from "@components/components";
import {Dropdown} from "../../component/molecules/Dropdown/Dropdown";
import cr from "classnames";
import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { CopyableTextField, CustomInput } from "../../components";
import { localeFullDate } from "../../helpers/localeFullDate";
import {
  alertPush,
  beneficiaryCreateFetch,
  beneficiaryDeleteFetch,
  beneficiariesModal,
  beneficiariesFetch,
  beneficiaryUpdateFetch,
  selectUserInfo,
} from "../../modules";
import {
  selectBeneficiaries,
  selectBeneficiariesDataLoaded,
  selectBeneficiariesModal,
  selectCurrencies,
} from "../../modules/user/beneficiaries/selectors";
import { ClipLoader } from "react-spinners";
import {beneficiaryResendPinFetch} from "../../modules/user/beneficiaries";
import {
  createBeneficiaryFromWallets,
  selectCreateBeneficiary,
  selectCurrencyForBeneficiary
} from "../../modules/public/generic";

class BeneficiariesComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      code: "",
      activationCode: "",
      codeFocused: false,
      currency: null,
      name: "",
      fullName: "",
      description: "",
      swift: "",
      accountNumber: "",
      beneficiaryData: {},
    };
    this.t = (key) => {
      return this.props.intl.formatMessage({ id: key });
    };
    this.copy = (id) => {
      const copyText = document.querySelector(`#${id}`);
      if (copyText) {
        copyText.select();
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
      }
    };
    this.handleChange = (key) => {
      return (e) => {
        this.setState({
          [key]: e.target.value,
        });
      };
    };
    this.getTableHeaders = () => {
      return [
        this.t("page.body.profile.beneficiaries.table.header.currency"),
        this.t("page.body.profile.beneficiaries.table.header.name"),
        this.t("page.body.profile.beneficiaries.table.header.description"),
        this.t("page.body.profile.beneficiaries.table.header.state"),
        "",
        "",
      ];
    };
    this.renderModalHeader = () => {
      const headerText =
        this.props.modal.action === "createSuccess"
          ? this.t("page.body.profile.beneficiaries.modal.created_header")
          : this.t("page.body.profile.beneficiaries.modal.header");
      return React.createElement(
        "div",
        { className: "base-email-form__options-group" },
        React.createElement(
          "div",
          { className: "base-email-form__option" },
          React.createElement(
            "div",
            { className: "base-email-form__option-inner pointer" },
            headerText,
            React.createElement("span", {
              className:
                "parent-profile-page__close parent-profile-page__pull-right",
              onClick: this.handleHideModal,
            })
          )
        )
      );
    };
    this.renderModalBody = () => {
      const { otpCode, codeFocused, activationCode } = this.state;
      const emailGroupClass = cr("base-email-form__group", {
        "base-email-form__group--focused": codeFocused,
      });
      let body;
      let button;
      let resentCodeBtn;
      switch (this.props.modal.action) {
        case "getBeneficiaries":
          button = React.createElement(Button, {
            label: this.t("page.body.profile.beneficiaries.modal.btn.close"),
            onClick: this.handleGetBeneficiaries,
            className: otpCode ? "btn btn-primary" : "btn btn-primary",
          });
          body = React.createElement(
            "div",
            { className: "card p-4 mb-0" },
            React.createElement(
              "div",
              { className: "row p-4" },
              this.props.currencies &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t(
                      "page.body.profile.beneficiaries.modal.form.selectCurrency"
                    )
                  ),
                  React.createElement("input", {
                    className: "form-control",
                    disabled: true,
                    type: "string",
                    placeholder: this.t(
                      "page.body.profile.beneficiaries.modal.form.selectCurrency"
                    ),
                    value:
                      this.props.modal.beneficiary.currency.toUpperCase() || "",
                  })
                ),
              React.createElement(
                "div",
                { className: "col-md-6 p-2" },
                React.createElement(
                  "label",
                  { className: "input-item-label" },
                  this.t("page.body.profile.beneficiaries.modal.form.name")
                ),
                React.createElement("input", {
                  className: "form-control",
                  disabled: true,
                  type: "string",
                  placeholder: this.t(
                    "page.body.profile.beneficiaries.modal.form.name"
                  ),
                  value: this.props.modal.beneficiary.name || "",
                })
              ),
              React.createElement(
                "div",
                { className: "col-md-6 p-2" },
                React.createElement(
                  "label",
                  { className: "input-item-label" },
                  this.t(
                    "page.body.profile.beneficiaries.modal.form.description"
                  )
                ),
                React.createElement("input", {
                  className: "form-control",
                  disabled: true,
                  type: "string",
                  placeholder: this.t(
                    "page.body.profile.beneficiaries.modal.form.description"
                  ),
                  value: this.props.modal.beneficiary.description || "",
                })
              ),
              this.props.modal.beneficiary.data.address &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t("page.body.profile.beneficiaries.modal.form.address")
                  ),
                  React.createElement("input", {
                    className: "form-control",
                    disabled: true,
                    type: "string",
                    placeholder: this.t(
                      "page.body.profile.beneficiaries.modal.form.address"
                    ),
                    value: this.props.modal.beneficiary.data.address || "",
                  })
                ),
              this.props.modal.beneficiary.data.full_name &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t(
                      "page.body.profile.beneficiaries.modal.form.fullName"
                    )
                  ),
                  React.createElement("input", {
                    className: "form-control",
                    disabled: true,
                    type: "string",
                    placeholder: this.t(
                      "page.body.profile.beneficiaries.modal.form.fullName"
                    ),
                    value: this.props.modal.beneficiary.data.full_name || "",
                  })
                ),
              this.props.modal.beneficiary.data.account_number &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t(
                      "page.body.profile.beneficiaries.modal.form.accountNumber"
                    )
                  ),
                  React.createElement("input", {
                    className: "form-control",
                    disabled: true,
                    type: "string",
                    placeholder: this.t(
                      "page.body.profile.beneficiaries.modal.form.accountNumber"
                    ),
                    value:
                      this.props.modal.beneficiary.data.account_number || "",
                  })
                ),
              this.props.modal.beneficiary.data.swift &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t("page.body.profile.beneficiaries.modal.form.swift")
                  ),
                  React.createElement("input", {
                    className: "form-control",
                    disabled: true,
                    type: "string",
                    placeholder: this.t(
                      "page.body.profile.beneficiaries.modal.form.swift"
                    ),
                    value: this.props.modal.beneficiary.data.swift || "",
                  })
                ),
              React.createElement(
                "div",
                { className: "col-12" },
                React.createElement(
                  "div",
                  { className: "button-confirmation" },
                  button
                )
              )
            )
          );
          break;
        case "createBeneficiary":
          button = React.createElement(Button, {
            label: this.t("page.body.profile.beneficiaries.modal.btn.create"),
            onClick: this.handleCreateBeneficiary,
            disabled: !this.canSubmit(),
            className: `mx-0 ${this.canSubmit()
              ? "btn btn-primary"
              : "btn btn-secondary"}`,
          });
          body = React.createElement(
            "div",
            { className: "card p-4 mb-0 create-beneficiary" },
            React.createElement(
              "div",
              { className: "row p-4" },
              this.props.currencies &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t(
                      "page.body.profile.beneficiaries.modal.form.selectCurrency"
                    )
                  ),
                    React.createElement(Dropdown, {
                      className: "",
                      list: this.props.currencies.map((v) => v.name),
                      onSelect: (v) => {this.setState({currency: this.props.currencies[v]}); this.state.curreency = this.props.currencies[v]},
                      placeholder: this.t('page.body.profile.beneficiaries.modal.form.selectCurrency'),
                      defaultSelectedValue: this.state.currency ? this.state.currency.name : this.t('page.body.profile.beneficiaries.modal.form.selectCurrency'),
                    }),
                ),
              React.createElement(
                "div",
                { className: "col-md-6 p-2" },
                React.createElement(
                  "label",
                  { className: "input-item-label" },
                  this.t("page.body.profile.beneficiaries.modal.form.name")
                ),
                React.createElement("input", {
                  className: "form-control",
                  type: "string",
                  placeholder: this.t(
                    "page.body.profile.beneficiaries.modal.form.name"
                  ),
                  onChange: this.handleChange("name"),
                })
              ),
              React.createElement(
                "div",
                { className: "col-md-6 p-2" },
                React.createElement(
                  "label",
                  { className: "input-item-label" },
                  this.t(
                    "page.body.profile.beneficiaries.modal.form.description"
                  )
                ),
                React.createElement("input", {
                  className: "form-control",
                  type: "string",
                  placeholder: this.t(
                    "page.body.profile.beneficiaries.modal.form.description"
                  ),
                  onChange: this.handleChange("description"),
                })
              ),
              this.state.currency &&
                this.state.currency.type === "coin" &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t("page.body.profile.beneficiaries.modal.form.address")
                  ),
                  React.createElement("input", {
                    className: "form-control",
                    type: "string",
                    placeholder: this.t(
                      "page.body.profile.beneficiaries.modal.form.address"
                    ),
                    onChange: this.handleChange("address"),
                  })
                ),
              this.state.currency &&
                this.state.currency.type === "fiat" &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t(
                      "page.body.profile.beneficiaries.modal.form.fullName"
                    )
                  ),
                  React.createElement("input", {
                    className: "form-control",
                    type: "string",
                    placeholder: this.t(
                      "page.body.profile.beneficiaries.modal.form.fullName"
                    ),
                    onChange: this.handleChange("fullName"),
                  })
                ),
              this.state.currency &&
                this.state.currency.type === "fiat" &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t(
                      "page.body.profile.beneficiaries.modal.form.accountNumber"
                    )
                  ),
                  React.createElement("input", {
                    className: "form-control",
                    type: "string",
                    placeholder: this.t(
                      "page.body.profile.beneficiaries.modal.form.accountNumber"
                    ),
                    onChange: this.handleChange("accountNumber"),
                  })
                ),
              this.state.currency &&
                this.state.currency.type === "fiat" &&
                React.createElement(
                  "div",
                  { className: "col-md-6 p-2" },
                  React.createElement(
                    "label",
                    { className: "input-item-label" },
                    this.t("page.body.profile.beneficiaries.modal.form.swift")
                  ),
                  React.createElement("input", {
                    className: "form-control",
                    type: "string",
                    placeholder: this.t(
                      "page.body.profile.beneficiaries.modal.form.swift"
                    ),
                    onChange: this.handleChange("swift"),
                  })
                ),
              React.createElement(
                "div",
                { className: "col-12 px-2" },
                React.createElement(
                  "div",
                  { className: "button-confirmation" },
                  button
                )
              )
            )
          );
          break;
        case "updateBeneficiary":
          button = React.createElement(Button, {
            label: this.t("page.body.profile.beneficiaries.modal.btn.activate"),
            onClick: this.handleUpdateBeneficiary,
            className: otpCode ? "btn btn-primary" : "btn btn-secondary",
            disabled: !activationCode,
          });
          resentCodeBtn = (React.createElement(Button, {
            label: this.t('page.body.kyc.phone.resend'),
            onClick: () => this.handleResendPinClick(this.state.beneficiaryData),
            className: 'btn btn-secondary'
          }));
          body = React.createElement(
            "div",
            { className: "card p-4 mb-0" },
            React.createElement(
              "div",
              { className: "row p-4" },
              React.createElement(
                "div",
                { className: "col-12 p-2" },
                React.createElement(
                  "label",
                  { className: "input-item-label" },
                  this.t(
                    "page.body.profile.beneficiaries.modal.form.activationCode"
                  )
                ),
                React.createElement("input", {
                  className: "form-control",
                  type: "string",
                  placeholder: this.t(
                    "page.body.profile.beneficiaries.modal.form.activationCode"
                  ),
                  onChange: this.handleChange("activationCode"),
                })
              )
            ),
            React.createElement("div", { className: "" }, button, resentCodeBtn)
          );
          break;
        case "deleteBeneficiary":
          button = React.createElement(Button, {
            label: this.t("page.body.profile.beneficiaries.modal.btn.delete"),
            onClick: this.handleDeleteBeneficiary,
            className: otpCode ? "btn btn-primary" : "btn btn-primary",
          });
          body = React.createElement(
            "div",
            { className: "card p-4 mb-0" },
            React.createElement(
              "div",
              { className: "row p-4" },
              React.createElement(
                "div",
                { className: "col-12 p-2" },
                React.createElement(
                  "label",
                  { className: "input-item-label" },
                  this.t(
                    "page.body.profile.beneficiaries.modal.form.deleteConfirm"
                  )
                )
              )
            ),
            React.createElement("div", { className: "" }, button)
          );
          break;
        default:
          break;
      }
      body = !body
        ? React.createElement(
            "div",
            { className: "base-email-form__form-content" },
            React.createElement(
              "div",
              { className: "base-email-form__header" },
              this.t("page.body.profile.beneficiaries.modal.title")
            ),
            React.createElement(
              "div",
              { className: emailGroupClass },
              React.createElement(CustomInput, {
                type: "number",
                label: this.t("page.body.profile.beneficiaries.modal.label"),
                placeholder: this.t(
                  "page.body.profile.beneficiaries.modal.placeholder"
                ),
                defaultLabel: "2FA code",
                handleChangeInput: this.handleOtpCodeChange,
                inputValue: otpCode || "",
                handleFocusInput: this.handleChangeFocusField,
                classNameLabel: "base-email-form__label",
                classNameInput: "base-email-form__input",
                autoFocus: true,
                onBeneficiaryPress: this.handleEnterPress,
              })
            ),
            React.createElement(
              "div",
              { className: "base-email-form__button-wrapper" },
              button
            )
          )
        : body;
      return React.createElement(React.Fragment, null, body);
    };
    this.handleChangeFocusField = () => {
      this.setState((prev) => ({
        codeFocused: !prev.codeFocused,
      }));
    };
    this.handleHideModal = () => {
      const payload = { active: false };
      this.props.toggleBeneficiariesModal(payload);
    };
    this.handleOtpCodeChange = (value) => {
      this.setState({
        otpCode: value,
      });
    };
    this.renderOnClick = () => {
      switch (this.props.modal.action) {
        case "getBeneficiaries":
          this.handleGetBeneficiaries();
          break;
        case "createBeneficiary":
          this.handleCreateBeneficiary();
          break;
        case "createSuccess":
          this.handleCreateSuccess();
          break;
        case "updateBeneficiary":
          this.handleUpdateBeneficiary();
          break;
        case "deleteBeneficiary":
          this.handleDeleteBeneficiary();
          break;
        default:
          break;
      }
    };
    this.handleEnterPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.renderOnClick();
      }
    };
    this.handleGetBeneficiariesClick = (beneficiary) => {
      const payload = { active: true, action: "getBeneficiaries", beneficiary };
      this.props.toggleBeneficiariesModal(payload);
    };
    this.handleGetBeneficiaries = () => {
      this.handleHideModal();
      this.setState({ otpCode: "" });
    };
    this.handleCreateBeneficiaryClick = () => {
      const payload = { active: true, action: "createBeneficiary" };
      this.props.toggleBeneficiariesModal(payload);
    };
    this.canSubmit = () => {
      if (this.state.currency) {
        if (this.state.currency.type === "coin")
          return (
            this.state.address && this.state.name && this.state.description
          );
        if (this.state.currency.type === "fiat")
          return (
            this.state.fullName &&
            this.state.swift &&
            this.state.accountNumber &&
            this.state.name &&
            this.state.description
          );
        return this.state.name && this.state.description;
      }
      return false;
    };
    this.handleCreateBeneficiary = () => {
      if (!this.canSubmit())
        return this.props.fetchSuccess({
          message: [`page.body.profile.beneficiaries.modal.form.submitFailed`],
          type: "success",
        });
      let data = {};
      if (this.state.curreency.type === "coin")
        data = { ...data, address: this.state.address };
      if (this.state.curreency.type === "fiat")
        data = {
          ...data,
          full_name: this.state.fullName,
          swift: this.state.swift,
          account_number: this.state.accountNumber,
        };
      let payload = {
        currency: this.state.currency.id,
        name: this.state.name,
        description: this.state.description,
        data,
      };
      this.props.createBeneficiary(payload);
      this.setState({ otpCode: "" });
      this.props.createBeneficiaryFromWallets({
        create: false,
        currency: '',
      })
    };
    this.handleCreateSuccess = () => {
      const payload = { active: false };
      this.props.toggleBeneficiariesModal(payload);
    };
    this.handleToggleStateBeneficiaryClick = (beneficiary) => {
      if (beneficiary.state == "active")
        return this.props.fetchSuccess({
          message: ["page.body.profile.beneficiaries.modal.form.alreadyActive"],
          type: "error",
        });
      this.setState({beneficiaryData: beneficiary});
      const payload = {
        active: true,
        action: "updateBeneficiary",
        beneficiary,
      };
      this.props.toggleBeneficiariesModal(payload);
    };
    this.handleUpdateBeneficiary = () => {
      const payload = {
        pin: this.state.activationCode,
        id: this.props.modal.beneficiary.id,
      };
      this.props.updateBeneficiary(payload);
      this.setState({ activationCode: "" });
    };
    this.handleCopy = (id, type) => {
      this.copy(id);
      this.props.fetchSuccess({
        message: [`success.api_keys.copied.${type}`],
        type: "success",
      });
    };
    this.handleDeleteBeneficiaryClick = (beneficiary) => {
      const payload = {
        active: true,
        action: "deleteBeneficiary",
        beneficiary,
      };
      this.props.toggleBeneficiariesModal(payload);
    };
    this.handleDeleteBeneficiary = () => {
      const payload = { id: this.props.modal.beneficiary.id };
      this.props.deleteBeneficiary(payload);
      this.setState({ otpCode: "" });
    };
    this.handleResendPinClick = beneficiary => {
      const payload = beneficiary.id;
      this.props.resendPinBeneficiary(payload);
    }
  }
  componentDidMount() {
    const { createBeneficiaryState, createBeneficiaryCurrency, currencies } = this.props;

    if (createBeneficiaryState) {
      const selectedCurrency = currencies && currencies.filter(v => v.id === createBeneficiaryCurrency)[0]
      this.setState({
        currency: selectedCurrency,
      })
      this.state.curreency = selectedCurrency

      this.handleCreateBeneficiaryClick();
    }

    this.props.getBeneficiaries();
  }

  render() {
    const { user, dataLoaded, beneficiaries } = this.props;
    const modal = this.props.modal.active
      ? React.createElement(
          "div",
          { className: "base-modal" },
          React.createElement(
            "div",
            { className: "" },
            this.renderModalHeader(),
            this.renderModalBody()
          )
        )
      : null;
    return React.createElement(
      "div",
      { className: "card beneficiary-card" },
      React.createElement(
        "div",
        { className: "card-innr flex-column" },
        React.createElement(
          "div",
          { className: "card-head d-flex justify-content-between align-items-center" },
          React.createElement(
            "h4",
            { className: "card-title d-inline-block" },
            this.t("page.body.profile.beneficiaries.header")
          ),
          React.createElement(
            "button",
            {
              className: "d-inline-block float-right pointer btn",
              onClick: this.handleCreateBeneficiaryClick,
            },
            this.t("page.body.profile.beneficiaries.header.create")
          )
        ),
        !dataLoaded &&
          !beneficiaries.length &&
          React.createElement(ClipLoader, {
            sizeUnit: "px",
            size: 35,
            loading: true,
            color: "var(--accent)",
          }),
        dataLoaded &&
          !beneficiaries.length &&
          React.createElement(
            "div",
            {
              className:
                "parent-profile-page__label parent-profile-page__text-center",
              style: {
                fontWeight: 400,
              },
            },
            this.t("page.body.profile.beneficiaries.noBeneficiaries")
          ),
        dataLoaded &&
          beneficiaries.length > 0 &&
          React.createElement(Table, {
            header: this.getTableHeaders(),
            data:
              beneficiaries && beneficiaries.length
                ? this.getTableData(beneficiaries)
                : [[]],
          }),
        modal
      )
    );
  }
  getTableData(beneficiariesData) {
    return beneficiariesData.map((item, i) => [
      (this.props.currencies &&
        this.props.currencies.filter((v) => v.id === item.currency).name) ||
        item.currency.toUpperCase(),
      item.name,
      item.description,
      React.createElement(
        "div",
        { className: "parent-profile-page__api-keys__state", key: `${i}${item.id}state` },
        React.createElement(
          "span",
          {
            className:
              item.state === "active"
                ? "parent-profile-page__api-keys__state__active"
                : "parent-profile-page__api-keys__state__disabled",
          },
          item.state
        )
      ),
      React.createElement('button', {
            className: item.state === 'active' ? 'badge badge-danger badge__beneficiary-button' : 'badge badge-success badge__beneficiary-button',
            onClick: () => this.handleToggleStateBeneficiaryClick(item)
          },
          item.state === 'active' ? 'Deactivate' : 'Activate'
      ),
      React.createElement(
        "div",
        { className: "d-flex" },
        React.createElement("span", {
          className: "far fa-eye mr-2",
          style: { fontSize: "1.2rem" },
          key: item.id,
          onClick: () => this.handleGetBeneficiariesClick(item),
        }),
        item.state !== "active" ? React.createElement("span", {
          className: "far ti-reload mr-2 ml-2",
          style: {
            fontSize: "1.2rem",
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
          },
          key: item.id + '_beneficiary_resend_pin_span',
          onClick: () => this.handleResendPinClick(item)
        }) : React.createElement("span", {className: " mr-3 ml-3"}),
        React.createElement("span", {
          className: "parent-profile-page__close",
          key: item.id,
          onClick: () => this.handleDeleteBeneficiaryClick(item),
        })
      ),
    ]);
  }
}
const mapStateToProps = (state) => ({
  beneficiaries: selectBeneficiaries(state),
  currencies: selectCurrencies(state),
  dataLoaded: selectBeneficiariesDataLoaded(state),
  modal: selectBeneficiariesModal(state),
  user: selectUserInfo(state),
  createBeneficiaryState: selectCreateBeneficiary(state),
  createBeneficiaryCurrency: selectCurrencyForBeneficiary(state),
});
const mapDispatchToProps = (dispatch) => ({
  toggleBeneficiariesModal: (payload) => dispatch(beneficiariesModal(payload)),
  getBeneficiaries: (payload) => dispatch(beneficiariesFetch(payload)),
  createBeneficiary: (payload) => dispatch(beneficiaryCreateFetch(payload)),
  updateBeneficiary: (payload) => dispatch(beneficiaryUpdateFetch(payload)),
  deleteBeneficiary: (payload) => dispatch(beneficiaryDeleteFetch(payload)),
  fetchSuccess: (payload) => dispatch(alertPush(payload)),
  resendPinBeneficiary: payload => dispatch(beneficiaryResendPinFetch(payload)),
  createBeneficiaryFromWallets: (payload) => dispatch(createBeneficiaryFromWallets(payload)),
});
const connected = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(BeneficiariesComponent)
);
const Beneficiaries = withRouter(connected);
export { Beneficiaries };
