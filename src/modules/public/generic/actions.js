import {
    CHANGE_COLOR_THEME,
    CREATE_BENEFICIARY_FROM_WALLETS,
    SCREEN_TYPE_FETCH, SET_CALLBACK_LINK, SET_WINDOW_WIDTH,
    TOGGLE_MARKET_SELECTOR, SET_SIGNIN_LAST_LINK, SET_ORDER_SCREEN_DISPLAY
} from "./constants";

export const currentScreenType = (payload) => ({
    type: SCREEN_TYPE_FETCH,
    payload,
})

export const changeColorTheme = (payload) => ({
    type: CHANGE_COLOR_THEME,
    payload,
});

export const createBeneficiaryFromWallets = (payload) => ({
    type: CREATE_BENEFICIARY_FROM_WALLETS,
    payload,
})

export const toggleMarketSelector = () => ({
    type: TOGGLE_MARKET_SELECTOR,
});

export const setWindowWidth = (payload) => ({
    type: SET_WINDOW_WIDTH,
    payload,
})

export const setCallbackLink = payload => ({
    type: SET_CALLBACK_LINK,
    payload,
})

export const setSignInLastLink = (payload) => ({
    type: SET_SIGNIN_LAST_LINK,
    payload
})

export const setOrderScreenDisplay = (payload) => ({
    type: SET_ORDER_SCREEN_DISPLAY,
    payload
})