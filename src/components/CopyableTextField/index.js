import '@components/cryptofonts';
import * as React from 'react';
import {alertPush} from "../../modules";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import copy from 'copy-to-clipboard';
import QRCode from "qrcode.react";

/**
 * Text field component with ability to copy inner text.
 */
class CopyableTextField extends React.Component {
    componentDidMount() {
        if (!this.props.fieldId) {
            throw new Error('CopyableTextField must contain `fieldId` prop');
        }
    }
    render() {
        const { value, disabled, fieldId, copyMessage, showQr,widthProp} = this.props;
        const doCopy = () => {
            copy(value);
            this.props.fetchSuccess({ message: copyMessage ? copyMessage : ['page.body.copy.success'], type: 'success' });
        };
        const qr = showQr ?
        (
            React.createElement("div", {className: "referral_qr"},
                    React.createElement("input",{id: "zoomCheck", type:"checkbox", className: "zoomCheck"} ),
                    React.createElement("label",{htmlFor:"zoomCheck"},
                        <QRCode value={value} size={26} renderAs={'svg'}/>
                    )
                )
        )
        : React.createElement("em", {className: "fas fa-link"});
        return (
        React.createElement("div", {className: "copy-wrap mgb-0-5x w-100"},
            React.createElement("span", {className: "copy-feedback"}),
            // React.createElement("em", {className: "fas fa-link"}),
            qr,
            React.createElement("input", {className: "copy-address", style:{ width: widthProp, float:`right`}, id: String(fieldId), readOnly: true, type: "text", value: value, onClick: doCopy, disabled: disabled}),
            React.createElement("button", {className: "copy-trigger copy-clipboard base-copyable-text-field__button", onClick: (copyMessage) => doCopy(), disabled: disabled},
            React.createElement("em", {className: "ti ti-files"})),
        )
    );
    }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
    fetchSuccess: payload => dispatch(alertPush(payload)),
});
const connected = injectIntl(connect(mapStateToProps, mapDispatchToProps)(CopyableTextField));

const   CopyableTextFields = withRouter(connected);
export { CopyableTextFields as CopyableTextField, };

