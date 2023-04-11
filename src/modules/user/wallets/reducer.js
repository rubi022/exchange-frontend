import {
    HIDE_EMPTY_WALLETS,
    SET_MOBILE_WALLET_UI,
    WALLET_BALANCE_DATA,
    WALLETS_ADDRESS_DATA,
    WALLETS_ADDRESS_ERROR,
    WALLETS_ADDRESS_FETCH,
    WALLETS_DATA,
    WALLETS_ERROR,
    WALLETS_FETCH,
    WALLETS_RESET,
    WALLETS_WITHDRAW_CCY_DATA,
    WALLETS_WITHDRAW_CCY_ERROR,
    WALLETS_WITHDRAW_CCY_FETCH,
} from './constants';

const hideWallet = localStorage.getItem("hideEmptyWallets") && localStorage.getItem("hideEmptyWallets") === "true";

export const initialWalletsState = {
    wallets: {
        list: [],
        loading: false,
        withdrawSuccess: false,
        mobileWalletChosen: '',
        hideEmptyWallets: hideWallet,
    },
};
const walletsListReducer = (state, action) => {
    switch (action.type) {
        case WALLETS_ADDRESS_FETCH:
        case WALLETS_FETCH:
            return {
                ...state,
                loading: true,
            };
        case WALLET_BALANCE_DATA: {
            const list = state.list.map(w => {
                const key = Object.keys(action.payload)[0];
                if(w.currency === key){
                    w.balance = action.payload[key].balance;
                    w.locked = action.payload[key].locked;
                }
                return w;
            });
            return {
                ...state,
                list,
            };
        }
        case WALLETS_WITHDRAW_CCY_FETCH:
            return {
                ...state,
                loading: true,
                withdrawSuccess: false,
            };
        case WALLETS_DATA: {
            const list = [...action.payload];
            const btcIndex = list.findIndex(wallet => wallet.currency.toLowerCase() === 'btc');
            if (btcIndex >= 0) {
                const temp = list[btcIndex];
                list[btcIndex] = list[0];
                list[0] = temp;
            }
            window.wallet_data = list;
            return {
                ...state,
                loading: false,
                list,
            };
        }
        case WALLETS_ADDRESS_DATA: {
            const walletIndex = state.list.findIndex(wallet => wallet.currency.toLowerCase() === action.payload.currency.toLowerCase());
            if (walletIndex !== -1) {
                const list = [...state.list];
                const updatedWallet = {
                    ...state.list[walletIndex],
                    address: action.payload.address,
                };
                list.splice(walletIndex, 1, updatedWallet);
                return {
                    ...state,
                    loading: false,
                    list,
                };
            }
            return {
                ...state,
                loading: false,
            };
        }
        case WALLETS_WITHDRAW_CCY_DATA:
            return {
                ...state,
                loading: false,
                withdrawSuccess: true,
            };
        case WALLETS_WITHDRAW_CCY_ERROR:
            return {
                ...state,
                loading: false,
                withdrawSuccess: false,
                error: action.payload,
            };
        case WALLETS_ADDRESS_ERROR:
        case WALLETS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SET_MOBILE_WALLET_UI:
            return { ...state, mobileWalletChosen: action.payload };
        case HIDE_EMPTY_WALLETS:
            return {...state, hideEmptyWallets: action.payload.hideEmptyWallet};
        default:
            return state;
    }
};
export const walletsReducer = (state = initialWalletsState, action) => {
    switch (action.type) {
        case WALLETS_FETCH:
        case WALLETS_DATA:
        case WALLET_BALANCE_DATA:
        case WALLETS_ERROR:
        case WALLETS_ADDRESS_FETCH:
        case WALLETS_ADDRESS_DATA:
        case WALLETS_ADDRESS_ERROR:
        case WALLETS_WITHDRAW_CCY_FETCH:
        case WALLETS_WITHDRAW_CCY_DATA:
        case SET_MOBILE_WALLET_UI:
        case HIDE_EMPTY_WALLETS:
        case WALLETS_WITHDRAW_CCY_ERROR:
            const walletsListState = { ...state.wallets };
            return {
                ...state,
                wallets: walletsListReducer(walletsListState, action),
            };
        case WALLETS_RESET:
            return {
                ...state,
                wallets: {
                    list: [],
                    loading: false,
                    withdrawSuccess: false,
                    mobileWalletChosen: '',
                },
            };
        default:
            return state;
    }
};

