import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { TabPanel } from "../../components";
import { HistoryElement } from "../../containers/HistoryElement";
import { setDocumentTitle } from "../../helpers";
import {
  fetchHistory,
  marketsFetch,
  resetHistory,
  walletsFetch,
} from "../../modules";
import { OrdersElement } from "../../containers/OrdersElement";
import LeftNavigation from "../../containers/LeftNavigationContainer";

class History extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      tab: "orders",
      currentTabIndex: 0,
    };
    this.tabMapping = ["orders", "deposits", "withdraws", "trades"];
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
            tab === "orders"
              ? React.createElement(OrdersElement, { type: "all" })
              : null,
          label: this.props.intl.formatMessage({
            id: "page.body.openOrders.tab.all",
          }),
        },
        {
          content:
            tab === "deposits"
              ? React.createElement(HistoryElement, { type: "deposits" })
              : null,
          label: this.props.intl.formatMessage({
            id: "page.body.history.deposit",
          }),
        },
        {
          content:
            tab === "withdraws"
              ? React.createElement(HistoryElement, { type: "withdraws" })
              : null,
          label: this.props.intl.formatMessage({
            id: "page.body.history.withdraw",
          }),
        },
        {
          content:
            tab === "trades"
              ? React.createElement(HistoryElement, { type: "trades" })
              : null,
          label: this.props.intl.formatMessage({
            id: "page.body.history.trade",
          }),
        },
      ];
    };
  }
  componentDidMount() {
    setDocumentTitle(
      this.props.intl.formatMessage({ id: "page.header.navbar.history" })
    );
    document.getElementsByClassName('parent-layout')[0].classList.add('parent-layout__custom-wrapper');
    const pathUrl = window.location.pathname;
    if (pathUrl.includes("my-orders")) {
      document.getElementsByClassName('order_page')[0].classList.add('order-page__markets');
    }
    this.props.fetchMarkets();
    this.props.fetchWallets();
  }
  componentWillUnmount() {
    this.props.resetHistory();
    document.getElementsByClassName('parent-layout')[0].classList.remove('parent-layout__custom-wrapper');
    const pathUrl = window.location.pathname;
    if (pathUrl.includes("my-orders")) {
      document.getElementsByClassName('order_page')[0].classList.remove('order-page__markets');
    }
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <LeftNavigation />
        <div
          style={{
            flex: 1,
            margin: 0,
            padding: "30px",
            width: '100%'
          }}
          className="order_page"
        >
          <div className="mobile-dis-appear">
            <h3
              style={{
                padding: "0 0rem 1rem",
                fontWeight: 700,
                fontSize: "27.5px",
                color: "var(--side-bar-active-content-heading)",
              }}
            >
              {this.props.intl.formatMessage({id: 'page.header.navbar.history'})}
            </h3>
          </div>
          <div className="card content-area history-table__wrapper">
            <div>
              <TabPanel
                {...{
                  panels: this.renderTabs(),
                  onTabChange: this.handleMakeRequest,
                  currentTabIndex: this.state.currentTabIndex,
                  onCurrentTabChange: this.onCurrentTabChange,
                  whiteColor: "history-table-header-color",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchMarkets: () => dispatch(marketsFetch()),
  fetchWallets: () => dispatch(walletsFetch()),
  fetchHistory: (payload) => dispatch(fetchHistory(payload)),
  resetHistory: () => dispatch(resetHistory()),
});
export const HistoryScreen = injectIntl(
  connect(null, mapDispatchToProps)(History)
);
