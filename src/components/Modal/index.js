import classnames from 'classnames';
import * as React from 'react';
const Modal = props => {
    const { className } = props;
    const parentClass = classnames('base-modal', className);
    if (!props.show) {
        return null;
    }
    return (React.createElement("div", { className: parentClass },
        React.createElement("div", { className: "base-modal__container" },
            React.createElement("div", { className: "base-modal__container-header" }, props.header),
            React.createElement("div", { className: "base-modal__container-content" }, props.content),
            React.createElement("div", { className: "base-modal__container-footer" }, props.footer))));
};
export { Modal, };

