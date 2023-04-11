import classnames from 'classnames';
import * as React from 'react';
const HeaderItem = props => {
    const { label, amount, className, currency, sign, } = props;
    const cx = classnames('base-header-item', className);
    const cxAmount = classnames({
        'base-header-item__amount-plus': sign === '+' && currency === undefined,
        'base-header-item__amount-minus': sign === '-' && currency === undefined,
        'base-header-item__amount-default': sign === undefined && currency !== undefined,
    });
    return (React.createElement("div", { className: cx },
        currency ? React.createElement("div", { className: cxAmount },
            amount,
            " ",
            currency.toUpperCase()) : React.createElement("div", { className: cxAmount },
            sign,
            amount,
            sign ? '%' : ''),
        React.createElement("div", { className: "base-header-item__label" }, label)));
};
export { HeaderItem, };
