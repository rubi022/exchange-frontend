import {homePageUrl, privateRoute, publicRoute} from "../api";
export const PG_TITLE_PREFIX = window.env.name || "Exchange";

export const pgRoutes = (isLoggedIn) => {
  let routes = [
    ['page.header.navbar.header', '#', false],
    ['page.productMenu.home', homePageUrl(), true],
    ['page.header.navbar.trade', '/trading/', false],
    ['page.header.navbar.wallets', '/wallets', false],
    ['page.header.navbar.openOrders', '/orders', false],
    ['page.header.navbar.history', '/history', false],
    ['page.header.navbar.convert', '/ieo', true],
  ];
  let routesUnloggedIn = [
    ['page.header.navbar.header', '#', false],
    ['page.productMenu.home', homePageUrl(), true],
    ['page.header.navbar.trade', '/trading/', false],
    // ['page.header.navbar.mining', '/mining', true],
    ['page.header.navbar.otc', '/otc', true],
  ];

  routesUnloggedIn = routesUnloggedIn.concat(publicRoute())
  routes = routes.concat(privateRoute())

  return isLoggedIn ? routes : routesUnloggedIn;
};
export const pgButtons = (isLoggedIn) => {
  const routesUnloggedIn = [
    ['page.header.navbar.signIn', '/signin'],
    ['page.header.navbar.signUp', '/signup'],
  ];
  return isLoggedIn ? [] : routesUnloggedIn;
};
export const STORAGE_DEFAULT_LIMIT = 50;
export const ORDER_BOOK_DEFAULT_SIDE_LIMIT = 25;
export const DEFAULT_CCY_PRECISION = 4;
export const UNSUPPORTED_LANGUAGES = ['ur', 'es'];

export const colors = {
  light: {
    chart: {
      primary: 'white',
      secondary: 'white',
      grid: '#93a1bd',
      tertiary: '#919EBA',
      up: '#23ac50',
      down: '#F1432F',
    },
  },
  dark: {
    chart: {
      primary: '#0d1b32',
      secondary: '#0d1b32',
      grid: '#354360',
      tertiary: '#919EBA',
      up: '#23ac50',
      down: '#F1432F',
    },
  },
};

