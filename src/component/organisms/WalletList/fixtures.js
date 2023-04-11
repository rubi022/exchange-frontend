import { currencyCodes } from '@components/cryptofonts';
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min) + min);
// tslint:disable-next-line:no-magic-numbers
const randomOneSomething = () => Math.floor(Math.random() * 1000) / 1000;
// tslint:disable-next-line:no-magic-numbers
const randomAddress = () => Math.random().toString(36).substring(7);
const randomCode = () => {
    const codes = currencyCodes();
    return codes[randomInteger(0, codes.length)];
};
export const walletItems = (count) => Array(count).fill(0).map((_, i) => ({
    active: false,
    address: randomAddress(),
    amount: randomOneSomething(),
    currency: randomCode(),
    // tslint:disable-next-line:no-magic-numbers
    fee: randomInteger(0, 0.5),
    // tslint:disable-next-line:no-magic-numbers
    locked: 20,
    type: 'coin',
}));
