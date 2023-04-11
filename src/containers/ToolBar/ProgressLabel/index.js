import classnames from 'classnames';
import * as React from 'react';
export class ProgressLabel extends React.Component {
    render() {
        const { progress, isPositive, additional, bidUnit, } = this.props;
        const className = classnames({
            'parent-trading-header-progress-label-progress-positive': isPositive,
            'parent-trading-header-progress-label-progress-negative': !isPositive,
        });
        return (React.createElement("div", { className: "parent-trading-header-progress-label" },
            React.createElement("div", { className: additional === "24h Volume" || additional === "Change" ? `${className}` : className },
                progress,
                " ",
                bidUnit),
            React.createElement("div", { className: "parent-trading-header-progress-label-additional" }, additional)));
    }
}

