import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect, withRouter } from "react-router-dom";
import { setCallbackLink } from "../modules";
import { selectCallbackLink } from "../modules/public/generic";
import { renderLoader } from "../routes/Layout/index"
import queryString from "query-string";

const PublicRouteComponent = ({
    component: CustomComponent,
    loading,
    isLogged,
    windowWidth,
    callbackLink,
    ...rest
  }) => {
    if (loading) {
      return renderLoader();
    }
    if (isLogged) {
      const queryValues = queryString.parse(window.location.search)
      if (queryValues.type === 'external') {
        window.location.assign(`https://${window.location.hostname}/${queryValues.redirect}`);
        return null;
      }
      if (queryValues.redirect) {
        window.location.href = `/${queryValues.redirect}`;
        return null
      }
      if (windowWidth && windowWidth < 769) {
        let redirectPath = callbackLink || "/markets-list";

        return React.createElement(
            Route,
            Object.assign({}, rest),
            React.createElement(Redirect, { to: redirectPath })
        );
      }

      let redirectPath = callbackLink || "/trading";

      return React.createElement(
          Route,
          Object.assign({}, rest),
          React.createElement(Redirect, { to: redirectPath })
      );
    }
    const renderCustomerComponent = (props) =>
      React.createElement(CustomComponent, Object.assign({}, props));
    return React.createElement(
      Route,
      Object.assign({}, rest, { render: renderCustomerComponent })
    );
};

const mapStateToProps = (state) => ({
    callbackLink: selectCallbackLink(state),
});

const mapDispatchToProps = (dispatch) => ({
    setCallbackLink: (payload) => dispatch(setCallbackLink(payload)),
});

const PublicRoute = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PublicRouteComponent)
);

export default PublicRoute;