import * as React from "react";
import { WalletItem } from "../WalletItem";
import {Checkbox} from "@components/components";
import {estimateWalletValue} from "../../helpers/estimateValueBase";
import {primaryCurrency} from "../../api";
import {estimateValue} from "../../helpers/estimateValue";

export class Wallets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        wallets: [],
        search: '',
    }
    this.itemState = (i) => {
      return this.props.activeIndex === i;
    };
    this.makeWalletItem = (props, i) => {
        const { wallets } = this.state;
        const { marketTickers, markets, currencies } = this.props;
        const estimatedValue = props.currency ? estimateWalletValue(primaryCurrency(), currencies, props, markets, marketTickers) : '0.0';
        return (
            React.createElement(
                "li",
                {
                    key: i,
                    style: {
                        listStyleType: "none",
                        padding: "calc(var(--gap) * 0.5) calc(var(--gap))",
                    },
                    onClick: this.handleClick.bind(this, i, props),
                },
                React.createElement(
                    WalletItem,
                    Object.assign(
                        {
                            key: i,
                        },
                        {
                            ...props,
                            estimatedValue: estimatedValue,
                            active: this.itemState(i),
                            currency: props.currency.replace("-alt", ""),
                        }
                    )
                )
            )
        )
    }
    this.handleClick = (i, props) => {
      if (this.props.onWalletSelectionChange) {
        this.props.onWalletSelectionChange(props);
      }
      if (this.props.onActiveIndexChange) {
        this.props.onActiveIndexChange(i);
      }
    };
    this.handleSearch = (e) => {
      let text = e.target.value;
      if (text.length !== 0) {
          let result = this.props.walletItems.filter((element) => {
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
    this.toggleHideEmptyWallets = () => {
      this.props.toggleEmptyWallets();
    }
  }

    componentDidMount() {
        const { headers = this.defaultHeaders, walletItems = [] } = this.props;
        this.setState({ wallets: walletItems });
        document.getElementsByClassName('parent-layout')[0].classList.add('parent-wallet__mount-wrapper');
    }

    componentWillUnmount() {
        document.getElementsByClassName('parent-layout')[0].classList.remove('parent-wallet__mount-wrapper');
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
      const { wallets } = this.state;
    const { showEmptyWallets, hideWalletsLabel, marketTickers, markets, displayHideSwitch } = this.props;
    // const estimatedValue = cell.currency ? estimateWalletValue(currency ? currency : primaryCurrency(), currencies, cell, markets, marketTickers) : '0.0';
    return(
        React.createElement(
            React.Fragment,
            null,
            React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    { className: "parent-trading-header-selector-search-wrapper" },
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
            displayHideSwitch && React.createElement(
                "div",
                {
                    className: "mobile-hide-empty-wallets__wrapper mt-4",
                },
                React.createElement(
                    "div",
                    { className: "mobile-hide-empty-wallets-switch" },
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
            ),
            React.createElement(
                "ul",
                { className: "base-wallet-list" },
                wallets.map(this.makeWalletItem)
            )
        )
    )
  }
}
