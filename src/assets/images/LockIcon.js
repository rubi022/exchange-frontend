import * as React from 'react';
export class LockIcon extends React.Component {
    render() {
        const { color } = this.props;
        return (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                <defs>
                    <style>{`.cls-1{fill:none;stroke:${color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:20px}`}</style>
                </defs>
                <rect className="cls-1" x="111" y="245.5" width="368" height="279.5" rx="3.3"/>
                <path className="cls-1"
                      d="M421.6 245.5V185c0-48.5-28.4-110-126.6-110M168.4 245.5V185c0-48.5 28.4-110 126.6-110"/>
            </svg>
        );
    }
}

