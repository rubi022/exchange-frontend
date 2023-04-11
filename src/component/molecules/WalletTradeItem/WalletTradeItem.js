import classnames from 'classnames';
import * as React from 'react';
import { CryptoIcon } from '../../atoms';
/**
 * Component for displaying information about wallet, including address and amount of currency.
 */
const WalletTradeItem = (props) => {
    const { className, currency, balance, } = props;
    const cx = classnames('base-wallet-trades-item', className);
    const currencyCode = `${currency.toUpperCase()}-alt`;
    return (React.createElement("div", { className: cx },
        React.createElement("div", { className: "base-wallet-trades-item__body" },
            React.createElement("div", { className: "base-wallet-trades-item__body-crypto" },
                React.createElement(CryptoIcon, { className: "base-wallet-trades-item__body-crypto-icon", code: currencyCode })),
            React.createElement("div", { className: "base-wallet-trades-item__body-data" },
                React.createElement("div", { className: "base-wallet-trades-item__body-data-currency" }, currency.toUpperCase()),
                React.createElement("div", { className: "base-wallet-trades-item__body-data-balance" }, balance))),
        React.createElement("div", { className: "base-wallet-trades-item__arrow" },
            React.createElement("img", { src: iconRight }))));
};
export { WalletTradeItem, };
