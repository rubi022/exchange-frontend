import { delay } from 'redux-saga';

import { call, put } from 'redux-saga/effects';
import { userReset } from '../../../';
import { msAlertDisplayTime } from '../../../../api';
import { alertData, alertDelete } from '../actions';
export function* handleAlertSaga(action) {
    if (action.payload.type === 'error') {
        switch (action.payload.code) {
            case 401:
                if (action.payload.message.indexOf('identity.session.not_active') > -1) {
                    yield put(userReset());
                    yield put(alertData(action.payload));
                    return;
                }
                else {
                    if (action.payload.message.indexOf('authz.invalid_session') > -1) {
                        yield put(userReset());
                    }
                    else {
                        yield call(callAlertData, action);
                        break;
                    }
                }
                break;
            case 403:
                if (action.payload.message.indexOf('identity.session.invalid_otp') > -1) {
                    yield call(callAlertData, action);
                }
                if (action.payload.message.indexOf('identity.session.missing_otp') > -1) {
                    yield call(callAlertData, action);
                }
                if (action.payload.message.indexOf('jwt.decode_and_verify') > -1) {
                    yield call(callAlertData, action);
                }
                if (action.payload.message.indexOf('account.withdraw.not_permitted') > -1) {
                    yield call(callAlertData, action);
                }
                return;
            default:
                yield call(callAlertData, action);
        }
    }
    else {
        yield call(callAlertData, action);
    }
}
function* callAlertData(action) {
    yield put(alertData(action.payload));
    yield delay(parseFloat(msAlertDisplayTime()));
    yield put(alertDelete());
}

