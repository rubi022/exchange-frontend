import * as React from 'react';
export class OrdersIcon extends React.Component {
    render() {
        const { color } = this.props;
        return (
            <svg
                id="prefix__Layer_1"
                data-name="Layer 1"
                viewBox="0 0 600 600"
            >
                <defs>
                    <style>
                        {
                            `.prefix__cls-1{fill:none;stroke:${color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:20px}`
                        }
                    </style>
                </defs>
                <ellipse
                    className="prefix__cls-1"
                    cx={310}
                    cy={236.4}
                    rx={105.2}
                    ry={33.5}
                />
                <path
                    className="prefix__cls-1"
                    d="M204.8 236.4v50c0 18.6 47 33.6 105.2 33.6s105.2-15 105.2-33.6v-50"
                />
                <path
                    className="prefix__cls-1"
                    d="M204.8 286.3v50c0 18.5 47 33.5 105.2 33.5s105.2-15 105.2-33.5v-50"
                />
                <path
                    className="prefix__cls-1"
                    d="M204.8 333.6v50c0 18.5 47 33.5 105.2 33.5s105.2-15 105.2-33.5v-50M45 212.2l28.5 47.3 46.5-27"
                />
                <path
                    className="prefix__cls-1"
                    d="M73.4 259.6a237.6 237.6 0 11234.1 277.9 237.4 237.4 0 01-207-121"
                />
            </svg>
        );
    }
}

