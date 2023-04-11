import axios from 'axios';
import { tradeUrl } from '../../api/config';
import { klineArrayToObject } from '../../modules';
import { periodMinutesToString } from '../../modules/public/ranger/helpers';
import {klineUpdatePeriod, klineUpdateTimeRange} from "../../modules/public/kline";
import {store} from '../../store';

export const print = (...x) => console.log.apply(null, ['>>>> TC', ...x]);
const makeHistoryUrl = (market, resolution, from, to) =>
    `${tradeUrl()}/public/markets/${market}/k-line?period=${resolution}&time_from=${from}&time_to=${to}`;
const resolutionToSeconds = (r) => {
    const minutes = parseInt(r, 10);
    if (r === '1D') {
        return 1440;
    }
    else if (r === 'D') {
        return 4320;
    }
    else if (!isNaN(minutes)) {
        return minutes;
    }
    else {
        return 1;
    }
};
const config = {
    supports_timescale_marks: true,
    supports_time: false,
    supported_resolutions: ['1', '5', '15', '30', '60', '120', '180', '240', '360', '480', '720', 'd', '3d', '5d', '7d'],
};
export const dataFeedObject = (tradingChart, markets) => {
    const dataFeed = {
        onReady: cb => {
            setTimeout(() => cb(config), 0);
        },
        searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
            const symbols = markets.map(m => ({
                symbol: m.id,
                full_name: m.name,
                description: m.name,
                exchange: window.env.name || 'Exchange',
                ticker: m.id,
                type: 'bitcoin',
                currency_code: m.quote_unit.toUpperCase(),
            }));
            setTimeout(() => onResultReadyCallback(symbols), 0);
        },
        resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
            // expects a symbolInfo object in response
            const symbol = markets.find(m => m.id === symbolName || m.name === symbolName);
            if (!symbol) {
                return setTimeout(() => onResolveErrorCallback('Symbol not found'), 0);
            }
            const symbolStub = {
                name: symbol.name,
                currency_code: symbol.quote_unit.toUpperCase(),
                description: '',
                type: 'bitcoin',
                session: '24x7',
                timezone: 'Etc/UTC',
                ticker: symbol.id,
                minmov: 1,
                pricescale: Math.pow(10, symbol.price_precision),
                has_intraday: true,
                intraday_multipliers: ['1', '5', '15', '30', '60', '120', '180', '240', '360', '480', '720', 'd', '3d', '5d', '7d'],
                supported_resolutions: ['1', '5', '15', '30', '60', '120', '180', '240', '360', '480', '720', 'd', '3d', '5d', '7d'],
                volume_precision: symbol.amount_precision,
                data_status: 'streaming',
            };
            return setTimeout(() => onSymbolResolvedCallback(symbolStub), 0);
        },
        getTimescaleMarks: async (
            symbolInfo,
            from,
            to,
            onDataCallback,
            resolution,
        ) => {
            const range = tradingChart.tvWidget.activeChart().getVisibleRange();
            const period = tradingChart.tvWidget.activeChart().resolution();
            store.dispatch(klineUpdateTimeRange(range));
            store.dispatch(klineUpdatePeriod(period));
        },
        getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
            const url = makeHistoryUrl(symbolInfo.ticker || symbolInfo.name.toLowerCase(), resolutionToSeconds(resolution), from, to);
            return axios
                .get(url)
                .then(({ data }) => {
                if (data.length < 1) {
                    return onHistoryCallback([], { noData: true });
                }
                const bars = data.map(klineArrayToObject);
                return onHistoryCallback(bars, { noData: false });
            })
                .catch(e => {
                return onHistoryCallback([], { noData: true });
            });
        },
        subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
            dataFeed.onRealtimeCallback = (kline) => {
                if (kline.last &&
                    kline.marketId === tradingChart.currentKlineSubscription.marketId &&
                    kline.period === tradingChart.currentKlineSubscription.periodString) {
                    onRealtimeCallback(kline.last);
                }
            };
            const marketId = symbolInfo.ticker;
            const periodString = periodMinutesToString(resolutionToSeconds(resolution));
            tradingChart.props.subscribeKline(marketId, periodString);
            tradingChart.currentKlineSubscription = {
                marketId,
                periodString,
            };
        },
        unsubscribeBars: (subscribeUID) => {
            const { marketId, periodString } = tradingChart.currentKlineSubscription;
            if (marketId && periodString) {
                tradingChart.props.unSubscribeKline(marketId, periodString);
            }
            tradingChart.currentKlineSubscription = {};
        },
        onRealtimeCallback: (kline) => {
            // window.console.log(`default onRealtimeCallback called with ${JSON.stringify(bar)}`);
        },
    };
    return dataFeed;
};

export const getTradingChartTimezone = (offset,  period) => {
    const zone = period === 'DST' ? zonesDST[offset] : zonesSTD[offset];

    return zone ? zone : 'Etc/UTC';
};
export const stdTimezoneOffset = (date) => {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);

    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};
const zonesDST = {
    '-780': 'Pacific/Fakaofo',
    '-765': 'Pacific/Chatham',
    '-720': 'Pacific/Auckland',
    '-600': 'Australia/ACT',
    '-570': 'Australia/Adelaide',
    '-540': 'Asia/Tokyo',
    '-480': 'Asia/Shanghai',
    '-420': 'Asia/Bangkok',
    '-360': 'Asia/Almaty',
    '-345': 'Asia/Kathmandu',
    '-330': 'Asia/Kolkata',
    '-240': 'Asia/Dubai',
    '-270': 'Asia/Tehran',
    '-180': 'Europe/Moscow',
    '-120': 'Europe/Paris',
    60: 'Europe/London',
    180: 'America/Sao_Paulo',
    240: 'America/New_York',
    360: 'America/El_Salvador',
    420: 'America/Los_Angeles',
    600: 'Pacific/Honolulu',
};

/*
** TimeZones for Standart Time (Winter time)
*/
const zonesSTD = {
    '-825': 'Pacific/Chatham',
    '-780': 'Pacific/Auckland',
    '-660': 'Australia/Brisbane',
    '-630': 'Australia/Adelaide',
    '-540': 'Asia/Tokyo',
    '-480': 'Asia/Shanghai',
    '-420': 'Asia/Bangkok',
    '-360': 'Asia/Almaty',
    '-345': 'Asia/Kathmandu',
    '-330': 'Asia/Kolkata',
    '-240': 'Asia/Dubai',
    '-210': 'Asia/Tehran',
    '-180': 'Europe/Moscow',
    '-120': 'Africa/Cairo',
    '-60': 'Europe/Paris',
    0: 'Europe/London',
    120: 'America/Argentina/Buenos_Aires',
    240: 'America/Caracas',
    300: 'America/Bogota',
    360: 'America/El_Salvador',
    480: 'America/Los_Angeles',
    600: 'Pacific/Honolulu',
};
