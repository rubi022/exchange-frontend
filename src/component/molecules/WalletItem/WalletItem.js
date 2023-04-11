import * as React from 'react';
import { CryptoIcon } from '../../atoms';
const style = {
    display: 'flex',
    justifyContent: 'space-between',
};
const renderLocked = (lockedAmount) => {
    return lockedAmount ? (React.createElement("div", { className: "base-wallet-item__amount-locked" },
        "Locked: ",
        lockedAmount)) : '';
};
/**
 * Component for displaying information about wallet, including address and amount of currency.
 */
const WalletItem = (props) => {
    const { currency, balance, locked, active, } = props;
    const cName = `base-wallet-item ${active ? 'base-wallet-item--active' : ''}`;
    return (React.createElement("div", { style: style, className: cName },
        React.createElement("div", null,
            React.createElement(CryptoIcon, { className: "base-wallet-item__icon", code: currency.toUpperCase() }),
            React.createElement("span", { className: "base-wallet-item__icon-code" },
                " ",
                currency)),
        React.createElement("span", { className: "base-wallet-item__balance" },
            balance,
            React.createElement("span", { className: "base-wallet-item__currency" }, currency),
            "\u00A0",
            React.createElement("span", { className: "base-wallet-item__balance-locked" }, renderLocked(locked)))));
};
export { WalletItem, };
