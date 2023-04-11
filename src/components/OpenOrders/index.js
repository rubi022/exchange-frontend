import { CloseButton, Table } from "@components/components";
import classnames from "classnames";
import * as React from "react";
class OpenOrders extends React.Component {
  constructor() {
    super(...arguments);
    this.defaultHeaders = ["Date", "Action", "Price", "Amount", ""];
    this.defaultHeadersKeys = ["Date", "Action", "Price", "Amount", ""];
    this.renderCell = (rowIndex) => (cell, index, row) => {
      const { headersKeys = this.defaultHeadersKeys } = this.props;
      const actionIndex = headersKeys.findIndex(function (header) {
        return header === "Action";
      });
      const orderIndex = headersKeys.findIndex(function (header) {
        return header === "Order";
      });
      const buySellIndex = headersKeys.findIndex(function (header) {
        return header === "";
      });
      if (index === actionIndex) {
        return this.renderAction(row[actionIndex], row[buySellIndex]);
      } else if (index === orderIndex) {
        return this.renderOrder(row[buySellIndex]);
      } else if (index === buySellIndex) {
        return this.renderCancelButton(rowIndex);
      } else {
        return cell;
      }
    };
    this.renderRow = (row, index) => {
      let map;
      map = row.map(this.renderCell(index));
      return map;
    };
    this.renderCancelButton = (index) => {
      return React.createElement(CloseButton, {
        onClick: this.handleCancel(index),
      });
    };
    this.handleCancel = (index) => () => {
      this.props.onCancel(index);
    };
  }
  render() {
    const { headers = this.defaultHeaders } = this.props;
    const { headersKeys = this.defaultHeadersKeys } = this.props;
    const tableData = this.props.data.map(this.renderRow);
    const orderIndex = headersKeys.findIndex((header) => header === "Order");
    if (headersKeys[orderIndex] === "Order") {
      headers[orderIndex] = React.createElement(
        "span",
        { onClick: this.props.function },
        "Order"
      );
    }
    return React.createElement(
      "div",
      { className: "base-open-orders" },
      React.createElement(Table, { header: headers, data: tableData })
    );
  }
  renderAction(actionName, actionType) {
    const action = actionType ? actionType.toLowerCase() : actionType;
    const classNames = classnames("base-open-orders__price", {
      "base-open-orders__price--buy": action === "buy",
      "base-open-orders__price--sell": action === "sell",
    });
    return React.createElement("span", { className: classNames }, actionName);
  }
  renderOrder(orderType) {
    const type = orderType ? orderType.toLowerCase().slice(0, 3) : orderType;
    const classNames = classnames("base-open-orders__order", {
      "base-open-orders__order--buy": type === "buy",
      "base-open-orders__order--sell": type === "sel",
    });
    return React.createElement("span", { className: classNames }, orderType);
  }
}
export { OpenOrders };
