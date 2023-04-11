import * as React from 'react';
import { connect, } from 'react-redux';
import { Redirect } from 'react-router';
import {ClipLoader} from "react-spinners";
import {changeLanguage, selectEmailVerified, selectUserInfo, verificationFetch,} from '../modules';
import {selectAuthError} from "../modules/user/auth";
export const extractToken = (props) => new URLSearchParams(props.location.search).get('confirmation_token');
export const extractLang = (props) => new URLSearchParams(props.location.search).get('lang');
class Verification extends React.Component {
    componentDidMount() {
        const token = extractToken(this.props);
        const lang = extractLang(this.props);
        if (token) {
            this.props.verification({ token });
        }
        if (lang) {
            this.props.changeLanguage(lang.toLowerCase());
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.authError || this.props.isEmailVerified) this.props.history.push('/signin');
    }

    render() {
        return (
            <React.Fragment>
                {React.createElement(ClipLoader, {sizeUnit: "px", size: 35, loading: true, color: "var(--accent)"}) }
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({
    isEmailVerified: selectEmailVerified(state),
    authError: selectAuthError(state),
});
const mapDispatchToProps = dispatch => ({
    verification: data => dispatch(verificationFetch(data)),
    changeLanguage: lang => dispatch(changeLanguage(lang)),
});
const VerificationScreen = connect(mapStateToProps, mapDispatchToProps)(Verification);
export { VerificationScreen, };

