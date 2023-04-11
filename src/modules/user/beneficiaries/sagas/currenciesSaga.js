
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import {currenciesData} from '../actions';
const beneficiariesOptions = {
    apiVersion: 'peatio',
};
export function* currenciesSaga(action) {
    try {
        const currencies = yield call(API.get(beneficiariesOptions), '/public/currencies');
        yield put(currenciesData({ currencies}));
    }
    catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

