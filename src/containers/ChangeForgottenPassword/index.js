import { Button, } from '@components/components';
import cr from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CustomInput } from '../../components';
import { PASSWORD_REGEX } from '../../helpers';
import { changeForgotPasswordFetch, changeLanguage, selectChangeForgotPasswordSuccess, } from '../../modules';
class ChangeForgottenPasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        this.disableButton = () => {
            const { password, confirmPassword, } = this.state;
            return !password || !confirmPassword;
        };
        this.handleFieldFocus = (field) => {
            return () => {
                switch (field) {
                    case 'password':
                        this.setState({
                            passwordFocused: !this.state.passwordFocused,
                        });
                        break;
                    case 'confirmPassword':
                        this.setState({
                            confirmPasswordFocused: !this.state.confirmPasswordFocused,
                        });
                        break;
                    default:
                        break;
                }
            };
        };
        this.handleSendNewPassword = () => {
            const { password, confirmPassword, confirmToken } = this.state;
            const isPasswordValid = password.match(PASSWORD_REGEX);
            const isConfirmPasswordValid = password === confirmPassword;
            this.setState({
                error: !(isPasswordValid && isConfirmPasswordValid),
            }, () => {
                if (!this.state.error) {
                    this.props.changeForgotPasswordFetch({
                        reset_password_token: confirmToken,
                        password: password,
                        confirm_password: confirmPassword,
                    });
                }
            });
        };
        this.handleChange = (key, value) => {

            this.setState({
                [key]: value,
            });
        };
        this.state = {
            error: false,
            confirmToken: '',
            password: '',
            passwordFocused: false,
            confirmPassword: '',
            confirmPasswordFocused: false,
        };
    }
    componentDidMount() {
        const { history } = this.props;
        const token = new URLSearchParams(history.location.search).get('reset_token');
        const lang = new URLSearchParams(history.location.search).get('lang');
        if (token) {
            this.setState({
                confirmToken: token,
            });
        }
        if (lang) {
            this.props.changeLanguage(lang);
        }
    }
    componentWillReceiveProps(next) {
        if (next.changeForgotPassword && (!this.props.changeForgotPassword)) {
            this.props.history.push('/signin');
        }
    }
    render() {
        const { error, password, passwordFocused, confirmPassword, confirmPasswordFocused, } = this.state;
        const passwordFocusedClass = cr('base-email-form__group', {
            'base-email-form__group--focused': passwordFocused,
        });
        const confirmPasswordFocusedClass = cr('base-email-form__group', {
            'base-email-form__group--focused': confirmPasswordFocused,
        });
        const updatePassword = e => this.handleChange('password', e);
        const updateConfirmPassword = e => this.handleChange('confirmPassword', e);
        return (React.createElement("div", { className: "parent-change-forgotten-password-screen" },
            React.createElement("div", { className: "parent-change-forgotten-password-screen__container" },
                React.createElement("form", null,
                    React.createElement("div", { className: "base-email-form" },
                        React.createElement("div", { className: "base-email-form__options-group" },
                            React.createElement("div", { className: "base-email-form__option" },
                                React.createElement("div", { className: "base-email-form__option-inner" }, this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.title' })))),
                        React.createElement("div", { className: "base-email-form__form-content" },
                            React.createElement("div", { className: passwordFocusedClass },
                                React.createElement(CustomInput, { type: "password", label: this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.newPassword' }), placeholder: this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.newPassword' }), defaultLabel: "New password", handleChangeInput: updatePassword, inputValue: password, handleFocusInput: this.handleFieldFocus('password'), classNameLabel: "base-email-form__label", classNameInput: "base-email-form__input", autoFocus: true })),
                            React.createElement("div", { className: confirmPasswordFocusedClass },
                                React.createElement(CustomInput, { type: "password", label: this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.repeatPassword' }), placeholder: this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.repeatPassword' }), defaultLabel: "Repeat password", handleChangeInput: updateConfirmPassword, inputValue: confirmPassword, handleFocusInput: this.handleFieldFocus('confirmPassword'), classNameLabel: "base-email-form__label", classNameInput: "base-email-form__input", autoFocus: false })),
                            error && React.createElement("div", { className: "base-email-form__error" }, this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.error' })),
                            React.createElement("div", { className: "base-email-form__button-wrapper" },
                                React.createElement(Button, { label: this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.button' }), type: "submit", className: !this.disableButton() ? 'base-email-form__button' : 'base-email-form__button base-email-form__button--disabled', disabled: this.disableButton(), onClick: this.handleSendNewPassword }))))))));
    }
}
const mapStateToProps = state => ({
    changeForgotPassword: selectChangeForgotPasswordSuccess(state),
});
const mapDispatchProps = dispatch => ({
    changeForgotPasswordFetch: credentials => dispatch(changeForgotPasswordFetch(credentials)),
    changeLanguage: lang => dispatch(changeLanguage(lang)),
});

const ChangeForgottenPassword = withRouter(injectIntl(connect(mapStateToProps, mapDispatchProps)(ChangeForgottenPasswordComponent)));
export { ChangeForgottenPassword, };

