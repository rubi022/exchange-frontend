import * as React from 'react';
import classnames from 'classnames';
const Checkbox = props => {
    const { checked, className, disabled, label, onChange, slider, } = props;
    const cx = classnames('base-checkbox', {
        'base-checkbox__disabled': disabled,
    }, className);
    return (React.createElement("label", { className: cx },
        React.createElement("input", { checked: checked, className: "base-checkbox__input", onChange: onChange, type: "checkbox" }),
        React.createElement("span", { className: slider ? 'slider' : 'base-checkbox__checkitem' }),
        React.createElement("span", { className: "base-checkbox__label" }, label)));
};
export { Checkbox, };
