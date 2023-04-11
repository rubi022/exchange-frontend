import '@components/cryptofonts';
import classnames from 'classnames';
import * as React from 'react';
const copy = (id) => {
    const copyText = document.querySelector(`#${id}`);
    if (copyText) {
        copyText.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
};
/**
 * Text field component with ability to copy inner text.
 */
class CopyableTextField extends React.Component {
    componentDidMount() {
        if (!this.props.fieldId) {
            throw new Error('CopyableTextField must contain `fieldId` prop');
        }
    }
    render() {
        const { value, className } = this.props;
        const { fieldId } = this.props;
        const doCopy = () => copy(fieldId);
        const cx = classnames('base-copyable-text-field', className);
        return (React.createElement("div", { className: cx },
            React.createElement("div", { className: "base-copyable-text-field__input" },
                React.createElement("input", { id: String(fieldId), readOnly: true, type: "text", value: value })),
            React.createElement("div", { className: "base-copyable-text-field__button", onClick: doCopy }, "Copy")));
    }
}
export { CopyableTextField, };
