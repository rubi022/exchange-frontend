import {KLINE_DATA, KLINE_FETCH, KLINE_PUSH, KLINE_UPDATE_PERIOD, KLINE_UPDATE_TIME_RANGE,} from './constants';
export const klinePush = (payload) => ({
    type: KLINE_PUSH,
    payload,
});
export const klineFetch = (payload) => ({
    type: KLINE_FETCH,
    payload,
});
export const klineData = (payload) => ({
    type: KLINE_DATA,
    payload,
});

export const klineUpdateTimeRange = (payload) => ({
    type: KLINE_UPDATE_TIME_RANGE,
    payload,
});

export const klineUpdatePeriod = (payload) => ({
    type: KLINE_UPDATE_PERIOD,
    payload,
});
