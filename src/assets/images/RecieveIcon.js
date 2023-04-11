import * as React from 'react';
export class ReceiveIcon extends React.Component {
    render() {
        const { color } = this.props;
        return (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                <defs>
                    <style>{`.receive_cls-1{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;stroke-width:20px}`}</style>
                </defs>
                <ellipse className="receive_cls-1" cx="300" cy="362" rx="88.4" ry="28.2"/>
                <path className="receive_cls-1" d="M211.6 362v42c0 15.6 39.6 28.2 88.4 28.2s88.4-12.6 88.4-28.2v-42"/>
                <path className="receive_cls-1"
                      d="M428.6 232.2h59.8c20.2 0 36.6 17.8 36.6 39.7v213.4c0 22-16.4 39.7-36.6 39.7H111.6C91.4 525 75 507.2 75 485.3V271.9c0-21.9 16.4-39.7 36.6-39.7h56.5M216.6 148.6l83.5 83.6 83.3-83.3M300.1 232.2V75"/>
            </svg>
        );
    }
}

