import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Alerts, ErrorWrapper, Header, BottomNavTab } from './containers';
import { Layout } from './routes';
import {rangerConnectFetch, rangerDisconnectFetch} from "./modules/public/ranger";
import {selectRanger} from "./modules/public/ranger/selectors";
import {selectUserLoggedIn} from "./modules/user/profile";
import {BottomNavTAb} from "./containers/BottomNavTab";
class AppLayout extends React.Component {
    componentDidMount() {
        //TODO: WIP
        const { userLoggedIn, rangerState: { connected } } = this.props;
        if (!connected) {
            // this.props.rangerConnect({ withAuth: userLoggedIn });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { userLoggedIn, rangerState: { connected } } = this.props;
        if(prevProps.userLoggedIn !== userLoggedIn) {
            // console.log(prevProps.userLoggedIn !== userLoggedIn, prevProps.rangerState.connected)

            if (prevProps.rangerState.connected) {
                this.props.rangerDisconnect();
                this.props.rangerConnect({withAuth: userLoggedIn});
                return;
            }
            if (!connected) {
                this.props.rangerConnect({withAuth: userLoggedIn});
            }
        }
    }

    componentWillUnmount() {
        const { rangerState: { connected } } = this.props;
        if (connected) {
            this.props.rangerDisconnect();
        }
    }

    render() {
        const { locale, history } = this.props;
        const { lang, messages } = locale;
        return (React.createElement(IntlProvider, { locale: lang, messages: messages, key: lang },
            React.createElement(Router, { history: history },
                React.createElement(ErrorWrapper, null,
                    React.createElement(Layout, null),
                    ))));
    }
}
const mapStateToProps = (state) => ({
    locale: state.public.i18n,
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
});
const mapDispatchToProps = dispatch => ({
    rangerConnect: (payload) => dispatch(rangerConnectFetch(payload)),
    rangerDisconnect: (payload) => dispatch(rangerDisconnectFetch(payload)),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppLayout);
export { App, };

