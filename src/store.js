import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {rootReducer} from './modules';

const monitor = window["__SAGA_MONITOR_EXTENSION__"];

const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor });
const rangerMiddleware = createSagaMiddleware({ sagaMonitor: monitor });

const composeEnhancer = window
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middlewares = [sagaMiddleware, rangerMiddleware];

if((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') || (localStorage.getItem('development') === 'true')) {
    // middlewares.push(logger)
}
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));
export { store, sagaMiddleware, rangerMiddleware, };
