import classnames from 'classnames';
import * as React from 'react';
import { Button, Input, SummaryField } from '../../atoms';
/**
 * Component with for for withdraw.
 */
class Withdraw extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            address: '',
            amount: 0,
            otpCode: '',
            total: 0,
        };
        this.renderOtpCodeInput = () => {
            const { otpCode } = this.state;
            return (React.createElement(React.Fragment, null,
                React.createElement("form", null,
                    React.createElement("fieldset", { className: "base-withdraw__input" },
                        React.createElement("legend", null, "6-digit GAuthenticator Code"),
                        React.createElement(Input, { type: "text", className: "base-input-block__input", placeholder: "XXXXXX", value: otpCode, onChangeValue: this.handleChangeInputOtpCode }))),
                React.createElement("div", { className: "base-withdraw__divider base-withdraw__divider-two" })));
        };
        this.handleClick = () => this.props.onClick(this.state.total, this.state.address, this.state.otpCode);
        this.handleChangeInputAmount = (text) => {
            const value = parseFloat(text);
            if (value < 0) {
                this.setTotal(0);
            }
            else {
                this.setTotal(value - value * this.props.fee);
            }
            this.setState({
                amount: value,
            });
        };
        this.setTotal = (value) => {
            this.setState({
                total: value,
            });
        };
        this.handleChangeInputAddress = (text) => {
            this.setState({
                address: text,
            });
        };
        this.handleChangeInputOtpCode = (otpCode) => {
            this.setState({ otpCode });
        };
    }
    render() {
        const { address, amount, total, } = this.state;
        const { borderItem, className, currency, fee, twoFactorAuthRequired, } = this.props;
        const cx = classnames('base-withdraw', className);
        const lastDividerClassName = classnames('base-withdraw__divider', {
            'base-withdraw__divider-one': twoFactorAuthRequired,
            'base-withdraw__divider-two': !twoFactorAuthRequired,
        });
        const contentFee = `${String(fee)} ${currency.toUpperCase()}`;
        const contentTotal = total
            ? `${this.formatTotal(total, currency)} ${currency.toUpperCase()}`
            : `0 ${currency.toUpperCase()}`;
        const formattedCurrency = currency.toUpperCase();
        return (React.createElement("div", { className: cx },
            React.createElement("div", { className: "base-withdraw-column" },
                React.createElement("form", null,
                    React.createElement("fieldset", { className: "base-withdraw__input" },
                        React.createElement("legend", null,
                            formattedCurrency,
                            " \"Withdrawal Address\""),
                        React.createElement(Input, { className: "base-input-block__input", type: "text", placeholder: "Address", value: address, onChangeValue: this.handleChangeInputAddress }))),
                React.createElement("div", { className: "base-withdraw__divider base-withdraw__divider-one" }),
                React.createElement("form", null,
                    React.createElement("fieldset", { className: "base-withdraw__input" },
                        React.createElement("legend", null, "Withdrawal Amount"),
                        React.createElement(Input, { className: "base-input-block__input", type: "number", placeholder: "0", value: amount, onChangeValue: this.handleChangeInputAmount }))),
                React.createElement("div", { className: lastDividerClassName }),
                twoFactorAuthRequired && this.renderOtpCodeInput()),
            React.createElement("div", { className: "base-withdraw-column" },
                React.createElement("div", null,
                    React.createElement(SummaryField, { className: "base-withdraw__summary-field ", message: "Fee", content: contentFee, borderItem: borderItem }),
                    React.createElement(SummaryField, { className: "base-withdraw__summary-field", message: "Total Withdraw Amount", content: contentTotal, borderItem: borderItem })),
                React.createElement("div", { className: "base-withdraw__deep" },
                    React.createElement(Button, { className: "base-withdraw__button", label: "WITHDRAW", onClick: this.handleClick })))));
    }
    formatTotal(value, currency) {
        const currencyAmountPrecision = 8;
        const bchAmountPrecision = 4;
        return currency.toLowerCase() === 'bch'
            ? Number(value).toFixed(bchAmountPrecision)
            : Number(value).toFixed(currencyAmountPrecision);
    }
}
export { Withdraw, };
