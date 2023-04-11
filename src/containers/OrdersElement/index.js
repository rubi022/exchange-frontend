import { CloseButton, Pagination } from "@components/components";
import * as React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { History } from "../../components";
import {localeDate, setOrderStateColor, setTradeColor} from "../../helpers";
import {
  ordersHistoryCancelFetch,
  selectCancelAllFetching,
  selectCancelFetching,
  selectCurrentPageIndex,
  selectMarkets,
  selectOrdersFirstElemIndex,
  selectOrdersHistory,
  selectOrdersHistoryLoading,
  selectOrdersLastElemIndex,
  selectOrdersNextPageExists,
  selectTotalOrdersHistory, selectWindowWidth,
  userOrdersHistoryFetch,
} from "../../modules";
import { ClipLoader } from "react-spinners";
import { Decimal } from "../../component/molecules/Decimal/Decimal";
class OrdersComponent extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.renderContent = () => {
      const {
        firstElemIndex,
        lastElemIndex,
        total,
        pageIndex,
        nextPageExists,
      } = this.props;
      let newTotal = total ? total : lastElemIndex;
      let newLastElemIndex = nextPageExists ? lastElemIndex : firstElemIndex + (this.retrieveData() ? this.retrieveData().length - 1 : 0)
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(History, {
          headers: this.renderHeaders(),
          data: this.retrieveData(),
        }),
          React.createElement(Pagination, {
            firstElemIndex: firstElemIndex,
            lastElemIndex: newLastElemIndex,
            total: nextPageExists ? newTotal : newLastElemIndex,
            page: pageIndex,
            nextPageExists: nextPageExists,
            onClickPrevPage: this.onClickPrevPage,
            onClickNextPage: this.onClickNextPage
          })
      );
    };
    this.onClickPrevPage = () => {
      const { pageIndex, type } = this.props;
      this.props.userOrdersHistoryFetch({
        pageIndex: Number(pageIndex) - 1,
        type,
        limit: 25,
      });
    };
    this.onClickNextPage = () => {
      const { pageIndex, type } = this.props;
      this.props.userOrdersHistoryFetch({
        pageIndex: Number(pageIndex) + 1,
        type,
        limit: 25,
      });
    };
    this.renderHeaders = () => {
      const { windowWidth } = this.props;

      if (windowWidth < 769) {
        return [
          "",
          "",
          "",
          // "",
        ];
      }

      return [
        this.props.intl.formatMessage({
          id: "page.body.history.deposit.header.date",
        }),
        this.props.intl.formatMessage({
          id: "page.body.openOrders.header.orderType",
        }),
        this.props.intl.formatMessage({
          id: "page.body.openOrders.header.pair",
        }),
        this.props.intl.formatMessage({
          id: "page.body.openOrders.header.price",
        }),
        this.props.intl.formatMessage({
          id: "page.body.openOrders.header.amount",
        }),
        this.props.intl.formatMessage({
          id: "page.body.openOrders.header.executed",
        }),
        this.props.intl.formatMessage({
          id: "page.body.openOrders.header.remaining",
        }),
        this.props.intl.formatMessage({
          id: "page.body.openOrders.header.costRemaining",
        }),
        this.props.intl.formatMessage({
          id: "page.body.openOrders.header.status",
        }),
        "",
      ];
    };
    this.retrieveData = () => {
      return [...this.props.list].map((item) =>
        this.renderOrdersHistoryRow(item)
      );
    };
    this.renderOrdersHistoryRow = (item) => {
      const {
        id,
        executed_volume,
        market,
        ord_type,
        price,
        avg_price,
        remaining_volume,
        origin_volume,
        side,
        state,
        updated_at,
      } = item;
      const { windowWidth } = this.props;
      const currentMarket = this.props.marketsData.find(
        (m) => m.id === market
      ) || { name: "", price_precision: 0, amount_precision: 0 };
      const orderType = this.getType(side, ord_type);
      const marketName = currentMarket ? currentMarket.name : market;
      const marketNameBaseUnit = currentMarket && currentMarket.name ? currentMarket.base_unit.toUpperCase() : market
      const marketNameQuoteUnit = currentMarket && currentMarket.name ? currentMarket.quote_unit.toUpperCase() : market
      const costRemaining = remaining_volume * price; // price or avg_price ???
      const date = localeDate(updated_at);
      const status = this.setOrderStatus(state);
      const actualPrice =
        ord_type === "market" || status === "done" ? avg_price : price;

      const buySellSection = () => {

        const percentage = (Number(executed_volume)/Number(origin_volume)) * 100;
        // const percentage = 100;
        const fillPercent = ((percentage/100) * 251.2);

        return (
            <div className="d-flex justify-content-center align-items-center flex-column pl-2" style={{height: "70px"}}>
              <div className="mb-2">
                <h6 style={{color: setTradeColor(side).color}} className="text-capitalize font-weight-bold mb-0">
                  {side}
                </h6>
              </div>
              <span className="pb-1" style={{width: "47px", height: "55px"}}>
                <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent"/>
                <path fill="none" stroke-linecap="round" stroke-width={percentage ? "5" : "0"} stroke={setTradeColor(side).color}
                      stroke-dasharray={`${fillPercent}, 251.2`}
                      d="M50 10
                         a 40 40 0 0 1 0 80
                         a 40 40 0 0 1 0 -80"/>
                <text x="50" y="50" text-anchor="middle" dy="7" font-size="24" fill={setTradeColor(side).color}>{percentage.toFixed(1)}%</text>
              </svg>
              </span>
            </div>
        )
      }

      const detailsSection = () => {
        return (
            <div className="d-flex flex-column justify-content-start align-items-start pl-2">
              <div className="d-flex justify-content-end align-items-end mb-2">
                <h6 className="text-white mb-0 font-weight-bold">
                  {marketNameBaseUnit}
                </h6>
                <p className="mb-0 ml-1">
                  /{marketNameQuoteUnit}
                </p>
              </div>
              <div className="d-flex" style={{fontSize: "13px"}}>
                <div className="d-flex flex-column align-items-start justify-content-start text-muted-2">
                  <span className="mb-1">
                    {this.props.intl.formatMessage({
                      id: "page.body.openOrders.header.amount",
                    })}
                  </span>
                  <span className="mb-1">
                    {this.props.intl.formatMessage({
                      id: "page.body.openOrders.header.price",
                    })}
                  </span>
                  <span className="mb-1">
                    {this.props.intl.formatMessage({
                      id: "page.body.trade.header.openOrders.content.total",
                    })}
                  </span>
                </div>
                <div className="d-flex flex-column align-items-start justify-content-start pl-2">
                  <span className="mb-1">
                    <strong>{executed_volume}</strong>
                    <span className="text-muted-2">{`/${origin_volume}`}</span>
                  </span>
                  <span className={"text-muted-2 mb-1"}>
                    {Number(price).toFixed(currentMarket ? currentMarket.price_precision : 4)}
                  </span>
                  <span className={"text-muted-2 mb-1"}>
                    {(Number(origin_volume) * Number(price)).toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
        )
      }

      const dateSection = (id, state) => {
        return (
            <div className="d-flex flex-column pt-2 align-items-end px-3">
              <p className={`text-muted-2 ${state === "wait" ? "mb-n1" : "mb-3"}`}>
                {date}
              </p>
              {state === "wait" ? (<div className="py-4">
                    <CloseButton key={id} onClick={this.handleCancel(id)} />
                  </div>)
                  : (<div className="pt-2 d-flex justify-content-center align-items-start " style={{height: "53px"}}>
                    <p className="text-capitalize text-muted-2 mb-0" style={{color: setOrderStateColor(item.state)}}>
                      {status}
                    </p>
                  </div>)}
            </div>
        )
      }

      if(windowWidth < 769) {
        return [
          buySellSection(),
          detailsSection(),
          dateSection(id, state),
          // state === "wait" &&
          //   React.createElement(CloseButton, {
          //     key: id,
          //     onClick: this.handleCancel(id),
          //   }),
        ];
      }

      return [
        date,
        React.createElement(
            "span",
            { style: { color: setTradeColor(side).color }, key: id },
            orderType
        ),
        marketName,
        React.createElement(
            Decimal,
            { key: id, fixed: currentMarket.price_precision },
            actualPrice
        ),
        React.createElement(
            Decimal,
            { key: id, fixed: currentMarket.amount_precision },
            origin_volume
        ),
        React.createElement(
            Decimal,
            { key: id, fixed: currentMarket.amount_precision },
            executed_volume
        ),
        React.createElement(
            Decimal,
            { key: id, fixed: currentMarket.amount_precision },
            remaining_volume
        ),
        React.createElement(
            Decimal,
            { key: id, fixed: currentMarket.amount_precision },
            costRemaining.toString()
        ),
        status,
        state === "wait" &&
        React.createElement(CloseButton, {
          key: id,
          onClick: this.handleCancel(id),
        }),
      ];
    };
    this.getType = (side, orderType) => {
      if (!side || !orderType) {
        return "";
      }
      return this.props.intl.formatMessage({
        id: `page.body.openOrders.header.orderType.${side}.${orderType}`,
      });
    };
    this.setOrderStatus = (status) => {
      switch (status) {
        case "done":
          return React.createElement(
            "span",
            { className: "parent-history-elem-executed" },
            React.createElement(FormattedMessage, {
              id: `page.body.openOrders.content.status.done`,
            })
          );
        case "cancel":
          return React.createElement(
            "span",
            { className: "parent-history-elem-canceled" },
            React.createElement(FormattedMessage, {
              id: `page.body.openOrders.content.status.cancel`,
            })
          );
        case "wait":
          return React.createElement(
            "span",
            { className: "parent-history-elem-opened" },
            React.createElement(FormattedMessage, {
              id: `page.body.openOrders.content.status.wait`,
            })
          );
        default:
          return status;
      }
    };
    this.handleCancel = (id) => () => {
      const { cancelAllFetching, cancelFetching, type, list } = this.props;
      if (cancelAllFetching || cancelFetching) {
        return;
      }
      this.props.ordersHistoryCancelFetch({ id, type, list });
    };
  }
  componentDidMount() {
    const { type } = this.props;
    this.props.userOrdersHistoryFetch({ pageIndex: 0, type, limit: 25 });
  }
  render() {
    const { list, fetching } = this.props;
    const emptyMsg = this.props.intl.formatMessage({ id: "page.noDataToShow" });
    return React.createElement(
      "div",
      {
        className: `parent-history-elem ${
          list.length ? "open-order-table" : "parent-history-elem-empty"
        }`,
      },
      React.createElement(
        "div",
        {
          className: "clip-loader__container justify-content-center align-items-center w-100",
          style: { display: fetching ? "d-flex" : "none" },
        },
        fetching &&
          React.createElement(ClipLoader, {
            sizeUnit: "px",
            size: 35,
            loading: fetching,
            color: "var(--accent)",
          })
      ),
      list.length && !fetching ? this.renderContent() : null,
      !list.length && !fetching
        ? React.createElement(
            "p",
            { className: "parent-history-elem__empty" },
            emptyMsg
          )
        : null
    );
  }
}
const mapStateToProps = (state) => ({
  marketsData: selectMarkets(state),
  pageIndex: selectCurrentPageIndex(state),
  firstElemIndex: selectOrdersFirstElemIndex(state, 25),
  list: selectOrdersHistory(state),
  fetching: selectOrdersHistoryLoading(state),
  lastElemIndex: selectOrdersLastElemIndex(state, 25),
  nextPageExists: selectOrdersNextPageExists(state, 25),
  total: selectTotalOrdersHistory(state),
  cancelAllFetching: selectCancelAllFetching(state),
  cancelFetching: selectCancelFetching(state),
  windowWidth: selectWindowWidth(state),
});
const mapDispatchToProps = (dispatch) => ({
  ordersHistoryCancelFetch: (payload) =>
    dispatch(ordersHistoryCancelFetch(payload)),
  userOrdersHistoryFetch: (payload) =>
    dispatch(userOrdersHistoryFetch(payload)),
});
export const OrdersElement = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(OrdersComponent)
);
