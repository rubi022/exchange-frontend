import { AUTH_ERROR, AUTH_LOGOUT_FAILURE, AUTH_LOGOUT_FETCH, AUTH_SIGN_IN_ERROR, AUTH_SIGN_IN_REQUIRE_2FA, AUTH_SIGN_UP_REQUIRE_VERIFICATION, AUTH_VERIFICATION_FETCH, AUTH_VERIFICATION_SUCCESS, } from './constants';
export const initialStateAuth = {
    require2FA: false,
    requireVerification: false,
    emailVerified: false,
    email: '',
};
export const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {
        case AUTH_SIGN_IN_REQUIRE_2FA:
            return {
                ...state,
                require2FA: action.payload.require2fa,
            };
        case AUTH_SIGN_UP_REQUIRE_VERIFICATION:
            return {
                ...state,
                requireVerification: action.payload.requireVerification,
                email: action.payload.email,
            };
        case AUTH_VERIFICATION_FETCH:
            return { ...state, emailVerified: false };
        case AUTH_VERIFICATION_SUCCESS:
            return { ...state, emailVerified: true, requireVerification: false, email: '' };
        case AUTH_ERROR:
            return { ...state, authError: action.payload };
        case AUTH_SIGN_IN_ERROR:
            return { ...state, authError: action.payload };
        case AUTH_LOGOUT_FETCH:
            return { ...state };
        case AUTH_LOGOUT_FAILURE:
            return { ...state, logoutError: action.payload };
        default:
            return state;
    }
};

