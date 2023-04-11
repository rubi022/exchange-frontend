import { Button } from '@components/components';
import * as React from 'react';
import { injectIntl, } from 'react-intl';
import { Modal } from '../../components';
import { get } from 'lodash';
class ModalWithdraw extends React.Component {
    constructor() {
        super(...arguments);
        this.translate = (e) => {
            return this.props.intl.formatMessage({ id: e });
        };
        this.renderHeader = () => {
            return (React.createElement("div", { className: "parent-exchange-modal-submit-header" }, this.translate('page.body.wallets.tabs.withdraw.modal.confirmation')));
        };
        this.renderBody = () => {
            const { amount, currency, beneficiary_id, beneficiary_details } = this.props;
            const formattedCurrency = currency.toUpperCase();
            return (React.createElement("div", { className: "parent-exchange-modal-submit-body modal-body__withdraw-confirm" },
                React.createElement("p", null,
                    this.translate('page.body.wallets.tabs.withdraw.modal.message1'),
                    amount,
                    " ",
                    formattedCurrency,
                    this.translate('page.body.wallets.tabs.withdraw.modal.message2'),
                    " ",
                    get(beneficiary_details, 'name') || beneficiary_id)));
        };
        this.renderFooter = () => {
            return (React.createElement("div", { className: "parent-exchange-modal-submit-footer modal-footer__withdraw-confirm" },
                React.createElement(Button, { className: "btn btn-danger", label: this.translate('page.body.wallets.tabs.withdraw.modal.button.cancel'), onClick: this.props.onDismiss }),
                React.createElement(Button, { className: "btn btn-success", label: this.translate('page.body.wallets.tabs.withdraw.modal.button.withdraw'), onClick: this.props.onSubmit })));
        };
    }
    render() {
        const { show } = this.props;
        return (React.createElement(Modal, { show: show, header: this.renderHeader(), content: this.renderBody(), footer: this.renderFooter() }));
    }
}

export const ModalWithdrawConfirmation = injectIntl(ModalWithdraw);

