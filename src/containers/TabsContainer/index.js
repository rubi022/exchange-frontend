import * as React from "react";
import {marketsFetch, } from "../../modules/public/markets";
import {walletsFetch} from "../../modules/user/wallets";
import {fetchHistory, resetHistory} from "../../modules/user/history";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {OrderBook} from "../OrderBook";
import {RecentTrades} from "../RecentTrades";
import {ChartTabs} from "../ChartsContainer";
import {OrderBookDesktop} from "../OrderBookDesktop";

class TabsContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tab: 'tradingChart',
            currentTabIndex: 0,
        };
        this.tabMapping = ['tradingChart','openOrders','recentOrders'];
        this.onCurrentTabChange = index => this.setState({ currentTabIndex: index });
        this.handleMakeRequest = (index) => {
            if (this.state.tab === this.tabMapping[index]) {
                return;
            }
            // this.props.resetHistory();
            this.setState({ tab: this.tabMapping[index] });
        };
        this.renderTabs = () => {
            const { tab, currentTabIndex } = this.state;
            return [
                <div className={'base-tab-content base-tab-content__active base-tab-content__custom'} style={{visibility: currentTabIndex === 0 ? 'visible' : 'hidden', height: 'calc(100% - 90px) !important'}}>
                    <ChartTabs/>
                </div>,
                <div className={'base-tab-content base-tab-content__active base-tab-content__custom'} style={{visibility: currentTabIndex === 1 ? 'visible' : 'hidden', height: 'calc(100% - 90px)'}}>
                    <OrderBookDesktop/>
                </div>,
                <div className={'base-tab-content base-tab-content__active base-tab-content__custom'} style={{visibility: currentTabIndex === 2 ? 'visible' : 'hidden', height: 'calc(100% - 90px) !important'}}>
                    <RecentTrades/>
                </div>
            ];
        };
    }
    render() {
        const { currentTabIndex } = this.state;
        return (
            // React.createElement(TabPanel, { panels: this.renderTabs(), onTabChange: this.handleMakeRequest, currentTabIndex: this.state.currentTabIndex, onCurrentTabChange: this.onCurrentTabChange })
            <div className={'base-tab-panel base-tab-panel__custom'}>
                <div className={'base-tab-panel__navigation-container'}>
                    <div className={'base-tab-panel__navigation-container-navigation'}>
                        <div
                            onClick={() => this.onCurrentTabChange(0)}
                            className={`base-tab ${currentTabIndex === 0 ? 'base-tab__active' : ''}`}
                        >
                            {currentTabIndex === 0 ? <span className="base-tab__pointer"/> : null}
                            {this.props.intl.formatMessage({ id: 'public.trade.Chart-label-parent' })}
                        </div>
                        <div
                            onClick={() => this.onCurrentTabChange(1)}
                            className={`base-tab ${currentTabIndex === 1 ? 'base-tab__active' : ''}`}
                        >
                            {currentTabIndex === 1 ? <span className="base-tab__pointer"/> : null}
                            {this.props.intl.formatMessage({ id: 'page.body.trade.orderbook' })}
                        </div>
                        <div
                            onClick={() => this.onCurrentTabChange(2)}
                            className={`base-tab ${currentTabIndex === 2 ? 'base-tab__active' : ''}`}
                        >
                            {currentTabIndex === 2 ? <span className="base-tab__pointer"/> : null}
                            {this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades' })}
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', position: 'relative', height: 'calc(100% - 90px)'}}>
                    {this.renderTabs()}
                </div>
            </div>
        );
    }
}
// const mapStateToProps = state => ({
//     currentMarket: selectCurrentMarket(state),
// });
const mapDispatchToProps = dispatch => ({
    fetchMarkets: () => dispatch(marketsFetch()),
    fetchWallets: () => dispatch(walletsFetch()),
    fetchHistory: payload => dispatch(fetchHistory(payload)),
    resetHistory: () => dispatch(resetHistory()),
});
export const MobileTabsContainer = injectIntl(connect(null, mapDispatchToProps)(TabsContainer));

