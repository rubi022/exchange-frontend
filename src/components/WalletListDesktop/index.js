import * as React from "react";
import { WalletItem } from "../WalletItem";
import { Table } from "../../component/molecules/Table/Table";
import classnames from "classnames";
import { ModalWithdraw } from "../../containers/ModalWithdraw";
import { CryptoIcon } from "@components/components";
import { FormattedMessage } from "react-intl";
import { ClipLoader } from "react-spinners";
const removeAlt = (str) => str.replace("-alt", "");
const style = {
  listStyleType: "none",
  padding: "calc(var(--gap) * 0.5) calc(var(--gap))",
};
/**
 * Component to display list of user wallets. It is scrollable and reacts on WalletItem click.
 */
export class WalletListDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      withdrawModel: false,
      wallets: [],
      search: "",
    };
    this.handleSearch = (e) => {
      let text = e.target.value;
      if (text.length !== 0) {
        let result = this.state.wallets.filter((element) => {
          return (
            element.currency.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
            element.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
          );
        });
        if (result) {
          this.setState({ wallets: result, search: text });
        }
      } else {
        this.setState({ wallets: this.props.walletItems, search: "" });
      }
    };
    this.defaultHeaders = ["Coin", "Name", "Available", "Locked", "Action"];
    this.itemState = (i) => {
      return this.props.activeIndex === i;
    };
    this.makeWalletItem = (props, i) =>
      React.createElement(
        "li",
        {
          key: i,
          style: style,
          onClick: this.handleClick.bind(this, i, props),
        },
        React.createElement(
          WalletItem,
          Object.assign(
            { key: i },
            {
              ...props,
              active: this.itemState(i),
              currency: removeAlt(props.currency),
            }
          )
        )
      );
    this.handleClick = (i, props, action) => {
      if (this.props.onWalletSelectionChange) {
        this.props.onWalletSelectionChange(props);
      }
      if (this.props.onActiveIndexChange) {
        this.props.onActiveIndexChange(i);
      }
      if (action === "deposit") {
        this.props.toggleDeposit();
      }
      if (action === "withdraw") {
        this.props.toggleWithdraw();
      }
    };

    this.toggleSubmitModal = () => {
      this.props.depositModal = false;
    };

    this.mapRows = (cell, index) => {
      let dollarConversionRatio = this.props.marketTickers[
        cell.currency ? cell.currency.toLowerCase() + "usd" : 0
      ];
      dollarConversionRatio = dollarConversionRatio
        ? dollarConversionRatio.last
        : "";
      return this.mapCell(cell, index, dollarConversionRatio);
    };
    this.mapCell = (cell, index, dollarConversionRatio) => {
      let iconUrl = cell.iconUrl;
      if (!iconUrl) {
        try {
          if (cell.currency == "QUBIT") {
            iconUrl = require("../WalletItem/Icon/QUBIT.png");
          } else {
            iconUrl = require(`../WalletItem/Icon/${cell.currency}.svg`);
          }
        } catch (e) {
          iconUrl = require(`../WalletItem/Icon/default.png`);
        }
      }

      const currencyName = value => {
          if (typeof value !== 'string') return '';
          return value.charAt(0).toUpperCase() + value.slice(1);
      }

      return [
        React.createElement(
          React.Fragment,
          null,
          React.createElement("img", {
            className: "base-wallet-item__icon",
            src: iconUrl,
            currency: cell.currency,
          }),
          React.createElement("b", { className: "font-boldes" }, cell.currency)
        ),
          currencyName(cell.name),
          React.createElement('b', {className: 'font-boldes'},
              cell.balance +
              ` ${
                  dollarConversionRatio && dollarConversionRatio !== "0.0"
                      ? "(" +
                      Number(cell.balance * dollarConversionRatio).toFixed(
                          this.props.usdPrecision || 4
                      ) +
                      " USD)"
                      : ""
              }`
          ),
        cell.locked,
        this.renderAction(cell, index),
      ];
    };

      this.toggleHideEmptyWallets = () => {
          this.props.toggleEmptyWallets();
      }
  }

  componentDidMount() {
    const { headers = this.defaultHeaders, walletItems = [] } = this.props;
    this.setState({ wallets: walletItems });
  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    const { walletItems = [] } = nextProps;
    if (
      walletItems.length !== this.state.wallets.length &&
      this.state.search === ""
    ) {
      this.setState({ wallets: walletItems });
    }
  }

  render() {
    const {
      headers = this.defaultHeaders,
      walletItems = [],
      walletsLoading,
      showEmptyWallets,
      hideWalletsLabel,
      noWalletsLabel
    } = this.props;
      let data = [["", "", noWalletsLabel, "", ""]];
      const { wallets } = this.state;
    const tableData =
      wallets.length !== 0 ? wallets.map(this.mapRows) : data;
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        "div",
        {
          className: "base-table-header__content wallet-header-color-light",
        }
        // React.createElement(
        //   "div",
        //   { className: "base-title-component" },
        //   React.createElement(FormattedMessage, {
        //     id: "page.header.navbar.wallets",
        //   })
        // )
      ),
        React.createElement(
            React.Fragment,
            null,
            React.createElement(
                "div",
                { className: "parent-trading-header-selector-search-wrapper" },
                React.createElement(
                    "div",
                    { className: "mobile-hide-empty-wallets-switch desktop-hide-wallets" },
                    // React.createElement(Checkbox, {
                    //     checked: showEmptyWallets,
                    //     className: "parent-profile-page__switch",
                    //     onChange: () => this.toggleHideEmptyWallets(),
                    //     label: "",
                    //     slider: true,
                    // }),
                    React.createElement("label", {className: "switch-wallets mb-0"},
                        React.createElement("input", {
                            type: "checkbox",
                            onChange: () => this.toggleHideEmptyWallets(),
                            checked: showEmptyWallets
                        }),
                        React.createElement("span", {
                            className: "slider-wallets round",
                        }),
                    ),
                    React.createElement("span", {
                            className: "mobile-empty-wallets-switch-label",
                        },
                        hideWalletsLabel
                    )
                ),
                React.createElement(
                    "div",
                    {
                        className: "search",
                        style: {
                            // boxShadow: "0 2px 6px -1px rgba(0,0,0,.2)",
                            borderRadius: "5px",
                            background: "#efefef",
                        },
                    },
                    React.createElement(
                        "div",
                        { className: "parent-trading-header-selector-search-icon" },
                        React.createElement("img", {
                            src: require("../../assets/images/search.svg"),
                        })
                    ),
                    React.createElement("input", {
                        className: "parent-trading-header-selector-search-field",
                        onChange: this.handleSearch,
                        value: this.state.search,
                        placeholder: "Search",
                        style: {
                            background: "#efefef",
                            color: "black",
                        },
                    })
                )
            )
        ),
      !walletsLoading &&
        React.createElement(Table, {
          data: tableData,
          header: headers,
          className: "wallet-desktop",
        }),
    );
  }
  renderAction(cell, index) {
    return React.createElement(
      "div",
      {
        style: {
          display: "flex",
        },
      },
      React.createElement(
        "button",
        {
          className: "btn-linear",
          style: {
            padding: 0,
            minWidth: "80px",
            marginRight: "10px",
            color: "rgba(0, 0, 0, 0.87)",
          },
          onClick: this.handleClick.bind(this, index, cell, "deposit"),
        },
        this.props.depositActionTitle
      ),
      React.createElement(
        "button",
        {
          className: "btn-linear",
          style: {
            padding: 0,
            minWidth: "80px",
            color: "rgba(0, 0, 0, 0.87)",
          },
          onClick: this.handleClick.bind(this, index, cell, "withdraw"),
        },
        this.props.withdrawActionTitle
      )
    );
  }
}
