import {
    CHANGE_COLOR_THEME,
    CREATE_BENEFICIARY_FROM_WALLETS,
    SCREEN_TYPE_FETCH, SET_CALLBACK_LINK, SET_ORDER_SCREEN_DISPLAY, SET_SIGNIN_LAST_LINK, SET_WINDOW_WIDTH,
    TOGGLE_MARKET_SELECTOR
} from './constants';
export const initialGenericState = {
    currentScreenType: localStorage.getItem('lastTradeTabSelected') ? localStorage.getItem('lastTradeTabSelected') : 'basic',
    color: localStorage.getItem('colorTheme') && localStorage.getItem('colorTheme') === 'light' ? 'light' : 'dark',
    createBeneficiary: {
        create: false,
        currency: '',
        marketSelectorActive: false,
        windowWidth: window.innerWidth,
    },
    callbackLink: null,
    signInLastLink: false,
    orderScreenDisplay: false
};
export const genericReducer = (state = initialGenericState, action) => {
    switch (action.type) {
        case SCREEN_TYPE_FETCH:
            return {
                ...state,
                currentScreenType: action.payload,
            };
        case CHANGE_COLOR_THEME:
            localStorage.setItem('colorTheme', action.payload);

            return {
                ...state,
                color: action.payload,
            };
        case CREATE_BENEFICIARY_FROM_WALLETS:

            return {
                ...state,
                createBeneficiary: {
                    create: action.payload.create,
                    currency: action.payload.currency,
                }
            }
        case TOGGLE_MARKET_SELECTOR:
            return {
                ...state,
                marketSelectorActive: !state.marketSelectorActive,
                sideBarActive: false,
            };
        case SET_WINDOW_WIDTH:
            return {
                ...state,
                windowWidth: action.payload,
            }

        case SET_CALLBACK_LINK:
            return {
                ...state,
                callbackLink: action.payload,
            }  

        case SET_SIGNIN_LAST_LINK: 
            return {
                ...state,
                signInLastLink: action.payload
            }  
            
        case SET_ORDER_SCREEN_DISPLAY:
            return {
                ...state,
                orderScreenDisplay: action.payload
            }

        default:
            return state;
    }
};

