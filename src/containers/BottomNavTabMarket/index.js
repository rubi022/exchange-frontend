import React, { Component } from "react";
import { NavLink, withRouter, matchPath } from "react-router-dom";
import { connect } from "react-redux";
import {
    logoutFetch,
    selectCurrentMarket,
    selectUserFetching,
    selectUserInfo,
    selectUserLoggedIn,
    userFetch,
    walletsReset,
    setMobileWalletUi,
} from "../../modules";
import {MobileBuySell} from "../MobileBuySell";
import {injectIntl} from "react-intl";

class BottomNavTabMarketContainer extends Component {
    constructor(props) {
        super(props);
        this.handleWalletName = () => {
            // this.props.walletsReset();
            this.props.setMobileWalletUi("");
        };

        // this.state = {
        //     mobileWallet: false
        // }
    }

    render() {
        return (
            <div className={"parent-footer__bottom-tab"}>
                <div
                    className="tab-links base-tab-panel"
                >
                    <NavLink
                        activeStyle={{ color: "var(--active-bottom-tab-color)" }}
                        onClick={this.handleWalletName.bind(this)}
                        to={"/trading"}
                        className="tab-link"
                    >
                        <div className={"tab-link-div"}>
                            <i className="far fa-chart-bar fa-lg"/>
                            {this.props.intl.formatMessage({id: "page.body.header.charts"})}
                        </div>
                    </NavLink>
                    <NavLink
                        activeStyle={{ color: "var(--active-bottom-tab-color)" }}
                        onClick={this.handleWalletName.bind(this)}
                        to={"/order-book"}
                        className="tab-link"
                    >
                        <div className={"tab-link-div"}>
                            <i className="far fa-file-alt fa-lg"/>
                            {this.props.intl.formatMessage({id: "page.body.header.orders"})}
                        </div>
                    </NavLink>
                    <NavLink
                        className="tab-link"
                        to={"#"}
                    >
                        <div className="tab-link-div">
                            <MobileBuySell />
                            <i className="far fa-file-alt fa-lg"/>
                            {this.props.intl.formatMessage({id: "page.body.header.buySell"})}
                        </div>
                    </NavLink>
                    <NavLink
                        activeStyle={{ color: "var(--active-bottom-tab-color)" }}
                        onClick={this.handleWalletName.bind(this)}
                        to={"/recent-trades"}
                        className="tab-link"
                    >
                        <div className={"tab-link-div"}>
                            <i className="fas fa-wallet fa-lg"/>
                            {this.props.intl.formatMessage({id: "page.body.header.trades"})}
                        </div>
                    </NavLink>
                    <NavLink
                        activeStyle={{ color: "var(--active-bottom-tab-color)" }}
                        onClick={this.handleWalletName.bind(this)}
                        to={"/my-orders"}
                        className="tab-link"
                    >
                        <div className={"tab-link-div"}>
                            <i className="fas fa-user fa-lg"/>
                            {this.props.intl.formatMessage({id: "page.body.header.myOrders"})}
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentMarket: selectCurrentMarket(state),
    user: selectUserInfo(state),
    isLoggedIn: selectUserLoggedIn(state),
    userLoading: selectUserFetching(state),
    mobileWallet: setMobileWalletUi(state),
});
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutFetch()),
    userFetch: () => dispatch(userFetch()),
    walletsReset: () => dispatch(walletsReset()),
    setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
});

const BottomNavTabMarket = injectIntl(withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BottomNavTabMarketContainer)
));
export { BottomNavTabMarket };
