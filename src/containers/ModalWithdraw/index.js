import { Button } from "@components/components";
import * as React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Modal } from "../../components";
import {CloseIcon} from './../../assets/images/CloseIcon.jsx';
class ModalWithdrawComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.translate = (e) => {
      return this.props.intl.formatMessage({ id: e });
    };
    this.renderHeaderModalSubmit = () => {
      return (
        React.createElement(
          "div",
          {
            className: "parent-exchange-modal-submit-header-parent",
          },
          React.createElement(
            "div",
            { className: "parent-exchange-modal-submit-header" },
            React.createElement(FormattedMessage, { id: this.props.title }),
              React.createElement('span', {}, ' ' + this.props.currency)
          ),

          // React.createElement(Button, {
          //   className:
          //     "parent-exchange-modal-submit-button",
          //   label: this.translate("page.modal.withdraw.success.button"),
          //   onClick: this.props.onSubmit,
          // })

          React.createElement(
            "div",
            {
              style: { marginRight: '10px' },
              onClick: this.props.onSubmit
            },
            <CloseIcon />

          )
        )
      ) 
    };
    this.renderBodyModalSubmit = () => {
      return React.createElement(
        "div",
        {
          className:
            "parent-exchange-modal-submit-body modal-body__withdraw-submit",
        },
        React.createElement(FormattedMessage, {
          id: "page.modal.withdraw.success.message.content",
        })
      );
    };
    this.renderFooterModalSubmit = () => {
      return React.createElement(
        "div",
        {
          className:
            "parent-exchange-modal-submit-footer modal-footer__withdraw-submit",
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        React.createElement(Button, {
          className:
            "parent-exchange-modal-submit-footer__button-inverse center-min-width-btn",
          label: this.translate("page.modal.withdraw.success.button"),
          onClick: this.props.onSubmit,
        })
      );
    };
  }
  render() {
    const { show } = this.props;
    return React.createElement(Modal, {
      show: show,
      header: this.renderHeaderModalSubmit(),
      content: this.props.render,
      className: "deposit-withdraw__custom-modal",
    });
  }
}
export const ModalWithdraw = injectIntl(ModalWithdrawComponent);
