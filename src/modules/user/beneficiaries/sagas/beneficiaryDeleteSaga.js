
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { beneficiaryDelete, beneficiariesModal } from '../actions';
const deleteOptions = {
    apiVersion: 'peatio',
};
export function* beneficiaryDeleteSaga(action) {
    try {
        const { id } = action.payload;
        yield call(API.delete(deleteOptions), `/account/beneficiaries/${id}`);
        yield put(beneficiaryDelete({ id }));
        yield put(alertPush({ message: ['success.beneficiaries.deleted'], type: 'success' }));
    }
    catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
    finally {
        yield put(beneficiariesModal({ active: false }));
    }
}

