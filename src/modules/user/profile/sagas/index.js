
import {take, takeEvery} from 'redux-saga/effects';
import {
    CHANGE_USER_CURRENCY_FETCH,
    PROFILE_CHANGE_PASSWORD_FETCH,
    PROFILE_GENERATE_2FA_QRCODE_FETCH,
    PROFILE_TIERS_FETCH,
    PROFILE_TOGGLE_2FA_FETCH,
    PROFILE_USER_FETCH, USER_CURRENCY_FETCH,
} from '../constants';
import { changePasswordSaga } from './changePasswordSaga';
import { generate2faQRSaga } from './generate2faQRSaga';
import { tiersSaga } from './tiersSaga';
import { toggle2faSaga } from './toggle2faSaga';
import { userSaga } from './userSaga';
import {changeUserPayableCurrencySaga} from "./changePayableCurrencySaga";
import {memberSaga} from "./memberSaga";
export function* rootProfileSaga() {
    yield takeEvery(PROFILE_CHANGE_PASSWORD_FETCH, changePasswordSaga);
    yield takeEvery(PROFILE_GENERATE_2FA_QRCODE_FETCH, generate2faQRSaga);
    yield takeEvery(PROFILE_TOGGLE_2FA_FETCH, toggle2faSaga);
    yield takeEvery(PROFILE_TIERS_FETCH, tiersSaga);
    yield takeEvery(PROFILE_USER_FETCH, userSaga);
    yield takeEvery(CHANGE_USER_CURRENCY_FETCH, changeUserPayableCurrencySaga);
    yield takeEvery(USER_CURRENCY_FETCH, memberSaga);
}

