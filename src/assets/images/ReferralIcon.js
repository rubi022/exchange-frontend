import * as React from 'react';
export class ReferralIcon extends React.Component {
    render() {
        const { color } = this.props;
        return (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                <defs>
                    <style>{`.referral_cls-1{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;stroke-width:20px}`}</style>
                </defs>
                <path className="referral_cls-1" d="M410.67 372.28v105.06M358.14 424.81H463.2"/>
                <circle className="referral_cls-1" cx="412.31" cy="424.81" r="100.19"/>
                <path className="referral_cls-1"
                      d="M284.77 75c82.94 0 110.74 52.29 110.74 71.52v109.41M62.5 525v-39.13l155.6-91.73V329.6S174 312 174 277.91V146.52C174 127.29 201.83 75 284.77 75"/>
            </svg>
        );
    }
}

