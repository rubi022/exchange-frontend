import * as React from "react";
import { TabPanel } from "../../components/TabPanel";
import { marketsFetch } from "../../modules/public/markets";
import { walletsFetch } from "../../modules/user/wallets";
import { fetchHistory, resetHistory } from "../../modules/user/history";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import {OpenOrdersComponent} from "../OpenOrders";
import {OrderBookDesktop} from "../OrderBookDesktop";

class OpenOrderTabContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tab: "orderBook",
            currentTabIndex: 0,
        };
        this.tabMapping = ["orderBook", "openOrders"];
        this.onCurrentTabChange = (index) =>
            this.setState({ currentTabIndex: index });
        this.handleMakeRequest = (index) => {
            if (this.state.tab === this.tabMapping[index]) {
                return;
            }
            this.props.resetHistory();
            this.setState({ tab: this.tabMapping[index] });
        };
        this.renderTabs = () => {
            const { tab } = this.state;
            return [
                {
                    content:
                        tab === "orderBook" ? React.createElement(OrderBookDesktop, null) : null,
                    label: this.props.intl.formatMessage({
                        id: "page.body.trade.orderbook",
                    }),
                },
                {
                    content:
                        tab === "openOrders"
                            ? React.createElement(OpenOrdersComponent, null)
                            : null,
                    label: this.props.intl.formatMessage({
                        id: "page.body.trade.header.openOrders",
                    }),
                },
            ];
        };
    }

    render() {
        return React.createElement(TabPanel, {
            panels: this.renderTabs(),
            onTabChange: this.handleMakeRequest,
            currentTabIndex: this.state.currentTabIndex,
            onCurrentTabChange: this.onCurrentTabChange,
        });
    }
}
// const mapStateToProps = state => ({
//     currentMarket: selectCurrentMarket(state),
// });
const mapDispatchToProps = (dispatch) => ({
    fetchMarkets: () => dispatch(marketsFetch()),
    fetchWallets: () => dispatch(walletsFetch()),
    fetchHistory: (payload) => dispatch(fetchHistory(payload)),
    resetHistory: () => dispatch(resetHistory()),
});
export const OpenOrderBookTab = injectIntl(
    connect(null, mapDispatchToProps)(OpenOrderTabContainer)
);
