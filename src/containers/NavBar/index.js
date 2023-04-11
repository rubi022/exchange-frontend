import classnames from 'classnames';
import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect,} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {pgButtons, pgRoutes} from '../../constants';
import {
    changeLanguage,
    logoutFetch,
    selectCurrentLanguage,
    selectCurrentMarket,
    selectUserInfo,
    selectUserLoggedIn,
    walletsReset,
} from '../../modules';
import {ToolBar} from "../ToolBar";
import {changeColorTheme, selectCurrentTheme} from "../../modules/public/generic";
import dark from './toggle_light.svg';
import light from './toggle_dark.svg';
import darkMoon from './dark_toggle_moon.svg'
import darkSun from './dark_toggle_sun.svg'
class NavBarComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false,
            isOpenLanguage: false,
            email: '',
            name: '',
            message: '',
            recaptchaResponse: '',
            errorModal: false,
            windowWidth: window.innerWidth
        };
        this.navItem = (address, onLinkChange) => (values, index) => {
            const [name, url, isExternal] = values;
            const { isLoggedIn, currentMarket } = this.props;
            const cx = classnames('parent-navbar__content-item', {
                'parent-navbar__content-item--active': this.shouldUnderline(address, url),
                'parent-navbar__content-item-logging': isLoggedIn,
            });
            const handleLinkChange = () => {
                if (onLinkChange) {
                    onLinkChange();
                }
            };
            const path = url.includes('/trading') && currentMarket ? `/trading/${currentMarket.id}` : url;
            return (React.createElement("li", { onClick: handleLinkChange, key: index },
                isExternal ? React.createElement('a', { className: cx, href: path },
                    React.createElement(FormattedMessage, { id: name }))
                    :
                    React.createElement(Link, { className: cx, to: path },
                        React.createElement(FormattedMessage, { id: name })) ));
        };
        this.buttonItem = (address, onLinkChange) => (values, index) => {
            const [name, url] = values;
            const { isLoggedIn, currentMarket } = this.props;
            const cx = classnames('btn', {
                'btn btn-primary': this.shouldUnderline(address, url),
                'parent-navbar__content-item-logging': isLoggedIn,
            });
            const handleLinkChange = () => {
                if (onLinkChange) {
                    onLinkChange();
                }
            };
            const path = url.includes('/trading') && currentMarket ? `/trading/${currentMarket.id}` : url;
            return (React.createElement("li", { onClick: handleLinkChange, key: index },
                React.createElement(Link, { className: cx, to: path },
                    React.createElement(FormattedMessage, { id: name }))));
        };
        this.shouldUnderline = (address, url) => (url === '/trading/' && address.includes('/trading')) || address === url;
        this.getProfile = () => {
            const { user } = this.props;
            return (React.createElement("div", { className: "parent-navbar__header-profile" },
                React.createElement(Link, { className: "parent-navbar__admin-logout", to: "/profile", onClick: this.handleRouteChange('/profile') },
                    React.createElement(FormattedMessage, { id: 'page.header.navbar.profile' })),
                React.createElement("span", null, user.email),
                React.createElement("img", { onClick: this.handleLogOut, className: "parent-navbar__header-profile-logout", src: require(`./logout.svg`) })));
        };
        this.getLanguageMenu = () => {
            return (React.createElement("div", { className: "dropdown-menu dropdown-menu-language", role: "menu" },
                React.createElement("div", { className: "dropdown-menu-item-lang", onClick: e => this.handleChangeLanguage('en') }, "EN"),
                React.createElement("div", { className: "dropdown-menu-item-lang", onClick: e => this.handleChangeLanguage('ar') }, "AR"),
                React.createElement("div", { className: "dropdown-menu-item-lang", onClick: e => this.handleChangeLanguage('ur') }, "UR"),
                React.createElement("div", { className: "dropdown-menu-item-lang", onClick: e => this.handleChangeLanguage('es') }, "SP"),
                // React.createElement("div", { className: "dropdown-menu-item-lang", onClick: e => this.handleChangeLanguage('ru') }, "RU"),
                // React.createElement("div", { className: "dropdown-menu-item-lang", onClick: e => this.handleChangeLanguage('zh') }, "ZH"),
            ));
        };
        this.getUserEmailMenu = () => {
            const { isOpen } = this.state;
            const userClassName = classnames('navbar-user-menu', {
                'navbar-user-menu-active': isOpen,
            });
            return (React.createElement("div", { className: "parent-navbar__header-settings__account-dropdown dropdown-toggle" },
                React.createElement("div", { onClick: this.openMenu, className: userClassName },
                    React.createElement("img", { className: "parent-navbar__header-settings__account-dropdown-user-profile-icon", src: require(`./${isOpen ? 'open' : 'close'}-avatar.svg`) }),
                    React.createElement("img", { className: "icon", src: require(`./${isOpen ? 'open' : 'close'}-icon.svg`) })),
                isOpen ? this.getUserMenu() : null));
        };
        this.getSignupMenu = () => {
            const { location } = this.props;
            const address = location ? location.pathname : '';
            return (
                React.createElement("ul", { className: "parent-navbar__buttons" }, pgButtons(null).map(this.buttonItem(address, this.props.onLinkChange)))
            );
        };
        this.getUserMenu = () => {
            return (React.createElement("div", { className: "dropdown-menu dropdown-menu-user", role: "menu" },
                React.createElement("div", { className: "dropdown-menu-item-user", onClick: this.handleRouteChange('/profile') },
                    React.createElement(Link, { className: "parent-navbar__admin-logout", to: "/profile" },
                        React.createElement(FormattedMessage, { id: 'page.header.navbar.profile' }))),
                React.createElement("div", { className: "dropdown-menu-item-user", onClick: this.handleLogOut },
                    React.createElement("a", { className: "parent-navbar__admin-logout" },
                        React.createElement(FormattedMessage, { id: 'page.header.navbar.logout' })))));
        };
        this.handleRouteChange = (to) => () => {
            this.setState({ isOpen: false }, () => {
                this.props.history.push(to);
            });
        };
        this.handleLogOut = () => {
            this.setState({
                isOpen: false,
            }, () => {
                this.props.logout();
            });
        };
        this.openMenu = () => {
            this.setState({
                isOpen: !this.state.isOpen,
            }, () => {
                if (this.state.isOpen) {
                    document.addEventListener('click', this.closeMenu);
                }
                else {
                    document.removeEventListener('click', this.closeMenu);
                }
            });
        };
        this.closeMenu = () => {
            this.setState({
                isOpen: false,
            }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        };
        this.toggleLanguageMenu = () => {
            this.setState({
                isOpenLanguage: !this.state.isOpenLanguage,
            }, () => {
                if (this.state.isOpenLanguage) {
                    document.addEventListener('click', this.closeLanguageMenu);
                }
                else {
                    document.removeEventListener('click', this.closeLanguageMenu);
                }
            });
        };
        this.closeLanguageMenu = () => {
            this.setState({
                isOpenLanguage: false,
            }, () => {
                document.removeEventListener('click', this.closeLanguageMenu);
            });
        };
        this.handleChangeLanguage = (language) => {
            this.props.changeLanguage(language);
        };
        this.handleScreenSize = e => {
            const windowWidth = window.innerWidth;
            // console.log(window.innerWidth)
            this.setState( {
                windowWidth: window.innerWidth
            });
        }
        this.handleChangeThemeColor = (value) => {
            this.props.changeColorTheme(value);
        }
    }

    componentDidMount() {
        window.addEventListener('resize',this.handleScreenSize.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleScreenSize.bind(this))
    }

    render() {
        const { location, user, lang, colorTheme } = this.props;
        const { isOpenLanguage, windowWidth } = this.state;
        const address = location ? location.pathname : '';
        const languageName = lang.toUpperCase();
        const languageClassName = classnames('dropdown-menu-language-field', {
            'dropdown-menu-language-field-active': isOpenLanguage,
        });
        return (React.createElement("div", { className: 'parent-navbar' },
            user.email ? this.getProfile() : null,
            React.createElement("ul", { className: "parent-navbar__content" }, pgRoutes(!!user.email).map(this.navItem(address, this.props.onLinkChange))),
            React.createElement("div", { className: 'parent-navbar'},
                // window.location.pathname.includes('/trading') && this.state.windowWidth > 1168 ? React.createElement(ToolBar, null) : null,
                windowWidth > 768 && React.createElement('div', {
                        className: 'theme-toggle-button',
                        onClick: () => this.handleChangeThemeColor(colorTheme === 'light' ? 'dark' : 'light'),
                    }, React.createElement('img', {
                        style: {
                            display: 'block',
                        },
                        // src: colorTheme === 'dark' ? light : (window.innerWidth <= 769 ? darkSun : dark)
                        src: colorTheme === 'dark' ? light : dark
                        // className: colorTheme === 'light' ? 'theme-icon-light' : 'theme-icon-dark',
                    })
                ),
                React.createElement("div", { className: "parent-navbar__header-settings" },
                    user.email ? this.getUserEmailMenu() : this.getSignupMenu(),
                    React.createElement("div", { className: "parent-navbar__header-settings__account-dropdown dropdown-toggle dropdown-menu-language-container" },
                        React.createElement("div", { onClick: this.toggleLanguageMenu, className: languageClassName },
                            languageName,
                            React.createElement("img", { className: "icon", src: require(`./${isOpenLanguage ? (colorTheme && colorTheme === 'light' ? 'open__dark' : 'open') : 'close'}-icon.svg`) })),
                        isOpenLanguage ? this.getLanguageMenu() : null)),
                React.createElement("div", { className: "parent-navbar__header-language", onClick: this.toggleLanguageMenu },
                    React.createElement("span", null, "LANGUAGE"),
                    React.createElement("span", null,
                        languageName,
                        React.createElement("img", { className: "icon", src: require(`./${isOpenLanguage ? 'open' : 'close'}-icon.svg`) })),
                    isOpenLanguage ? this.getLanguageMenu() : null)
            ),
        ));
    }
}
const mapStateToProps = (state) => ({
    currentMarket: selectCurrentMarket(state),
    address: '',
    lang: selectCurrentLanguage(state),
    user: selectUserInfo(state),
    isLoggedIn: selectUserLoggedIn(state),
    colorTheme: selectCurrentTheme(state)
});
const mapDispatchToProps = dispatch => ({
    changeLanguage: payload => dispatch(changeLanguage(payload)),
    logout: () => dispatch(logoutFetch()),
    walletsReset: () => dispatch(walletsReset()),
    changeColorTheme: payload => dispatch(changeColorTheme(payload)),
});

const NavBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarComponent));
export { NavBar, };

