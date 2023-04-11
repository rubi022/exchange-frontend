
import { call, put } from 'redux-saga/effects';
import { alertPush } from '../../..';
import { API } from '../../../../api';
import { convertOrderAPI } from '../../openOrders/helpers';
import { userOrdersHistoryData, userOrdersHistoryError, } from '../actions';
const ordersOptions = {
    apiVersion: 'peatio',
    withHeaders: true,
};
export function* ordersHistorySaga(action) {
    try {
        const { pageIndex, limit, type } = action.payload;
        const params = `limit=${limit}&page=${pageIndex + 1}${type === 'all' ? '' : '&state=wait'}`;
        const { data, headers } = yield call(API.get(ordersOptions), `/market/orders?${params}`);
        let newHeaders = headers.total
        try {
            if (!newHeaders && data.length === limit) {
                const testParams = `limit=${limit}&page=${pageIndex + 2}${type === 'all' ? '' : '&state=wait'}`;
                const testData = yield call(API.get(ordersOptions), `/market/orders?${testParams}`);
                if (testData.data.length >= 1) {
                    newHeaders = Number(limit) * (pageIndex + 2)
                }
            }
        } catch (err) {
            //
        }
        const list = data.map(convertOrderAPI);
        yield put(userOrdersHistoryData({ list, pageIndex, total: newHeaders }));
    }
    catch (error) {
        yield put(userOrdersHistoryError());
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

