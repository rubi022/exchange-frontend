
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../api';
import { userData, userError, } from '../actions';
import {signUpRequireVerification} from "../../auth";
const userOptions = {
    apiVersion: 'barong',
};
const memberOptions = {
    apiVersion: 'peatio',
};
export function* userSaga() {
    try {
        // const memberInfo = yield call(API.get(memberOptions), `/admin/members/${user.uid}`);
        const user = yield call(API.get(userOptions), '/resource/users/me');
        // user.payable_currency = memberInfo.payable_currency;
        if(user.level === 0) {
            yield put(signUpRequireVerification({ requireVerification: true, email: user.email }));
            yield put(userError({ message: ['page.header.signUp.modal.header'], code: 401, type: 'error' }));
            return;
        }
        const payload = {
            user: user,
        };
        yield put(userData(payload));
    }
    catch (error) {
        yield put(userError(error));
    }
}

