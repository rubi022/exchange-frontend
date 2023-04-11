import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { ProfileAccountActivity } from '../ProfileAccountActivity';
import { ProfileApiKeys } from '../ProfileApiKeys';
import { ProfileAuthDetails } from '../ProfileAuthDetails';
import { ProfileVerification } from '../ProfileVerification';
import { ReferralProgram } from '../ReferralProgram';
// import { ProfileTiers } from '../ProfileTiers';
class ProfileComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.goBack = () => {
            this.props.history.goBack();
        };
    }
    render() {
        return (React.createElement("div", { className: "parent-container parent-profile-page" },
            React.createElement("div", { className: "parent-profile-page__details" },
                React.createElement("div", { className: "parent-profile-page-header" },
                    React.createElement("h3", { className: "parent-profile-page__text-purple" },
                        React.createElement(FormattedMessage, { id: "page.body.profile.header.account" }))),
                React.createElement("div", { className: "parent-profile-page__details-box" },
                    React.createElement("div", { className: "parent-profile-page__left-col" },
                        React.createElement(ProfileAuthDetails, null)),
                    React.createElement("div", { className: "parent-profile-page__right-col" },
                        React.createElement(ProfileVerification, null))),
                React.createElement(ReferralProgram, null)),
            React.createElement(ProfileApiKeys, null),
            React.createElement(ProfileAccountActivity, null)));
    }
}

const Profile = withRouter(ProfileComponent);
export { Profile, };

