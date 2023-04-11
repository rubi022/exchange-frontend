import {Button, CryptoIcon, Dropdown, OrderInput, PercentageButton} from '@components/components';
import classnames from 'classnames';
import * as React from 'react';
import {getAmount, getTotalPrice} from '../../helpers/getTotalPrice';
import {Decimal} from "../../component/molecules/Decimal/Decimal";

/*==========This was used for Mobile Version specifically. Now its not used anywhere.===========*/

const handleSetValue = (value, defaultValue) => (value || defaultValue);
const positiveInput = (text) => {
    let output = text
        .replace(',', '.')
        .replace(/-+/, '')
        .replace(/^0+/, '0')
        .replace(/\.+/, '.')
        .replace(/^0+([1-9])/, '$1');
    if (output[0] === '.') {
        output = `0${output}`;
    }
    return output;
};
const isDisabled = (safeAmount, safePrice, price, props, state) => {
    const invalidAmount = safeAmount <= 0;
    const invalidLimitPrice = Number(price) <= 0 && state.orderType === 'Limit';
    const invalidMarketPrice = safePrice <= 0 && state.orderType === 'Market';
    return props.disabled || !props.available || invalidAmount || invalidLimitPrice || invalidMarketPrice;
};
class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleOrderTypeChange = (index) => {
            const { getExchangeOrderType } = this.props;
            const {  priceMarket, currentMarketBidPrecision } = this.state;
            this.setState({
                orderType: getExchangeOrderType(index),
            });
            getExchangeOrderType(index) === 'Market' ? this.setState({
                price: handleSetValue(Decimal.format( priceMarket, currentMarketBidPrecision), '0')
            }) : null;
        };
        this.handleFieldFocus = (field) => {
            if (field === this.props.priceText) {
                this.setState(prev => ({
                    priceFocused: !prev.priceFocused,
                }));
            } else if (field === this.props.amountText) {
                this.setState(prev => ({
                    amountFocused: !prev.amountFocused,
                }));
            } else {
            }
        };
        this.handlePriceChange = (value, formatter = false) => {
            const convertedValue = positiveInput(String(value));

            if(formatter) return this.setState({
                price: Decimal.format(convertedValue, this.state.currentMarketBidPrecision),
            });

            const condition = new RegExp(`^(?:[\\d-]*\\.?[\\d-]{0,${this.state.currentMarketBidPrecision}}|[\\d-]*\\.[\\d-])$`);
            if (convertedValue.match(condition)) {
                this.setState({
                    price: convertedValue,
                });
            }

        };
        this.handleAmountChange = (value, formatter = false) => {
            const convertedValue = positiveInput(String(value));
            if(formatter) return this.setState({
                amount: Decimal.format(convertedValue, this.state.currentMarketAskPrecision),
            });
            const condition = new RegExp(`^(?:[\\d-]*\\.?[\\d-]{0,${this.state.currentMarketAskPrecision}}|[\\d-]*\\.[\\d-])$`);
            if (convertedValue.match(condition)) {
                this.setState({
                    amount: convertedValue,
                });
            }
        };
        this.handleChangeAmountByButton = (value, type) => {
            if (type === 'buy') {
                if (this.state.orderType === 'Limit') {
                    this.setState({
                        amount: this.props.available && +this.state.price ? (Decimal.format(this.props.available / +this.state.price * value, this.state.currentMarketAskPrecision)) : '',
                    });
                } else if (this.state.orderType === 'Market') {
                    this.setState({
                            amount: this.props.available ? (Decimal.format(getAmount(Number(this.props.available), this.props.proposals, value), this.state.currentMarketAskPrecision)) : '',
                    });
                } else {
                }
            } else if (type === 'sell') {
                this.setState({
                    amount: this.props.available ? (Decimal.format(this.props.available * value, this.state.currentMarketAskPrecision)) : '',
                });
            } else {
            }
        };
        this.handleSubmit = () => {
            const { type } = this.props;
            const { amount, price, priceMarket, orderType } = this.state;
            const order = {
                type,
                orderType,
                amount,
                price: orderType === 'Market' ? priceMarket : price,
            };
            this.props.onSubmit(order);
            this.setState({
                amount: '',
                price: '',
            });
        };
        this.mapAmountClickToAmountInput = (available, precision) => {
            if (this.state.price) {
                this.setState({amount: (available / this.state.price).toFixed(precision)});
            } else {
                this.setState({amount: available !== '' ? Number(available).toFixed(precision) : Number(this.state.amount).toFixed(precision), price: 1});
            }
        };
        this.state = {
            orderType: 'Limit',
            amount: '',
            price: '',
            priceMarket: this.props.priceMarket,
            currentMarketAskPrecision: this.props.currentMarketAskPrecision || 6,
            currentMarketBidPrecision: this.props.currentMarketBidPrecision || 6,
            priceFocused: false,
            amountFocused: false,
        };
    }
    componentWillReceiveProps(next) {
        const nextPriceLimitTruncated = Decimal.format(next.priceLimit, this.state.currentMarketBidPrecision);
        if (this.state.orderType === 'Limit' && next.priceLimit && nextPriceLimitTruncated !== this.state.price) {
            this.setState({
                price: nextPriceLimitTruncated,
            });
            this.props.updatePriceLimit(0)
        }
        this.setState({
            priceMarket: next.priceMarket,
            currentMarketAskPrecision: next.currentMarketAskPrecision,
            currentMarketBidPrecision: next.currentMarketBidPrecision,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.currentMarketBidPrecision !== this.props.currentMarketBidPrecision){
            this.setState({
                price: '',
            })
        }
        if(prevProps.currentMarketBidPrecision !== this.props.currentMarketBidPrecision){
            this.setState({
                amount: '',
            })
        }
    }

    render() {
        const { type, fee, orderTypes, className, from, to, available, orderTypeText, priceText, amountText, totalText, availableText, estimatedFeeText, submitButtonText, proposals, } = this.props;
        const { orderType, amount, price, priceMarket, currentMarketAskPrecision, currentMarketBidPrecision, priceFocused, amountFocused, } = this.state;
        const total =
            // orderType === 'Market'
            // ? getTotalPrice(amount, proposals) :
                (Number(amount) || 0) * (Number(price) || 0);
        const totalPrecision = currentMarketBidPrecision + currentMarketAskPrecision;
        return (React.createElement("div", { className: classnames('base-order-form', className) },
            React.createElement("div", { className: "base-order-item" },
                orderTypeText ? React.createElement("div", { className: "base-order-item__dropdown__label" }, orderTypeText) : null,
                React.createElement(Dropdown, { list: orderTypes, onSelect: this.handleOrderTypeChange })),
            orderType === 'Limit' ? (React.createElement("div", { className: "base-order-item" },
                React.createElement(OrderInput, { currency: from, label: priceText, placeholder: priceText, value: handleSetValue(price, ''), isFocused: priceFocused, handleChangeValue: this.handlePriceChange, handleFocusInput: () => this.handleFieldFocus(priceText) }))) : (React.createElement("div", { className: "base-order-item" },
                React.createElement("div", { className: "base-order-input" },
                    React.createElement("fieldset", { className: "base-order-input__fieldset" },
                        React.createElement("legend", { className: 'base-order-input__fieldset__label' }, handleSetValue(priceText, '')),
                        React.createElement("div", { className: "base-order-input__fieldset__input" },
                            "\u2248",
                            // React.createElement("span", { className: "base-order-input__fieldset__input__price" }, handleSetValue(Decimal.format(getTotalPrice(amount, proposals) / Number(amount) || priceMarket, currentMarketBidPrecision), '0')))),
                            React.createElement("span", { className: "base-order-input__fieldset__input__price" }, handleSetValue(Decimal.format( priceMarket, currentMarketBidPrecision), '0')))),
                    React.createElement("div", { className: "base-order-input__crypto-icon" },
                        React.createElement(CryptoIcon, { code: `${from.toUpperCase()}-alt` }, from.toUpperCase()))))),
            React.createElement("div", { className: "base-order-item" },
                React.createElement(OrderInput, { currency: to, label: amountText, placeholder: amountText, value: handleSetValue(amount, ''), isFocused: amountFocused, handleChangeValue: this.handleAmountChange, handleFocusInput: () => this.handleFieldFocus(amountText) })),
            React.createElement("div", { className: "base-order-item" },
                React.createElement("div", { className: "base-order-item__percentage-buttons" },
                    React.createElement(PercentageButton, { label: `${[0.25, 0.5, 0.75, 1][0] * 100}%`, onClick: () => this.handleChangeAmountByButton([0.25, 0.5, 0.75, 1][0], type) }),
                    React.createElement(PercentageButton, { label: `${[0.25, 0.5, 0.75, 1][1] * 100}%`, onClick: () => this.handleChangeAmountByButton([0.25, 0.5, 0.75, 1][1], type) }),
                    React.createElement(PercentageButton, { label: `${[0.25, 0.5, 0.75, 1][2] * 100}%`, onClick: () => this.handleChangeAmountByButton([0.25, 0.5, 0.75, 1][2], type) }),
                    React.createElement(PercentageButton, { label: `${[0.25, 0.5, 0.75, 1][3] * 100}%`, onClick: () => this.handleChangeAmountByButton([0.25, 0.5, 0.75, 1][3], type) }))),
            React.createElement("div", { className: "base-order-item" },
                React.createElement("div", { className: "base-order-item__available" },
                    React.createElement("label", { className: "base-order-item__available__label" }, handleSetValue(availableText, 'Available')),
                    React.createElement("div", { className: "base-order-item__available__content" },
                        React.createElement("span", { className: "base-order-item__available__content__amount", onClick: () => {this.mapAmountClickToAmountInput(available ? Decimal.format(available, totalPrecision) : '', currentMarketAskPrecision)}, style:{cursor: 'pointer'} }, available ? Decimal.format(available, totalPrecision) : ''),
                        React.createElement("span", { className: "base-order-item__available__content__currency" }, available ? (type === 'buy' ? from : to).toUpperCase() : '')))),
            React.createElement("div", { className: "base-order-item" },
                React.createElement("input", {className: "base-order_item_amount_slider",type: "range", min:0, step: Math.pow(10, -(totalPrecision)).toFixed(totalPrecision), max: price ? available / price : available, defaultValue: amount || 0, onInput: (e) => {this.setState({amount: e.target.value})}})
            ),
            React.createElement("div", { className: "base-order-item" },
                React.createElement("div", { className: "base-order-item__total" },
                    React.createElement("label", { className: "base-order-item__total__label" }, handleSetValue(totalText, 'Total')),
                    React.createElement("div", { className: "base-order-item__total__content" },
                        orderType === 'Limit' ? (React.createElement("span", { className: "base-order-item__total__content__amount" }, Decimal.format(total, totalPrecision))) : (React.createElement("span", { className: "base-order-item__total__content__amount" },
                            "\u2248",
                            Decimal.format(total, (totalPrecision)))),
                        React.createElement("span", { className: "base-order-item__total__content__currency" }, from.toUpperCase())))),
            // React.createElement("div", { className: "base-order-item" },
            //     React.createElement("div", { className: "base-order-item__available" },
            //         React.createElement("div", { className: "base-order-item__available__content" },
            //             React.createElement("input", {type: "range", min:0, max: available, value: amount, onInput: (e) => {this.setState({amount: e.target.value})}})
            //         )
            //     )),
            // React.createElement("div", { className: "base-order-item" },
            //     React.createElement("div", { className: "base-order-item__fee" },
            //         React.createElement("label", { className: "base-order-item__fee__label" }, handleSetValue(estimatedFeeText, 'Estimated fee')),
            //         React.createElement("div", { className: "base-order-item__fee__content" },
            //             React.createElement("span", { className: "base-order-item__fee__content__amount" }, fee ? (type === 'buy' ? (Decimal.format(fee * +amount, currentMarketAskPrecision+currentMarketBidPrecision)) : (Decimal.format(fee * total, currentMarketAskPrecision+currentMarketBidPrecision))) : ''),
            //             React.createElement("span", { className: "base-order-item__fee__content__currency" }, fee ? (type === 'buy' ? to.toUpperCase() : from.toUpperCase()) : '')))
            // ),
            React.createElement("div", { className: "base-order-item" },
                React.createElement(Button, { disabled: isDisabled(Number(amount) || 0, getTotalPrice(amount, proposals) / Number(amount) || priceMarket, price, this.props, this.state), label: submitButtonText || type, noMargin: true, onClick: this.handleSubmit }))));
    }
}
export { OrderForm, };

