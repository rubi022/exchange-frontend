import * as React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { ProfileAccountActivity } from "../../containers/ProfileAccountActivity";
import { ProfileApiKeys } from "../../containers/ProfileApiKeys";
import { ProfileAuthDetails } from "../../containers/ProfileAuthDetails";
import { ProfileVerification } from "../../containers/ProfileVerification";
import { ReferralProgram } from "../../containers/ReferralProgram";
import { setDocumentTitle } from "../../helpers";
import { Beneficiaries } from "../../containers/Beneficiaries";
import PageLayout from "./PageLayout";
import {createBeneficiaryFromWallets, selectCreateBeneficiary} from "../../modules/public/generic";
import {connect} from "react-redux";

class ProfileComponent extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      currentTab: 0,
    };
    this.goBack = () => {
      this.props.history.goBack();
    };
  }
  componentDidMount() {
    const { createBeneficiary } = this.props;
    setDocumentTitle(
      this.props.intl.formatMessage({ id: "page.header.navbar.profile" })
    );
    if (createBeneficiary) {
      this.setState({
        currentTab: 4,
      })
    }
  }

  componentWillUnmount() {
    this.props.createBeneficiaryFromWallets({
      create: false,
      currency: '',
    })
  }

  onConfirm = () => {
    this.props.history.push("/confirm");
  };

  onClickHandler = (e) => {
    this.setState({
      currentTab: e,
    });
  };

  render() {
    const { currentTab } = this.state;

    return (
      <PageLayout
        onClickHandler={this.onClickHandler}
        currentTab={currentTab}
        translation={this.props.intl}
        rightComponent={
          <div className={"page-content"}>
            <div className="row">
              {currentTab === 0 && (
                <>
                  <div className="col-12">
                    <h3
                      style={{
                        padding: "0rem 0rem 1rem",
                        fontWeight: 700,
                        fontSize: "27px",
                        color: "var(--side-bar-active-content-heading)",
                      }}
                      className="profile-heading"
                    >
                      {this.props.intl.formatMessage({id: 'page.profile.section.profile.title'})}
                    </h3>
                    <ProfileAuthDetails
                      payableCurrencyPlaceholder={this.props.intl.formatMessage(
                        {
                          id: "page.profile.payableCurrencyPlaceholder",
                        }
                      )}
                    />
                    <ProfileVerification onConfirm={this.onConfirm} />
                  </div>
                </>
              )}

              {currentTab === 1 && (
                <div className="col-12">
                  <h3
                    style={{
                      padding: "0rem 0rem 1rem",
                      fontWeight: 700,
                      fontSize: "27px",
                      color: "var(--side-bar-active-content-heading)",
                    }}
                    className="profile-heading"
                  >
                    {this.props.intl.formatMessage({id: 'page.profile.section.referral.title'})}
                  </h3>
                  <div className="referral-info card">
                    <div className="card-innr">
                      <h6 className="card-title card-title-sm">
                        {this.props.intl.formatMessage({
                          id: "page.profile.referralTitle",
                        })}
                      </h6>
                      <p
                        className="font-weight-normal pdb-0-5x"
                      >
                        {this.props.intl.formatMessage({
                          id: "page.profile.referralDescription",
                        })}
                      </p>
                      <ReferralProgram />
                    </div>
                  </div>
                </div>
              )}

              {currentTab === 2 && (
                <div className="col-12">
                  <h3
                    style={{
                      padding: "0rem 0rem 1rem",
                      fontWeight: 700,
                      fontSize: "27px",
                      color: "var(--side-bar-active-content-heading)",
                    }}
                    className="profile-heading"
                  >
                    {this.props.intl.formatMessage({id: 'page.profile.section.accountActivity.title'})}
                  </h3>
                  <ProfileAccountActivity />
                </div>
              )}

              {currentTab === 3 && (
                <>
                  <div className="col-12">
                    <h3
                      style={{
                        padding: "0rem 0rem 1rem",
                        fontWeight: 700,
                        fontSize: "27px",
                        color: "var(--side-bar-active-content-heading)",
                      }}
                      className="profile-heading"
                    >
                      {this.props.intl.formatMessage({id: 'page.profile.section.api.title'})}
                    </h3>
                    <ProfileApiKeys />
                  </div>
                </>
              )}

              {currentTab == 4 && (
                <div className="col-12">
                  <h3
                    style={{
                      padding: "0rem 0rem 1rem",
                      fontWeight: 700,
                      fontSize: "27px",
                      color: "var(--side-bar-active-content-heading)",
                    }}
                    className="profile-heading"
                  >
                    {this.props.intl.formatMessage({id: 'page.profile.section.beneficiary.title'})}
                  </h3>
                  <Beneficiaries />
                </div>
              )}
            </div>
          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  createBeneficiary: selectCreateBeneficiary(state),
})

const mapDispatchToProps = dispatch => ({
  createBeneficiaryFromWallets: (payload) => dispatch(createBeneficiaryFromWallets(payload)),
})

const ProfileScreen = injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)));
export { ProfileScreen };
