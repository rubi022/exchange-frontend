import * as React from 'react';
import { WalletItem } from '../../molecules';
const removeAlt = (str) => str.replace('-alt', '');
const style = {
    listStyleType: 'none',
    padding: 'calc(var(--gap) * 0.5) calc(var(--gap))',
};
/**
 * Component to display list of user wallets. It is scrollable and reacts on WalletItem click.
 */
export class WalletList extends React.Component {
    constructor(props) {
        super(props);
        this.itemState = (i) => {
            return this.state.activeIndex === i;
        };
        this.makeWalletItem = (props, i) => (React.createElement("li", { key: i, style: style, onClick: this.handleClick.bind(this, i, props) },
            React.createElement(WalletItem, Object.assign({ key: i }, {
                ...props,
                active: this.itemState(i),
                currency: removeAlt(props.currency),
            }))));
        this.handleClick = (i, props) => {
            if (this.props.onWalletSelectionChange) {
                this.props.onWalletSelectionChange(props);
            }
            this.setState({ activeIndex: i });
        };
        this.state = { activeIndex: 0 };
    }
    render() {
        return (React.createElement("ul", { className: "base-wallet-list" }, this.props.walletItems.map(this.makeWalletItem)));
    }
}
