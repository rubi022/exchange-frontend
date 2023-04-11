import {put} from "redux-saga/effects";
import {hideEmptyWallets} from "../actions";
import {alertPush} from "../../../public/alert";

export function* hideEmptyWalletsSaga(action) {
    try {
        // yield call(API.post(walletsWithdrawCcyOptions), '/account/withdraws', action.payload);
        yield put(hideEmptyWallets({hideEmptyWallet: action.payload}));
        localStorage.setItem("hideEmptyWallets", String(action.payload));
    }
    catch (error) {
        yield put(hideEmptyWallets({hideEmptyWallet: false}));
    }
}
