import {
    FETCH_DOCUMENTS_DATA, FETCH_DOCUMENTS_ERROR,
    FETCH_DOCUMENTS_FETCH,
    SEND_DOCUMENTS_DATA,
    SEND_DOCUMENTS_ERROR,
    SEND_DOCUMENTS_FETCH,
} from './constants';
export const sendDocuments = (payload) => ({
    type: SEND_DOCUMENTS_FETCH,
    payload,
});
export const sendDocumentsData = (payload) => ({
    type: SEND_DOCUMENTS_DATA,
    payload,
});
export const sendDocumentsError = (payload) => ({
    type: SEND_DOCUMENTS_ERROR,
    payload,
});
export const fetchDocuments = (payload) => ({
    type: FETCH_DOCUMENTS_FETCH,
    payload,
});
export const fetchDocumentsData = (payload) => ({
    type: FETCH_DOCUMENTS_DATA,
    payload,
});
export const fetchDocumentsError = (payload) => ({
    type: FETCH_DOCUMENTS_ERROR,
    payload,
});

