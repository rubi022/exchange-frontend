
import { call, put, select } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { alertPush } from '../../../../public/alert';
import { sendIdentityData, sendIdentityError } from '../actions';
import {selectUserInfo} from "../../../profile";
import {selectLabelData} from "../../label";
const sessionsConfig = {
    apiVersion: 'barong',
};
const userProfile = (data) => data.profile.first_name || data.profile.last_name || data.profile.dob || data.profile.address || data.profile.postcode || data.profile.city || data.profile.country
export function* sendIdentitySaga(action) {
    try {
        const data = yield select(selectLabelData);
        let response;
        if(data.find(w => w.key === 'profile')) {
            response = yield call(API.put(sessionsConfig), '/resource/profiles', action.payload);
        } else {
            response = yield call(API.post(sessionsConfig), '/resource/profiles', action.payload);
        }
        const defaultMessage = 'success.identity.submitted';
        const { message = defaultMessage } = response;
        yield put(sendIdentityData({ message }));
        yield put(alertPush({ message: [defaultMessage], type: 'success' }));
    }
    catch (error) {
        yield put(sendIdentityError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

