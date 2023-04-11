import * as React from "react";
import classnames from "classnames";
import {
  selectDepthAsks,
  selectDepthBids,
  selectDepthLoading,
} from "../../../modules/public/orderBook";
import {
  selectCurrentMarket,
  selectMarketTickers,
} from "../../../modules/public/markets";
import {
  selectCurrentPrice,
  setCurrentPrice,
} from "../../../modules/user/orders";
import { selectOpenOrdersList } from "../../../modules/user/openOrders";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

/**
 * App Table overrides default table
 */
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = (index) => () => {
      const { onSelect } = this.props;
      if (onSelect) {
        this.setState(
          {
            selectedRowIndex: index,
          },
          () => {
            if (onSelect) {
              onSelect(index);
            }
          }
        );
      }
    };
    this.state = {
      activeFilter: undefined,
      resultData: undefined,
      selectedRowIndex: 0,
    };
  }

  componentDidMount() {
    const { filters } = this.props;
    if (filters && filters.length > 0) {
      this.handleFilter(filters[0]);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data && this.props.filters) {
      const activeFilter = this.props.filters.find(
        (filter) => filter.name === this.state.activeFilter
      );
      if (activeFilter) {
        this.handleFilter(activeFilter);
      }
    }
  }
  render() {
    const { data, header, titleComponent, filters = [] } = this.props;
    this.ensureDataIsValid(data);
    const cn = classnames("base-table-header__content", {
      "base-table-header__content-empty":
        !titleComponent && filters.length === 0,
    });
    return React.createElement(
      "div",
      { className: "base-table-container" },
      React.createElement(
        "div",
        { className: cn },
        titleComponent ? this.renderTitleComponent() : null,
        filters.length
          ? React.createElement(
              "div",
              { className: "base-table__filters" },
              this.renderFilters()
            )
          : null
      ),
      React.createElement(
        "table",
        {
          className: "base-table " + this.props.className,
          style: { ...this.props.style },
        },
        header && header.length && this.renderHead(header),
        this.renderBody(data)
      ),
      this.renderBackground(data)
    );
  }
  renderTitleComponent() {
    const { titleComponent } = this.props;
    return React.createElement(
      "div",
      { className: "base-title-component" },
      titleComponent
    );
  }
  static renderRowCells(row) {
    return row && row.length
      ? row.map((c, index) => React.createElement("td", { key: index }, c))
      : [];
  }
  handleFilter(item) {
    const { data } = this.props;
    if (!item.filter) {
      this.setState({
        resultData: data,
      });
      return;
    }
    const resultData = [...data].filter(item.filter);
    this.setState({
      activeFilter: item.name,
      resultData: resultData,
    });
  }
  renderFilters() {
    const { filters = [] } = this.props;
    const { activeFilter } = this.state;
    const cn = (filterName) =>
      classnames("base-table__filter", {
        "base-table__filter--active": activeFilter === filterName,
      });
    return filters.map((item) => {
      const handleFilterClick = () => {
        this.handleFilter(item);
      };
      return React.createElement(
        "div",
        {
          className: cn(item.name),
          key: item.name,
          onClick: handleFilterClick,
        },
        item.name
      );
    });
  }
  renderHead(row) {
    const cells = row.map((c, index) =>
      React.createElement("th", { key: index }, c)
    );
    return React.createElement(
      "thead",
      { className: "base-table__head" },
      React.createElement("tr", { className: "base-table__head-row" }, cells)
    );
  }
  renderRowBackground(i) {
    const {
      rowBackground,
      rowBackgroundColor = "rgba(184, 233, 245, 0.7)",
    } = this.props;
    const rowBackgroundResult = rowBackground ? rowBackground(i) : {};
    const style = {
      ...rowBackgroundResult,
      backgroundColor: rowBackgroundColor,
    };
    return rowBackground
      ? React.createElement("span", {
          key: i,
          style: style,
          className: "base-table-background__row",
        })
      : null;
  }
  renderBackground(rows) {
    const { resultData } = this.state;
    const { rowBackground, side } = this.props;
    const dataToBeMapped = resultData || rows;
    const renderBackgroundRow = (r, i) => this.renderRowBackground(i);
    const className = classnames("base-table-background", {
      "base-table-background--left": side === "left",
      "base-table-background--right": side === "right",
    });
    return React.createElement(
      "div",
      { className: className },
      rowBackground && dataToBeMapped.map(renderBackgroundRow)
    );
  }
  renderBody(rows) {
    const { resultData, selectedRowIndex } = this.state;
        const rowClassName = (index) =>
      classnames({
        "base-table__row--selected": selectedRowIndex === index,
      });

    const dataToBeMapped = resultData || rows;
    const rowElements = dataToBeMapped.map((r, i) => {
      const rowClass = r[0];

      // const bgColor = rowClass === 'recent-trades-positive' ? 'var(--recent-trades-positive-bg-color)' : rowClass === 'recent-trades-negative' ? 'var(--recent-trades-negative-bg-color)' : '';

      const bgColor = (value) => {
        switch (value) {
            case "recent-trades-positive": return "var(--recent-trades-positive-bg-color)";
            case "recent-trades-negative": return "var(--recent-trades-negative-bg-color)";
            default: return "";
        }
      }

      return React.createElement(
        "tr",
        { className: `base-table__row ${rowClassName(i)}`, key: i, style: { backgroundColor: bgColor(rowClass) }, onClick: this.handleSelect(i) },
        Table.renderRowCells(r)
      )
    });
    return React.createElement(
      "tbody",
      { className: "base-table__body" },
      rowElements
    );
  }
  ensureDataIsValid(data) {
    const length = data[0].length;
    const len = data.length;
    for (let i = 0; i < len; i += 1) {
      if (data[i].length !== length) {
        throw Error("Array elements must have the same length");
      }
    }
  }
}

export { Table };
