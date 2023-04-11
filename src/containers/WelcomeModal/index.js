import * as React from 'react';
import {Modal} from "../../components/Modal";
import {useState} from "react";
import RightArrow from '../../assets/images/arrow-pointing-to-right.svg';

export const WelcomeModal = () => {
    const [isOpen, setModalOpen] = useState(true);
    const handleAcceptButton = () => {
        localStorage.setItem('cookies-accepted', 'true');
        setModalOpen(false)
    }

    const modalBody = () => {
        return (
            <div className={'text-justify'}>
                <p>
                    Thank you for visiting, an innovative platform for crypto asset management.
                </p>
                <p>
                    Mining in CM.MP and trading on CM.EX via the Crypto Mainframe wallet are due to be launched in 2021. Our solution is currently undergoing rigorous internal testing before an independent security audit.
                </p>
                <p>
                    Register now for access to crypto asset trading games, comprehensive news coverage and market data analysis. Accounts registered before January 31st will be offered exclusive deals on Crypto Mainframe services and entered into an Early Registration Prize Draw.
                </p>
                <p>
                    We and our partners store and/or access information on a device, such as unique IDs in cookies to process personal data including geolocation data and other device characteristics. Please read our <a className={'welcome-text-links'} href={'/terms-of-use'}>Terms of Use</a> and <a className={'welcome-text-links'} href={'/privacy-policy'}>Privacy Policy</a> (as well as cookie policy included therein) and confirm your agreement to access the Crypto Mainframe Platform.
                </p>
            </div>
        )
    }

    const modalFooter = () => {
        return (
            <div className={'d-flex justify-content-around px-4 py-2'}>
                <a href={'/terms-of-use'}>
                    <button className={'btn btn-welcome-custom'}>See Terms of Use <img className={'welcome-arrow-icon'} src={RightArrow} alt={'right-arrow'}/></button>
                </a>
                <button className={'btn btn-primary'} onClick={() => handleAcceptButton()}>
                    I Accept
                </button>
            </div>
        )
    }

    const modalHeader = () => {
        return (
            <h3 className={'text-center'}>
                WELCOME TO CRYPTO MAINFRAME
            </h3>
        )
    }

    return (
        <Modal
            show={isOpen}
            header={modalHeader()}
            content={modalBody()}
            footer={modalFooter()}
            className={'welcome-modal__wrapper'}
        />
    )
}
