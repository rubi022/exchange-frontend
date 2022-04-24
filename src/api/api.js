export const defaultAPI = {
    api: {
        registerUrl: 'https://cp.btfd.cc/api/v2/barong/identity/users',
        loginUrl: 'https://cp.btfd.cc/api/v2/barong/identity/sessions',
        authUrl: 'http://localhost:9002/api/v2/barong',
        // tradeUrl: 'http://localhost:9002/api/v2/peatio',
        tradeUrl: 'https://cp.btfd.cc/api/v2/peatio/market/orders',
        changePassUrl: 'https://cp.btfd.cc/api/v2/barong/resource/users/password',

        marketUrl: 'https://cp.btfd.cc/api/v2/peatio/public/markets',
        balanceUrl: 'https://cp.btfd.cc/api/v2/peatio/account/balances',
        applogicUrl: 'http://localhost:9002/api/v2/applogic',
        rangerUrl: 'ws://localhost:9011/api/v2/ranger',


    },
    minutesUntilAutoLogout: '5',
    withCredentials: false,
    captcha: {
        captchaType: 'none',
        siteKey: '',
    },
    gaTrackerKey: '',
    rangerReconnectPeriod: '1',
    msAlertDisplayTime: '5000',
    incrementalOrderBook: true,
};
