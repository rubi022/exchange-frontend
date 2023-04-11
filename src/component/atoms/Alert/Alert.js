import cx from 'classnames';
import * as React from 'react';
import { AlertIcon } from '../AlertIcon/AlertIcon';
const Alert = props => {
    const { description, type, title } = props;
    const className = cx('base-alert', {
        'base-alert--error': type === 'error',
        'base-alert--success': type === 'success',
    });
    return (React.createElement("div", { className: className },
        React.createElement(AlertIcon, { type: type }),
        React.createElement("div", null,
            React.createElement("p", { className: "base-alert__title" }, title),
            React.createElement("p", { className: "base-alert__description" }, description))));
};
export { Alert, };
