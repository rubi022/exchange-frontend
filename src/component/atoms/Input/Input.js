import classnames from 'classnames';
import * as React from 'react';
/**
 * App Input that overrides default input
 */
class Input extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.inputElem = React.createRef();
        this.handleChange = (e) => {
            this.props.onChangeValue(e.target.value);
        };
    }
    render() {
        const { placeholder, type, className, value, name, } = this.props;
        const cx = classnames('base-input', {
            'base-input__number': type === 'number',
        }, className);
        const autoComplete = type === 'password' ? 'current-password' : '';
        return (React.createElement("div", { className: cx },
            React.createElement("input", { min: "0", name: name, autoComplete: autoComplete, type: type, ref: this.inputElem, placeholder: placeholder, value: value, onChange: this.handleChange })));
    }
}
export { Input, };
