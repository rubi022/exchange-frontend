import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { selectCurrentMarket, } from '../../modules';
import { ArrowIcon, } from './icons/ArrowIcon';
import { MarketsList, } from './MarketsList';
import { MarketsTabs, } from './MarketsTabs';
import {withRouter} from "react-router-dom";
class MarketsContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: true,
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
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.props.currentMarket) {
            if(this.props.currentMarket !== nextProps.currentMarket){
                this.props.history.replace(`/trading/${this.props.currentMarket.id}`);
            }
        }
    }
    render() {
        const { currentMarket, } = this.props;
        const { isOpen, searchFieldValue, marketsTabsSelectedValue, } = this.state;
        const iconClassName = classnames({
            'parent-trading-header-selector-icon-open': isOpen,
            'parent-trading-header-selector-icon-close': !isOpen,
        });
        const iconImgClassName = classnames({
            'parent-trading-header-selector-icon-img-open': isOpen,
            'parent-trading-header-selector-icon-img-close': !isOpen,
        });
        const listClassName = classnames({
            'parent-trading-header-selector-list-container-open1': isOpen,
            'parent-trading-header-selector-list-container-close': !isOpen,
        });
        const searchSelectorClassName = classnames({
            'search': isOpen,
            'parent-trading-header-selector-search-closed': !isOpen,
        });
        return (React.createElement("div", { className: "parent-trading-header-selector-container" },
            React.createElement("div", { className: listClassName },
                React.createElement(MarketsTabs, { onSelect: this.marketsTabsSelectHandler }),
                React.createElement(MarketsList, { search: searchFieldValue, currencyQuote: marketsTabsSelectedValue }),
                React.createElement("div", { className: 'parent-trading-header-selector-search-wrapper' },
                    React.createElement("div", { className: searchSelectorClassName },
                        React.createElement("div", { className: "parent-trading-header-selector-search-icon" },
                            React.createElement("img", { src: require('./icons/search.svg') })),
                        React.createElement("input", { className: "parent-trading-header-selector-search-field", onChange: this.searchFieldChangeHandler, value: searchFieldValue, placeholder: "Search" }))))));
    }
}
const reduxProps = state => ({
    currentMarket: selectCurrentMarket(state),
});
export const MarketsComponent = withRouter(connect(reduxProps)(MarketsContainer));

