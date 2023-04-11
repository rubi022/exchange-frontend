// import { Grid } from '../../dist/index';
// import { Grid } from '../../component/organisms';
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  OpenOrdersComponent,
  OrderBook,
  OrderComponent,
  RecentTrades,
  OrderBookDesktop,
  OpenOrderBookTab,
  ToolBar,
  OrderTypeDropdown,
} from "../../containers";
import { getUrlPart, setDocumentTitle } from "../../helpers";
import {
  selectCurrentMarket,
  selectMarketTickers,
  selectUserInfo,
  selectUserLoggedIn,
  setCurrentMarket,
  setCurrentPrice,
} from "../../modules";
import { Decimal } from "../../component/molecules/Decimal/Decimal";
import { marketsFetch, selectMarkets } from "../../modules/public/markets";
import { depthFetch } from "../../modules/public/orderBook";
import { rangerConnectFetch } from "../../modules/public/ranger";
import { selectRanger } from "../../modules/public/ranger/selectors";
import { selectWallets, walletsFetch } from "../../modules/user/wallets";
import { FormattedMessage, injectIntl } from "react-intl";
import { ChartTabs } from "../../containers/ChartsContainer";
import { MobileTabsContainer } from "../../containers/TabsContainer";
import closeButton from "../../assets/images/close.svg";
import { OrderTypeTab } from "../../containers/OrderTypeTab";
import { MarketsList } from "../../containers/ToolBar/MarketSelector/MarketsList";
import { MarketsTabs } from "../../containers/ToolBar/MarketSelector/MarketsTabs";
import {MobileBuySell} from "../../containers/MobileBuySell";
import { OrderComponentDesktop } from "../../containers/OrderInsertDesktop";


