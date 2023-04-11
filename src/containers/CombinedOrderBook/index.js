import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import {
  selectDepthAsks,
  selectDepthBids,
} from "../../modules/public/orderBook";
import { OrderBook } from "../../component/molecules/OrderBook/OrderBook";

class OrderBooksComponent extends React.Component {
  constructor(props) {
    super(props);
    this.orderBookLarge = function () {
      const {
        dataAsks,
        dataBids,
        maxVolume,
        orderBookEntryAsks,
        orderBookEntryBids,
        headers,
        rowBackgroundColorAsks,
        rowBackgroundColorBids,
        onSelectAsks,
        onSelectBids,
        lastPrice,
      } = this.props;
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          {
            className: "base-combined-order-book__large",
          },
          React.createElement(OrderBook, {
            side: "right",
            headers: headers,
            data: dataAsks,
            rowBackgroundColor: rowBackgroundColorAsks,
            maxVolume: maxVolume,
            orderBookEntry: orderBookEntryAsks,
            onSelect: onSelectAsks,
          }),
          React.createElement(OrderBook, {
            side: "left",
            headers: headers,
            data: dataBids,
            rowBackgroundColor: rowBackgroundColorBids,
            maxVolume: maxVolume,
            orderBookEntry: orderBookEntryBids,
            onSelect: onSelectBids,
          })
        ),
        React.createElement(
          "div",
          {
            className:
              "base-combined-order-book__market base-combined-order-book__large-market",
          },
          lastPrice
        )
      );
    };
    this.orderBookSmall = function () {
      const {
        dataAsks,
        dataBids,
        maxVolume,
        orderBookEntryAsks,
        orderBookEntryBids,
        headers,
        rowBackgroundColorAsks,
        rowBackgroundColorBids,
        onSelectAsks,
        onSelectBids,
        lastPrice,
      } = this.props;
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          {
            className: "base-combined-order-book__small",
          },
          React.createElement(OrderBook, {
            side: "left",
            headers: headers,
            data: dataAsks,
            rowBackgroundColor: rowBackgroundColorAsks,
            maxVolume: maxVolume,
            orderBookEntry: orderBookEntryAsks.reverse(),
            onSelect: onSelectAsks,
          }),
          React.createElement(
            "div",
            {
              className: "base-combined-order-book__market",
            },
            lastPrice
          ),
          React.createElement(OrderBook, {
            side: "left",
            data: dataBids,
            rowBackgroundColor: rowBackgroundColorBids,
            maxVolume: maxVolume,
            orderBookEntry: orderBookEntryBids,
            onSelect: onSelectBids,
          })
        )
      );
    };
  }

  render() {
    return React.createElement(
      "div",
      { className: "base-combined-order-book" },
      this.props.isLarge ? this.orderBookLarge() : this.orderBookSmall()
    );
  }
}
const mapStateToProps = (state) => ({
  bids: selectDepthBids(state),
  asks: selectDepthAsks(state),
});

export const CombinedOrderBooksComponent = injectIntl(
  connect(mapStateToProps, null)(OrderBooksComponent)
);
