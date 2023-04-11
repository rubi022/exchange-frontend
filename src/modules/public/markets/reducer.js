import { MARKETS_DATA, MARKETS_ERROR, MARKETS_FETCH, MARKETS_SET_CURRENT_MARKET, MARKETS_SET_CURRENT_MARKET_IFUNSET, MARKETS_TICKERS_DATA, MARKETS_TICKERS_ERROR, MARKETS_TICKERS_FETCH, } from './constants';
export const initialMarketsState = {
    list: [],
    currentMarket: undefined,
    tickers: {},
    tickerLoading: false,
    loading: false,
    noMarkets: false,
};
export const marketsReducer = (state = initialMarketsState, action) => {
    switch (action.type) {
        case MARKETS_FETCH:
            return {
                ...state,
                loading: true,
            };
        case MARKETS_DATA:
            return {
                ...state,
                loading: false,
                list: action.payload,
                noMarkets: false,
            };
        case MARKETS_ERROR:
            return {
                ...state,
                loading: false,
                noMarkets: true,
            };
        case MARKETS_SET_CURRENT_MARKET:
            return {
                ...state,
                currentMarket: action.payload,
            };
        case MARKETS_SET_CURRENT_MARKET_IFUNSET:
            if (state.currentMarket) {
                return state;
            }
            return {
                ...state,
                currentMarket: action.payload,
            };
        case MARKETS_TICKERS_FETCH:
            return {
                ...state,
                tickerLoading: true,
            };
        case MARKETS_TICKERS_DATA:
            return {
                ...state,
                tickerLoading: false,
                tickers: action.payload,
            };
        case MARKETS_TICKERS_ERROR:
            return {
                ...state,
                tickerLoading: false,
            };
        default:
            return state;
    }
};

