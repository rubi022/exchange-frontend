export * from './preciseNumber';
export * from './localeDate';
export * from './localeFullDate';
export * from './sliceString';
export * from './uppercase';
export * from './filterData';
export * from './emailValidation';
export * from './timezone';
export * from './localeDateSec';
export * from './historyTableUtils';
export * from './setTradeColor';
export * from './accumulateVolume';
export * from './calcMaxVolume';
export * from './sortByPrice';
export * from './getLanguageByCode';
export * from './checkDate';
export * from './sortByDate';
export * from './getUrlPart';
export * from './setDocumentTitle';
export * from './getTotalPrice';
export * from './capitalize';
export * from './timeConvert';
export * from './queryEncoder';
export * from "./sortMarketTabs";
export * from "./estimateValueBase";
export * from "./handleCCYPrecision";

export * from './sliceArray';
export * from './handleIncrementalUpdate';

// Username 4-20 characters long, no _ and . allowed
export const USERNAME_REGEX = /^(?=.{4,20}$)[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/

// STRONG PASSWORD REGEX
// export const PASSWORD_REGEX=/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/ ;

export const PASSWORD_REGEX = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){0})(?=.*\d)((?=.*[A-z]){1}).*$/;
export const EMAIL_REGEX = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
export const ERROR_INVALID_USERNAME = 'page.header.signUp.usernameLength.message.error';
export const ERROR_INVALID_PASSWORD = 'page.header.signUp.password.message.error';
export const ERROR_INVALID_EMAIL = 'page.header.signUp.email.message.error';
export const ERROR_PASSWORD_CONFIRMATION = 'page.header.signUp.confirmPassword.message.error';
export const ERROR_EMPTY_PASSWORD = 'page.header.signIn.password.message.error';
export const uppercase = (data) => { return data.toUpperCase() };
const makerTypeMap = {
    ask: 'sell',
    bid: 'buy',
};
export const kindToMakerType = (kind) => makerTypeMap[kind];

export const darkHeaders = [
    'trading',
    'signin',
    'forgot-password',
    'signup'
]
export const isTradePage = () => {
    const { pathname } = window.location;
    if (pathname === '/') return true;
    return darkHeaders.filter(v => pathname.includes(v))[0];
}
export const isTradePages = isTradePage()
