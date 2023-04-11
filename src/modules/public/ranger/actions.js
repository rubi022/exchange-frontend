import {
    RANGER_CONNECT_DATA,
    RANGER_CONNECT_ERROR,
    RANGER_CONNECT_FETCH,
    RANGER_DIRECT_WRITE,
    RANGER_DISCONNECT_DATA,
    RANGER_DISCONNECT_FETCH,
    RANGER_SUBSCRIPTIONS_DATA,
    RANGER_USER_ORDER_UPDATE,
} from './constants';
import {marketKlineStreams} from './helpers';
import {incrementalOrderBook} from "../../../api";
import {store} from "../../../store";
import {depthIncrementSubscribe} from "../orderBook";

export const rangerConnectFetch = (payload) => ({
    type: RANGER_CONNECT_FETCH,
    payload,
});
export const rangerConnectData = () => ({
    type: RANGER_CONNECT_DATA,
});
export const rangerConnectError = (payload) => ({
    type: RANGER_CONNECT_ERROR,
    payload,
});
export const rangerDisconnectData = () => ({
    type: RANGER_DISCONNECT_DATA,
});
export const rangerDirectMessage = (payload) => ({
    type: RANGER_DIRECT_WRITE,
    payload,
});
export const rangerSubscribe = (payload) => ({
    type: RANGER_DIRECT_WRITE,
    payload: { event: 'subscribe', streams: payload.channels },
});
export const rangerUnsubscribe = (payload) => ({
    type: RANGER_DIRECT_WRITE,
    payload: { event: 'unsubscribe', streams: payload.channels },
});
export const rangerUserOrderUpdate = (payload) => ({
    type: RANGER_USER_ORDER_UPDATE,
    payload,
});
export const marketStreams = (market) => {
    const channels = [
        `${market.id}.trades`,
    ];

    if (incrementalOrderBook()) {
        store.dispatch(depthIncrementSubscribe({market_id: market.id, matching_engine: market.matching_engine }));

        return {
            channels: [
                ...channels,
                `${market.id}.ob-snap`,
                `${market.id}.ob-inc`,
            ],
        };
    }

    return {
        channels: [
            ...channels,
            `${market.id}.update`,
        ],
    };
    // channels: [
    //     `${market.id}.trades`,
    //     `${market.id}.update`,
    // ],
};
export const subscriptionsUpdate = (payload) => ({
    type: RANGER_SUBSCRIPTIONS_DATA,
    payload,
});
export const rangerSubscribeMarket = (market) => rangerSubscribe(marketStreams(market));
export const rangerUnsubscribeMarket = (market) => rangerUnsubscribe(marketStreams(market));
export const rangerSubscribeKlineMarket = (marketId, periodString) => rangerSubscribe(marketKlineStreams(marketId, periodString));
export const rangerUnsubscribeKlineMarket = (marketId, periodString) => rangerUnsubscribe(marketKlineStreams(marketId, periodString));
export const rangerDisconnectFetch = () => ({
    type: RANGER_DISCONNECT_FETCH,
});

