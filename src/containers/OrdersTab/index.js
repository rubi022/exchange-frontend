import { TabPanel } from '@components/components';
import * as React from 'react';
import { FormattedMessage, injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { marketsFetch, ordersCancelAllFetch, selectOrdersHistory, } from '../../modules';
import { OrdersElement } from './OrdersElement';
class Orders extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { tab: 'open' };
        this.tabMapping = ['open', 'all'];
        this.handleMakeRequest = (index) => {
            this.renderTabs();
            if (this.state.tab === this.tabMapping[index]) {
                return;
            }
            this.setState({ tab: this.tabMapping[index] });
        };
        this.renderTabs = () => {
            const { tab } = this.state;
            return [
                {
                    content: tab === 'open' ? React.createElement(OrdersElement, { type: "open" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.openOrders.tab.open' }),
                },
                {
                    content: tab === 'all' ? React.createElement(OrdersElement, { type: "all" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.openOrders.tab.all' }),
                },
            ];
        };
        this.handleCancelAll = () => this.props.ordersCancelAll(this.state);
    }
    componentDidMount() {
        this.props.marketsFetch();
    }
    render() {
        const cancelAll = this.props.list.length ? (React.createElement(React.Fragment, null,
            React.createElement("span", { onClick: this.handleCancelAll },
                React.createElement(FormattedMessage, { id: "page.body.openOrders.header.button.cancelAll" }),
                React.createElement("span", { className: "parent-history-tab__close" })))) : null;
        return (React.createElement("div", { className: "parent-history-tab parent-container" },
            React.createElement("div", { className: "parent-history-tab__tabs-content" },
                React.createElement(TabPanel, { panels: this.renderTabs(), onTabChange: this.handleMakeRequest, optionalHead: cancelAll }))));
    }
}
const mapStateToProps = (state) => ({
    list: selectOrdersHistory(state),
});
const mapDispatchToProps = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    ordersCancelAll: payload => dispatch(ordersCancelAllFetch(payload)),
});
const OrdersTab = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Orders));
export { OrdersTab, };

