import * as React from 'react';
const QR_CODE_GENERATOR_URL = 'https://api.qrserver.com/v1/create-qr-code/';
const QRCodeURL = process.env.QR_CODE_GENERATOR || QR_CODE_GENERATOR_URL;
/**
 * Component for displaying QR code.
 */
const QRCode = (props) => {
    const getImageSize = (type) => {
        switch (type) {
            case 'lg': {
                return '180x180';
            }
            case 'md': {
                return '118x118';
            }
            case 'sm': {
                return '50x50';
            }
            default: {
                return '118x118';
            }
        }
    };
    const getQRCodeURL = (d, size) => `${QRCodeURL}?data=${encodeURI(d)}&size=${getImageSize(size)}`;
    const { data = '', dimensions, alt } = props;
    return (React.createElement("div", { className: "qr-code" },
        React.createElement("img", { className: "qr-code__img", src: getQRCodeURL(data, dimensions), alt: alt || data })));
};
export { QRCode, };
