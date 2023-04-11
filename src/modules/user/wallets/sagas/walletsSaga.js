
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { walletsData, walletsError } from '../actions';
const walletsOptions = {
    apiVersion: 'peatio',
};
const currenciesOptions = {
    apiVersion: 'peatio',
};
export function* walletsSaga() {
    try {
        let beneficiaries;
        const accounts = yield call(API.get(walletsOptions), '/account/balances');
        const currencies = yield call(API.get(currenciesOptions), '/public/currencies');
        try {
            beneficiaries = yield call(API.get(walletsOptions), '/account/beneficiaries');
        } catch (e) {
            beneficiaries = [];
        }
        const fees = currencies.map(currency => {
            let walletInfo = accounts.find(wallet => wallet.currency === currency.id);
            const beneficiaryInfo = beneficiaries.filter(item => item.currency === currency.id);

            if (!walletInfo) {
                walletInfo = {
                    currency: currency.id,
                    balance: 0,
                    locked: 0,
                };
            }

            return ({
                ...walletInfo,
                name: currency.name,
                explorerTransaction: currency.explorer_transaction,
                explorerAddress: currency.explorer_address,
                fee: currency.withdraw_fee,
                deposit_fee: currency.deposit_fee,
                type: currency.type,
                fixed: currency.precision,
                iconUrl: currency.icon_url,
                beneficiaries: beneficiaryInfo
            });
        });
        yield put(walletsData(fees));
    }
    catch (error) {
        yield put(walletsError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

