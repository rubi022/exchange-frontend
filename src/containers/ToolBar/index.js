import * as React from 'react';
import {connect} from 'react-redux';
import {selectCurrentMarket, selectMarkets, selectMarketTickers, selectUserLoggedIn,} from '../../modules';
import {MarketSelector,} from './MarketSelector';
import {ProgressLabel,} from './ProgressLabel';
import {Decimal} from "../../component/molecules/Decimal/Decimal";
import {injectIntl} from "react-intl";

class ToolBarComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isOpen: false,
    };
    this.getTickerValue = (value) => {
      const { marketTickers, currentMarket } = this.props;
      const defaultTicker = { low: 0, last: 0, high: 0, vol: 0, price_change_percent: '+0.00%' };
      return currentMarket && (marketTickers[currentMarket.id] || defaultTicker)[value];
    };
  }
  render() {
    const { marketTickers, currentMarket } = this.props;
    const defaultTicker = { low: 0, last: 0, high: 0, vol: 0, price_change_percent: '+0.00%' };
    const isPositive = currentMarket && /\+/.test(this.getTickerValue('price_change_percent'));
    const last = this.getTickerValue('last');
    const high = this.getTickerValue('high');
    const low = this.getTickerValue('low');
    const percentage = ((last - low) / ((high - low) / 100)) || 0;
    const quoteUnit = currentMarket && currentMarket.quote_unit.toUpperCase();
    const baseUnit = currentMarket && currentMarket.base_unit.toUpperCase();
    return (React.createElement("div", { className: "parent-trading-header-container" },
            React.createElement("div", { className: "parent-trading-header-container-stats" },
                React.createElement("div", { className: "parent-trading-header-container-daily", style:{marginRight: this.props.isLoggedIn ? '10px' : '30px'}},
                    React.createElement(ProgressLabel, { progress: currentMarket && Decimal.format(Number(this.getTickerValue('low')), currentMarket.price_precision), isPositive: false, additional: this.props.intl.formatMessage({id: 'page.trading.toolbar.progressLabel.lowest24'}), bidUnit: quoteUnit }),
                    React.createElement("div", { className: "parent-trading-header-container-daily-last" },
                        React.createElement(ProgressLabel, { progress: currentMarket && Decimal.format(Number(this.getTickerValue('last')), currentMarket.price_precision), isPositive: true, additional: this.props.intl.formatMessage({id: 'page.trading.toolbar.progressLabel.lastPrice'}), bidUnit: quoteUnit })),
                    React.createElement(ProgressLabel, { progress: currentMarket && Decimal.format(Number(this.getTickerValue('high')), currentMarket.price_precision), isPositive: true, additional: this.props.intl.formatMessage({id: 'page.trading.toolbar.progressLabel.highest24'}), bidUnit: quoteUnit }),
                    React.createElement(ProgressLabel, { progress: currentMarket && Decimal.format(Number(this.getTickerValue('vol')), currentMarket.price_precision), isPositive: true, additional: this.props.intl.formatMessage({id: 'page.trading.toolbar.progressLabel.volume24'}), bidUnit: quoteUnit }),
                    React.createElement(ProgressLabel, { progress: currentMarket && (marketTickers[currentMarket.id] || defaultTicker).price_change_percent, isPositive: isPositive, additional: this.props.intl.formatMessage({id: 'page.trading.toolbar.progressLabel.change'}) })
                )
            ),
            React.createElement("div", { className: "parent-trading-header-container-selector" },
                React.createElement(MarketSelector, null)
            ),
        )
    );
  }
}
const reduxProps = state => ({
  markets: selectMarkets(state),
  currentMarket: selectCurrentMarket(state),
  marketTickers: selectMarketTickers(state),
  isLoggedIn: selectUserLoggedIn(state),
});
const mapDispatchToProps = dispatch => ({
  // resetLayout: () => dispatch(resetTradingScreenLayout()),
});
export const ToolBar = injectIntl(connect(reduxProps, mapDispatchToProps)(ToolBarComponent));

