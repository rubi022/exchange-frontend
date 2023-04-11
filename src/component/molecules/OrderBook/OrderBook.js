import * as React from "react";
import { Table } from "../Table/Table";
export const mapValues = (maxVolume, data) => {
  const resultData =
    data && maxVolume && data.length
      ? data.map((currentVolume) => {
          // tslint:disable-next-line:no-magic-numbers
          return { value: (currentVolume / maxVolume) * 100 };
        })
      : [];
  return resultData.sort((a, b) => a.value - b.value);
};
class OrderBook extends React.PureComponent {
  render() {
    const {
      data,
      maxVolume,
      orderBookEntry,
      side,
      headers,
      title,
      rowBackgroundColor,
    } = this.props;
    const resultData = mapValues(maxVolume, orderBookEntry);
    const getRowWidth = (index) => {
      if (resultData && resultData.length) {
        return {
          width: `${resultData[index].value}%`,
        };
      }
      return {
        display: "none",
      };
    };
    return React.createElement(
      "div",
      { className: "base-order-book mobile-order-book" },
      React.createElement(Table, {
        rowBackground: getRowWidth,
        data: data,
        side: side,
        header: headers,
        rowBackgroundColor: rowBackgroundColor,
        titleComponent: title,
      })
    );
  }
}
export { OrderBook };
