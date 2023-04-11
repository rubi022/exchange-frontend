import { Button } from "@components/components";
import cr from "classnames";
import { CustomInput } from "../";
import * as React from "react";
import { EMAIL_REGEX } from "../../helpers";
import { Link } from "react-router-dom";
class EmailForm extends React.Component {
    constructor() {
        super(...arguments);
        this.handleCancel = () => {
            return "/signin";
            this.props.handleReturnBack();
        };
        this.handleClick = (label, e) => {
            if (e) {
                e.preventDefault();
            }
            if (!this.isValidForm()) {
                this.props.validateForm();
            } else {
                this.handleSubmitForm();
            }
        };
    }
    render() {
        const {
            description,
            back,
            signUp,
            title,
            buttonLabel,
            isLoading,
            emailLabel,
            message,
            email,
            emailFocused,
            emailError,
        } = this.props;
        const emailGroupClass = cr("base-email-form__group", {
            "base-email-form__group--focused": emailFocused,
        });
        return React.createElement(
            "div",
            { className: "page-ath-form" },
            React.createElement(
                "h2",
                { className: "page-ath-heading" },
                title ? title : "Reset password ",
                React.createElement("span", null, description)
            ),
            React.createElement(
                "form",
                null,
                React.createElement(
                    "div",
                    { className: "input-item" },
                    React.createElement(CustomInput, {
                        type: "email",
                        label: emailLabel || "Email",
                        placeholder: emailLabel || "Email",
                        defaultLabel: "Email",
                        handleChangeInput: this.props.handleInputEmail,
                        inputValue: email,
                        handleFocusInput: this.props.handleFieldFocus,
                        classNameLabel: "base-email-form__label",
                        classNameInput: "base-email-form__input",
                        autoFocus: true,
                    })
                ),
                React.createElement(
                    "div",
                    { className: "d-flex justify-content-between align-items-center" },
                    React.createElement(
                        "div",
                        { className: "input-item text-left" },
                        null
                    ),
                    React.createElement(
                        "div",
                        null,
                        // React.createElement("a", {onClick: () => onForgotPassword(email)}, "Forgot password?"),
                        React.createElement("div", { className: "gaps-2x" })
                    )
                ),
                React.createElement(
                    "div",
                    { class: "flex-md-row flex-column d-flex justify-content-between align-items-center" },
                    React.createElement(
                        "div",
                        null,
                        // React.createElement("button", {class: "btn btn-primary btn-block"}, "Send Reset Link"),
                        React.createElement(Button, {
                            label: isLoading
                                ? "Loading..."
                                : buttonLabel
                                    ? buttonLabel
                                    : "Send Reset Link",
                            type: "submit",
                            className: email
                                ? "btn btn-primary btn-block"
                                : "btn btn-primary btn-block base-email-form__button--disabled",
                            disabled: isLoading || !email.match(EMAIL_REGEX),
                            onClick: this.handleClick,
                        })
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            Link,
                            {
                                to: this.handleCancel(),
                                style: {
                                    color: "var(--auth-page-text-color)",
                                },
                            },
                            back
                        )
                    )
                )
            ),
            React.createElement("div", { className: "gaps-2x" }),
            React.createElement("div", { className: "gaps-2x" }),
            React.createElement(
                Link,
                { to: "/signup", className: "form-note" },
                signUp
            )
        );
    }
    handleSubmitForm() {
        this.props.OnSubmit();
    }
    isValidForm() {
        const { email } = this.props;
        const isEmailValid = email.match(EMAIL_REGEX);
        return email && isEmailValid;
    }
}
export { EmailForm };
