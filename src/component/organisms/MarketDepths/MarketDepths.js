import classnames from "classnames";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const CustomTooltip = (props) => {
  const defaultToolTipColors = {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    color: "grey",
    border: "1px solid #ccc",
  };
  const {
    active,
    payload,
    external,
    toolTipColors = defaultToolTipColors,
  } = props;
  const { backgroundColor, color, border } = toolTipColors;
  const renderPayload = () => {
    if (!payload || !payload[0]) {
      return "";
    }
    const { name, value } = payload[0];
    return React.createElement(
      "p",
      null,
      `${name} : `,
      React.createElement("em", null, value)
    );
  };
  if (active) {
    const style = {
      padding: 0,
      backgroundColor,
      border,
      color,
      fontSize: 13,
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    };
    const payloadData = payload && payload[0] ? payload[0].payload : null;
    const currData = payloadData
      ? external.find((entry) => entry.name === payloadData.name)
      : null;
    return React.createElement(
      "div",
      { className: "area-chart-tooltip", style: style },
      !currData ? renderPayload() : null,
      React.createElement("p", null, currData ? currData.name : null)
    );
  }
  return null;
};
/**
 * Component to display MarketDepths component.
 * It gives a visualization of demand or supply of a particular stock or commodity or a cryptocurrency.
 */
class MarketDepths extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.defaultSettings = {
      dataKeyX: "ask",
      dataKeyY: "bid",
      tooltip: true,
      height: 400,
    };
  }
  render() {
    const {
      className,
      data,
      colors,
      toolTipColors,
      settings = this.defaultSettings,
    } = this.props;
    const cx = classnames("base-market-depths", className);
    return React.createElement(
      "div",
      { className: cx },
      React.createElement(
        ResponsiveContainer,
        {
          width: "100%",
          height: settings.height,
          className: "responsive_container__chart",
        },
        React.createElement(
          AreaChart,
          { data: data, margin: { top: 0, right: 10, left: -30, bottom: 0 } },
          React.createElement(
            "defs",
            null,
            React.createElement(
              "linearGradient",
              { id: "bidChartColor", x1: "0", y1: "0", x2: "0", y2: "1" },
              React.createElement("stop", {
                offset: "5%",
                stopColor: colors.fillAreaBid,
                stopOpacity: 0.4,
              }),
              React.createElement("stop", {
                offset: "95%",
                stopColor: colors.fillAreaBid,
                stopOpacity: 0.4,
              })
            ),
            React.createElement(
              "linearGradient",
              { id: "askChartColor", x1: "0", y1: "0", x2: "0", y2: "1" },
              React.createElement("stop", {
                offset: "5%",
                stopColor: colors.fillAreaAsk,
                stopOpacity: 0.4,
              }),
              React.createElement("stop", {
                offset: "95%",
                stopColor: colors.fillAreaAsk,
                stopOpacity: 0.4,
              })
            ),
            React.createElement(
              "linearGradient",
              { id: "fillGrid", x1: "0", y1: "0", x2: "0", y2: "1" },
              React.createElement("stop", {
                offset: "5%",
                stopColor: colors.gridBackgroundStart,
                stopOpacity: 0,
              }),
              React.createElement("stop", {
                offset: "95%",
                stopColor: colors.gridBackgroundEnd,
                stopOpacity: 1,
              })
            )
          ),
          React.createElement(CartesianGrid, {
            stroke: colors.strokeGrid,
            strokeDasharray: "1 1",
            fill: "url(#fillGrid)",
          }),
          React.createElement(XAxis, {
            dataKey: settings.dataKeyX || "ask",
            stroke: colors.strokeAxis,
            tick: {
              fontSize: "12px",
            },
          }),
          React.createElement(YAxis, {
            dataKey: settings.dataKeyY || "bid",
            stroke: colors.strokeAxis,
            tick: {
              fontSize: "12px",
            },
          }),
          settings.tooltip
            ? React.createElement(Tooltip, {
                content: React.createElement(CustomTooltip, {
                  toolTipColors: toolTipColors,
                  external: data,
                }),
              })
            : null,
          React.createElement(Area, {
            type: "step",
            dataKey: "bid",
            stroke: colors.strokeAreaBid,
            fill: "url(#bidChartColor)",
          }),
          React.createElement(Area, {
            type: "step",
            dataKey: "ask",
            stroke: colors.strokeAreaAsk,
            fill: "url(#askChartColor)",
          })
        )
      )
    );
  }
}
export { MarketDepths };
