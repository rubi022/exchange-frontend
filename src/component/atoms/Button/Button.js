import '@components/cryptofonts';
import classnames from 'classnames';
import * as React from 'react';
/**
 * Сr-Button overrides default button.
 */
const Button = props => {
    const { disabled, label, noMargin, className, onClick, type = 'button' } = props;
    const cx = classnames('base-button', {
        'base-button--disabled': disabled,
        'base-button--no-margin': noMargin,
    }, className);
    const value = label.toLocaleUpperCase();
    const handler = !disabled ? (e) => onClick(label, e) : undefined;
    return (React.createElement("input", { type: type, className: cx, disabled: disabled, value: value, onClick: handler }));
};
export { Button, };
