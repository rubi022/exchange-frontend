import * as React from 'react';
import arrowUp from './../../../../assets/images/arrow-up-green.svg';
import arrowDown from './../../../../assets/images/arrow-down-red.svg';

export class ArrowUpDown extends React.Component {
    render() {
        const { className } = this.props;
        const color = className === 'parent-dropdown-markets-list-container__negative' ? '#f1432f' : "#23ac50";
        const arrow = className === 'parent-dropdown-markets-list-container__negative' ? arrowDown : arrowUp;
        const path = className === 'parent-dropdown-markets-list-container__negative' ? 'M8.64,0,.43.1A.44.44,0,0,0,.12.84L4.28,5.1a.44.44,0,0,0,.63,0L9,.73A.44.44,0,0,0,8.64,0Z' : 'M.44,5.23l8.2-.1A.44.44,0,0,0,9,4.39L4.8.13a.44.44,0,0,0-.63,0L.12,4.49A.44.44,0,0,0,.44,5.23Z'

        return (React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 12 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { d: path, fill: color })));

    }
}

