import * as React from 'react';
export class ArrowIcon extends React.Component {
    render() {
        const { color = '#737F92', } = this.props;
        return (React.createElement("svg", { width: "15", height: "10", viewBox: "0 0 12 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { d: "M1.41 0.590027L6 5.17003L10.59 0.590027L12 2.00003L6 8.00003L0 2.00003L1.41 0.590027Z", fill: color })));
    }
}

