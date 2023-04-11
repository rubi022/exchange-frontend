
import { takeEvery } from 'redux-saga/effects';
import {FETCH_DOCUMENTS_FETCH, SEND_DOCUMENTS_FETCH,} from '../constants';
import {fetchDocumentsSaga, sendDocumentsSaga} from './sendDocumentsSaga';
export function* rootSendDocumentsSaga() {
    yield takeEvery(SEND_DOCUMENTS_FETCH, sendDocumentsSaga);
    yield takeEvery(FETCH_DOCUMENTS_FETCH, fetchDocumentsSaga);
}

