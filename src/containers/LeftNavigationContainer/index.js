import React from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import walletImg from "../../assets/images/wallet.svg";
import orderImg from "../../assets/images/orders.svg";
import historyImg from "../../assets/images/history.svg";
import tradeImg from "../../assets/images/trade.svg";
import { WalletIcon } from '../../assets/images/WalletIcon';
import { TradeIcon } from '../../assets/images/TradeIcon';
import { OrdersIcon } from '../../assets/images/OrdersIcon';
import { HistoryIcon } from '../../assets/images/HistoryIcon';
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

class LeftNavigationContainer extends React.Component {
    render() {
        const { pathname } = this.props.location;
        return (
            <div className="left-container-parent">
                <NavLink
                    activeStyle={{
                        color: "var(--sidebar-menu-active-text-color)",
                        fontWeight: 700,
                    }}
                    className="nav-link-style"
                    to="/wallets"
                >
                    <div className={'left-navbar-icons'}>
                        <WalletIcon color={pathname === '/wallets' ? 'var(--sidebar-menu-active-text-color)' : 'var(--sidebar-menu-icon-color)'}/>
                    </div>
                    {this.props.intl.formatMessage({id: 'page.header.navbar.wallets'})}
                </NavLink>

                <NavLink
                    activeStyle={{
                        color: "var(--sidebar-menu-active-text-color)",
                        fontWeight: 700,
                    }}
                    className="nav-link-style"
                    to="/orders"
                >
                    <div className={'left-navbar-icons'}>
                        <OrdersIcon color={pathname === '/orders' ? 'var(--sidebar-menu-active-text-color)' : 'var(--sidebar-menu-icon-color)'}/>
                    </div>
                    {this.props.intl.formatMessage({id: 'page.header.navbar.openOrders'})}
                </NavLink>

                <NavLink
                    activeStyle={{
                        color: "var(--sidebar-menu-active-text-color)",
                        fontWeight: 700,
                    }}
                    to="/history"
                    className="nav-link-style"
                >
                    <div className={'left-navbar-icons'}>
                        <HistoryIcon color={pathname === '/history' ? 'var(--sidebar-menu-active-text-color)' : 'var(--sidebar-menu-icon-color)'}/>
                    </div>
                    {this.props.intl.formatMessage({id: 'page.header.navbar.history'})}
                </NavLink>

                <NavLink
                    activeStyle={{
                        color: "var(--sidebar-menu-active-text-color)",
                        fontWeight: 700,
                    }}
                    className="nav-link-style"
                    to="/trading"
                >
                    <div className={'left-navbar-icons'}>
                        <TradeIcon color={pathname === '/trading' ? 'var(--sidebar-menu-active-text-color)' : 'var(--sidebar-menu-icon-color)'}/>
                    </div>
                    {this.props.intl.formatMessage({id: 'page.header.navbar.trade'})}
                </NavLink>
            </div>
        );
    };
}

export default injectIntl(withRouter(LeftNavigationContainer));
