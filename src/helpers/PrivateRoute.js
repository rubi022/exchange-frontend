import * as React from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import { renderLoader } from "../routes/Layout/index"

const PrivateRoute = ({
    component: CustomComponent,
    loading,
    isLogged,
    ...rest
  }) => {
    if (loading) {
      return renderLoader();
    }
    const renderCustomerComponent = (props) =>
      React.createElement(CustomComponent, Object.assign({}, props));
    if (isLogged) {
      return React.createElement(
        Route,
        Object.assign({}, rest, { render: renderCustomerComponent })
      );
    }
    return React.createElement(
      Route,
      Object.assign({}, rest),
      React.createElement(Redirect, { to: "/signin" })
    );
};

export default PrivateRoute;