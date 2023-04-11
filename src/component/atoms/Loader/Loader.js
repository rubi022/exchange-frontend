import cr from 'classnames';
import * as React from 'react';
// tslint:disable-next-line
const Loader = ({ size = 30, className }) => {
    const classNames = cr('base-loader', className);
    return (React.createElement("div", { className: classNames },
        React.createElement("img", { width: size, height: size, src: loader, alt: "" })));
};
export { Loader, };
