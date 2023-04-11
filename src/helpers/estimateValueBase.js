// eslint-disable
import { Decimal } from '../component/molecules/Decimal/Decimal';
import { DEFAULT_CCY_PRECISION } from '../constants';
import {handleCCYPrecision} from "./handleCCYPrecision";

const findMarket = (askUnit, bidUnit, markets) => {
    for (const market of markets) {
        if ((market.base_unit === askUnit && market.quote_unit === bidUnit) ||
            (market.base_unit === bidUnit && market.quote_unit === askUnit)) {
            return market;
        }
    }
    return null;
};
const isMarketPresent = (askUnit, bidUnit, markets) => {
    return (findMarket(askUnit, bidUnit, markets) !== null);
};
const findMarketTicker = (marketPair, marketTickers) => {
    return marketTickers[marketPair];
};
const getWalletTotal = (wallet) => {
    return (Number(wallet.balance) || 0) + (Number(wallet.locked) || 0);
};
export const estimateWithMarket = (targetCurrency, walletCurrency, walletTotal, currencies, markets, marketTickers) => {
    const formattedTargetCurrency = targetCurrency.toLowerCase();
    const formattedWalletCurrency = walletCurrency.toLowerCase();
    const market = findMarket(formattedTargetCurrency, formattedWalletCurrency, markets);
    const marketTicker = findMarketTicker((market && market.id) || '', marketTickers);
    const targetCurrencyPrecision = handleCCYPrecision(currencies, formattedTargetCurrency, DEFAULT_CCY_PRECISION);
    if (formattedTargetCurrency === formattedWalletCurrency) {
        return Number(Decimal.format(walletTotal, targetCurrencyPrecision));
    }
    if (market && marketTicker) {
        if (formattedTargetCurrency === market.base_unit) {
            const precisedValue = Number(Decimal.format(walletTotal * (Number(marketTicker.last) !== 0 ? 1 / Number(marketTicker.last) : 0), targetCurrencyPrecision));
            return precisedValue;
        }
        else {
            const precisedValue = Number(Decimal.format(walletTotal * Number(marketTicker.last), targetCurrencyPrecision));
            return precisedValue;
        }
    }
    return 0;
};
const estimateWithoutMarket = (targetCurrency, walletCurrency, walletTotal, currencies, markets, marketTickers) => {
    const secondaryCurrencies = [];
    const formattedTargetCurrency = targetCurrency.toLowerCase();
    const formattedWalletCurrency = walletCurrency.toLowerCase();
    for (const market of markets) {
        if (market.base_unit === formattedTargetCurrency) {
            secondaryCurrencies.push(market.quote_unit);
        }
        if (market.quote_unit === formattedTargetCurrency) {
            secondaryCurrencies.push(market.base_unit);
        }
    }
    let selectedSecondaryCurrency = '';
    outer: for (const secondaryCurrency of secondaryCurrencies) {
        for (const market of markets) {
            if ((market.base_unit === secondaryCurrency && market.quote_unit === formattedWalletCurrency) ||
                (market.quote_unit === secondaryCurrency && market.base_unit === formattedWalletCurrency)) {
                selectedSecondaryCurrency = secondaryCurrency;
                break outer;
            }
        }
    }
    if (selectedSecondaryCurrency) {
        const secondaryCurrencyValue = estimateWithMarket(selectedSecondaryCurrency, formattedWalletCurrency, walletTotal, currencies, markets, marketTickers);
        return estimateWithMarket(targetCurrency, selectedSecondaryCurrency, secondaryCurrencyValue, currencies, markets, marketTickers);
    }
    else {
        // 'No secondary currency found for', wallet.currency
    }
    return 0;
};
export const estimateValue = (targetCurrency, currencies, wallets, markets, marketTickers) => {
    const formattedTargetCurrency = targetCurrency.toLowerCase();
    let estimatedValue = 0;
    for (const wallet of wallets) {
        const formattedWalletCurrency = wallet.currency.toLowerCase();
        if (formattedWalletCurrency === formattedTargetCurrency) {
            const walletTotal = (Number(wallet.balance) || 0) + (Number(wallet.locked) || 0);
            estimatedValue += walletTotal;
        }
        else if (isMarketPresent(formattedTargetCurrency, formattedWalletCurrency, markets)) {
            estimatedValue += estimateWithMarket(formattedTargetCurrency, formattedWalletCurrency, getWalletTotal(wallet), currencies, markets, marketTickers);
        }
        else {
            estimatedValue += estimateWithoutMarket(formattedTargetCurrency, wallet.currency, getWalletTotal(wallet), currencies, markets, marketTickers);
        }
    }
    const targetCurrencyPrecision = handleCCYPrecision(currencies, formattedTargetCurrency, DEFAULT_CCY_PRECISION);
    const precisedEstimatedValue = Decimal.format(estimatedValue, targetCurrencyPrecision);
    return precisedEstimatedValue;
};
export const estimateWalletValue = (targetCurrency, currencies, wallet, markets, marketTickers) => {
    const formattedTargetCurrency = targetCurrency.toLowerCase();
    let estimatedValue = 0;
    const formattedWalletCurrency = wallet.currency.toLowerCase();
    if (formattedWalletCurrency === formattedTargetCurrency) {
        const walletTotal = (Number(wallet.balance) || 0);
        estimatedValue += walletTotal;
    }
    else if (isMarketPresent(formattedTargetCurrency, formattedWalletCurrency, markets)) {
        estimatedValue += estimateWithMarket(formattedTargetCurrency, formattedWalletCurrency, Number(wallet.balance) || 0, currencies, markets, marketTickers);
    }
    else {
        estimatedValue += estimateWithoutMarket(formattedTargetCurrency, wallet.currency, Number(wallet.balance) || 0, currencies, markets, marketTickers);
    }
    const targetCurrencyPrecision = handleCCYPrecision(currencies, formattedTargetCurrency, DEFAULT_CCY_PRECISION);
    const precisedEstimatedValue = Decimal.format(estimatedValue, targetCurrencyPrecision);
    return precisedEstimatedValue;
};
export const estimateUnitValue = (targetCurrency, currentCurrency, total, currencies, markets, marketTickers) => {
    const estimated = estimateWithMarket(targetCurrency, currentCurrency, total, currencies, markets, marketTickers) || estimateWithoutMarket(targetCurrency, currentCurrency, total, currencies, markets, marketTickers);
    const formattedTargetCurrency = targetCurrency.toLowerCase();
    const targetCurrencyPrecision = handleCCYPrecision(currencies, formattedTargetCurrency, DEFAULT_CCY_PRECISION);
    return Decimal.format(estimated, targetCurrencyPrecision);
};
export const findPrecision = (unit, markets) => {
    for (const market of markets) {
        if (market.base_unit === unit) {
            return market.amount_precision;
        }
        if (market.quote_unit === unit) {
            return market.price_precision;
        }
    }
    return 4;
};
