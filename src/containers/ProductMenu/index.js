import * as React from 'react';
import {languages, productList} from './../../api/config';
import {CloseIcon} from '../../assets/images/CloseIcon';
import {connect} from 'react-redux';
import {
    changeLanguage,
    selectCurrentLanguage,
    selectUserInfo,
    logoutFetch,
    selectUserLoggedIn, changeColorTheme
} from '../../modules';
import {injectIntl} from 'react-intl';
import {selectCurrentTheme} from "../../modules/public/generic";
import {ProductMenuIcon} from './ProductMenuIcon'
import {withRouter} from 'react-router-dom';
class ProductMenuComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            isOpen: false,
            isLanguageOpen: false,
        };
        this.getList = () => {
            return (
                <React.Fragment>
                    {productList().map(element => {
                        const [name, link, iconUrl, isExternal] = element;
                        return (
                            <div className={'product-menu-list-element__wrapper'}>
                                <a
                                    className={'product-menu-list-element'}
                                    href={link}
                                >
                                <span className={'product-menu-list-element__icon-wrapper'}>
                                    <ProductMenuIcon name={name} className="product-menu-list-element__icon" />
                                </span>
                                    <span className={'product-menu-list-element__name'}>
                                    {this.props.intl.formatMessage({id: name}).toUpperCase()}
                                </span>
                                </a>
                            </div>
                        );
                    })}
                </React.Fragment>
            );
        }

        this.handleScreen = () => {
            this.setState({
                windowWidth: window.innerWidth,
            });
        }

        this.handleOpenCloseMenu = () => {
            const { windowWidth } = this.state;

            if (windowWidth > 768) {
                return;
            }

            this.setState(prevState => ({
                isOpen: !prevState.isOpen,
            }));
        }

        this.getLanguageDropdown = () => {
            const { currentLanguage } = this.props;

            return (
                <div className={'product-menu-language-dropdown_wrapper'}>
                    <div className={'product-menu-language__info'} onClick={() => this.handleOpenCloseLanguage()}>
                        <div className={'product-menu-language__text'}>
                            Language:
                        </div>
                        <div className={'product-menu-language__selected-wrapper'}>
                        <span className={'product-menu-language__selected'}>
                            {currentLanguage && currentLanguage.toUpperCase()}
                        </span>
                        </div>
                    </div>
                    {this.getLanguageList()}
                </div>
            );
        }

        this.handleLogOut = () => {
            this.setState({
                isOpen: false,
            }, () => {
                this.props.logout();
            });
        };

        this.handleSignIn = () => {
            this.setState({
                isOpen: false,
            }, () => {
                this.props.history.push('/signin')
            });
        }

        this.showLogOut = () => {
            const { user, isLoggedIn } = this.props;

            return (
                user && isLoggedIn ?
                (<div onClick={this.handleLogOut} className="product-menu__header-profile-logout-container">
              
                    <span>{this.props.intl.formatMessage({id: 'page.header.navbar.logout'})}</span>
                    <img className="product-menu__header-profile-logout" src={require(`./logout.svg`)} alt="Logout image"  />
                </div>) : null
                )
            };

        this.showSignIn = () => {
            const { user, isLoggedIn } = this.props;

            return (
                !isLoggedIn ?
                (<div onClick={this.handleSignIn} className="product-menu__header-profile-logout-container">
                    <span>{this.props.intl.formatMessage({id: 'page.header.signIn'})}</span>
                </div>) : null
                )
            };


        this.getLanguageList = () => {
            const { isLanguageOpen } = this.state;

            return (
                <div className={`production-menu-language__list-wrapper ${isLanguageOpen ? 'language-list__open' : 'language-list__close'}`}>
                    <div className={'product-menu-language__list-element-wrapper'} onClick={() => this.handleOpenCloseLanguage()}>
                        <CloseIcon />
                    </div>
                    {languages().map((language) => {
                        return (
                            <div className={'product-menu-language__list-element-wrapper'} onClick={e => this.handleChangeLanguage(language)}>
                            <span className={'product-menu-language__list-element-text'}>
                                {language && language.toUpperCase()}
                            </span>
                            </div>
                        );
                    })}
                </div>
            );
        }

        this.handleOpenCloseLanguage = () => {

            this.setState(prevState => {
                return {
                    isLanguageOpen: !prevState.isLanguageOpen,
                };
            });
        }

        this.handleChangeLanguage = (language) => {
            this.props.changeLanguage(language);

            this.handleOpenCloseLanguage();
        }

        this.renderThemeOption = () => {

            const { colorTheme } = this.props;

            return (
                <div
                    className={'product-menu-theme-switch__wrapper'}
                >
                    <div>
                        {this.props.intl.formatMessage({id: 'page.body.dark.version'})}
                    </div>
                    <div className={'slider switch ml-2'}>
                        <label className={'switch-wallets mb-0'}>
                            <input
                                type={'checkbox'}
                                onChange={() => this.handleThemeChange(colorTheme === 'dark' ? 'light' : 'dark')}
                                checked={colorTheme === 'dark'}
                            />
                            <span className={'slider-wallets round'}/>
                        </label>
                    </div>
                </div>
            )
        }

        this.handleThemeChange = (value) => {
            this.props.changeColorTheme(value)
        }
    }

    render() {

        const { windowWidth, isOpen } = this.state;
        const { colorTheme } = this.props;
        const logoSrc = window.env.image.light;
        const logoDarkSrc = window.env.image.dark;
        const menuIcon = window.env.image.menuIcon

        return (
            <div className={'product-menu__wrapper'}>
                <div className={'product-menu-icon__wrapper'} onClick={() => this.handleOpenCloseMenu()}>
                    {/* <img className="menu-icon" src={menuIcon} alt="menu icon"/> */}
                    <i className="fa fa-bars"></i>
                </div>
                <div className={`product-menu__list-wrapper ${windowWidth < 769 ? (isOpen ? 'product-menu__list-wrapper-open' : 'product-menu__list-wrapper-close') : ''}`}>
                    <div className={'product-menu__list'}>
                        {windowWidth < 769 ?
                            <div className={'product-menu-header'}>
                                <div className={'product-menu-header__logo'}>
                                    <span>
                                        {colorTheme === 'light' ? (
                                            <img src={logoSrc} className="logo" alt="Logo"/>
                                        ) : (
                                            <img src={logoDarkSrc} className="logo" alt="Logo"/>
                                        )}
                                    </span>
                                </div>
                                <div className={'product-menu-close-icon__wrapper'} onClick={() => this.handleOpenCloseMenu()}>
                                    <CloseIcon />
                                </div>
                            </div> : null
                        }
                        {this.getList()}
                        {windowWidth < 769 ? this.showLogOut() : null }
                        {windowWidth < 769 ? this.showSignIn() : null }
                        {windowWidth < 769 ? this.renderThemeOption() : null }
                        {windowWidth < 769 ? this.getLanguageDropdown() : null}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleScreen.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleScreen.bind(this));
    }


}

const mapDispatchToProps = dispatch => ({
    changeLanguage: payload => dispatch(changeLanguage(payload)),
    logout: () => dispatch(logoutFetch()),
    changeColorTheme: payload => dispatch(changeColorTheme(payload)),
});

const mapStateToProps = (state) => ({
    colorTheme: selectCurrentTheme(state),
    currentLanguage: selectCurrentLanguage(state),
    user: selectUserInfo(state),
    isLoggedIn: selectUserLoggedIn(state),
});

export const ProductMenu = injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductMenuComponent)));
