import classnames from 'classnames';
import * as React from 'react';
/**
 * Component to display cryptobase-react Avatar
 */
const Avatar = props => {
    const { title, className, source, } = props;
    const cx = classnames('base-avatar', className);
    return (React.createElement("div", { className: cx }, source ? React.createElement("img", { src: source, alt: title }) : React.createElement("div", { className: "base-avatar__image" }, title)));
};
export { Avatar, };
