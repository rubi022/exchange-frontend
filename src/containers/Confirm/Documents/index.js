import { Button, Dropdown, Loader } from "@components/components";
import cr from "classnames";
import * as React from "react";
import { injectIntl } from "react-intl";
import MaskInput from "react-maskinput";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isDateInFuture } from "../../../helpers/checkDate";
import {
  selectSendDocumentsLoading,
  selectSendDocumentsSuccess,
  sendDocuments,
} from "../../../modules/user/kyc/documents";
import _ from "lodash";
import {alertPush} from "../../../modules/public/alert";

class DocumentsComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.translate = (e) => {
      return this.props.intl.formatMessage({ id: e });
    };
    this.data = [
      this.translate("page.body.kyc.documents.select.passport"),
      this.translate("page.body.kyc.documents.select.identityCard"),
      this.translate("page.body.kyc.documents.select.driverLicense"),
      this.translate("page.body.kyc.documents.select.utilityBill"),
    ];
    this.state = {
      documentsType: "Passport",
      expiration: "",
      expirationFocused: false,
      idNumber: "",
      idNumberFocused: false,
      scans: [],
    };
    this.handleChangeDocumentsType = (value) => {
      this.setState({
        documentsType: value,
      });
    };
    this.handleFileDelete = (key) => () => {
      const fileList = Array.from(this.state.scans);
      fileList.splice(key, 1);
      this.setState({
        scans: fileList,
      });
    };
    this.renderScan = (scan, index) => {
      return React.createElement(
        "div",
        {
          className: "parent-confirm__content-documents-filename",
          key: index,
          onClick: this.handleFileDelete(index),
        },
        scan.name.slice(0, 27),
        "...\u00A0",
        React.createElement("img", { src: require("../close.svg") })
      );
    };
    this.handleChangeIdNumber = (e) => {
      this.setState({
        idNumber: e.target.value,
      });
    };
    this.handleFieldFocus = (field) => {
      return () => {
        switch (field) {
          case "expiration":
            this.setState({
              expirationFocused: !this.state.expirationFocused,
            });
            break;
          case "idNumber":
            this.setState({
              idNumberFocused: !this.state.idNumberFocused,
            });
            break;
          default:
            break;
        }
      };
    };
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
    this.handleChangeExpiration = (e) => {
      this.setState({
        expiration: this.formatDate(e.target.value),
      });
    };
    this.handleUploadScan = (uploadEvent) => {
      const allFiles = uploadEvent.target.files;
      const oldFileList = Array.from(this.state.scans);
      const additionalFileList =
        Array.from(allFiles).length > 5
          ? Array.from(allFiles).slice(0, 5)
          : Array.from(allFiles);
      if (oldFileList.length !== 5) {
        this.setState({
          scans: additionalFileList.concat(oldFileList),
        });
      }
    };
    this.handleFileDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const uploadObj = {
        target: event.nativeEvent.dataTransfer,
      };
      this.handleUploadScan(uploadObj);
    };
    this.handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    this.handleCheckButtonDisabled = () => {
      const { expiration, idNumber, scans } = this.state;
      return !scans.length || !idNumber || !expiration;
    };
    this.sendDocuments = () => {
      const { scans, idNumber, expiration, documentsType } = this.state;
      const typeOfDocuments = this.getDocumentsType(documentsType);
      const docExpire = isDateInFuture(expiration) ? expiration : "";
        if (!isDateInFuture(expiration)) {
            this.props.alertPush({
                message: ['resource.documents.already_expired'],
                type: 'error',
                code: 422,
            });
            return;
        }
      if (!scans.length) {
        return;
      }
      const request = new FormData();
      for (const scan of scans) {
        request.append("upload[]", scan);
      }
      request.append("doc_expire", docExpire);
      request.append("doc_type", typeOfDocuments);
      request.append("doc_number", idNumber);
      this.props.sendDocuments(request);
    };
    this.getDocumentsType = (value) => {
      switch (value) {
        case this.data[0]:
          return "Passport";
        case this.data[1]:
          return "Identity card";
        case this.data[2]:
          return "Driver license";
        case this.data[3]:
          return "Utility Bill";
        default:
          return value;
      }
    };
  }
  componentWillReceiveProps(next) {
    if (next.success === 'success.documents.accepted') {
      this.props.history.push("/profile");
    }
  }
  render() {
    const {
      documentsType,
      expiration,
      expirationFocused,
      idNumber,
      idNumberFocused,
      scans,
    } = this.state;
    const { loading } = this.props;
    const expirationFocusedClass = cr(
      "parent-confirm__content-documents-col-row-content",
      {
        "parent-confirm__content-documents-col-row-content--focused": expirationFocused,
      }
    );
    const idNumberFocusedClass = cr(
      "parent-confirm__content-documents-col-row-content",
      {
        "parent-confirm__content-documents-col-row-content--focused": idNumberFocused,
      }
    );
    const onSelect = (value) =>
      this.handleChangeDocumentsType(this.data[value]);
    const numberType = `${
      this.translate(
        `page.body.kyc.documents.select.${_.camelCase(documentsType)}`
      ) || this.translate("page.body.kyc.documentsType")
    }${this.translate("page.body.kyc.documents.number")}`;
    const documentActiveClass = (value) =>
      documentsType === value
        ? "nav-link d-flex align-items-center active  background-gradient"
        : "nav-link d-flex align-items-center";
    return React.createElement(
      "div",
      {
        className:
          "form-step identity-card form-step1 col-12 col-md-8 mt-3 pb-4 container card",
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
                "02"
            ),
          React.createElement(
            "div",
            { className: "step-head-text" },
            React.createElement(
              "h3",
              { className: "text-white" },
              this.translate("page.body.kyc.document.head")
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
            { className: "col-md-12" },
            React.createElement(
              "div",
              { className: "note note-plane note-light-alt note-md pdb-0-5x" },
              React.createElement("em", { className: "fas fa-info-circle" }),
              React.createElement(
                "p",
                null,
                "In order to complete, please upload any of the following personal document."
              )
            ),
            React.createElement(
              "ul",
              {
                className:
                  "nav nav-tabs nav-tabs-bordered row flex-wrap guttar-20px",
                role: "tablist",
              },
              React.createElement(
                "li",
                { className: "nav-item flex-grow-0" },
                React.createElement(
                  "a",
                  {
                    className: documentActiveClass("Passport"),
                    "data-toggle": "tab",
                    onClick: () => this.handleChangeDocumentsType("Passport"),
                  },
                  React.createElement(
                    "div",
                    { className: "nav-tabs-icon" },
                    React.createElement("img", {
                      src: "/images/icon-passport.png",
                      alt: "icon",
                    }),
                    React.createElement("img", {
                      src: "/images/icon-passport-color.png",
                      alt: "icon",
                    })
                  ),
                  React.createElement(
                    "span",
                    null,
                    this.translate("page.body.kyc.documents.select.passport")
                  )
                )
              ),
              React.createElement(
                "li",
                { className: "nav-item flex-grow-0" },
                React.createElement(
                  "a",
                  {
                    className: documentActiveClass("Identity card"),
                    "data-toggle": "tab",
                    onClick: () =>
                      this.handleChangeDocumentsType("Identity card"),
                  },
                  React.createElement(
                    "div",
                    { className: "nav-tabs-icon" },
                    React.createElement("img", {
                      src: "/images/icon-national-id.png",
                      alt: "icon",
                    }),
                    React.createElement("img", {
                      src: "/images/icon-national-id-color.png",
                      alt: "icon",
                    })
                  ),
                  React.createElement(
                    "span",
                    null,
                    this.translate(
                      "page.body.kyc.documents.select.identityCard"
                    )
                  )
                )
              ),
              React.createElement(
                "li",
                { className: "nav-item flex-grow-0" },
                React.createElement(
                  "a",
                  {
                    className: documentActiveClass("Driver license"),
                    "data-toggle": "tab",
                    onClick: () =>
                      this.handleChangeDocumentsType("Driver license"),
                  },
                  React.createElement(
                    "div",
                    { className: "nav-tabs-icon" },
                    React.createElement("img", {
                      src: "/images/icon-licence.png",
                      alt: "icon",
                    }),
                    React.createElement("img", {
                      src: "/images/icon-licence-color.png",
                      alt: "icon",
                    })
                  ),
                  React.createElement(
                    "span",
                    null,
                    this.translate(
                      "page.body.kyc.documents.select.driverLicense"
                    )
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-6 document-id-input" },
            React.createElement("input", {
              className: "input-confirmation-number",
              type: "text",
              placeholder: numberType,
              value: idNumber,
              onChange: this.handleChangeIdNumber,
              onFocus: this.handleFieldFocus("idNumber"),
              onBlur: this.handleFieldFocus("idNumber"),
            })
          ),
          React.createElement(
            "div",
            { className: "col-md-6" },
            React.createElement(MaskInput, {
              maskString: "00/00/0000",
              mask: "00/00/0000",
              onChange: this.handleChangeExpiration,
              onFocus: this.handleFieldFocus("expiration"),
              onBlur: this.handleFieldFocus("expiration"),
              value: expiration,
              className: "input-confirmation-number",
              placeholder: this.translate("page.body.kyc.documents.expiryDate"),
            })
          ),
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "div",
              { className: "parent-confirm__loader" },
              loading ? React.createElement(Loader, null) : null
            ),
            React.createElement(
              "div",
              {
                className:
                  "parent-confirm__content-documents-col parent-confirm__content-documents-drag",
              },
              React.createElement(
                "div",
                { className: "parent-confirm__content-documents-col-row" },
                React.createElement(
                  "div",
                  {
                    className:
                      "parent-confirm__content-documents-col-row-content-2",
                  },
                  this.translate("page.body.kyc.documents.upload"),
                  React.createElement(
                    "div",
                    {
                      className:
                        "parent-confirm__content-documents-col-row-content-2-documents",
                    },
                    React.createElement(
                      "form",
                      {
                        className: "box",
                        draggable: true,
                        onDrop: this.handleFileDrop,
                        onDragOver: this.handleDragOver,
                        method: "post",
                        action: "",
                        "data-enctype": "multipart/form-data",
                      },
                      React.createElement("input", {
                        className:
                          "parent-confirm__content-documents-col-row-content-2-documents-input",
                        "data-multiple-caption": "files selected",
                        draggable: true,
                        multiple: true,
                        name: "files[]",
                        type: "file",
                        id: "file",
                        onChange: this.handleUploadScan,
                        capture: 'environment',
                        accept: '.jpg, .jpeg, .png',
                      }),
                      React.createElement(
                        "div",
                        {
                          className:
                            "parent-confirm__content-documents-col-row-content-2-documents-label",
                        },
                        React.createElement(
                          "label",
                          {
                            className:
                              "parent-confirm__content-documents-col-row-content-2-documents-label-item",
                            htmlFor: "file",
                          },
                          React.createElement(
                            "p",
                            { className: "active" },
                            this.translate("page.body.kyc.documents.drag")
                          ),
                          React.createElement(
                            "div",
                            { className: "muted" },
                            this.translate("page.body.kyc.documents.maxFile")
                          ),
                          React.createElement(
                            "div",
                            { className: "muted" },
                            this.translate("page.body.kyc.documents.maxNum")
                          )
                        )
                      )
                    )
                  ),
                  Array.from(scans).map(this.renderScan),
                  React.createElement(
                    "span",
                    null,
                    this.translate("page.body.kyc.documents.files")
                  )
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-12" },
            React.createElement(
              "button",
              {
                className: "btn btn-primary mt-3",
                onClick: this.sendDocuments,
                disabled: this.handleCheckButtonDisabled(),
              },
              this.translate("page.body.kyc.submit")
            )
          )
        )
      )
    );
  }
}
const mapStateToProps = (state) => ({
  success: selectSendDocumentsSuccess(state),
  loading: selectSendDocumentsLoading(state),
});
const mapDispatchProps = (dispatch) => ({
  sendDocuments: (payload) => dispatch(sendDocuments(payload)),
  alertPush: payload => dispatch(alertPush(payload)),
});

export const Documents = injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchProps)(DocumentsComponent))
);
