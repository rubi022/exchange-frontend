
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { beneficiaryCreate, beneficiariesModal } from '../actions';
const createOptions = {
    apiVersion: 'peatio',
};
export function* beneficiaryCreateSaga(action) {
    try {
        const beneficiary = yield call(API.post(createOptions), '/account/beneficiaries', action.payload);
        yield put(beneficiaryCreate(beneficiary));
        yield put(alertPush({ message: ['success.beneficiaries.created'], type: 'success' }));
        yield put(beneficiariesModal({ active: false}));
    }
    catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
        yield put(beneficiariesModal({ active: false }));
    }
}

