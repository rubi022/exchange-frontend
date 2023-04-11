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

export const orderBookFetch = (payload) => ({
    type: ORDER_BOOK_FETCH,
    payload,
});
export const orderBookData = (payload) => ({
    type: ORDER_BOOK_DATA,
    payload,
});
export const orderBookError = (error) => ({
    type: ORDER_BOOK_ERROR,
    error,
});
export const depthFetch = (payload) => ({
    type: DEPTH_FETCH,
    payload,
});
export const depthData = (payload) => ({
    type: DEPTH_DATA,
    payload,
});
export const depthError = (error) => ({
    type: DEPTH_ERROR,
    error,
});

export const depthDataIncrement = (payload) => ({
    type: DEPTH_DATA_INCREMENT,
    payload,
});

export const depthDataSnapshot = (payload) => ({
    type: DEPTH_DATA_SNAPSHOT,
    payload,
});

export const depthIncrementSubscribe = (payload) => ({
    type: DEPTH_INCREMENT_SUBSCRIBE,
    payload,
});
