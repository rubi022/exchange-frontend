const findMarket = (askUnit, bidUnit, markets) => {
    for (const market of markets) {
        if (market.base_unit === askUnit && market.quote_unit === bidUnit ||
            market.base_unit === bidUnit && market.quote_unit === askUnit) {
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
    return Number(wallet.balance) + (Number(wallet.locked) || 0);
};
export const estimateWithMarket = (targetCurrency, walletCurrency, walletTotal, markets, marketTickers) => {
    const market = findMarket(targetCurrency, walletCurrency, markets);
    const marketTicker = findMarketTicker(market && market.id || '', marketTickers);
    if (market && marketTicker) {
        if (targetCurrency === market.base_unit) {
            return walletTotal * (1 / Number(marketTicker.last));
        }
        else {
            return walletTotal * Number(marketTicker.last);
        }
    }
    return 0;
};
const estimateWithoutMarket = (targetCurrency, wallet, markets, marketTickers) => {
    const secondaryCurrencies = [];
    for (const market of markets) {
        if (market.base_unit === targetCurrency) {
            secondaryCurrencies.push(market.quote_unit);
        }
        if (market.quote_unit === targetCurrency) {
            secondaryCurrencies.push(market.base_unit);
        }
    }
    let selectedSecondaryCurrency = '';
    outer: for (const secondaryCurrency of secondaryCurrencies) {
        for (const market of markets) {
            if (market.base_unit === secondaryCurrency && market.quote_unit === wallet.currency ||
                market.quote_unit === secondaryCurrency && market.base_unit === wallet.currency) {
                selectedSecondaryCurrency = secondaryCurrency;
                break outer;
            }
        }
    }
    if (selectedSecondaryCurrency) {
        const secondaryCurrencyValue = estimateWithMarket(selectedSecondaryCurrency, wallet.currency, getWalletTotal(wallet), markets, marketTickers);
        return estimateWithMarket(targetCurrency, selectedSecondaryCurrency, secondaryCurrencyValue, markets, marketTickers);
    }
    else {
        // 'No secondary currency found for', wallet.currency
    }
    return 0;
};
export const estimateValue = (targetCurrency, wallets, markets, marketTickers) => {
    let estimatedValue = 0;
    for (const wallet of wallets) {
        if (wallet.currency === targetCurrency) {
            const walletTotal = Number(wallet.balance) + (Number(wallet.locked) || 0);
            estimatedValue += walletTotal;
        }
        else if (isMarketPresent(targetCurrency, wallet.currency, markets)) {
            estimatedValue += estimateWithMarket(targetCurrency, wallet.currency, getWalletTotal(wallet), markets, marketTickers);
        }
        else {
            estimatedValue += estimateWithoutMarket(targetCurrency, wallet, markets, marketTickers);
        }
    }
    return estimatedValue;
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

