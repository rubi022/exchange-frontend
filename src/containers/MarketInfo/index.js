import * as React from 'react';
import {
    currenciesFetch,
    selectCurrentMarket,
    selectMarketSelectorState,
    selectorCurrenciesFetch
} from "../../modules";
import {connect} from "react-redux";
import {selectCurrencies} from "../../modules/user/beneficiaries/selectors";

class MarketInfoContainer extends React.Component {

    componentDidMount() {
        const { currencies } = this.props;
        // window.addEventListener('resize', this.handleScreen.bind(this));
        if(currencies.length === 0 ) {
            console.log('if executed');
            this.props.fetchCurrencies()
        }
    }

    render() {
        const { isOpen, currentMarket, currencies } = this.props;
        // const {windowWidth } = this.state;

        const baseUnit = currentMarket && currentMarket.base_unit.toUpperCase();
        console.log('currencies', currencies);
        const currency =
            baseUnit && currencies?.find((v) => v.id === baseUnit.toLowerCase());
        let icon = currency && currency?.icon_url;

        if (!icon) {
            try {
                icon = require(`../../assets/images/coins/${baseUnit}.svg`);
            } catch (e) {
                icon = require("../../assets/images/coins/default.png");
            }
        }

        return (
            <div className={'parent-trading-header-container-left'}>
                <div
                    className={'parent-trading-header-selector-left'}
                    // onClick={this.handleOpenSelector}
                    // aria-disabled={windowWidth > 1150}
                >
                    <img
                        src={icon}
                        className={'trading-header-btc-img-left'}
                        alt={currency ? currency.name : ""}
                    />
                    <div>
                        <div
                            className={'parent-trading-header-btc-txt-container-left'}
                        >
                            <div>
                                {currency && currency.name}
                            </div>
                        </div>
                        <div
                            className={'parent-trading-header-selector-market-left'}
                        >
                            {currentMarket && currentMarket.name}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const reduxProps = state => ({
    currentMarket: selectCurrentMarket(state),
    isOpen: selectMarketSelectorState(state),
    currencies: selectCurrencies(state),
});

const mapDispatchToProps = dispatch => ({
    fetchCurrencies: () => dispatch(currenciesFetch()),
})

export const MarketInfo = connect(reduxProps, mapDispatchToProps)(MarketInfoContainer);
