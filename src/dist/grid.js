import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

function sortBreakpoints (breakpoints) {
    const keys = Object.keys(breakpoints);
    return keys.sort(function(a, b) {
        return breakpoints[a] - breakpoints[b];
    });
}

function getBreakpointFromWidth (breakpoints, width) {
    const sorted = sortBreakpoints(breakpoints);
    let matching = sorted[0];

    for (let i = 1, len = sorted.length; i < len; i++) {
        const breakpointName = sorted[i];
        if (width > breakpoints[breakpointName]) matching = breakpointName;
    }

    return matching;
}

export default (ComposedComponent: ReactClass): ReactClass => class extends Component {


    static defaultProps = {
        measureBeforeMount: true
    }

    state = {
        mounted: false,
    }

    mounted: false

    get nodeWidth () {
        return ReactDOM.findDOMNode(this).offsetWidth;
    }

    get nodeHeight () {
        // return 1/12 * window.innerHeight;
        // return Math.ceil((window.innerHeight - 63 - 43 - 10)/24);
        if(window.innerHeight < 650) return (window.innerHeight - 128) / 50;
        if(window.innerHeight > 900) return (window.innerHeight - 128) / 37;
            return window.innerHeight > (window.innerHeight - 63 - 43 - 10) ? (window.innerHeight - 128) / 43 : (window.innerHeight - 63 - 43 - 10) / 32
        // return window.innerHeight - 63 - 43 - 10;
    }

    get currentBreakpoint () {
        const { breakpoints } = this.props;

        return getBreakpointFromWidth(breakpoints, this.nodeWidth);
    }

    calcRowHeight = () => {
        const { cols, margin } = this.props;
        // return (this.nodeHeight - (this.nodeHeight/10)) / 38;
        return this.nodeHeight;
    }

    onWindowResize = (event, cb) => {
        if (!this.mounted) return;

        const rowHeight = this.calcRowHeight();

        this.setState({
            width: this.nodeWidth,
            rowHeight
        }, cb);
    }

    componentDidMount () {
        this.mounted = true;

        window.addEventListener('resize', this.onWindowResize);
        this.onWindowResize();
    }

    componentWillUnmount () {
        this.mounted = false;

        window.removeEventListener('resize', this.onWindowResize);
    }

    render () {
        if (this.props.measureBeforeMount && !this.mounted) {
            return <div className={this.props.className} style={this.props.style} />;
        }

        return <ComposedComponent {...this.props} {...this.state} />;
    }
};