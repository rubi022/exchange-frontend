import {call, put, select} from 'redux-saga/effects';
import { API } from '../../../../api';
import { userPayableCurrencySuccess,} from '../actions';
import {alertPush} from "../../../public/alert";

const memberOptions = {
    apiVersion: 'peatio',
};
const getUser = (state) => { return state.user.profile.userData.user };

export function* memberSaga() {
    try {
        const user = yield select(getUser);
        const memberInfo = yield call(API.get(memberOptions), `/account/me`);
        user.payable_currency = memberInfo.fee_currency;
        user.group = memberInfo.group;
        const payload = {
            user: user,
        };
        yield put(userPayableCurrencySuccess(payload));
    }
    catch (error) {
        yield put(alertPush({ message: error.message, type: 'error' }));
    }
}
