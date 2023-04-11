import { Checkbox, Button } from "@components/components";
import * as React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
class ProfileTwoFactorAuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle2fa = () => {
      this.props.navigateTo2fa(!this.state.is2faEnabled);
    };
    this.state = {
      is2faEnabled: props.is2faEnabled,
    };
  }
  render() {
    const { is2faEnabled } = this.state;
    const { title, description } = this.props;
    return React.createElement(
      "div",
      { className: "content-area card" },
      React.createElement(
        "div",
        { className: "card-innr" },
        React.createElement(
          "div",
          { className: "card-head" },
          React.createElement("h4", { className: "card-title" }, title)
        ),
        React.createElement(
          "span",
          {},
          React.createElement(FormattedMessage, {
            id: "page.profile.2faDescription",
          })
        ),
        React.createElement(
          "div",
          {
            className:
              "d-sm-flex justify-content-between align-items-center pdt-1-5x two-factor-auth",
            style: {
              // flexDirection: "column",
              // display: "flex",
            },
          },
          React.createElement(
            "span",
            {
              className:
                "ucap d-inline-flex align-items-center mobile-auth",
            },
            React.createElement(
              "span",
              { className: "mb-0" },
              React.createElement(
                "span",
                {
                  style: {
                    fontWeight: 400,
                  },
                },
                React.createElement(
                  FormattedMessage,
                  { id: "page.profile.currentStatus" },
                  null
                )
              )
            ),
            " ",
            React.createElement(
              "span",
              {
                className:
                  is2faEnabled === true
                    ? "badge ml-2 badge-success"
                    : "badge ml-2 badge-danger",
              },
              is2faEnabled
                ? React.createElement(FormattedMessage, {
                    id:
                      "page.body.profile.header.account.content.twoFactorAuthentication.message.enable",
                  })
                : React.createElement(FormattedMessage, {
                    id:
                      "page.body.profile.header.account.content.twoFactorAuthentication.message.disable",
                  })
            )
          ),
          React.createElement("div", { className: "gaps-2x d-sm-none" }),
          is2faEnabled === false &&
            React.createElement(Button, {
              className: "order-sm-first btn btn-primary enable_2fa__button",
              onClick: this.props.navigateTo2fa,
              label: this.props.intl.formatMessage({
                id: "page.body.wallets.tabs.withdraw.content.enable2faButton",
              }),
            })
        )
      )
    );
  }
}
export const ProfileTwoFactorAuth = injectIntl(ProfileTwoFactorAuthComponent);
