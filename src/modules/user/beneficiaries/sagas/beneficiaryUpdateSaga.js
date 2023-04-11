
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { beneficiariesModal, beneficiaryUpdate } from '../actions';
const updateOptions = {
    apiVersion: 'peatio',
};
export function* beneficiaryUpdateSaga(action) {
    try {
        const { id, pin } = action.payload;
        const updatedApiKey = yield call(API.patch(updateOptions), `/account/beneficiaries/${id}/activate`, {pin: pin});
        yield put(beneficiaryUpdate(updatedApiKey));
        yield put(alertPush({ message: ['success.beneficiaries.updated'], type: 'success' }));
    }
    catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
    finally {
        yield put(beneficiariesModal({ active: false }));
    }
}

