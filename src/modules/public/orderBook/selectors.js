import {incrementalOrderBook} from "../../../api";

export const selectOrderBookLoading = (state) => state.public.orderBook.loading;

export const selectDepthAsks = incrementalOrderBook() ?
    (state) => state.public.incrementDepth.asks :
    (state) => state.public.depth.asks;

export const selectDepthBids = incrementalOrderBook() ?
    (state) => state.public.incrementDepth.bids :
    (state) => state.public.depth.bids;

export const selectDepthLoading = incrementalOrderBook() ?
    (state) => state.public.incrementDepth.loading :
    (state) => state.public.depth.loading;

export const selectOrderBookSequence = (state) => state.public.incrementDepth.sequence;
