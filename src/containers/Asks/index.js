import { OrderBook } from '@components/components';
import classNames from 'classnames';
import * as React from 'react';
import { injectIntl, } from 'react-intl';
import { connect, } from 'react-redux';
import { accumulateVolume, calcMaxVolume, sortAsks } from '../../helpers';
import { selectCurrentMarket, selectCurrentPrice, selectDepthAsks, selectDepthBids, selectDepthLoading, setCurrentPrice, } from '../../modules';
import {Decimal} from "../../component/molecules/Decimal/Decimal";
import {ClipLoader} from "react-spinners";
export class OrderBookContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.orderBook = (bids, asks) => (React.createElement(OrderBook, { side: 'left', title: this.props.intl.formatMessage({ id: 'page.body.trade.header.asks' }), headers: this.renderHeaders(), data: this.renderOrderBook(asks, 'asks', this.props.intl.formatMessage({ id: 'page.noDataToShow' }), this.props.currentMarket), rowBackgroundColor: 'rgba(232, 94, 89, 0.4)', maxVolume: calcMaxVolume(bids, asks), orderBookEntry: accumulateVolume(asks), onSelect: this.handleOnSelect }));
        this.renderHeaders = () => {
            return [
                this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.price' }),
                this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.amount' }),
                this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.volume' }),
            ];
        };
        this.renderOrderBook = (array, side, message, currentMarket) => {
            const total = accumulateVolume(array);
            const priceFixed = currentMarket ? currentMarket.price_precision : 0;
            const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
            return (array.length > 0) ? array.map((item, i) => {
                const [price, volume] = item;
                return [
                    React.createElement("span", { style: { color: 'var(--open-orders-order-sell)' }, key: i },
                        React.createElement(Decimal, { fixed: priceFixed }, price)),
                    React.createElement(Decimal, { key: i, fixed: amountFixed }, volume),
                    React.createElement(Decimal, { key: i, fixed: amountFixed }, total[i]),
                ];
            }) : [[[''], message]];
        };
        this.handleOnSelect = (index) => {
            const { asks, currentPrice } = this.props;
            const priceToSet = asks[Number(index)] ? asks[Number(index)][0] : '';
            if (currentPrice !== priceToSet) {
                this.props.setCurrentPrice(priceToSet);
            }
        };
    }
    render() {
        const { asks, asksLoading, bids } = this.props;
        const cn = classNames('parent-asks', {
            'parent-asks--loading': asksLoading,
        });
        return (React.createElement("div", { className: cn }, asksLoading ? React.createElement(ClipLoader, {sizeUnit: "px", size: 35, loading: true, color: "var(--accent)"}) : this.orderBook(bids, sortAsks(asks))));
    }
}
const mapStateToProps = state => ({
    asks: selectDepthAsks(state),
    bids: selectDepthBids(state),
    asksLoading: selectDepthLoading(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
});
const mapDispatchToProps = dispatch => ({
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});
const Asks = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrderBookContainer));
export { Asks, };

