// import { Decimal, Markets } from '@components/components';
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { selectMarkets, } from '../../../../modules/public/markets';
import { sortMarketTabs } from "../../../../helpers";
export class MarketsTabsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 0,
            scrollLeft: 0,
            isHovered: false,
        };
        this.handleMouseHover = () => {
            this.setState(prevState => ({
                isHovered: !prevState.isHovered
            }))
        }
        this.fastSearchButtons = () => {
            const { markets } = this.props;
            let listOfQuote = ['ALL'];
            let newListOfQuote = [];
            let selectedFromList = '';
            if (markets.length > 0) {
                listOfQuote = markets.reduce(this.quoteCurrencies, listOfQuote);
                listOfQuote = sortMarketTabs(listOfQuote);
                newListOfQuote = listOfQuote;
            }
            if (window.innerWidth > 768) {
                newListOfQuote = listOfQuote.length > 4 ? listOfQuote.slice(0, 4) : listOfQuote.slice(0, 4);
                if (this.state.selectedItem > 2) {
                    selectedFromList = listOfQuote[this.state.selectedItem];
                    newListOfQuote[this.state.selectedItem] = selectedFromList
                }
            }
            return React.createElement(React.Fragment, {},
                React.createElement("div", {
                        className: "parent-trading-header-fast-search-container",
                        style: {'justify-content': listOfQuote.length > 4 ? 'space-around' : 'flex-start'},
                        onWheel: this.handleOnMouseWheel,
                        ref: this.tabsRef
                    }, newListOfQuote.map(this.renderFastSearchButton),
                    // window.innerWidth > 768 && listOfQuote.length > 4 ? React.createElement('div', {
                    //     className: 'parent-trading-header-fast-search-button more-button-market',
                    //     onMouseEnter: this.handleMouseHover,
                    //     onMouseLeave: this.handleMouseHover,
                    // }, 'MORE') : null
                ),
                window.innerWidth > 768 ? React.createElement('div', {
                        className:'parent-trading-header-fast-search-container__more-market-list',
                        style: {
                            visibility: this.state.isHovered ? 'visible' : 'hidden' ,
                            transition: 'visibility .9s,opacity .9s ease-in-out' ,
                            opacity: this.state.isHovered ? '1' : '0',
                        },
                        onMouseEnter: this.handleMouseHover,
                        onMouseLeave: this.handleMouseHover,
                    }, listOfQuote.length > 4 ? listOfQuote.slice(3).map(this.renderMoreMarketList) : listOfQuote.slice(4).map(this.renderMoreMarketList)
                ) : null);
        };
        this.renderMoreMarketList = (item, index) => {
            return React.createElement('div', {
                className: 'parent-trading-header-fast-search-container__more-market-list-element',
                key: index,
                onClick: () => this.handleSelectButton(index + 3),
            }, item)
        }
        this.renderFastSearchButton = (item, index) => {
            const classname = classnames('parent-trading-header-fast-search-button', {
                'parent-trading-header-fast-search-button-active': this.state.selectedItem === index,
            });
            return (
                React.createElement("div", { className: classname, key: index, onClick: () => this.handleSelectButton(index) },
                    React.createElement("span", {}, item)
                    ));
        };
        this.handleOnMouseWheel = (event) => {
            this.tabsRef.current.scrollLeft += event.deltaX;
        };
        this.handleSelectButton = (index) => {
            this.setState({
                selectedItem: index,
            }, () => {
                if (this.props.onSelect) {
                    const { markets } = this.props;
                    let listOfQuote = ['ALL'];
                    if (markets.length > 0) {
                        listOfQuote = markets.reduce(this.quoteCurrencies, listOfQuote);
                        listOfQuote = sortMarketTabs(listOfQuote);
                    }
                    this.props.onSelect(listOfQuote[this.state.selectedItem]);
                }
            });
        };
        this.quoteCurrencies = (pV, cV) => {
            const [base, quote] = cV.name.split('/');
            if (pV.indexOf(quote) === -1) {
                pV.push(quote);
            }
            if (pV.indexOf(base) === -1) {
                pV.push(base);
            }
            return pV;
        };
        this.tabsRef = React.createRef();
    }
    render() {
        return this.fastSearchButtons();
    }
}
const mapStateToProps = (state) => ({
    markets: selectMarkets(state),
});

export const MarketsTabs = connect(mapStateToProps, {})(MarketsTabsComponent);

