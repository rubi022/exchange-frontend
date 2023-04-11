import * as React from 'react';
export class ProfileIcon extends React.Component {
    render() {
        const { color } = this.props;
        return (
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                <path
                    d="M525 525v-39.1L369.4 394v-64.5s44-17.6 44-51.7V146.5c0-19.2-27.7-71.5-110.7-71.5h-5.4c-83 0-110.8 52.3-110.8 71.5V278c0 34 44.1 51.7 44.1 51.7v64.5L75 486V525"
                    fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="20"/>
            </svg>
        );
    }
}

