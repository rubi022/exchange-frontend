
import { takeEvery } from 'redux-saga/effects';
import {FETCH_EMPTY_WALLET_VAR, WALLETS_ADDRESS_FETCH, WALLETS_FETCH, WALLETS_WITHDRAW_CCY_FETCH,} from '../constants';
import { walletsAddressSaga } from './walletsAddressSaga';
import { walletsSaga } from './walletsSaga';
import { walletsWithdrawCcySaga } from './walletsWithdrawSaga';
import {hideEmptyWalletsSaga} from "./hideEmptyWalletsSaga";
export function* rootWalletsSaga() {
    yield takeEvery(WALLETS_FETCH, walletsSaga);
    yield takeEvery(WALLETS_ADDRESS_FETCH, walletsAddressSaga);
    yield takeEvery(WALLETS_WITHDRAW_CCY_FETCH, walletsWithdrawCcySaga);
    yield takeEvery(FETCH_EMPTY_WALLET_VAR, hideEmptyWalletsSaga);
}

