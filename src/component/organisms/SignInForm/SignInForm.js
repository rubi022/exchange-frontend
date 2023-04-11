/* tslint:disable:jsx-no-lambda*/
import cr from 'classnames';
import * as React from 'react';
import { Button, Input, Loader } from '../../atoms';
import { EMAIL_REGEX, ERROR_EMPTY_PASSWORD, ERROR_INVALID_EMAIL, } from '../../constants';
class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = (value, type) => {
            switch (type) {
                case 'email':
                    this.setState({
                        email: value,
                    });
                    break;
                case 'password':
                    this.setState({
                        password: value,
                    });
                    break;
                default:
                    break;
            }
        };
        this.handleClick = (label, e) => {
            if (e) {
                e.preventDefault();
            }
            if (!this.isValidForm()) {
                this.validateForm();
            }
            else {
                this.handleSubmitForm();
            }
        };
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
        };
    }
    render() {
        const { email, emailError, password, passwordError, } = this.state;
        const { errorMessage, isLoading, onSignUp, onForgotPassword, image, } = this.props;
        const buttonWrapperClass = cr('base-sign-in-form__button-wrapper', {
            'base-sign-in-form__button-wrapper--empty': !errorMessage,
        });
        return (React.createElement("form", null,
            React.createElement("div", { className: "base-sign-in-form" },
                image ? (React.createElement("h1", { className: "base-sign-in-form__title" },
                    React.createElement("img", { className: "base-sign-in-form__image", src: image, alt: "logo" }),
                    "Sign-in")) : (React.createElement("h1", { className: "base-sign-in-form__title", style: { marginTop: 119 } }, "Sign-in")),
                React.createElement("div", { className: "base-sign-in-form__group" },
                    React.createElement("label", { className: "base-sign-in-form__label" }, "Email"),
                    React.createElement(Input, { type: 'email', value: email, className: 'base-sign-in-form__input', onChangeValue: value => this.handleInput(value, 'email') }),
                    emailError && React.createElement("div", { className: 'base-sign-in-form__error' }, emailError)),
                React.createElement("div", { className: "base-sign-in-form__group" },
                    React.createElement("label", { className: "base-sign-in-form__label" }, "Password"),
                    React.createElement(Input, { type: 'password', value: password, className: 'base-sign-in-form__input', onChangeValue: value => this.handleInput(value, 'password') }),
                    React.createElement("div", { className: 'base-sign-in-form__forgot', onClick: () => onForgotPassword(email) }, "Forgot?"),
                    passwordError && React.createElement("div", { className: 'base-sign-in-form__error' }, passwordError)),
                React.createElement("div", { className: buttonWrapperClass },
                    React.createElement("div", { className: "base-sign-in-form__error-message" }, errorMessage || null),
                    React.createElement("div", { className: "base-sign-in-form__loader" }, isLoading ? React.createElement(Loader, null) : null),
                    React.createElement(Button, { label: isLoading ? 'Loading...' : 'Sign in', type: "submit", className: 'base-sign-in-form__button', disabled: isLoading, onClick: this.handleClick })),
                React.createElement("div", { className: 'base-sign-in-form__footer' },
                    React.createElement("p", { className: 'base-sign-in-form__footer-create' }, "Create an account?"),
                    React.createElement("a", { className: 'base-sign-in-form__footer-signup', onClick: onSignUp }, "Sign up")))));
    }
    handleSubmitForm() {
        const { email, password, } = this.state;
        this.setState({
            emailError: '',
            passwordError: '',
        }, () => {
            this.props.onSignIn({ email, password });
        });
    }
    isValidForm() {
        const { email, password } = this.state;
        const isEmailValid = email.match(EMAIL_REGEX);
        return email && isEmailValid && password;
    }
    validateForm() {
        const { email, password } = this.state;
        const isEmailValid = email.match(EMAIL_REGEX);
        if (!isEmailValid) {
            this.setState({
                emailError: ERROR_INVALID_EMAIL,
                passwordError: '',
            });
            return;
        }
        if (!password) {
            this.setState({
                emailError: '',
                passwordError: ERROR_EMPTY_PASSWORD,
            });
            return;
        }
    }
}
export { SignInForm, };
