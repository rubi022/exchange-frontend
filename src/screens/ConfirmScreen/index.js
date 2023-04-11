import classnames from "classnames";
import * as React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Documents } from "../../containers/Confirm/Documents";
import { Identity } from "../../containers/Confirm/Identity";
import { Phone } from "../../containers/Confirm/Phone";
import { setDocumentTitle } from "../../helpers";
import { labelFetch, selectLabelData, selectUserInfo } from "../../modules";
class ConfirmComponent extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = (event) => {
      event.preventDefault();
      this.props.history.goBack();
    };
    this.renderContent = (level) => {
      const { labels } = this.props;
      const isIdentity = labels.length && labels.find(
          l => l.key === 'profile' && ['submitted', 'verified'].includes(l.value) && l.scope === 'private'
      );
      switch (level) {
        // case 1:
        //   return React.createElement(Phone, null);
        case 1:
          return isIdentity
            ? React.createElement(Documents, null)
            : React.createElement(Identity, null);
        case 2:
          return React.createElement(Documents, null);
        default:
          return "Something went wrong";
      }
    };
    this.state = {
      title: "",
      level: 1,
    };
  }
  handleRedirectToProfile = () => {
    this.setState({
      level: 3,
    })
  };
  handleCheckPendingLabel = (labels) => {
    const isProfileSubmitted = labels.length && labels.find(l => l.key === 'profile' && l.value === 'submitted' && l.scope === 'private');
    const isDocumentPending = labels.length && labels.find(l => l.key === 'document' && l.value === 'pending' && l.scope === 'private');

    if (isProfileSubmitted || isDocumentPending) {
      this.handleRedirectToProfile();
    }
  };

  componentWillUpdate(next) {
    const { labels } = this.props;

    if (next.userData.level !== this.state.level) {
      this.setState({
        level: next.userData.level,
      });
    }

    if (next.labels && JSON.stringify(next.labels) !== JSON.stringify(labels)) {
      this.handleCheckPendingLabel(next.labels);
    }
  }
  componentDidMount() {
    setDocumentTitle("Confirm");
    document.getElementsByClassName('page-content')[0].classList.add('page-content__confirm-page-mobile');
    this.props.labelFetch();
    const { userData } = this.props;
    this.setState({
      level: userData.level,
    });
  }
  componentWillUnmount() {
    document.getElementsByClassName('page-content')[0].classList.remove('page-content__confirm-page-mobile');
  }

  render() {
    const { userData, labels } = this.props;
    const isIdentity = labels.find(
      (w) => w.key === "profile" && w.value === "verified"
    );
    const currentProfileLevel = userData.level;
    const cx = classnames("parent-confirm__progress-items", {
      "parent-confirm__progress-first": currentProfileLevel === 1,
      "parent-confirm__progress-second":
        currentProfileLevel === 2 && !isIdentity,
      "parent-confirm__progress-third": currentProfileLevel === 3 || isIdentity,
    });
    return React.createElement(
      "div",
      { className: "page-content" },
      React.createElement(
        "div",
        { className: "page-header page-header-kyc" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "row justify-content-center" },
            React.createElement(
              "div",
              { className: "col-lg-8 col-xl-7 text-center" },
              React.createElement(
                "h2",
                {
                  className: "page-title text-white",
                },
                this.props.intl.formatMessage({ id: "page.body.confirm.title" })
              ),
              React.createElement(
                "p",
                { className: "verify-confirmation-msg" },
                this.props.intl.formatMessage({
                  id: "page.body.confirm.subTitle",
                })
              )
            )
          )
        )
      ),
      this.renderContent(currentProfileLevel)
    );
  }
}
const mapStateToProps = (state) => ({
  userData: selectUserInfo(state),
  labels: selectLabelData(state),
});
const mapDispatchToProps = (dispatch) => ({
  labelFetch: () => dispatch(labelFetch()),
});

export const ConfirmScreen = injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmComponent))
);
