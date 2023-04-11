import { call, put } from 'redux-saga/effects';
import { API, defaultStorageLimit } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { failHistory, successHistory } from '../actions';
const config = {
    apiVersion: 'peatio',
    withHeaders: true,
};
export function* historySaga(action) {
    try {
        const { page, currency, type, limit } = action.payload;
        const coreEndpoint = {
            deposits: '/account/deposits',
            withdraws: '/account/withdraws',
            trades: '/market/trades',
        };
        const currencyParam = currency ? `&currency=${currency}` : '';
        const { data, headers } = yield call(API.get(config), `${coreEndpoint[type]}?limit=${limit}&page=${page + 1}${currencyParam}`);
        let updatedData = data;
        if (type === 'trades') {
            updatedData = data.slice(0, defaultStorageLimit());
        }
        let newHeaders = headers.total
        try {
            if (!newHeaders && data.length === limit) {
                const testData = yield call(API.get(config), `${coreEndpoint[type]}?limit=${limit}&page=${page + 2}${currencyParam}`);
                if (testData.data.length >= 1) {
                    newHeaders = Number(limit) * (page + 2)
                }
            }
        } catch (error) {
            //
        }
        yield put(successHistory({ list: updatedData, page, fullHistory: newHeaders }));
    }
    catch (error) {
        yield put(failHistory([]));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

