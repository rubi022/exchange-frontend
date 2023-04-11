import * as React from 'react';
/**
 * Component to display bank account details which can be used for a
 * deposit
 */
class DepositFiat extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderDetail = (detail, index) => {
            return (React.createElement("div", { className: "base-deposit-fiat-detail", key: index },
                React.createElement("p", { className: "base-deposit-fiat-detail__label" }, `${detail.key}:`),
                React.createElement("p", { className: "base-deposit-fiat-detail__value" }, detail.value)));
        };
    }
    render() {
        const { data, description, title, } = this.props;
        return (React.createElement("div", { className: "base-deposit-fiat" },
            React.createElement("p", { className: "base-deposit-fiat__title" }, title),
            React.createElement("p", { className: "base-deposit-fiat__description" }, description),
            React.createElement("div", { className: "base-deposit-fiat-credentials" }, data.map(this.renderDetail))));
    }
}
export { DepositFiat, };
