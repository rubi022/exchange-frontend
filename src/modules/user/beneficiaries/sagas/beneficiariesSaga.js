
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import {beneficiariesModal, beneficiariesData, beneficiariesError} from '../actions';
const beneficiariesOptions = {
    apiVersion: 'peatio',
};
export function* beneficiariesSaga(action) {
    try {
        const beneficiaries = yield call(API.get(beneficiariesOptions), `/account/beneficiaries`);
        const currencies = yield call(API.get(beneficiariesOptions), '/public/currencies');
        yield put(beneficiariesData({beneficiaries, currencies}));
    }
    catch (error) {
        if (error.message[0] !== 'account.withdraw.not_permitted'){
            yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
        }
        yield put(beneficiariesError({}));
    }
}

