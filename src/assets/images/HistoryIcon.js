import * as React from 'react';
export class HistoryIcon extends React.Component {
    render() {
        const { color } = this.props;
        return (
            <svg
                id="prefix_Layer_1"
                data-name="Layer 1"
                viewBox="0 0 600 600"
            >
                <defs>
                    <style>
                        {
                            `.prefix_cls-1{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;stroke-width:20px}`
                        }
                    </style>
                </defs>
                <path
                    className="prefix_cls-1"
                    d="M44.89 212.32l28.55 47.32 46.5-26.92"
                />
                <path
                    className="prefix_cls-1"
                    d="M73.44 259.64C92.61 147.7 190.12 62.5 307.53 62.5 438.7 62.5 545 168.83 545 300S438.7 537.5 307.53 537.5a237.41 237.41 0 01-207-121"
                />
                <path
                    className="prefix_cls-1"
                    d="M311.93 212.25l-36.13-37.76-36.15 37.76m-11.74 197.81V285.88m47.87 124.18V174.49m49.74 235.57l90.39-91.89m0 91.89l-90.39-91.89"
                />
            </svg>
        );
    }
}