class Trading extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      orderComponentResized: 5,
      orderBookComponentResized: 5,
      activeIndex: -1,
      windowSize: window.innerWidth,
      marketsTabsSelectedValue: "",
      orderScreenDisplay: false,
      isOpenOrderBookActive: true,
      isActive: true,
      selectedDropdownItem: "Limit",
    };

    this.lastPriceRef = React.createRef();

    this.gridItems = [
      {
        i: 1,
        render: () =>
          React.createElement(OrderComponent, {
            size: this.state.orderComponentResized,
          }),
      },
      {
        i: 2,
        render: () => React.createElement(ChartTabs, null),
      },
      {
        i: 3,
        render: () =>
          React.createElement(OrderBook, {
            size: this.state.orderBookComponentResized,
          }),
      },
      // {
      //     i: 4,
      //     render: () => React.createElement(MarketDepthsComponent, null),
      // },
      {
        i: 5,
        render: () => React.createElement(OpenOrdersComponent, null),
      },
      {
        i: 6,
        render: () => React.createElement(RecentTrades, null),
      },
    ];
    this.lastPrice = () => {
      const { marketTickers, currentMarket } = this.props;
      const defaultTicker = {
        last: 0,
        price_change_percent: "+0.00%",
      };
      if (
        currentMarket &&
        marketTickers[currentMarket.id] &&
        marketTickers[currentMarket.id].price_change_percent
      ) {
        return React.createElement(
          React.Fragment,
          undefined,
          React.createElement(
            "span",
            { className: "base-combined-order-book__last-price" },
            Decimal.format(
              Number((marketTickers[currentMarket.id] || defaultTicker).last),
              currentMarket.price_precision
            ),
            " "
          )
        );
      } else {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "span",
            { className: "base-combined-order-book__market-negative" },
            "0"
          )
        );
      }
    };

    this.setMarketFromUrlIfExists = (markets) => {
      const urlMarket = getUrlPart(2, window.location.pathname);
      const market = markets.find((item) => item.id === urlMarket);
      // if part is existed market, set it as currentMarket, else select first one
      if (market) {
        this.props.setCurrentMarket(market);
      }
    };
    this.handleResize = (layout, oldItem, newItem) => {
      switch (oldItem.i) {
        case "1":
          this.setState({
            orderComponentResized: newItem.w,
          });
          break;
        case "3":
          this.setState({
            orderBookComponentResized: newItem.w,
          });
          break;
        default:
          break;
      }
    };
    this.handleScreen = (e) => {
      // console.log(window.innerWidth)
      this.setState({
        windowSize: window.innerWidth,
      });
    };

    this.handleOrderScreenDisplay = () => {
      this.setState({
        orderScreenDisplay: true,
      });
    };

    this.handleOrderScreenCloseButton = () => {
      this.setState((prevState) => {
        return {
          orderScreenDisplay: !prevState.orderScreenDisplay,
        };
      });
    };

    this.marketsTabsSelectHandler = (value) => {
      this.setState({
        marketsTabsSelectedValue: value,
      });
    };

    this.handleOrderTabCloseButton = () => {
      this.setState((prevState) => {
        return {
          isActive: !prevState.isActive,
        };
      });
    };

    this.handleOpenOrderBookButton = () => {
      this.setState((prevState) => {
        return {
          isOpenOrderBookActive: !prevState.isOpenOrderBookActive,
        };
      });
    };

    this.handleDropdownItem = (value) => {
      this.setState({ selectedDropdownItem: value });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleScreen.bind(this));
    document
      .getElementsByClassName("parent-header")[0]
      .classList.add("parent-header-mobile__custom");
    setDocumentTitle(
      this.props.intl.formatMessage({ id: "page.header.navbar.trade" })
    );
    const {
      wallets,
      markets,
      currentMarket,
      userLoggedIn,
      rangerState: { connected },
    } = this.props;
    if (markets.length < 1) {
      this.props.marketsFetch();
    }
    if (!wallets || wallets.length === 0) {
      this.props.accountWallets();
    }
    if (currentMarket) {
      this.props.depthFetch(currentMarket);
    }
    if (!connected) {
      this.props.rangerConnect({ withAuth: userLoggedIn });
    }
    if (!userLoggedIn && currentMarket) {
      this.props.history.replace(`/trading/${currentMarket.id}`);
    }
  }

  componentWillUnmount() {
    this.props.setCurrentPrice("");
    document.getElementsByClassName("parent-header")[0] &&
      document
        .getElementsByClassName("parent-header")[0]
        .classList.remove("parent-header-mobile__custom");
    window.removeEventListener("resize", this.handleScreen.bind(this));

    if (this.timeoutGreenId) {
      clearTimeout(this.timeoutGreenId);
    }

    if (this.timeoutRedId) {
      clearTimeout(this.timeoutRedId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      userLoggedIn,
      history,
      markets,
      currentMarket,
      marketTickers,
    } = this.props;
    if (userLoggedIn !== nextProps.userLoggedIn) {
      this.props.rangerConnect({ withAuth: nextProps.userLoggedIn });
    }
    if (markets.length !== nextProps.markets.length) {
      this.setMarketFromUrlIfExists(nextProps.markets);
    }
    if (nextProps.currentMarket && currentMarket !== nextProps.currentMarket) {
      history.replace(`/trading/${nextProps.currentMarket.id}`);
      this.props.depthFetch(nextProps.currentMarket);
    }

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

      if (last > nextLast) {
        this.lastPriceRef.current.classList.add("fluctuateAnimateGreen");
        this.timeoutGreenId = setTimeout(
          function () {
            this.lastPriceRef.current.classList.remove("fluctuateAnimateGreen");
          }.bind(this),
          1000
        );
      } else if (last < nextLast) {
        this.lastPriceRef.current.classList.add("fluctuateAnimateRed");

        this.timeoutRedId = setTimeout(
          function () {
            this.lastPriceRef.current.classList.remove("fluctuateAnimateRed");
          }.bind(this),
          1000
        );
      }
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const rowHeight = 14;
    const allGridItems = [...this.gridItems];
    const { activeIndex } = this.state;
    const chartHeight = activeIndex === 0 ? "80%" : "93%";
    const openOrdersHeight = activeIndex === 0 ? "20%" : "7%";

    return (
      <div className={"trading-page"}>
        <div className={"desktop-parent-tab-container"}>
          <div className={"market_list_container"}>
            {/* <MarketInfo /> */}
            <MarketsTabs onSelect={this.marketsTabsSelectHandler} />
            <MarketsList
              currencyQuote={this.state.marketsTabsSelectedValue}
              closeSelector={false}
            />
          </div>
          <div className="w-100">
            <div className="d-flex" style={{height: "100vh"}}>
              <div className="left">
                {/*{this.state.windowSize < 1169 ? React.createElement(ToolBar, null) : null}*/}
                <div className="trading-chart-parent">
                  <div style={{ width: "100%" }}>
                    {this.state.windowSize < 768 ? null : <ChartTabs />}
                  </div>
                </div>

                <div
                  className="open-book-orders-parent"
                  style={{
                    height: this.state.isOpenOrderBookActive ? "50%" : "35px",
                  }}
                >
                  {
                    <div
                      className={`open-order-book-parent__close-button-container ${
                        this.state.isOpenOrderBookActive ? "" : "button-close"
                      }`}
                      onClick={this.handleOpenOrderBookButton.bind(this)}
                    >
                      <div className="base-title-lastprice">
                        <span>{this.props.intl.formatMessage({id: "page.body.trade.header.markets.content.last_price"})}</span>
                        <span
                          className="open-book-orders-lastprice"
                          ref={this.lastPriceRef}
                        >
                          {this.lastPrice()}
                        </span>
                      </div>

                      <img
                        className="open-order-book-parent__close-button-image"
                        // src={closeButton}
                        // alt="close"
                      />
                    </div>
                  }

                  {this.state.windowSize < 1369 && this.state.windowSize > 768 ? (
                    <div className="openorderbooktab-parent">
                      <OpenOrderBookTab />
                    </div>
                  ) : null}

                  {this.state.windowSize > 1367 ? (
                    <>
                      <div className="openorders-parent">
                        <div className="base-table-header__content">
                          <div className="base-title-component">
                            <FormattedMessage id="page.body.trade.header.openOrders" />
                          </div>
                        </div>
                        <OpenOrdersComponent />
                      </div>

                      <div className="orderbook-parent">
                        <div className={"order-recent-tab-desktop"}>
                          {this.state.windowSize < 1369 &&
                          this.state.windowSize > 768 ? (
                            <OrderBook />
                          ) : null}
                        </div>

                        <div className="orderbook-desktop" style={{ zIndex: 1 }}>
                          {this.state.windowSize > 1367 ? (
                            <OrderBookDesktop />
                          ) : null}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="right">
                
                {/* <div className="ordercomponent-parent">
                  <div
                    className={`order-type-tab-container-close-button-container ${
                      this.state.isActive ? "" : "button-close"
                    }`}
                    onClick={this.handleOrderTabCloseButton.bind(this)}
                  >
                    <img className="order-type-tab-container-close-button-image" />
                  </div>
                  <OrderTypeTab /> 
                </div> */}
                <div className="ordercomponent-container">
                  <div
                    className={`order-type-tab-container-close-button-container ${
                      this.state.isActive ? "" : "button-close"
                    }`}
                    onClick={this.handleOrderTabCloseButton.bind(this)}
                  >
                    <img className="order-type-tab-container-close-button-image" />
                  </div>
                  {this.state.selectedDropdownItem === "Limit" ? <OrderComponentDesktop orderTypeTab={"Limit"}  handleDropdownItem={this.handleDropdownItem} /> : null}
                  {this.state.selectedDropdownItem === "Market" ? <OrderComponentDesktop orderTypeTab={"Market"} handleDropdownItem={this.handleDropdownItem} /> : null}
                </div>
              

              <div className="obtc-parent grid-tr-trading">
                  <RecentTrades />
                </div> 

              </div>
            </div>

          </div>
        </div>
        <div className={"mobile-parent-tab-container"}>
          {/*{this.state.windowSize < 769*/}
          {/*  ? React.createElement(ToolBar, null)*/}
          {/*  : null}*/}
          {/*{this.state.windowSize < 768 ? <MobileTabsContainer /> : null}*/}
          {this.state.windowSize < 769 ? <ChartTabs /> : null}
        </div>
        {/*<MobileBuySell windowSize={this.state.windowSize} />*/}
      </div>
    );
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
});
const mapDispatchToProps = (dispatch) => ({
  marketsFetch: () => dispatch(marketsFetch()),
  depthFetch: (payload) => dispatch(depthFetch(payload)),
  accountWallets: () => dispatch(walletsFetch()),
  rangerConnect: (payload) => dispatch(rangerConnectFetch(payload)),
  setCurrentPrice: (payload) => dispatch(setCurrentPrice(payload)),
  setCurrentMarket: (payload) => dispatch(setCurrentMarket(payload)),
});

const TradingScreen = injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Trading))
);
export { TradingScreen };
