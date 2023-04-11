import update from 'immutability-helper';
import {
    BENEFICIARIES_CREATE,
    BENEFICIARIES_DELETE,
    BENEFICIARIES_UPDATE,
    BENEFICIARIES_MODAL,
    BENEFICIARIES_DATA,
    BENEFICIARY_ERROR, CURRENCIES_DATA,
} from './constants';
export const initialBeneficiariesState = {
    beneficiaries: [],
    currencies: [],
    dataLoaded: false,
    modal: {
        active: false,
    },
};
export const beneficiariesReducer = (state = initialBeneficiariesState, action) => {
    switch (action.type) {
        case BENEFICIARIES_DATA:
            return {
                ...state,
                beneficiaries: action.payload.beneficiaries,
                currencies: action.payload.currencies,
                dataLoaded: true,
            };
        case CURRENCIES_DATA:
            return {
                ...state,
                currencies: action.payload.currencies,
                dataLoaded: true,
            };
        case BENEFICIARIES_CREATE:
            return {
                ...state,
                beneficiaries: state.beneficiaries.concat(action.payload),
            };
        case BENEFICIARIES_UPDATE:
            const beneficiaryIndex = state.beneficiaries.findIndex(e => e.id === action.payload.id);
            const beneficiaries = update(state.beneficiaries, {
                [beneficiaryIndex]: {
                    state: { $set: action.payload.state },
                },
            });
            return {
                ...state,
                beneficiaries,
            };
        case BENEFICIARIES_DELETE:
            return {
                ...state,
                beneficiaries: state.beneficiaries.filter(beneficiary => beneficiary.id !== action.payload.id),
            };
        case BENEFICIARIES_MODAL:
            return {
                ...state,
                modal: action.payload,
            };
        case BENEFICIARY_ERROR:
            return {
                ...state,
                dataLoaded: true,
            };
        default:
            return state;
    }
};

