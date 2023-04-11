import {TabPanel} from '@components/components';
import * as React from 'react';
import { OrderFormDesktop } from "../OrderFormDesktop";
import ReactDOM from "react-dom";
class OrderDesktop extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.orderSell = React.createRef();
        this.getPanels = () => {
            let panels;
            const {getExchangeOrderType, updatePriceLimit, availableBase, availableQuote, disabled, feeBuy, feeSell, priceMarketBuy, priceMarketSell, priceLimit, from, to, currentMarketAskPrecision, currentMarketBidPrecision, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitBuyButtonText, submitSellButtonText, labelFirst, labelSecond, orderTypes, asks, bids, handleDropdownItem} = this.props;
            panels = [
                {
                    content: (React.createElement(OrderFormDesktop, {
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
                        updatePriceLimit: updatePriceLimit,
                        handleDropdownItem: handleDropdownItem,
                    })),
                    label: labelFirst ? labelFirst : 'BUY',
                },
                {
                    content: (React.createElement(OrderFormDesktop, {
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
                        updatePriceLimit: updatePriceLimit,
                        handleDropdownItem: handleDropdownItem,
                    })),
                    label: labelSecond ? labelSecond : 'SELL',
                },
            ];
            return panels;
        };
        this.getPanelsBuy = () => {
            let panels;
            const {getExchangeOrderType, updatePriceLimit, availableQuote, disabled, feeBuy, priceMarketBuy, priceLimit, from, to, currentMarketAskPrecision, currentMarketBidPrecision, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitBuyButtonText, labelFirst, orderTypes, asks, handleDropdownItem} = this.props;
            panels = [
                {
                    content: (React.createElement(OrderFormDesktop, {
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
                        updatePriceLimit: updatePriceLimit,
                        handleDropdownItem: handleDropdownItem,
                    })),
                    label: labelFirst ? labelFirst : 'Buy',
                },
            ];
            return panels;
        };
        this.getPanelsSell = () => {
            let panels;
            const {getExchangeOrderType, updatePriceLimit, availableBase, feeSell, priceMarketSell, priceLimit, from, to, currentMarketAskPrecision, currentMarketBidPrecision, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitSellButtonText, labelSecond, orderTypes, bids, handleDropdownItem} = this.props;
            panels = [
                {
                    content: (React.createElement(OrderFormDesktop, {
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
                        updatePriceLimit: updatePriceLimit,
                        handleDropdownItem: handleDropdownItem,
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

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.width !== 0 && nextProps.width !== this.props.width ? true : false;
    // }

    render() {
        const { width } = this.props;
        if (width < 768 && width !== null) return (React.createElement("div", {className: "base-order", ref: "orderBuy",},
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
export { OrderDesktop, };

