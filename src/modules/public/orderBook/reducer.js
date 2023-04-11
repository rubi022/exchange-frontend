import {
    DEPTH_DATA,
    DEPTH_DATA_INCREMENT,
    DEPTH_DATA_SNAPSHOT,
    DEPTH_ERROR,
    DEPTH_FETCH,
    DEPTH_INCREMENT_SUBSCRIBE,
    ORDER_BOOK_DATA,
    ORDER_BOOK_ERROR,
    ORDER_BOOK_FETCH,
} from './constants';
import {handleIncrementalUpdate, sliceArray, handleIncrementalUpdateArray} from "../../../helpers";
import {orderBookSideLimit} from "../../../api";
// TODO: Move market depth to his own module
export const initialOrderBook = {
    asks: [],
    bids: [],
    loading: false,
};
export const initialDepth = {
    asks: [],
    bids: [],
    loading: false,
};
export const initialIncrementDepth = {
    marketId: undefined,
    asks: [],
    bids: [],
    sequence: null,
    loading: false,
    matching_engine: true,
};
export const orderBookReducer = (state = initialOrderBook, action) => {
    switch (action.type) {
        case ORDER_BOOK_FETCH:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case ORDER_BOOK_DATA:
            const { asks, bids } = action.payload;
            return {
                ...state,
                asks,
                bids,
                loading: false,
                error: undefined,
            };
        case ORDER_BOOK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
export const depthReducer = (state = initialDepth, action) => {
    switch (action.type) {
        case DEPTH_FETCH:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case DEPTH_DATA:
            const { asks, bids } = action.payload;
            return {
                ...state,
                asks,
                bids,
                loading: false,
                error: undefined,
            };
        case DEPTH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export const incrementDepthReducer = (state = initialIncrementDepth, action) => {
    switch (action.type) {
        case DEPTH_INCREMENT_SUBSCRIBE:
            return {
                ...state,
                marketId: action.payload.market_id,
                matching_engine: action.payload.matching_engine,
                loading: state.marketId === undefined || state.marketId !== action.payload,
            };
        case DEPTH_DATA_INCREMENT:
            const payload = {
                ...state,
                sequence: action.payload.sequence,
            };

            if(!state.matching_engine) {
                const { asks, bids, sequence } = action.payload;

                return {
                    ...state,
                    asks: sliceArray(asks, orderBookSideLimit()),
                    bids: sliceArray(bids, orderBookSideLimit()),
                    sequence
                };
            }

            if (action.payload.asks) {
                payload.asks = Array.isArray(action.payload.asks[0]) ? (
                    handleIncrementalUpdateArray(state.asks, action.payload.asks, 'asks').slice(0, orderBookSideLimit())
                ) : (
                    handleIncrementalUpdate(state.asks, action.payload.asks, 'asks').slice(0, orderBookSideLimit())
                );
            }

            if (action.payload.bids) {
                payload.bids = Array.isArray(action.payload.bids[0]) ? (
                    handleIncrementalUpdateArray(state.bids, action.payload.bids, 'bids').slice(0, orderBookSideLimit())
                ) : (
                    handleIncrementalUpdate(state.bids, action.payload.bids, 'bids').slice(0, orderBookSideLimit())
                );
            }

            return payload;
        case DEPTH_DATA_SNAPSHOT:
            const { asks, bids, sequence } = action.payload;

            return {
                ...state,
                asks: sliceArray(asks, orderBookSideLimit()),
                bids: sliceArray(bids, orderBookSideLimit()),
                sequence,
                loading: false,
            };
        default:
            return state;
    }
};
