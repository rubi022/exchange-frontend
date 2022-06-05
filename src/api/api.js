export const defaultAPI = {
    api: {
        authUrl: 'https://cp.btfd.cc/api/v2/barong',
        tradeUrl: 'https://cp.btfd.cc/api/v2/peatio',
        applogicUrl: 'https://cp.btfd.cc/api/v2/applogic',
        rangerUrl: 'wss://cp.btfd.cc/api/v2/ranger',
    },
    minutesUntilAutoLogout: '30',
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
