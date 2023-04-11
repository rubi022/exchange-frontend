import { Button } from '@components/components';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import { LegalDocuments } from '../LegalDocuments';
class FooterComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showModal: false,
        };
        this.toggleModal = () => {
            this.setState({
                showModal: !this.state.showModal,
            });
        };
    }
    render() {
        const { showModal } = this.state;
        if (window.location.pathname.startsWith('/confirm')) {
            return React.createElement(React.Fragment, null);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("footer", { className: "parent-footer" },
                React.createElement("span", { className: "parent-footer__link", onClick: this.toggleModal },
                    React.createElement(FormattedMessage, { id: "page.footer.legalDocuments" })),
                React.createElement(LegalDocuments, { isOpen: showModal, footer: React.createElement(Button, { label: 'Ok', onClick: this.toggleModal }) }),
                React.createElement(Link, { className: "parent-footer__link", to: "/help" },
                    React.createElement(FormattedMessage, { id: "page.footer.faq" })))));
    }
}

const Footer = withRouter(FooterComponent);
export { Footer, };

