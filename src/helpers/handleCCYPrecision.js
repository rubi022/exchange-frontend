export const handleCCYPrecision = (currencies, currency, defaultPrecision) => {
    const precisableCCY = currencies[0] && currency.length && currencies.find(item => (item.id.toLowerCase() === currency.toLowerCase()));
    return (precisableCCY && precisableCCY.precision) || defaultPrecision;
};
