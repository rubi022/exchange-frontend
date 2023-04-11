
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { beneficiaryResendPin } from '../actions';
const updateOptions = {
    apiVersion: 'peatio',
};
export function* beneficiaryResendPinSaga(action) {
    try {
        const id  = action.payload;
        const payload = yield call(API.patch(updateOptions), `/account/beneficiaries/${id}/resend_pin`, id);
        yield put(beneficiaryResendPin(payload));
        //TODO: Success message when requested for resend pin
        yield put(alertPush({ message: ['success.beneficiaries.pinResend'], type: 'success' }));
    }
    catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

