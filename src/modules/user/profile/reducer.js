import {
    PROFILE_CHANGE_PASSWORD_DATA,
    PROFILE_CHANGE_PASSWORD_ERROR,
    PROFILE_CHANGE_PASSWORD_FETCH,
    PROFILE_CHANGE_USER_LEVEL,
    PROFILE_ENABLE_USER_2FA,
    PROFILE_GENERATE_2FA_QRCODE_DATA,
    PROFILE_GENERATE_2FA_QRCODE_ERROR,
    PROFILE_GENERATE_2FA_QRCODE_FETCH,
    PROFILE_RESET_USER,
    PROFILE_TIERS_DATA,
    PROFILE_TIERS_DISABLE,
    PROFILE_TIERS_ERROR,
    PROFILE_TIERS_FETCH,
    PROFILE_TOGGLE_2FA_DATA,
    PROFILE_TOGGLE_2FA_ERROR,
    PROFILE_TOGGLE_2FA_FETCH,
    PROFILE_USER_DATA,
    PROFILE_USER_ERROR,
    PROFILE_USER_FETCH,
    CHANGE_USER_CURRENCY_DATA,
    CHANGE_USER_CURRENCY_FETCH, USER_CURRENCY_FETCH, USER_CURRENCY_SUCCESS,
} from './constants';
const defaultTier = {
    color: '',
    name: '',
    min_holding: 0,
    fee_discount: 0,
};
const defaultUser = {
    email: '',
    level: -1,
    otp: false,
    role: '',
    state: '',
    uid: '',
    first_name: '',
    last_name: '',
    dob: '',
    address: '',
    postcode: '',
    city: '',
    country: '',
    phones: [],
    payable_currency:'',
};
export const initialStateProfile = {
    passwordChange: {
        success: false,
    },
    twoFactorAuth: {
        barcode: '',
        url: '',
    },
    tiers: {
        tier: defaultTier,
        disabled: false,
    },
    userData: {
        user: defaultUser,
        isFetching: true,
    },
};
const passwordChangeReducer = (state, action) => {
    switch (action.type) {
        case PROFILE_CHANGE_PASSWORD_FETCH:
            return {
                ...state,
                success: false,
                error: undefined,
            };
        case PROFILE_CHANGE_PASSWORD_DATA:
            return {
                ...state,
                success: true,
                error: undefined,
            };
        case PROFILE_CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
const twoAuthReducer = (state, action) => {
    switch (action.type) {
        case PROFILE_GENERATE_2FA_QRCODE_FETCH:
            return {
                ...state,
                success: false,
                error: undefined,
                barcode: '',
                url: '',
            };
        case PROFILE_GENERATE_2FA_QRCODE_DATA:
            return {
                ...state,
                error: undefined,
                barcode: action.payload.barcode,
                url: action.payload.url,
            };
        case PROFILE_GENERATE_2FA_QRCODE_ERROR:
            return {
                ...state,
                success: false,
                error: action.payload,
                barcode: '',
                url: '',
            };
        case PROFILE_TOGGLE_2FA_FETCH:
            return {
                ...state,
                success: false,
                error: undefined,
            };
        case PROFILE_TOGGLE_2FA_DATA:
            return {
                ...state,
                success: true,
                error: undefined,
            };
        case PROFILE_TOGGLE_2FA_ERROR:
            return {
                ...state,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
const tiersReducer = (state, action) => {
    switch (action.type) {
        case PROFILE_TIERS_FETCH:
            return {
                ...state,
                disabled: false,
                error: undefined,
                tier: defaultTier,
            };
        case PROFILE_TIERS_DATA:
            return {
                ...state,
                error: undefined,
                disabled: false,
                tier: action.payload,
            };
        case PROFILE_TIERS_ERROR:
            return {
                ...state,
                disabled: false,
                error: action.payload,
            };
        case PROFILE_TIERS_DISABLE:
            return {
                ...state,
                disabled: true,
            };
        default:
            return state;
    }
};
export const userReducer = (state, action) => {
    switch (action.type) {
        case PROFILE_USER_FETCH:
            return {
                ...state,
                isFetching: true,
            };
        case PROFILE_USER_DATA:
            return {
                ...state,
                isFetching: false,
                user: action.payload.user,
            };
        case PROFILE_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };
        case PROFILE_RESET_USER:
            return {
                ...state,
                user: initialStateProfile.userData.user,
            };
        case PROFILE_CHANGE_USER_LEVEL:
            return {
                ...state,
                user: {
                    ...state.user,
                    level: action.payload.level,
                },
            };
        case PROFILE_ENABLE_USER_2FA:
            return {
                ...state,
                user: {
                    ...state.user,
                    otp: true,
                },
            };
        case USER_CURRENCY_FETCH:
            return {
                ...state,
                isFetching: true,
            };
        case USER_CURRENCY_SUCCESS:
            console.log(action.payload,'+++++++++++++++++++++++++++++++++++++++++');
            return {
                ...state,
                isFetching: false,
                user: {
                    ...state.user,
                    payable_currency: action.payload.payable_currency,
                }
            };
        case CHANGE_USER_CURRENCY_DATA:
            return {
                ...state,
                user: {
                    ...state.user,
                    payable_currency: action.payload.payable_currency,
                }
            };
        default:
            return state;
    }
};
export const profileReducer = (state = initialStateProfile, action) => {
    switch (action.type) {
        case PROFILE_CHANGE_PASSWORD_FETCH:
        case PROFILE_CHANGE_PASSWORD_DATA:
        case PROFILE_CHANGE_PASSWORD_ERROR:
            const passwordChangeState = { ...state.passwordChange };
            return {
                ...state,
                passwordChange: passwordChangeReducer(passwordChangeState, action),
            };
        case PROFILE_GENERATE_2FA_QRCODE_FETCH:
        case PROFILE_GENERATE_2FA_QRCODE_DATA:
        case PROFILE_GENERATE_2FA_QRCODE_ERROR:
        case PROFILE_TOGGLE_2FA_FETCH:
        case PROFILE_TOGGLE_2FA_DATA:
        case PROFILE_TOGGLE_2FA_ERROR:
            const twoFactorAuthState = { ...state.twoFactorAuth };
            return {
                ...state,
                twoFactorAuth: twoAuthReducer(twoFactorAuthState, action),
            };
        case PROFILE_TIERS_FETCH:
        case PROFILE_TIERS_DATA:
        case PROFILE_TIERS_DISABLE:
        case PROFILE_TIERS_ERROR:
            const tiersState = { ...state.tiers };
            return {
                ...state,
                tiers: tiersReducer(tiersState, action),
            };
        case CHANGE_USER_CURRENCY_FETCH:
        case CHANGE_USER_CURRENCY_DATA:
        case PROFILE_USER_FETCH:
        case PROFILE_USER_DATA:
        case PROFILE_RESET_USER:
        case PROFILE_USER_ERROR:
        case PROFILE_CHANGE_USER_LEVEL:
        case PROFILE_ENABLE_USER_2FA:
            const userState = { ...state.userData };
            return {
                ...state,
                userData: userReducer(userState, action),
            };

        default:
            return state;
    }
};

