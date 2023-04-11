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
import {injectIntl} from "react-intl";

class BottomNavTabContainer extends Component {
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
            to={"/markets-list"}
            className="tab-link"
          >
            <div className={"tab-link-div"}>
              <i className="far fa-chart-bar fa-lg"></i>
              {this.props.intl.formatMessage({id: 'page.body.header.markets'})}
            </div>
          </NavLink>
          <NavLink
              activeStyle={{ color: "var(--active-bottom-tab-color)" }}
            onClick={this.handleWalletName.bind(this)}
            to={"/history"}
            className="tab-link"
          >
            <div className={"tab-link-div"}>
              <i className="far fa-file-alt fa-lg"></i>
              {this.props.intl.formatMessage({id: 'page.header.navbar.history'})}
            </div>
          </NavLink>
          <NavLink
              activeStyle={{ color: "var(--active-bottom-tab-color)" }}
            onClick={this.handleWalletName.bind(this)}
            to={"/wallets"}
            className="tab-link"
          >
            <div className={"tab-link-div"}>
              <i className="fas fa-wallet fa-lg"></i>
              {this.props.intl.formatMessage({id: 'page.header.navbar.wallets'})}
            </div>
          </NavLink>
          <NavLink
              activeStyle={{ color: "var(--active-bottom-tab-color)" }}
            onClick={this.handleWalletName.bind(this)}
            to={"/profile"}
            className="tab-link"
          >
            <div className={"tab-link-div"}>
              <i className="fas fa-user fa-lg"></i>
              {this.props.intl.formatMessage({id: 'page.header.navbar.profile'})}
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

const BottomNavTAb = injectIntl(withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BottomNavTabContainer)
));
export { BottomNavTAb };
