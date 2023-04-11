import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { addLocaleData } from "react-intl";
import { Provider } from "react-redux";
import { App } from "./App";
import "./index.css";
import "./index.scss";
import { rootSaga } from "./modules";
import { rangerSagas } from "./modules/public/ranger";
import { rangerMiddleware, sagaMiddleware, store } from "./store";
import en from "react-intl/locale-data/en";
import ar from "react-intl/locale-data/ar";
import ur from "react-intl/locale-data/ur";
import es from "react-intl/locale-data/es";
import "./assets/css/vendor.bundle49f7.css";
import "./assets/css/style.css";
const history = createBrowserHistory();
import * as serviceWorker from "./serviceWorker";

addLocaleData([...en, ...ar, ...ur, ...es]);

sagaMiddleware.run(rootSaga);
rangerMiddleware.run(rangerSagas);

ReactDOM.render(
  React.createElement(
    Provider,
    { store: store },
    React.createElement(App, { history: history })
  ),
  document.getElementById("root")
);

serviceWorker.unregister();
