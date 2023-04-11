import {Table as mobileTable} from '@components/components';
import classnames from 'classnames';
import * as React from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import {
    currenciesFetch,
    depthFetch,
    orderBookFetch,
    selectCurrentMarket,
    selectMarkets,
    selectMarketTickers, selectWindowWidth,
    setCurrentMarket,
    setCurrentPrice,
} from '../../../../modules';
import {selectCurrencies} from '../../../../modules/user/beneficiaries/selectors.js';
import {Decimal} from '../../../../component/molecules/Decimal/Decimal';
import {ArrowUpDown} from './ArrowUpDown';
import searchIcon from '../../../../assets/images/search.svg';
import {MarketCustomTable} from "../../../../components/MarketTable";

class MarketsListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.currencyPairSelectHandler = (key) => {
            const {markets, windowWidth} = this.props;
            const marketToSet = markets.find((el) => el.name === key);
            this.props.setCurrentPrice('');
            if (marketToSet) {
                this.props.setCurrentMarket(marketToSet);
                // if (window.innerWidth < 768) {
                //     this.props.closeSelector();
                // }
                this.props.depthFetch(marketToSet);
                this.props.orderBookFetch(marketToSet);
                windowWidth < 769 && this.props.history.push(`/trading/${marketToSet.id}`);
            }
            this.setState({selectedIndex: key});
        };

        this.getHeaders = () =>
            [
                {id: 'id', translationKey: 'market'},
                {id: 'last', translationKey: 'price'},
                {id: 'price_change_percent_num', translationKey: 'change'},
            ]
                .map((obj) => {
                    const {sortBy, reverseOrder} = this.state;
                    return {
                        ...obj,
                        selected: sortBy === obj.id,
                        reversed: sortBy === obj.id && reverseOrder,
                    };
                })
                .map((obj) => {
                    const {sortBy, reverseOrder} = this.state;
                    const classname = classnames({
                        'parent-markets-list-container__header-selected':
                        obj.selected,
                    });
                    const arrowClassname = classnames({
                        'parent-dropdown-markets-list-container__arrow-down': !(
                            obj.id === sortBy && !reverseOrder
                        ),
                        'parent-dropdown-markets-list-container__arrow-up':
                            obj.id === sortBy && !reverseOrder,
                    });
                    return React.createElement(
                        'span',
                        {
                            className: classname,
                            key: obj.id,
                            onClick: () => this.handleHeaderClick(obj.id),
                        },
                        this.props.intl.formatMessage({
                            id: `page.body.trade.header.markets.content.${obj.translationKey}`,
                        }),
                        classname === 'parent-markets-list-container__header-selected' && React.createElement('i', {className: arrowClassname})
                    )
                });

        this.handleHeaderClick = (key) => {
            const {sortBy, reverseOrder} = this.state;
            if (key !== sortBy) {
                this.setState({sortBy: key, reverseOrder: false});
            } else {
                this.setState({reverseOrder: !reverseOrder});
            }
        };
        this.state = {
            sortBy: 'id',
            reverseOrder: false,
            isHovering: false,
            searchFieldValue: '',
            isOpen: false,
            selectedIndex: 0,
        };
        this.handleMouseHover = () => {
            this.setState((prevState) => {
                return {
                    isHovering: !prevState.isHovering,
                };
            });
        };
        this.searchFieldChangeHandler = (e) => {
            this.setState({
                searchFieldValue: e.target.value,
            });
        };
    }

    componentDidMount() {
        const {currencies} = this.props;
        if (currencies.length === 0) {
            this.props.currenciesFetch();
        }
    }

    render() {
        const data = this.mapMarkets();
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                {className: 'parent-trading-header-selector-search-wrapper-2'},
                React.createElement(
                    'div',
                    {className: 'parent-trading-header-selector-search-2'},
                    React.createElement('img', {
                        src: searchIcon,
                        className: 'parent-trading-header-selector-search-img'
                    }),
                    React.createElement('input', {
                        className: 'parent-trading-header-selector-search-field-2',
                        onChange: this.searchFieldChangeHandler,
                        value: this.state.searchFieldValue,
                        placeHolder: this.props.intl.formatMessage({id: "page.markets.search.text"}),
                    })
                )
            ),

            React.createElement(
                'div',
                {className: 'market-list-filter-container'},
                this.getHeaders()
            ),

            React.createElement(
                'div',
                {className: 'market_list_table_container'},
                window.innerWidth > 768 ? <MarketCustomTable
                        data={data.length > 0 ? data : [[]]}
                        header={null}
                        onSelect={this.currencyPairSelectHandler}
                        selectedKey={this.props.currentMarket && this.props.currentMarket.name}
                        rowKeyIndex={0}
                        useRowKeyIndex={true}
                    />
                    : React.createElement(mobileTable, {
                        data: data.length > 0 ? data : [[]],
                        header: window.innerWidth < 768 ? this.getHeaders() : null,
                        onSelect: this.currencyPairSelectHandler,
                        selectedKey:
                            this.props.currentMarket && this.props.currentMarket.name,
                        rowKeyIndex: 0,
                    })
            )
        );
    }

    mapMarkets() {
        const {markets, marketTickers, search, currencyQuote} = this.props;
        const {searchFieldValue} = this.state;
        const defaultTicker = {
            last: 0,
            vol: 0,
            price_change_percent: '+0.00%',
        };
        const regExp = new RegExp(
            (searchFieldValue && searchFieldValue.toLowerCase()) ||
            (search && search.toLowerCase())
        );
        const arr = [];
        const marketsMapped = markets.map((market) => {
            return {
                ...market,
                last: (marketTickers[market.id] || defaultTicker).last,
                price_change_percent: (marketTickers[market.id] || defaultTicker)
                    .price_change_percent,
                price_change_percent_num: Number.parseFloat(
                    (marketTickers[market.id] || defaultTicker).price_change_percent
                ),
                vol: (marketTickers[market.id] || defaultTicker).vol,
            };
        });
        const {sortBy, reverseOrder} = this.state;
        if (sortBy !== 'id') {
            marketsMapped.sort((a, b) =>
                Number(a[sortBy]) > Number(b[sortBy])
                    ? 1
                    : Number(b[sortBy]) > Number(a[sortBy])
                    ? -1
                    : 0
            );
        }
        reverseOrder && marketsMapped.reverse();
        return marketsMapped
            .reduce((pV, cV) => {
                const [base, quote] = cV.name.toLowerCase().split('/');
                if (
                    regExp.test(cV.id.toLowerCase()) &&
                    (currencyQuote === '' ||
                        currencyQuote.toLowerCase() === quote ||
                        currencyQuote.toLowerCase() === base ||
                        currencyQuote.toLowerCase() === 'all')
                ) {
                    pV.push(cV);
                }
                return pV;
            }, arr)
            .map((market, index) => {
                const isPositive = /\+/.test(
                    (marketTickers[market.id] || defaultTicker).price_change_percent
                );
                const classname = classnames({
                    'parent-dropdown-markets-list-container__positive': isPositive,
                    'parent-dropdown-markets-list-container__negative': !isPositive,
                });
                const mobilePriceClassName = classnames({
                    'mobile-market-price__positive': isPositive,
                    'mobile-market-price__negative': !isPositive,
                });
                const {currencies} = this.props;
                const baseUnit = market && market.base_unit.toUpperCase();
                const currency =
                    baseUnit && currencies.find((v) => v.id === baseUnit.toLowerCase());
                let icon = currency && currency.icon_url;
                const name = currency && currency.name;

                if (!icon) {
                    try {
                        icon = require(`../../../../assets/images/coins/${baseUnit}.svg`);
                    } catch (e) {
                        icon = require('../../../../assets/images/coins/default.png');
                    }
                }
                return window.innerWidth > 768
                    ? [
                        market.name,
                        React.createElement(
                            'div',
                            {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                },
                                onClick: () => this.currencyPairSelectHandler(market.name),
                                key: index,
                            },

                            React.createElement(
                                'div',
                                {
                                    className: 'market-list-element',
                                },
                                <div className={'market-list-element-icon'}>
                                    <img src={icon} alt={'crypto-icon'}/>
                                </div>,
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'p',
                                        null,
                                        React.createElement(
                                            'strong',
                                            {
                                                className: 'market-list-element__base-unit'
                                            },
                                            market.base_unit.toUpperCase()
                                        ),
                                        React.createElement(
                                            'span',
                                            {
                                                className: 'market-list-element__quote-unit'
                                            },
                                            `/${market.quote_unit.toUpperCase()}`
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        {className: classname},
                                        <ArrowUpDown className={classname}/>,
                                        React.createElement(
                                            'span',
                                            null,
                                            market.price_change_percent
                                        )
                                    )
                                )
                            ),
                            // market.name,
                            // (React.createElement("span", { className: classname }, Decimal.format(Number(market.last), market.price_precision))),

                            React.createElement(
                                'p',
                                {className: 'market-list-element__last-price-wrapper'},
                                `${Decimal.format(
                                    Number(market.last),
                                    market.price_precision
                                )}`
                            )
                        ),
                    ]
                    : [
                        market.name,
                        <div className="d-flex py-3 mobile-markets-name__wrapper">
                            <div className="mobile-markets-icon__wrapper d-flex justify-content-center align-items-center pl-2">
                                <img src={icon} alt={`${market.name}-img`} style={{width: "30px"}}/>
                            </div>
                            <div className="d-flex flex-column pl-3 align-items-start">
                                <div className="pb-1 d-flex align-items-end">
                                    <span className="mobile-market-base-unit">
                                        {market.base_unit.toUpperCase()}
                                    </span>
                                    <span className="pl-1 mobile-market-quote-unit">
                                        {`/${market.quote_unit.toUpperCase()}`}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-muted-2 text-capitalize">
                                        {name}
                                    </span>
                                </div>
                            </div>
                        </div>,
                        <div className="d-flex flex-column justify-content-center align-items-end mobile-markets-price py-2">
                            <span className="pb-1">
                                {Decimal.format(Number(market.last), market.price_precision)}
                            </span>
                            {/*<p className="text-muted-2">*/}
                            {/*    {market.vol}*/}
                            {/*</p>*/}
                        </div>,
                        <div className={`${mobilePriceClassName}`}>
                            <span>
                                {market.price_change_percent}
                            </span>
                        </div>,
                    ];
            });
    }
}

MarketsListComponent.propTypes = {
    intl: intlShape.isRequired,
};
const mapStateToProps = (state) => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    marketTickers: selectMarketTickers(state),
    currencies: selectCurrencies(state),
    windowWidth: selectWindowWidth(state),
});
const mapDispatchToProps = {
    setCurrentMarket,
    depthFetch,
    orderBookFetch,
    setCurrentPrice,
    currenciesFetch,
};
export const MarketsList = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(MarketsListComponent)
);
