import * as React from "react";
import {
    currenciesFetch,
    depthFetch,
    marketsFetch,
    selectCurrentMarket,
    selectMarkets,
    selectMarketTickers,
    selectUserInfo,
    selectUserLoggedIn,
    selectWallets,
    setCurrentMarket,
    setCurrentPrice
} from "../../modules";
import {selectRanger} from "../../modules/public/ranger/selectors";
import {rangerConnectFetch} from "../../modules/public/ranger";
import {connect} from "react-redux";
import {selectCurrencies} from "../../modules/user/beneficiaries/selectors";
import classnames from "classnames";
import DefaultCurrencyIcon from '../../assets/images/coins/default.png';

class CurrentMarketInfoContainer extends React.Component {

    componentDidMount() {

        const {
            wallets,
            markets,
            currentMarket,
            userLoggedIn,
            rangerState: { connected },
            currencies,
        } = this.props;

        if (markets.length < 1) {
            this.props.marketsFetch();
        }

        if (!connected) {
            this.props.rangerConnect({ withAuth: userLoggedIn });
        }

        if(currencies.length < 1) {
            this.props.fetchCurrencies();
        }
    }

    render() {

        const { marketTickers, currentMarket, currencies} = this.props;

        const defaultTicker = {
            last: 0,
            vol: 0,
            price_change_percent: '+0.00%',
        };

        const currentCurrency = currentMarket && currencies.filter(currency => currency.id === currentMarket.base_unit);
        let iconUrl = "";
        if (currencies.length > 0) {
            iconUrl = (currentMarket && currentCurrency) && currentCurrency[0].icon_url || undefined ;
        }
        if (!iconUrl && currentMarket) {
            try {
                iconUrl = require(`../../assets/images/coins/${currentMarket.base_unit.toUpperCase()}.svg`);
            } catch (e) {
                iconUrl = DefaultCurrencyIcon;
            }
        }
        const currentMarketTicker = marketTickers[currentMarket && currentMarket.id];
        const isPositive = currentMarket && /\+/.test(
            (marketTickers[currentMarket.id] || defaultTicker).price_change_percent
        );
        const currentQuoteUnit = currentMarket && currencies.filter(currency => currency.id === currentMarket.quote_unit)[0];

        const mobilePriceClassName = classnames("current-market-info__change mt-1",{
            'mobile-market-price__positive': isPositive,
            'mobile-market-price__negative': !isPositive,
        });

        return (
            <div className="d-flex justify-content-between align-items-center px-3 py-1 current-market-info-container">
                <div className="d-flex align-items-center">
                    <div>
                        <img src={iconUrl || DefaultCurrencyIcon} alt={"c-market"} style={{width: "25px"}}/>
                    </div>
                    {currentMarket && <div className="ml-2 text-bright">
                        <span className="text-uppercase">
                            {currentMarket.base_unit}
                        </span>
                        <span className="text-uppercase current-market-info__quote-unit">
                            /{currentMarket.quote_unit}
                        </span>
                    </div>}
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column mr-2 align-items-end">
                        <h6 className="font-bold mb-0 text-bright">
                            {currentMarketTicker && (Number(currentMarketTicker.last).toFixed(currentMarket.price_precision))}
                        </h6>
                        <p>
                            <span className="text-muted-2">
                                {/*{currentQuoteUnit && currentQuoteUnit.symbol}*/}
                                {currentMarketTicker && (Number(currentMarketTicker.vol).toFixed(currentMarket.amount_precision))}
                            </span>
                        </p>
                    </div>
                    {(currentMarket && currentMarketTicker) && <div className={`${mobilePriceClassName} px-2`}>
                        <span>
                            {currentMarketTicker && currentMarketTicker.price_change_percent}
                        </span>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentMarket: selectCurrentMarket(state),
    marketTickers: selectMarketTickers(state),
    markets: selectMarkets(state),
    wallets: selectWallets(state),
    user: selectUserInfo(state),
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
    currencies: selectCurrencies(state)
});
const mapDispatchToProps = (dispatch) => ({
    marketsFetch: () => dispatch(marketsFetch()),
    depthFetch: (payload) => dispatch(depthFetch(payload)),
    rangerConnect: (payload) => dispatch(rangerConnectFetch(payload)),
    setCurrentPrice: (payload) => dispatch(setCurrentPrice(payload)),
    setCurrentMarket: (payload) => dispatch(setCurrentMarket(payload)),
    fetchCurrencies: () => (dispatch(currenciesFetch()))
});


export const CurrentMarketsInfo = connect(mapStateToProps, mapDispatchToProps)(CurrentMarketInfoContainer);
