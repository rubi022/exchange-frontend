import { SEND_DOCUMENTS_DATA, SEND_DOCUMENTS_ERROR, SEND_DOCUMENTS_FETCH, FETCH_DOCUMENTS_ERROR, FETCH_DOCUMENTS_FETCH, FETCH_DOCUMENTS_DATA } from './constants';
export const initialDocumentsState = { loading: false, data: [] };
export const documentsReducer = (state = initialDocumentsState, action) => {
    switch (action.type) {
        case SEND_DOCUMENTS_FETCH:
            return {
                ...state,
                success: undefined,
                error: undefined,
                loading: true,
            };
        case SEND_DOCUMENTS_DATA:
            return {
                ...state,
                success: action.payload.message,
                error: undefined,
                loading: false,
            };
        case SEND_DOCUMENTS_ERROR:
            return {
                ...state,
                success: undefined,
                error: action.payload,
                loading: false,
            };
        case FETCH_DOCUMENTS_ERROR:
            return {
                ...state,
                success: undefined,
                error: action.payload,
                loading: false,
            };
        case FETCH_DOCUMENTS_FETCH:
            return {
                ...state,
                success: undefined,
                error: undefined,
                loading: true,
            };
        case FETCH_DOCUMENTS_DATA:
            return {
                ...state,
                success: action.payload.message,
                loading: false,
                data: action.payload.data,
            };
        default:
            return state;
    }
};

