import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { selectCurrentMarket, } from '../../../modules';
import { ArrowIcon, } from '../icons/ArrowIcon';
import { MarketsList, } from './MarketsList';
import { MarketsTabs, } from './MarketsTabs';
import {selectCurrentTheme} from "../../../modules/public/generic";
class MarketSelectorComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isOpen: false,
      searchFieldValue: '',
      marketsTabsSelectedValue: '',
    };
    this.handleOpenSelector = () => {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    };
    this.searchFieldChangeHandler = e => {
      this.setState({
        searchFieldValue: e.target.value,
      });
    };
    this.marketsTabsSelectHandler = value => {
      this.setState({
        marketsTabsSelectedValue: value,
      });
    };
    this.handleCloseSelector = () => {
      this.setState({
        isOpen: false,
      })
    }
  }
  render() {
    const { currentMarket, colorTheme, } = this.props;
    const { isOpen, searchFieldValue, marketsTabsSelectedValue, } = this.state;
    const iconClassName = classnames({
      'parent-trading-header-selector-icon-open-mobile': isOpen,
      'parent-trading-header-selector-icon-close': !isOpen,
    });
    const iconImgClassName = classnames({
      'parent-trading-header-selector-icon-img-open-mobile': isOpen,
      'parent-trading-header-selector-icon-img-close': !isOpen,
    });
    const listClassName = classnames({
      'parent-trading-header-selector-list-container-open': isOpen,
      'parent-trading-header-selector-list-container-close': !isOpen,
    });
    const searchSelectorClassName = classnames({
      'parent-trading-header-selector-search': isOpen,
      'parent-trading-header-selector-search-closed': !isOpen,
    });
    return (React.createElement("div", { className: "parent-trading-header-selector-container" },
        React.createElement("div", { className: "parent-trading-header-selector", onClick: this.handleOpenSelector },
            React.createElement("div", { className: "parent-trading-header-selector-market" }, currentMarket && currentMarket.name),
            React.createElement("div", { className: 'pl-0 ' + `${window.innerWidth < 768 ? iconClassName : 'parent-trading-header-selector-icon-open'}` },
                React.createElement("div", { className: `${window.innerWidth < 768 ? iconImgClassName : 'parent-trading-header-selector-icon-img-open'}` },
                    React.createElement(ArrowIcon, { color: isOpen ? (colorTheme && colorTheme === 'light' ? '#737F92' : '#FFFFFF') : '#737F92' })))
        ),
        React.createElement("div", { className: 'parent-trading-header-selector-list-container-open', style: {display: isOpen ? 'block' : 'none' } },
            React.createElement(MarketsTabs, { onSelect: this.marketsTabsSelectHandler }),
            React.createElement(MarketsList, { search: searchFieldValue, currencyQuote: marketsTabsSelectedValue, closeSelector: this.handleCloseSelector }),
            React.createElement("div", { className: 'parent-trading-header-selector-search-wrapper' },
                React.createElement("div", { className: 'parent-trading-header-selector-search' },
                    React.createElement("div", { className: "parent-trading-header-selector-search-icon" },
                        React.createElement("img", { src: require('../icons/search.svg') })),
                    React.createElement("input", { className: "parent-trading-header-selector-search-field", onChange: this.searchFieldChangeHandler, value: searchFieldValue }))))));
  }
}
const reduxProps = state => ({
  currentMarket: selectCurrentMarket(state),
  colorTheme: selectCurrentTheme(state),
});
export const MarketSelector = connect(reduxProps)(MarketSelectorComponent);

