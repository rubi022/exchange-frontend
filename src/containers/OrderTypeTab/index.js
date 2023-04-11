import * as React from "react";
import {TabPanel} from "../../components/TabPanel";
import {marketsFetch, } from "../../modules/public/markets";
import {walletsFetch} from "../../modules/user/wallets";
import {fetchHistory, resetHistory} from "../../modules/user/history";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {OrderComponentDesktop} from "../OrderInsertDesktop";

class OrderTypeTabContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tab: 'limit',
            currentTabIndex: 0,
        };
        this.tabMapping = ['limit','market'];
        this.onCurrentTabChange = index => this.setState({ currentTabIndex: index });
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
                    content: tab === 'limit' ? <OrderComponentDesktop orderTypeTab = {"Limit"}/> : null,
                    // label: this.props.currentMarket ? this.props.currentMarket.name : '',
                    label: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.orderType.limit' }),
                },
                {
                    content: tab === 'market' ? <OrderComponentDesktop orderTypeTab = {"Market"}/> : null,
                    // label: this.props.currentMarket ? this.props.currentMarket.name : '',
                    label: this.props.intl.formatMessage({ id: 'page.body.trade.header.newOrder.content.orderType.market' }),
                }
            ];
        };
    }
    componentDidMount() {

    }
    componentWillUnmount() {
    }
    render() {
        return (
            React.createElement(TabPanel, { panels: this.renderTabs(), onTabChange: this.handleMakeRequest, currentTabIndex: this.state.currentTabIndex, onCurrentTabChange: this.onCurrentTabChange })
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
export const OrderTypeTab = injectIntl(connect(null, mapDispatchToProps)(OrderTypeTabContainer));

