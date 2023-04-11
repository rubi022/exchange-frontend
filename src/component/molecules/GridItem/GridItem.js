import classnames from 'classnames';
import * as React from 'react';
const GridItem = (props) => {
    const { className, children, title } = props;
    const cx = classnames('base-grid-item', className);
    return (React.createElement("div", { className: cx },
        title ? React.createElement("div", { className: "base-grid-item__header" },
            React.createElement("div", { className: "base-grid-item__title" }, title))
            : null,
        React.createElement("div", { className: "base-grid-item__body" }, children)));
};
export { GridItem, };
