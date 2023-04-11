import {call, put, select} from "redux-saga/effects";
import {API} from "../../../../api";
import {signUpRequireVerification} from "../../auth";
import {userData, userError} from "../actions";
import {selectUserInfo} from "../selectors";
import {alertPush} from "../../../public/alert";

const memberOptions = {
    apiVersion: 'peatio',
};
const getUser = (state) => { return state.user.profile.userData.user };
export function* changeUserPayableCurrencySaga(action) {
    try {
        const user = yield select(getUser);
        const memberInfo = yield call(API.post(memberOptions), `/account/fee_currency`, action.payload);
        user.payable_currency = memberInfo.fee_currency;
        const payload = {
            user: user,
        };
        yield put(userData(payload));
        yield put(alertPush({ message: ['success.payable_currency.updated'], type: 'success' }));
    }
    catch (error) {
        yield put(userError(error));
        yield put(alertPush({ message: error.message, type: 'error' }));
    }
}
