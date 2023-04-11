import * as React from 'react';
import '@components/cryptofonts';
import cx from 'classnames';
export const CR_CURRENCY_ICON_CLASS_NAAME = 'base-crypto-font';
const makeCryptoClass = (code) => `${CR_CURRENCY_ICON_CLASS_NAAME}-${code}`;
/**
 * Component to display crypto-currency icon as a standalone (styleable)
 * image or with a text next to it (usually, some float number).
 */
const CryptoIcon = props => {
    const { code, className = '', children } = props;
    return (React.createElement("span", { className: cx('base-crypto-icon', className) },
        React.createElement("span", { className: makeCryptoClass(code) },
            " ",
            children)));
};
export { CryptoIcon, };
