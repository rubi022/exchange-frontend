import classnames from 'classnames';
import * as React from 'react';
import { Input } from '../../atoms';
/**
 * Input component with ability to render label with cryptocurrency name.
 */
const InputBlock = (props) => {
    const { currency, message, type, placeholder, className, value, handleChangeValue, } = props;
    const cx = classnames('base-input-block', className);
    return (React.createElement("div", { className: cx },
        currency,
        " ",
        message,
        React.createElement(Input, { className: "base-input-block__input", type: type, placeholder: placeholder, value: value, onChangeValue: handleChangeValue })));
};
export { InputBlock, };
