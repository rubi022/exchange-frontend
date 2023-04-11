import { Loader } from "@components/components";
import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setDocumentTitle } from "../../helpers";
import {
  emailVerificationFetch,
  selectCurrentLanguage,
  selectSendEmailVerificationLoading,
  selectSignUpRequireVerification,
  selectUserInfo,
} from "../../modules";
import { ClipLoader } from "react-spinners";
import { logoutFetch } from "../../modules/user/auth";
class EmailVerificationComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = () => {
      this.props.emailVerificationFetch({
        email: this.props.location.state.email,
        lang: this.props.i18n.toLowerCase(),
      });
    };
    this.handleReturn = () => {
      this.props.logoutFetch({ redirect: true });
    };
  }
  componentDidMount() {
    setDocumentTitle(
      this.props.intl.formatMessage({
        id: "page.header.navbar.emailVerification",
      })
    );
    if (
      !this.props.location.state ||
      !this.props.location.state.email ||
      !this.props.requireEmailVerification
    ) {
      this.props.history.push("/signin");
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.requireEmailVerification !== prevProps.requireEmailVerification
    )
      this.props.history.push("/signin");
  }

  render() {
    const { emailVerificationLoading } = this.props;
    const title = this.props.intl.formatMessage({
      id: "page.header.signUp.modal.header",
    });
    const text = this.props.intl.formatMessage({
      id: "page.header.signUp.modal.body",
    });
    const button = this.props.intl.formatMessage({
      id: "page.resendConfirmation",
    });
    const login = this.props.intl.formatMessage({
      id: "page.forgotPassword.back",
    });
    return React.createElement(
      "div",
      { class: "page-ath-wrap pt-5" },
      React.createElement(
        "div",
        { class: "container" },
        React.createElement(
          "div",
          { class: "row justify-content-center" },
          React.createElement(
            "div",
            { class: "col-lg-10 col-xl-8" },
            React.createElement(
              "div",
              {
                class: "card content-area",
                style: {
                  backgroundColor: "#fff",
                  boxShadow: "0 0 20px rgb(0 0 0 / 8%)",
                },
              },
              React.createElement(
                "div",
                { class: "card-innr" },
                React.createElement(
                  "div",
                  { class: "status status-thank px-md-5" },
                  React.createElement(
                    "div",
                    { class: "status-icon" },
                    React.createElement("em", { class: "ti ti-check" })
                  ),
                  React.createElement(
                    "span",
                    { class: "status-text large" },
                    title
                  ),
                  React.createElement(
                    "p",
                    { class: "px-md-5", style: { color: "#303030" } },
                    text
                  ),
                  React.createElement(
                    "div",
                    {},
                    emailVerificationLoading
                      ? React.createElement(ClipLoader, {
                          sizeUnit: "px",
                          size: 35,
                          loading: true,
                          color: "var(--accent)",
                        })
                      : React.createElement(
                          "button",
                          {
                            className: "btn btn-primary",
                            onClick: this.handleClick,
                          },
                          button
                        )
                  ),
                  React.createElement(
                    "div",
                    {},
                    React.createElement(
                      "button",
                      {
                        className: "btn btn-danger",
                        onClick: this.handleReturn,
                      },
                      login
                    )
                  )
                )
              )
            ),
            React.createElement("div", { class: "gaps-1x" }),
            React.createElement("div", { class: "gaps-3x d-none d-sm-block" })
          )
        )
      )
    );
  }
}
const mapStateToProps = (state) => ({
  emailVerificationLoading: selectSendEmailVerificationLoading(state),
  i18n: selectCurrentLanguage(state),
  userData: selectUserInfo(state),
  requireEmailVerification: selectSignUpRequireVerification(state),
});
const mapDispatchProps = {
  emailVerificationFetch,
  logoutFetch,
};

export const EmailVerificationScreen = injectIntl(
  withRouter(
    connect(mapStateToProps, mapDispatchProps)(EmailVerificationComponent)
  )
);
