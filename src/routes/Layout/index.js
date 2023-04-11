import { Loader } from "@components/components";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect, withRouter } from "react-router-dom";
import {considerMarketsDown, minutesUntilAutoLogout, underConstruction} from "../../api";
import {
  logoutFetch,
  selectCurrentMarket,
  selectUserFetching,
  selectUserInfo,
  selectUserLoggedIn, selectWindowWidth, setWindowWidth,
  selectSignInLastLink,
  userFetch,
  walletsReset,
  setCallbackLink
} from "../../modules";
import {
  HomeScreen,
  ChangeForgottenPasswordScreen,
  ConfirmScreen,
  EmailVerificationScreen,
  ForgotPasswordScreen,
  HistoryScreen,
  OrdersTabScreen,
  ProfileScreen,
  ProfileTwoFactorAuthScreen,
  SignInScreen,
  SignUpScreen,
  TradingScreen,
  VerificationScreen,
  WalletsScreen, UnderConstruction, OrdersScreen,
} from "../../screens";
import { ClipLoader } from "react-spinners";
import Link from "react-router-dom/Link";
import {toggleColorTheme} from "../../helpers/toggleColorTheme";
import {selectCallbackLink, selectCurrentTheme, setSignInLastLink} from "../../modules/public/generic";
import {selectMarketsErrorVar} from "../../modules/public/markets";
import {BottomNavTAb} from "../../containers/BottomNavTab";
import {Header} from "../../containers/Header";
import {Alerts} from "../../containers/Alerts";
import {WelcomeModal} from "../../containers/WelcomeModal";
import queryString from "query-string";
import {MobilMarkets} from "../../containers/MobileMarkets";
import {BottomNavTabMarket} from "../../containers/BottomNavTabMarket";
import {OrderBookDesktop, RecentTrades} from "../../containers";
import {CurrentMarketsInfo} from "../../containers/CurrentMarketInfo";
import PublicRoute from "../../helpers/PublicRoute";
import PrivateRoute from "../../helpers/PrivateRoute";

Date.prototype.now = function () {
  return typeof Date.now == "function" ? Date.now() : new Date().getTime();
};
export const renderLoader = () =>
  React.createElement(
    "div",
    { className: "parent-loader-container d-flex justify-content-center align-items-center w-100 h-100" },
    React.createElement(ClipLoader, {
      sizeUnit: "px",
      size: 35,
      loading: true,
      color: "var(--accent)",
    })
  );
