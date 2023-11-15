export const defaultAPI = {
    api: {
        authUrl: 'https://cp.coins.st/api/v2/barong',
        tradeUrl: 'https://cp.coins.st/api/v2/peatio',
        applogicUrl: 'https://cp.coins.st/api/v2/applogic',
        rangerUrl: 'wss://cp.coins.st/api/v2/ranger',
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
