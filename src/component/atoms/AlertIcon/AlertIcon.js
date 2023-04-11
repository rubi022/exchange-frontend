import * as React from 'react';
const SuccessIcon = () => (React.createElement("div", { className: "base-alert-icon base-alert-icon--success" },
    React.createElement("div", { className: "base-alert-icon--success__left" }),
    React.createElement("div", { className: "base-alert-icon--success__center" }),
    React.createElement("div", { className: "base-alert-icon--success__right" })));
const ErrorIcon = () => (React.createElement("div", { className: "base-alert-icon base-alert-icon--error" },
    React.createElement("div", { className: "base-alert-icon--error__left" }),
    React.createElement("div", { className: "base-alert-icon--error__right" })));
const AlertIcon = (props) => {
    const { type } = props;
    return type === 'success'
        ? React.createElement(SuccessIcon, null)
        : React.createElement(ErrorIcon, null);
};
export { AlertIcon, ErrorIcon, SuccessIcon, };
