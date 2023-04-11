import classnames from "classnames";
import * as React from "react";
import BigNumber from "bignumber.js";

/**
 *  App Decimal that formats values
 */
class Decimal extends React.Component {
  constructor(props) {
    super(props);

    /**
     * function that opens dropdown list
     */
    this.highlightNumbers = function (t, e) {
      for (var r = "", n = t.length - 1, a = t.length - e; n >= a; n--)
        "." === t[n] && ((r = "." + r), n--, a--), (r = t[n] + r);
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "span",
          { className: "base-decimal__opacity" },
          t.slice(0, t.length - r.length)
        ),
        React.createElement("span", null, r)
      );
    };
  }

  static format(t, e) {
    return BigNumber(t).toFixed(e).toString();
    var r = 0 === t ? "0" : BigNumber(t).toFixed(e).toString();
    // var r = void 0 === t ? "0" : (Math.floor(+t * Math.pow(10, e)) / Math.pow(10, e)).toString();
    for (
      -1 === r.indexOf(".") && (r += ".");
      r.slice(r.indexOf(".")).length <= e;

    )
      r += "0";
    return r;
  }

  static getNumberBeforeDot = function (t, r) {
    var n = Decimal.format(t, r);
    return Math.floor(+n);
  };
  static getNumberAfterDot = function (t, r) {
    if (0 !== r) {
      var n = Decimal.format(t, r);
      return n.slice(n.indexOf("."));
    }
  };

  render() {
    var t = this.props,
      r = t.children,
      n = t.fixed;
    var numberAfterDot = this.constructor.getNumberAfterDot(r, n);
    var lastTwo =
      (this.props.fromOrderBooks &&
        (numberAfterDot || []).slice((numberAfterDot || []).length - 2)) ||
      numberAfterDot;
    var numberBeforeLastTwo =
      (this.props.fromOrderBooks &&
        (numberAfterDot || []).slice(0, (numberAfterDot || []).length - 2)) ||
      null;
    var lastTwoNumbersClass = this.props.fromOrderBooks
      ? "base-order-book_last-two-number-before-dot"
      : "base-decimal__opacity";
    var numberBeforeLastTwoClass =
      this.props.fromOrderBooks &&
      (this.props.shouldHighlight ||
        ((numberAfterDot || []).length === 3 && lastTwo === "00"))
        ? "base-order-book_number-all_bold"
        : this.props.fromOrderBooks
        ? "base-order-book_number-low_opacity"
        : "";

    return this.props.highlightedNumbersAmount
      ? this.highlightNumbers(
          Decimal.format(r, n),
          this.props.highlightedNumbersAmount
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "span",
            { className: numberBeforeLastTwoClass },
            this.constructor.getNumberBeforeDot(r, n)
          ),
          React.createElement(
            "span",
            { className: numberBeforeLastTwoClass },
            numberBeforeLastTwo
          ),
          React.createElement(
            "span",
            { className: lastTwoNumbersClass },
            lastTwo
          )
        );

    // React.createElement("span", {className: "base-decimal__opacity"}, this.constructor.getNumberAfterDot(r, n)))
  }
}
export { Decimal };
