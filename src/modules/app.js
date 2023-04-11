import {combineReducers} from 'redux';
import {alertReducer} from './public/alert';
import { changeLanguageReducer } from './public/i18n';
import {klineReducer} from './public/kline';
import {marketsReducer} from './public/markets';
import {depthReducer, incrementDepthReducer, orderBookReducer} from './public/orderBook';
import {rangerReducer} from './public/ranger/reducer';
import {recentTradesReducer} from './public/recentTrades';
import {apiKeysReducer} from './user/apiKeys';
import {authReducer} from './user/auth';
import {sendEmailVerificationReducer} from './user/emailVerification';
import {historyReducer} from './user/history';
import {documentsReducer, identityReducer, labelReducer, phoneReducer,} from './user/kyc';
import {newHistoryReducer} from './user/newHistory';
import {openOrdersReducer} from './user/openOrders';
import {ordersReducer} from './user/orders';
import {ordersHistoryReducer} from './user/ordersHistory';
import {passwordReducer} from './user/password';
import {profileReducer} from './user/profile';
import {userActivityReducer} from './user/userActivity';
import {walletsReducer} from './user/wallets';
import {beneficiariesReducer} from "./user/beneficiaries";
import {genericReducer} from "./public/generic";

export const publicReducer = combineReducers({
    recentTrades: recentTradesReducer,
    markets: marketsReducer,
    orderBook: orderBookReducer,
    depth: depthReducer,
    incrementDepth: incrementDepthReducer,
    ranger: rangerReducer,
    i18n: changeLanguageReducer,
    kline: klineReducer,
    alerts: alertReducer,
    genericStates: genericReducer,
});
export const userReducer = combineReducers({
    auth: authReducer,
    label: labelReducer,
    orders: ordersReducer,
    password: passwordReducer,
    profile: profileReducer,
    wallets: walletsReducer,
    phone: phoneReducer,
    identity: identityReducer,
    documents: documentsReducer,
    history: historyReducer,
    newHistory: newHistoryReducer,
    apiKeys: apiKeysReducer,
    beneficiaries: beneficiariesReducer,
    userActivity: userActivityReducer,
    ordersHistory: ordersHistoryReducer,
    openOrders: openOrdersReducer,
    sendEmailVerification: sendEmailVerificationReducer,
});

