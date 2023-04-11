import classnames from "classnames";
import * as React from "react";
import { Dropdown, OrderInput } from "../";
import { Button, CryptoIcon } from "../../atoms";
class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAmountChange = (text) => {
      this.checkValue(text, "amount");
    };
    this.changeState = (type, value) => {
      if (type === "price") {
        this.setState({
          price: value,
        });
        return;
      }
      this.setState({
        amount: value,
      });
    };
    this.checkValue = (text, type) => {
      const convertedText = text.replace(",", ".").replace("-", "");
      const isDotFirst = convertedText[0] === ".";
      if (isDotFirst) {
        this.changeState(type, "0.");
        return;
      }
      const condition = new RegExp("^(?:[\\d-]*\\.?[\\d-]*|[\\d-]*\\.[\\d-])$");
      if (convertedText.match(condition)) {
        this.changeState(type, convertedText);
      }
    };
    this.handlePriceChange = (text) => {
      this.checkValue(text, "price");
    };
    this.handleOrderTypeChange = (index) => {
      const { orderTypes } = this.props;
      this.setState({
        orderType: orderTypes[index],
      });
    };
    this.handleSubmit = () => {
      const { type, priceMarket } = this.props;
      const { amount, orderType, price } = this.state;
      const order = {
        type,
        price: orderType === "Market" ? priceMarket : price,
        orderType,
        amount,
      };
      this.props.onSubmit(order);
      this.setState({
        price: orderType === "Market" ? String(priceMarket) : "",
        amount: "",
      });
    };
    this.state = {
      amount: "",
      orderType: "Limit",
      price: "",
    };
  }
  render() {
    const {
      disabled,
      type,
      fee,
      orderTypes,
      className,
      priceMarket,
      from,
      to,
      available,
    } = this.props;
    const { amount, price, orderType } = this.state;
    const safeAmount = Number(amount) || 0;
    const safePrice = Number(price) || 0;
    const total =
      orderType === "Market"
        ? safeAmount * priceMarket
        : safeAmount * safePrice;
    const cx = classnames("base-order-form", className);
    const currencyCodeFrom = `${from.toUpperCase()}-alt`;
    return React.createElement(
      "div",
      { className: cx },
      React.createElement(
        "div",
        { className: "base-order-item" },
        React.createElement(
          "label",
          { className: "base-order-item__label" },
          "Order"
        ),
        React.createElement(
          "div",
          { className: "base-order-item__content" },
          React.createElement(Dropdown, {
            list: orderTypes,
            onSelect: this.handleOrderTypeChange,
          })
        )
      ),
      orderType === "Limit"
        ? React.createElement(
            "div",
            { className: "base-order-item" },
            React.createElement(
              "label",
              { className: "base-order-item__label" },
              "Price"
            ),
            React.createElement(
              "div",
              { className: "base-order-item__content" },
              React.createElement(OrderInput, {
                currency: from,
                value: price || "",
                handleChangeValue: this.handlePriceChange,
              })
            )
          )
        : React.createElement(
            "div",
            { className: "base-order-item" },
            React.createElement(
              "label",
              { className: "base-order-item__label" },
              "Price"
            ),
            React.createElement(
              "div",
              { className: "base-order-item__content" },
              React.createElement(
                "div",
                { className: "base-order-input" },
                React.createElement(
                  "div",
                  { className: "base-order-input__crypto-icon" },
                  React.createElement(
                    CryptoIcon,
                    { code: currencyCodeFrom },
                    from.toUpperCase()
                  )
                ),
                React.createElement(
                  "div",
                  { className: "base-order-input__input" },
                  React.createElement(
                    "span",
                    { className: "base-order-input__price" },
                    priceMarket
                  )
                )
              )
            )
          ),
      React.createElement(
        "div",
        { className: "base-order-item" },
        React.createElement(
          "label",
          { className: "base-order-item__label" },
          "Amount"
        ),
        React.createElement(
          "div",
          { className: "base-order-item__content" },
          React.createElement(OrderInput, {
            currency: to,
            value: amount || "",
            handleChangeValue: this.handleAmountChange,
          })
        )
      ),
      React.createElement(
        "div",
        { className: "base-order-item base-order-item__total" },
        React.createElement(
          "label",
          { className: "base-order-item__label" },
          "Total"
        ),
        React.createElement(
          "div",
          { className: "base-order-item__content" },
          this.convertTotal(total),
          " ",
          React.createElement(
            "span",
            { className: "base-order-item__available-currency" },
            from.toUpperCase()
          )
        )
      ),
      React.createElement(
        "div",
        { className: "base-order-item base-order-item__total" },
        React.createElement(
          "label",
          { className: "base-order-item__label" },
          "Available"
        ),
        React.createElement(
          "div",
          { className: "base-order-item__content" },
          available
            ? React.createElement(
                "div",
                { className: "base-order-item__available" },
                React.createElement(
                  "span",
                  { className: "base-order-item__available" },
                  this.convertToAvailable(available, total),
                  " ",
                  React.createElement(
                    "span",
                    { className: "base-order-item__available-currency" },
                    from.toUpperCase()
                  )
                )
              )
            : null
        )
      ),
      React.createElement(
        "div",
        { className: "base-order-item base-order-item__total" },
        React.createElement(
          "label",
          { className: "base-order-item__label" },
          "Estimated fee"
        ),
        React.createElement(
          "div",
          { className: "base-order-item__content" },
          fee
            ? React.createElement(
                "div",
                { className: "base-order-item__available" },
                type === "buy"
                  ? React.createElement(
                      "span",
                      { className: "base-order-item__available" },
                      fee,
                      " ",
                      React.createElement(
                        "span",
                        { className: "base-order-item__available-currency" },
                        to.toUpperCase()
                      )
                    )
                  : React.createElement(
                      "span",
                      { className: "base-order-item__available" },
                      fee,
                      " ",
                      React.createElement(
                        "span",
                        { className: "base-order-item__available-currency" },
                        from.toUpperCase()
                      )
                    )
              )
            : null
        )
      ),
      React.createElement(Button, {
        disabled: disabled,
        label: type,
        noMargin: true,
        onClick: this.handleSubmit,
      })
    );
  }
  convertTotal(total, fractionDigit = 6) {
    return +Number(total).toFixed(fractionDigit);
  }
  convertToAvailable(balance, value) {
    if (balance && !value) {
      return this.convertTotal(balance);
    }
    const delta = balance - value;
    return delta >= 0 ? this.convertTotal(delta) : 0;
  }
}
export { OrderForm };
