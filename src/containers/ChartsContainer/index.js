import * as React from "react";
import {TabPanel} from "../../components/TabPanel";
import {marketsFetch, } from "../../modules/public/markets";
import {walletsFetch} from "../../modules/user/wallets";
import {fetchHistory, resetHistory} from "../../modules/user/history";
import {selectCurrentMarket, selectMarkets, selectMarketTickers, selectUserLoggedIn,} from '../../modules';
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {TradingChart} from "../TradingChart";
import {MarketDepthsComponent} from "../MarketDepth";

class ChartsContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tab: 'tradingChart',
            currentTabIndex: 0,
		};

        this.lastPriceRef = React.createRef();

		this.getTickerValue = (value) => {
			const { marketTickers, currentMarket } = this.props;
			const defaultTicker = { low: 0, last: 0, high: 0, vol: 0, price_change_percent: '+0.00%' };
			return currentMarket && (marketTickers[currentMarket.id] || defaultTicker)[value];
		};
        this.tabMapping = ['tradingChart','marketDepths'];
        this.handleMakeRequest = (index) => {
            if (this.state.tab === this.tabMapping[index]) {
                return;
            }
            this.props.resetHistory();
            this.setState({ tab: this.tabMapping[index] });
        };
        this.renderTabs = () => {
            const { tab, currentTabIndex } = this.state;
            return [
                <div className={'chart-content'} style={{visibility: currentTabIndex === 0 ? 'visible' : 'hidden', height: 'calc(100% - 35px)'}}>
                    <TradingChart/>
                </div>,
                <div className={'chart-content'} style={{visibility: currentTabIndex === 1 ? 'visible' : 'hidden', height: 'calc(100% - 35px)'}}>
                    <MarketDepthsComponent/>
                </div>
            ];
        };
    }

    componentWillReceiveProps(nextProps) {
        const {currentMarket, marketTickers} = this.props;
    
        let nextMarketTickers = nextProps.marketTickers;
        let nextCurrentMarket = nextProps.currentMarket;
    
        const defaultTicker = {
            last: 0,
            price_change_percent: "+0.00%",
        };
        if (
            currentMarket &&
            marketTickers[currentMarket.id] &&
            marketTickers[currentMarket.id].last &&
            nextCurrentMarket &&
            nextMarketTickers[nextCurrentMarket.id] &&
            nextMarketTickers[nextCurrentMarket.id].last
        ) {
            if (currentMarket !== nextCurrentMarket) return;
            let nextLast = parseFloat(nextMarketTickers[nextCurrentMarket.id].last);
            let last = parseFloat(marketTickers[currentMarket.id].last);
            if (nextLast === last) return;
    
            if (this.lastPriceRef.current) {

                if (last > nextLast) {
                    this.lastPriceRef.current.classList.add("fluctuateAnimateGreen");
                    this.timeoutGreenId = setTimeout(function () {
                        this.lastPriceRef.current.classList.remove("fluctuateAnimateGreen");
                    }.bind(this), 1000);
                    
                } else if (last < nextLast) {
                    this.lastPriceRef.current.classList.add("fluctuateAnimateRed");
                    
                    this.timeoutRedId = setTimeout(function () {
                        this.lastPriceRef.current.classList.remove("fluctuateAnimateRed");
                    }.bind(this), 1000);
                }
            }
        }
    }

    componentWillUnmount() {
        if (this.timeoutGreenId) {
          clearTimeout(this.timeoutGreenId);
        }
    
        if (this.timeoutRedId) {
          clearTimeout(this.timeoutRedId);
        }
    }

    onCurrentTabChange = index => this.setState({ currentTabIndex: index });

    render() {
        const {currentTabIndex} = this.state;
        const { currentMarket } = this.props;
		const last = this.getTickerValue('last');
        const high = this.getTickerValue('high');
        const low = this.getTickerValue('low');
		
        return (
            // React.createElement(TabPanel, { panels: this.renderTabs(), onTabChange: this.handleMakeRequest, currentTabIndex: this.state.currentTabIndex, onCurrentTabChange: this.onCurrentTabChange })
            <div className={'chart-tab-parent'}>
                <div className={'base-tab-panel'}>
                    <div className={'base-tab-panel__navigation-container draggable-container'}>
                        <div className={'base-tab-panel__navigation-container-navigation'} role={'tablist'}>
                            <div
                                className={`base-tab ${currentTabIndex === 0 ? 'base-tab__active' : ''}`}
                                role="tab"
                                tabIndex="0"
                                onClick={() => this.onCurrentTabChange(0)}
                            >
                                {this.props.intl.formatMessage({id: 'public.trade.tradingChart-label'})}
                                {currentTabIndex === 0 ? <span className="base-tab__pointer"/> : null}
                            </div>
                            <div
                                className={`base-tab ${currentTabIndex === 1 ? 'base-tab__active' : ''}`}
                                role="tab"
                                tabIndex="1"
                                onClick={() => this.onCurrentTabChange(1)}
                            >
                                {this.props.intl.formatMessage({id: 'public.trade.marketDepth-label'})}
                                {currentTabIndex === 1 ? <span className="base-tab__pointer"/> : null}
                            </div>
                        </div>
                        <div className='base-tab-panel__navigation-container-prices'>
                            <div className="base-tab-panel__navigation-container-prices--last">
                                <span>{this.props.intl.formatMessage({id: "page.body.trade.header.markets.content.last_price"})}</span>
                                <span className="base-tab-panel__navigation-container-prices--last-price" ref={this.lastPriceRef}>{Number(last)?.toFixed(currentMarket?.price_precision || 4)}</span>
                            </div>

                             <div className="base-tab-panel__navigation-container-prices--high">
                                <span>{this.props.intl.formatMessage({id: "page.trading.toolbar.progressLabel.highest24"})}</span>
                                <span>{Number(high)?.toFixed(currentMarket?.price_precision || 4)}</span>
                            </div>

                             <div className="base-tab-panel__navigation-container-prices--low">
                                 <span>{this.props.intl.formatMessage({id: "page.trading.toolbar.progressLabel.lowest24"})}</span>
                                <span>{Number(low)?.toFixed(currentMarket?.price_precision || 4)}</span>
                            </div>
                        </div>
                    </div>
                    {this.renderTabs()}
                </div>
            </div>
        );
    }
}
// const mapStateToProps = state => ({
//     currentMarket: selectCurrentMarket(state),
// });

const reduxProps = state => ({
	markets: selectMarkets(state),
    currentMarket: selectCurrentMarket(state),
    marketTickers: selectMarketTickers(state),
    isLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
    fetchMarkets: () => dispatch(marketsFetch()),
    fetchWallets: () => dispatch(walletsFetch()),
    fetchHistory: payload => dispatch(fetchHistory(payload)),
    resetHistory: () => dispatch(resetHistory()),
});
export const ChartTabs = injectIntl(connect(reduxProps, mapDispatchToProps)(ChartsContainer));



