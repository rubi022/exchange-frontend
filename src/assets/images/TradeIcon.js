import * as React from 'react';
export class TradeIcon extends React.Component {
    render() {
        const { color } = this.props;
        return (
            <svg
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 600 600"
            >
                <defs>
                    <style>
                        {
                            `.cls-1{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;stroke-width:20px}`
                        }
                    </style>
                </defs>
                <path className="cls-1" d="M40 212.2l28.5 47.3 46.5-27" />
                <path
                    className="cls-1"
                    d="M68.4 259.6a237.6 237.6 0 11234.1 277.9 237.4 237.4 0 01-207-121"
                />
                <path
                    className="cls-1"
                    d="M436.6 332.7l-28.5 15-127-71.1A217.8 217.8 0 01194 171l139.2 80.3a1.3 1.3 0 01.4.1l102.9 56a14.3 14.3 0 010 25.2zm-115.2 63.1l-76 43.9a9 9 0 01-13.2-7 104.7 104.7 0 016-44.5 102.7 102.7 0 0147.5-54.2l37.2 21.8c14.9 8.6 11.8 32.2-1.5 40z"
                />
                <path className="cls-1" d="M323 355.9l-30-17.2-2-1.2z" />
                <path
                    className="cls-1"
                    d="M408 347.8L345.3 382l-.4.2-23.4 13.6c13.3-7.8 16.4-31.5 1.5-40l-31.8-18.4-.2-.1a2.9 2.9 0 01-.6-.4A202.2 202.2 0 01194 171.2a217.8 217.8 0 0087 105.4z"
                />
            </svg>
        );
    }
}

