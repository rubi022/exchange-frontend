import CheckIcon from "../assets/images/check.svg";
import CloseRed from "../assets/images/close-circular-button-symbol.svg";

export const depositColorMapping = {
    accepted: 'var(--color-green)',
    collected: 'var(--color-green)',
    submitted: '',
    canceled: 'var(--color-red)',
    rejected: 'var(--color-red)',
};

export const depositIconMapping = {
    accepted: CheckIcon,
    collected: CheckIcon,
    submitted: '',
    canceled: CloseRed,
    rejected: CloseRed,
};

export const withdrawColorMapping = {
    prepared: '',
    submitted: '',
    canceled: 'var(--color-red)',
    accepted: 'var(--color-green)',
    suspected: '',
    rejected: 'var(--color-red)',
    processing: '',
    succeed: 'var(--color-green)',
    failed: 'var(--color-red)',
    confirming: '',
};

export const withdrawIconsMapping = {
    prepared: '',
    submitted: '',
    canceled: CheckIcon,
    accepted: CheckIcon,
    suspected: '',
    rejected: CloseRed,
    processing: '',
    succeed: CheckIcon,
    failed: CloseRed,
    confirming: '',
};
export const tradesColorMapping = {
    sell: {
        color: 'var(--color-red)',
        text: 'Sell',
    },
    buy: {
        color: 'var(--color-green)',
        text: 'Buy',
    },
};
export const orderStatusColorMapping = {
    done: "var(--color-green)",
    reject: "var(--color-red)",
    // cancel: "var(--color-red)",
};

export const setDepositStatusColor = (status) => depositColorMapping[status];
export const setDepositIcon = (status) => depositIconMapping[status];
export const setWithdrawStatusColor = (status) => withdrawColorMapping[status];
export const setWithdrawIcon = (status) => withdrawIconsMapping[status];
export const setTradesType = (type) => tradesColorMapping[type] || { color: '', text: '' };
export const setOrderStateColor = (status) => orderStatusColorMapping[status];

