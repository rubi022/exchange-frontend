import classnames from 'classnames';
import * as React from 'react';
import { CryptoIcon, Input } from '../../atoms';
/**
 * Input with cryptocurrency icon and label.
 */
const OrderInput = (props) => {
    const { currency, className, value, handleChangeValue } = props;
    const cx = classnames('base-order-input', className);
    const currencyCode = `${currency.toUpperCase()}-alt`;
    return (React.createElement("div", { className: cx },
        React.createElement("div", { className: "base-order-input__crypto-icon" },
            React.createElement(CryptoIcon, { code: currencyCode }, currency.toUpperCase())),
        React.createElement("div", { className: "base-order-input__input" },
            React.createElement(Input, { className: "base-order-input__input", type: "text", placeholder: "0", value: value, onChangeValue: handleChangeValue }))));
};
export { OrderInput, };