const CHECK_INTERVAL = 15000;
const STORE_KEY = "lastAction";
class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.getLastAction = () => {
      if (localStorage.getItem(STORE_KEY) !== null) {
        return parseInt(localStorage.getItem(STORE_KEY) || "0", 10);
      }
      return 0;
    };
    this.setLastAction = (lastAction) => {
      localStorage.setItem(STORE_KEY, lastAction.toString());
    };
    this.initListener = () => {
      this.reset();
      for (const type of LayoutComponent.eventsListen) {
        document.body.addEventListener(type, this.reset);
      }
    };
    this.reset = () => {
      this.setLastAction(new Date().now());
    };
    this.initInterval = () => {
      this.timer = setInterval(() => {
        this.check();
      }, CHECK_INTERVAL);
    };
    this.check = () => {
      const { user } = this.props;
      const now = new Date().now();
      const timeleft =
        this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
      const diff = timeleft - now;
      const isTimeout = diff < 0;
      if (isTimeout && user.email) {
        this.props.logout();
      }
    };
    this.handleScreen = (e) => {
      this.props.setWindowWidth(window.innerWidth);
    };
    this.initListener();
  }
  componentDidMount() {
    this.props.setWindowWidth(window.innerWidth);
    window.addEventListener("resize", this.handleScreen.bind(this));
    this.props.userFetch();
    this.initInterval();
    this.check();
  }
  componentDidUpdate(next) {
    const { isLoggedIn, history, windowWidth } = this.props;
    if (!isLoggedIn && next.isLoggedIn) {
      this.props.walletsReset();
      if (windowWidth < 769) {
        if (!history.location.pathname.includes("/markets-list")) {
          history.push("/markets-list");
        }
      } else {
        if (!history.location.pathname.includes("/trading")) {
          history.push("/trading");
        }
      }
    }
  }
  componentWillUnmount() {
    for (const type of LayoutComponent.eventsListen) {
      document.body.removeEventListener(type, this.reset);
    }
    window.removeEventListener("resize", this.handleScreen.bind(this));
    clearInterval(this.timer);
  }
  render() {
    const { isLoggedIn, userLoading, colorTheme, user, noMarketFound, windowWidth, callbackLink } = this.props;
    toggleColorTheme(colorTheme);
    const userRole = ['superadmin', 'admin'].includes(user && user.role);
    const marketsFound = considerMarketsDown() ? noMarketFound : false;
    const showUnderConstructionPage = underConstruction() || marketsFound;
    if (this.props.history.location.pathname !== '/signin') {
      this.props.setCallbackLink(this.props.history.location.pathname)
      this.props.setSignInLastLink(false);
    } else {
      this.props.setSignInLastLink(true);
    }
    const path = window.location.pathname; 
    const noContainer = path.includes("signin") || path.includes("signup") || path.includes("forgot-password") || path.includes("accounts");
    const homeNavTab = path.includes("markets") || path.includes("wallets") || path.includes("profile") || path.includes("history") || path.includes("security") || path.includes("confirm") || path.includes("under-construction") ;

    const MaintenanceRoutes = React.createElement(React.Fragment, {},
        React.createElement(Switch, null,
            React.createElement(Route, {
              path: '/under-construction',
              component: UnderConstruction,
            }),
            React.createElement(Route, {
              path: '/',
              component: UnderConstruction,
            }),
            React.createElement(
                Route,
                { path: "**" },
                React.createElement(Redirect, { to: "/under-construction" })
            ),
        )
    )

    const NoMaintenanceRoutes = React.createElement(React.Fragment, {},
        React.createElement(Header, {image: window.env.image}),
        (windowWidth < 769 && !homeNavTab && !noContainer) && React.createElement(CurrentMarketsInfo, null),
        React.createElement(Alerts, null),
        React.createElement('div', {className: `${noContainer ? 'parent-layout' : 'container-fluid parent-layout'} ${!homeNavTab && "parent-layout__mobile"}`},
            React.createElement(
                Switch,
                null,
                React.createElement(PublicRoute, {
                  loading: userLoading,
                  windowWidth: windowWidth,
                  isLogged: isLoggedIn,
                  path: "/signin",
                  component: SignInScreen,
                }),
                React.createElement(PublicRoute, {
                  loading: userLoading,
                  windowWidth: windowWidth,
                  isLogged: isLoggedIn,
                  path: "/signup",
                  component: SignUpScreen,
                }),
                React.createElement(PublicRoute, {
                  loading: userLoading,
                  windowWidth: windowWidth,
                  isLogged: isLoggedIn,
                  path: "/accounts/confirmation",
                  component: VerificationScreen,
                }),
                React.createElement(PublicRoute, {
                  loading: userLoading,
                  windowWidth: windowWidth,
                  isLogged: isLoggedIn,
                  path: "/forgot-password",
                  component: ForgotPasswordScreen,
                }),
                React.createElement(PublicRoute, {
                  loading: userLoading,
                  windowWidth: windowWidth,
                  isLogged: isLoggedIn,
                  path: "/accounts/password_reset",
                  component: ChangeForgottenPasswordScreen,
                }),
                React.createElement(PublicRoute, {
                  loading: userLoading,
                  windowWidth: windowWidth,
                  isLogged: isLoggedIn,
                  path: "/email-verification",
                  component: EmailVerificationScreen,
                }),
                // React.createElement(PublicRoute, {
                //   loading: userLoading,
                //   isLogged: isLoggedIn,
                //   path: "/markets-list",
                //   component: MobilMarkets,
                // }),
                React.createElement(PrivateRoute, {
                  loading: userLoading,
                  isLogged: isLoggedIn,
                  path: "/orders",
                  component: OrdersScreen,
                }),
                React.createElement(PrivateRoute, {
                  loading: userLoading,
                  isLogged: isLoggedIn,
                  path: "/history",
                  component: OrdersTabScreen,
                }),
                React.createElement(PrivateRoute, {
                  loading: userLoading,
                  isLogged: isLoggedIn,
                  path: "/my-orders",
                  component: OrdersTabScreen,
                }),
                React.createElement(PrivateRoute, {
                  loading: userLoading,
                  isLogged: isLoggedIn,
                  path: "/profile",
                  component: ProfileScreen,
                }),
                React.createElement(PrivateRoute, {
                  loading: userLoading,
                  isLogged: isLoggedIn,
                  path: "/security/2fa",
                  component: ProfileTwoFactorAuthScreen,
                }),
                React.createElement(PrivateRoute, {
                  loading: userLoading,
                  isLogged: isLoggedIn,
                  path: "/wallets",
                  component: WalletsScreen,
                }),
                React.createElement(PrivateRoute, {
                  loading: userLoading,
                  isLogged: isLoggedIn,
                  path: "/confirm",
                  component: ConfirmScreen,
                }),
                React.createElement(Route, {
                  loading: userLoading,
                  isLogged: isLoggedIn,
                  path: "/order-book",
                  component: OrderBookDesktop,
                }),
                React.createElement(Route, {
                  loading: userLoading,
                  isLogged: isLoggedIn,
                  path: "/recent-trades",
                  component: RecentTrades,
                }),
                React.createElement(Route, {
                  exact: true,
                  path: "/trading/:market?",
                  component: TradingScreen,
                }),
                React.createElement(Route, {
                  exact: true,
                  path: "/markets-list",
                  component: MobilMarkets,
                }),
                React.createElement(Route, {
                  exact: true,
                  path: "/",
                  component: windowWidth < 769 ? MobilMarkets : TradingScreen,
                }),
                // React.createElement(Route, { exact: true, path: "/mining" }),
                React.createElement(
                    Route,
                    { path: "**" },
                    React.createElement(Redirect, { to: "/" })
                )
            )
        ),
        !noContainer ? (homeNavTab ? React.createElement(BottomNavTAb, null) : React.createElement(BottomNavTabMarket, null)) : null,
    )

    const finalRoutes = () => {
      if (showUnderConstructionPage) {
        if (userRole) {
          return NoMaintenanceRoutes;
        } else {
          return MaintenanceRoutes;
        }
      } else {
        return NoMaintenanceRoutes;
      }
    }

    return React.createElement(
      React.Fragment,
      {},
      finalRoutes()
    );
  }
}

LayoutComponent.eventsListen = [
  "click",
  "keydown",
  "scroll",
  "resize",
  "mousemove",
  "TabSelect",
  "TabHide",
];

const mapStateToProps = (state) => ({
  currentMarket: selectCurrentMarket(state),
  user: selectUserInfo(state),
  isLoggedIn: selectUserLoggedIn(state),
  userLoading: selectUserFetching(state),
  colorTheme: selectCurrentTheme(state),
  noMarketFound: selectMarketsErrorVar(state),
  windowWidth: selectWindowWidth(state),
  callbackLink: selectCallbackLink(state),
  signInLastLink: selectSignInLastLink(state),
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutFetch()),
  userFetch: () => dispatch(userFetch()),
  walletsReset: () => dispatch(walletsReset()),
  setWindowWidth: (payload) => dispatch(setWindowWidth(payload)),
  setCallbackLink: (payload) => dispatch(setCallbackLink(payload)),
  setSignInLastLink: (payload) => dispatch(setSignInLastLink(payload)),
});

const Layout = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LayoutComponent)
);
export { Layout };
