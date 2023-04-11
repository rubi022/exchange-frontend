
import { call, put, select } from 'redux-saga/effects';
import { API } from '../../../../api';
import { alertPush } from '../../../index';
import { ordersCancelAllData, ordersCancelAllError, } from '../actions';
import { selectOrdersHistory } from '../selectors';
const ordersCancelAllOptions = {
    apiVersion: 'peatio',
};
export function* ordersCancelAllSaga(action) {
    try {
        yield call(API.post(ordersCancelAllOptions), '/market/orders/cancel');
        const { tab } = action.payload;
        let list = [];
        if (tab === 'all') {
            const actualList = yield select(selectOrdersHistory);
            list = actualList.map(order => {
                if (order.state === 'wait') {
                    order.state = 'cancel';
                }
                return order;
            });
        }
        yield put(ordersCancelAllData(list));
        yield put(alertPush({ message: ['success.order.canceled.all'], type: 'success' }));
    }
    catch (error) {
        yield put(ordersCancelAllError());
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

