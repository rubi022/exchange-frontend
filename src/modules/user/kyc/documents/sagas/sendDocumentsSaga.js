
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { alertPush } from '../../../../public/alert';
import {fetchDocumentsData, fetchDocumentsError, sendDocumentsData, sendDocumentsError} from '../actions';
const sessionsConfig = {
    apiVersion: 'barong',
};
export function* sendDocumentsSaga(action) {
    try {
        const response = yield call(API.post(sessionsConfig), '/resource/documents', action.payload);
        const defaultMessage = 'success.documents.accepted';
        const { message = defaultMessage } = response;
        yield put(sendDocumentsData({ message }));
        yield put(alertPush({ message: [defaultMessage], type: 'success' }));
    }
    catch (error) {
        yield put(sendDocumentsError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}
export function* fetchDocumentsSaga(action) {
    try {
        const response = yield call(API.get(sessionsConfig), '/resource/documents', action.payload);
        const defaultMessage = 'success.documents.fetched';
        const { message = defaultMessage } = response;
        yield put(fetchDocumentsData({ message, data: response }));
        // yield put(alertPush({ message: [defaultMessage], type: 'success' }));
    }
    catch (error) {
        yield put(fetchDocumentsError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

