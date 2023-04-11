import {
    BENEFICIARIES_CREATE,
    BENEFICIARIES_CREATE_FETCH,
    BENEFICIARIES_DELETE,
    BENEFICIARIES_DELETE_FETCH,
    BENEFICIARIES_UPDATE,
    BENEFICIARIES_UPDATE_FETCH,
    BENEFICIARIES_MODAL,
    BENEFICIARIES_DATA,
    BENEFICIARY_FETCH,
    BENEFICIARY_ERROR,
    CURRENCIES_FETCH,
    CURRENCIES_DATA, BENEFICIARY_RESEND_PIN_FETCH, BENEFICIARY_RESEND_PIN
} from './constants';
export const currenciesFetch = (payload) => ({
    type: CURRENCIES_FETCH,
    payload,
});
export const currenciesData = (payload) => ({
    type: CURRENCIES_DATA,
    payload,
});
const BENEFICIARIES_ALGORITHM = 'HS256';
export const beneficiariesFetch = (payload) => ({
    type: BENEFICIARY_FETCH,
    payload,
});

export const beneficiariesError = (payload) => ({
    type: BENEFICIARY_ERROR,
    payload,
});
export const beneficiariesData = (payload) => ({
    type: BENEFICIARIES_DATA,
    payload,
});
export const beneficiaryCreateFetch = (payload) => ({
    type: BENEFICIARIES_CREATE_FETCH,
    payload: {
        ...payload,
        algorithm: BENEFICIARIES_ALGORITHM,
    },
});
export const beneficiaryCreate = (payload) => ({
    type: BENEFICIARIES_CREATE,
    payload,
});
export const beneficiaryUpdateFetch = (payload) => ({
    type: BENEFICIARIES_UPDATE_FETCH,
    payload,
});
export const beneficiaryUpdate = (payload) => ({
    type: BENEFICIARIES_UPDATE,
    payload,
});
export const beneficiaryDeleteFetch = (payload) => ({
    type: BENEFICIARIES_DELETE_FETCH,
    payload,
});
export const beneficiaryDelete = (payload) => ({
    type: BENEFICIARIES_DELETE,
    payload,
});
export const beneficiariesModal = (payload) => ({
    type: BENEFICIARIES_MODAL,
    payload,
});

export const beneficiaryResendPinFetch = (payload) => ({
    type: BENEFICIARY_RESEND_PIN_FETCH,
    payload,
})

export const beneficiaryResendPin = (payload) => ({
    type: BENEFICIARY_RESEND_PIN,
    payload,
})

