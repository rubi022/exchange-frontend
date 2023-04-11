//TODO: Deprecated API Values REF: https://github.com/rubykube/peatio/blob/master/docs/api/websocket_api.md Order Event
const convertMakerType = (kind) => {
    if(kind === 'ask') return 'sell';
    if(kind === 'bid') return 'buy';
    return kind;
};
const makerTypeMap = {
    ask: 'sell',
    bid: 'buy',
};
export const kindToMakerType = (kind) => convertMakerType(kind);

