import * as React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { TabPanel } from "../../components";
import { OrdersElement } from "../../containers/OrdersElement";
import { setDocumentTitle } from "../../helpers";
import {
  marketsFetch,
  ordersCancelAllFetch,
  resetOrdersHistory,
  selectOrdersHistory, selectWindowWidth,
} from "../../modules";
import LeftNavigationContainer from "../../containers/LeftNavigationContainer";
import {HistoryScreen} from "../History";

class Orders extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = { tab: "open", currentTabIndex: 0 };
    this.tabMapping = ["open", "history"];
    this.onCurrentTabChange = (index) =>
      this.setState({ currentTabIndex: index });
    this.handleMakeRequest = (index) => {
      this.renderTabs();
      if (this.state.tab === this.tabMapping[index]) {
        return;
      }
      this.props.resetOrdersHistory();
      this.setState({ tab: this.tabMapping[index] });
    };
    this.renderTabs = () => {
      const { tab } = this.state;
      return [
        {
          content:
            tab === "open"
              ? React.createElement(OrdersElement, { type: "open" })
              : null,
          label: this.props.intl.formatMessage({
            id: "page.body.openOrders.tab.open",
          }),
        },
        {
          content:
            tab === "history"
              ? React.createElement(HistoryScreen, )
              : null,
          label: this.props.intl.formatMessage({
            id: "page.header.navbar.history",
          }),
        },
      ];
    };
    this.handleCancelAll = () => this.props.ordersCancelAll(this.state);
  }
  componentDidMount() {
    setDocumentTitle(
      this.props.intl.formatMessage({ id: "page.header.navbar.openOrders" })
    );
    document.getElementsByClassName('parent-layout')[0].classList.add('parent-layout__custom-wrapper');
    this.props.marketsFetch();
  }
  componentWillUnmount() {
    this.props.resetOrdersHistory();
    document.getElementsByClassName('parent-layout')[0].classList.remove('parent-layout__custom-wrapper');
  }
  render() {

    const { windowWidth } = this.props;

    const cancelAll = this.props.list.length
      ? React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "span",
            { onClick: this.handleCancelAll },
            React.createElement(FormattedMessage, {
              className: "d-inline-block",
              id: "page.body.openOrders.header.button.cancelAll",
            }),
            React.createElement("i", {
              className: "d-inline-block pl-2 fas fa-times-circle",
            })
          )
        )
      : null;

    if (windowWidth > 768) {
      return (
          <HistoryScreen />
      )
    }

    return (
      <div style={{ display: "flex" }}>
        <LeftNavigationContainer />
        <div className={'orders-page__custom-wrapper'}>
          <div style={{ flex: 1 }} className="card content-area card-margin">
            <div className="mobile-dis-appear">
              <h3
                  style={{
                    padding: "0 0rem 1rem",
                    fontWeight: 700,
                    fontSize: "27.5px",
                    color: "var(--side-bar-active-content-heading",
                  }}
              >
                {this.props.intl.formatMessage({
                  id: "page.body.openOrders.tab.open",
                })}
              </h3>
            </div>
            <TabPanel
                {...{
                  panels: this.renderTabs(),
                  onTabChange: this.handleMakeRequest,
                  currentTabIndex: this.state.currentTabIndex,
                  onCurrentTabChange: this.onCurrentTabChange,
                  // whiteColor: "history-table-header-color",
                }}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  list: selectOrdersHistory(state),
  windowWidth: selectWindowWidth(state),
});
const mapDispatchToProps = (dispatch) => ({
  marketsFetch: () => dispatch(marketsFetch()),
  ordersCancelAll: (payload) => dispatch(ordersCancelAllFetch(payload)),
  resetOrdersHistory: () => dispatch(resetOrdersHistory()),
});
const OrdersTabScreen = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(Orders)
);
export { OrdersTabScreen };
