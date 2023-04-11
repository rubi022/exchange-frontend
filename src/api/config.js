import {ORDER_BOOK_DEFAULT_SIDE_LIMIT, STORAGE_DEFAULT_LIMIT} from '../constants';

export const defaultConfig = {
    api: {
        authUrl: '',
        tradeUrl: '',
        applogicUrl: '',
        rangerUrl: '',
    },
    authLogout: '60',
    rangerReconnectPeriod: '1000',
    orderBookSideLimit: 25,
    withCredentials: false,
    payable_currency: true,
    incrementalOrderBook: false,
    captcha: {
        captchaType: 'none',
        siteKey: '',
    },
    storage: {},
    msAlertDisplayTime: '5000',
    balancesFetchInterval: '3000',
    publicRoute: [],
    privateRoute: [],
    productsList: [],
    walletCustomCurrency: ["BTC", "ETH", "DOGE", "USDT"],
    languages: [],
    TNCUrl: '',
    customMarketTabs: [],
    underConstruction: false,
    considerMarketsDown: true,
    primaryCurrency: "usdt",
    homepageUrl: '',
    kyc: {
        provider: 'local', // local, sumsub
        key: '',
        production: false,
        flow: 'basic-kyc',
    }
};
export const App = {
    config: defaultConfig,
};
window.env = window.env || defaultConfig;
App.config = { ...defaultConfig, ...window.env };
App.config.storage = App.config.storage || {};
App.config.captcha = App.config.captcha || defaultConfig.captcha;
export const authUrl = () => App.config.api.authUrl;
export const tradeUrl = () => App.config.api.tradeUrl;
export const applogicUrl = () => App.config.api.applogicUrl;
export const rangerUrl = () => App.config.api.rangerUrl;
export const minutesUntilAutoLogout = () => App.config.authLogout || '60';
export const withCredentials = () => App.config.withCredentials;
export const defaultStorageLimit = () => App.config.storage.defaultStorageLimit || STORAGE_DEFAULT_LIMIT;
export const siteKey = () => App.config.captcha.siteKey;
export const captchaType = () => App.config.captcha.captchaType;
export const msAlertDisplayTime = () => App.config.msAlertDisplayTime || '5000';
export const rangerReconnectPeriod = () => App.config.rangerReconnectPeriod ? Number(App.config.rangerReconnectPeriod) : 1;
export const payableCurrencySupport = () => App.config.payable_currency;
export const publicRoute = () => App.config.publicRoute;
export const privateRoute = () => App.config.privateRoute;
export const incrementalOrderBook = () => App.config.incrementalOrderBook || false;
export const orderBookSideLimit = () => App.config.storage.orderBookSideLimit || ORDER_BOOK_DEFAULT_SIDE_LIMIT;
export const customMarketTabs = () => App.config.customMarketTabs;
export const languages = () => App.config.languages.length > 0 ? App.config.languages : ['en', 'ar', 'ur', 'es'];
export const productList = () => App.config.productsList.length > 0 ? App.config.productsList : [
    ['page.productMenu.home', '/', '/images/icon-home.svg', 'a'],
    ['page.productMenu.market', '/markets', '/images/icon-otc.svg', 'a'],
    ['page.productMenu.exchange', '/trading', '/images/icon-exchange.svg', 'a'],
    ['page.productMenu.app', '/app-view', '/images/icon-home.svg', 'a'],
    ['page.productMenu.cards', '/card', '/images/icon-exchange.svg', 'a'],
    ['page.productMenu.mining', '/mining', '/images/icon-exchange.svg', 'a'],
    ['page.productMenu.p2p', '/p2p', '/images/icon-otc.svg', 'a'],
    ['page.productMenu.staking', '/staking', '/images/icon-exchange.svg', 'a'],
    ['page.productMenu.defi', '/defi', '/images/icon-otc.svg', 'a'],
];
export const walletCustomCurrency = () =>  App.config.walletCustomCurrency;
export const TNCUrl = () => App.config.TNCUrl;
export const underConstruction = () => App.config.underConstruction || false;
export const considerMarketsDown = () => App.config.considerMarketsDown;
export const KycProvider = () => App.config.kyc.provider;
export const KycKey = () => App.config.kyc.key;
export const KycIsProduction = () => App.config.kyc.production;
export const KycFlow = () => App.config.kyc.flow;
export const primaryCurrency = () => App.config.primaryCurrency;
export const homePageUrl = () => App.config.homepageUrl;
