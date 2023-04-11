import * as React from 'react';
export class APIIcon extends React.Component {
    render() {
        const { color } = this.props;
        return (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                <defs>
                    <style>{`.api_cls-1{fill:none;stroke:${color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:20px}`}</style>
                </defs>
                <rect className="api_cls-1" x="180.7" y="181" width="238.1" height="238.1" rx="3.3"/>
                <circle className="api_cls-1" cx="215" cy="98.8" r="23.8"/>
                <path className="api_cls-1" d="M215 181v-54"/>
                <circle className="api_cls-1" cx="299.8" cy="98.8" r="23.8"/>
                <path className="api_cls-1" d="M299.8 181v-54"/>
                <circle className="api_cls-1" cx="384.5" cy="98.8" r="23.8"/>
                <path className="api_cls-1"
                      d="M384.5 181v-54M422.1 215.3H525M422.1 300H525M422.1 384.7H525M177.9 215.3H75M177.9 300H75M177.9 384.7H75"/>
                <circle className="api_cls-1" cx="384.5" cy="501.2" r="23.8"/>
                <path className="api_cls-1" d="M384.5 419v54"/>
                <circle className="api_cls-1" cx="299.8" cy="501.2" r="23.8"/>
                <path className="api_cls-1" d="M299.8 419v54"/>
                <circle className="api_cls-1" cx="215" cy="501.2" r="23.8"/>
                <path className="api_cls-1" d="M215 419v54"/>
            </svg>
        );
    }
}

