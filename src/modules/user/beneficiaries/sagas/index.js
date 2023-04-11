
import { takeEvery } from 'redux-saga/effects';
import {
    BENEFICIARIES_CREATE_FETCH,
    BENEFICIARIES_DELETE_FETCH,
    BENEFICIARIES_UPDATE_FETCH,
    BENEFICIARY_FETCH, BENEFICIARY_RESEND_PIN_FETCH,
    CURRENCIES_FETCH
} from '../constants';
import { beneficiaryCreateSaga } from './beneficiaryCreateSaga';
import { beneficiaryDeleteSaga } from './beneficiaryDeleteSaga';
import { beneficiariesSaga } from './beneficiariesSaga';
import { beneficiaryUpdateSaga } from './beneficiaryUpdateSaga';
import {currenciesSaga} from "./currenciesSaga";
import {beneficiaryResendPinSaga} from "./beneficiariesResendPinSaga";
export function* rootBeneficiariesSaga() {
    yield takeEvery(BENEFICIARY_FETCH, beneficiariesSaga);
    yield takeEvery(BENEFICIARIES_CREATE_FETCH, beneficiaryCreateSaga);
    yield takeEvery(BENEFICIARIES_UPDATE_FETCH, beneficiaryUpdateSaga);
    yield takeEvery(BENEFICIARIES_DELETE_FETCH, beneficiaryDeleteSaga);
    yield takeEvery(CURRENCIES_FETCH, currenciesSaga);
    yield takeEvery(BENEFICIARY_RESEND_PIN_FETCH, beneficiaryResendPinSaga);
}

