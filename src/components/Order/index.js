import {TabPanel} from '@components/components';
import * as React from 'react';
import {OrderForm} from '../';
import ReactDOM from "react-dom";
class Order extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.orderSell = React.createRef();
        this.getPanels = () => {
            let panels;
            const {getExchangeOrderType, updatePriceLimit, availableBase, availableQuote, disabled, feeBuy, feeSell, priceMarketBuy, priceMarketSell, priceLimit, from, to, currentMarketAskPrecision, currentMarketBidPrecision, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitBuyButtonText, submitSellButtonText, labelFirst, labelSecond, orderTypes, asks, bids,} = this.props;
            panels = [
                {
                    content: (React.createElement(OrderForm, {
                        proposals: asks,
                        disabled: disabled,
                        fee: feeBuy,
                        type: "buy",
                        from: from,
                        to: to,
                        available: availableQuote,
                        priceMarket: priceMarketBuy,
                        priceLimit: priceLimit,
                        onSubmit: this.props.onSubmit,
                        getExchangeOrderType: getExchangeOrderType,
                        orderTypes: orderTypes ? orderTypes : [
                            'Limit',
                            'Market',
                        ],
                        currentMarketAskPrecision: currentMarketAskPrecision,
                        currentMarketBidPrecision: currentMarketBidPrecision,
                        orderTypeText: orderTypeText,
                        priceText: priceText,
                        amountText: amountText,
                        totalText: totalText,
                        availableText: availableText,
                        estimatedFeeText: estimatedFeeText,
                        submitButtonText: submitBuyButtonText,
                        updatePriceLimit: updatePriceLimit
                    })),
                    label: labelFirst ? labelFirst : 'BUY',
                },
                {
                    content: (React.createElement(OrderForm, {
                        ref: "orderSell",
                        proposals: bids,
                        fee: feeSell,
                        type: "sell",
                        from: from,
                        to: to,
                        available: availableBase,
                        priceMarket: priceMarketSell,
                        priceLimit: priceLimit,
                        onSubmit: this.props.onSubmit,
                        getExchangeOrderType: getExchangeOrderType,
                        orderTypes: orderTypes ? orderTypes : [
                            'Limit',
                            'Market',
                        ],
                        currentMarketAskPrecision: currentMarketAskPrecision,
                        currentMarketBidPrecision: currentMarketBidPrecision,
                        orderTypeText: orderTypeText,
                        priceText: priceText,
                        amountText: amountText,
                        totalText: totalText,
                        availableText: availableText,
                        estimatedFeeText: estimatedFeeText,
                        submitButtonText: submitSellButtonText,
                        updatePriceLimit: updatePriceLimit
                    })),
                    label: labelSecond ? labelSecond : 'SELL',
                },
            ];
            return panels;
        };
        this.getPanelsBuy = () => {
            let panels;
            const {getExchangeOrderType, updatePriceLimit, availableQuote, disabled, feeBuy, priceMarketBuy, priceLimit, from, to, currentMarketAskPrecision, currentMarketBidPrecision, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitBuyButtonText, labelFirst, orderTypes, asks,} = this.props;
            panels = [
                {
                    content: (React.createElement(OrderForm, {
                        proposals: asks,
                        disabled: disabled,
                        fee: feeBuy,
                        type: "buy",
                        from: from,
                        to: to,
                        available: availableQuote,
                        priceMarket: priceMarketBuy,
                        priceLimit: priceLimit,
                        getExchangeOrderType: getExchangeOrderType,
                        onSubmit: this.props.onSubmit,
                        orderTypes: orderTypes ? orderTypes : [
                            'Limit',
                            'Market',
                        ],
                        currentMarketAskPrecision: currentMarketAskPrecision,
                        currentMarketBidPrecision: currentMarketBidPrecision,
                        orderTypeText: orderTypeText,
                        priceText: priceText,
                        amountText: amountText,
                        totalText: totalText,
                        availableText: availableText,
                        estimatedFeeText: estimatedFeeText,
                        submitButtonText: submitBuyButtonText,
                        updatePriceLimit: updatePriceLimit
                    })),
                    label: labelFirst ? labelFirst : 'Buy',
                },
            ];
            return panels;
        };
        this.getPanelsSell = () => {
            let panels;
            const {getExchangeOrderType, updatePriceLimit, availableBase, feeSell, priceMarketSell, priceLimit, from, to, currentMarketAskPrecision, currentMarketBidPrecision, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitSellButtonText, labelSecond, orderTypes, bids,} = this.props;
            panels = [
                {
                    content: (React.createElement(OrderForm, {
                        proposals: bids,
                        fee: feeSell,
                        type: "sell",
                        from: from,
                        to: to,
                        available: availableBase,
                        priceMarket: priceMarketSell,
                        priceLimit: priceLimit,
                        onSubmit: this.props.onSubmit,
                        getExchangeOrderType: getExchangeOrderType,
                        orderTypes: orderTypes ? orderTypes : [
                            'Limit',
                            'Market',
                        ],
                        currentMarketAskPrecision: currentMarketAskPrecision,
                        currentMarketBidPrecision: currentMarketBidPrecision,
                        orderTypeText: orderTypeText,
                        priceText: priceText,
                        amountText: amountText,
                        totalText: totalText,
                        availableText: availableText,
                        estimatedFeeText: estimatedFeeText,
                        submitButtonText: submitSellButtonText,
                        updatePriceLimit: updatePriceLimit
                    })),
                    label: labelSecond ? labelSecond : 'Sell',
                },
            ];
            return panels;
        };
        this.handleChangeTab = (index, label) => {
            if (this.props.handleSendType) {
                if (label) {
                    this.props.handleSendType(index, label);
                }
            }
        };
    }
    componentDidMount() {
        if(this.refs.orderBuy){
            let dom = ReactDOM.findDOMNode(this.refs.orderBuy);
            setTimeout(function () {
                let tab__active = dom.getElementsByClassName("base-tab__active");
                let length = tab__active.length;
                if(length === 2) {
                    tab__active[1].className = "base-tab";
                    tab__active[0].className = "base-tab";
                }
            }, 1000);
        }
    }

    render() {
        const { width = 635, } = this.props;
        if (width < 449) return (React.createElement("div", {className: "base-order", ref: "orderBuy",},
            React.createElement(TabPanel, {
                fixed: true,
                panels: this.getPanels(),
                onTabChange: this.handleChangeTab,
                tabIndex: this.props.tabIndex
            })));
        return (React.createElement("div", { className: "base-order base-order--extended" },
            React.createElement("div", { className: "base-order--extended__buy" },
                React.createElement(TabPanel, { fixed: true, panels: this.getPanelsBuy(), onTabChange: this.handleChangeTab, tabIndex: this.props.tabIndex })),
            React.createElement("div", { className: "base-order--extended__sell" },
                React.createElement(TabPanel, { fixed: true, panels: this.getPanelsSell(), onTabChange: this.handleChangeTab, tabIndex: this.props.tabIndex }))));
    }
}
export { Order, };

