import cn from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { labelFetch, selectLabelData, selectUserInfo } from "../../modules";
import {
  fetchDocuments,
  selectDocumentsData,
} from "../../modules/user/kyc/documents";
import {CheckMarkIcon} from "../../assets/images/CheckMarkIcon";
class ProfileVerificationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.labelFetch();
    this.props.fetchDocuments();
  }

  render() {
    const { user, documents, label } = this.props;
    const userLevel = user.level;
    const activeClass =
      userLevel === 3
        ? "btn btn-success text-center text-white"
        : documents.length === 0
        ? "btn btn-danger text-center text-white"
        : "btn btn-warning text-center text-white";
    let activeTitle =
      userLevel === 3
        ? "page.body.profile.kyc.button.success"
        : documents.length === 0
        ? "page.body.profile.kyc.button.fail"
        : "page.body.profile.kyc.button.pending";

    const notice = userLevel
      ? null
      : React.createElement(
          "p",
          { className: "lead text-light pdb-0-5x" },
          "You have not submitted your KYC application to verify your identity."
        );
    const documentLabel = label.find(
        (label) => label.key === "document"
    );
    const userVerified = documentLabel && documentLabel.value === "verified"
    return React.createElement(
      "div",
      { className: "kyc-info card" },
      React.createElement(
        "div",
        { className: "card-innr" },
        React.createElement(
          "h6",
          { className: "card-title card-title-sm" },
          React.createElement(FormattedMessage, { id: "page.profile.kycTitle" })
        ),
        React.createElement(
          "p",
          { className: "span-killer" },
          React.createElement(FormattedMessage, {
            id: "page.body.profile.kyc.content",
          })
        ),
        notice,
        React.createElement('div', { className: 'kyc-button-checkmark__wrapper'},
            React.createElement(
                "a",
                {
                  onClick: !userVerified ? this.props.onConfirm : null,
                  className: activeClass,
                  style: {
                    padding: "9px 50px",
                    marginRight: "5px"
                  },
                },
                React.createElement(FormattedMessage, { id: activeTitle })
            )
        ),
        !userVerified && React.createElement(
          "h6",
          { className: "kyc-alert text-danger" },
          React.createElement(FormattedMessage, {
            id: "page.body.profile.kyc.content.notice",
          })
        )
      )
    );
  }
  renderFirstLevel(userLevel) {
    const targetLevel = 1;
    const { titleClassName } = this.getLevelsClassNames(userLevel, targetLevel);
    return React.createElement(
      "div",
      {
        className:
          "parent-profile-page__row parent-profile-page__level-verification",
      },
      React.createElement(
        "div",
        { className: titleClassName },
        this.renderVerificationLevel(
          "page.body.profile.header.account.profile.email",
          userLevel,
          targetLevel
        ),
        React.createElement(
          "p",
          null,
          React.createElement(FormattedMessage, {
            id: "page.body.profile.header.account.profile.email.message",
          })
        )
      )
    );
  }
  renderSecondLevel(userLevel) {
    const targetLevel = 2;
    const { titleClassName } = this.getLevelsClassNames(userLevel, targetLevel);
    return React.createElement(
      "div",
      {
        className:
          "parent-profile-page__row parent-profile-page__level-verification",
      },
      React.createElement(
        "div",
        { className: titleClassName },
        this.renderVerificationLevel(
          "page.body.profile.header.account.profile.phone",
          userLevel,
          targetLevel
        ),
        React.createElement(
          "p",
          null,
          React.createElement(FormattedMessage, {
            id: "page.body.profile.header.account.profile.phone.message",
          })
        )
      )
    );
  }
  renderThirdLevel(userLevel) {
    const targetLevel = 3;
    const documentLabel = this.props.label.find(
      (label) => label.key === "document"
    );
    const isPending =
      documentLabel && documentLabel.value === "pending"
        ? this.renderPendingIcon()
        : "";
    const { titleClassName } = this.getLevelsClassNames(userLevel, targetLevel);
    return React.createElement(
      "div",
      {
        className:
          "parent-profile-page__row parent-profile-page__level-verification",
      },
      React.createElement(
        "div",
        { className: titleClassName },
        this.renderIdentityVerification(
          "page.body.profile.header.account.profile.identity",
          userLevel,
          targetLevel,
          documentLabel
        ),
        React.createElement(
          "p",
          null,
          React.createElement(FormattedMessage, {
            id: "page.body.profile.header.account.profile.identity.message",
          })
        )
      ),
      isPending
    );
  }
  renderPendingIcon() {
    return React.createElement(
      "div",
      { className: "parent-profile-page__level-verification__pending" },
      React.createElement(
        "p",
        null,
        React.createElement(FormattedMessage, {
          id: "page.body.wallets.table.pending",
        })
      ),
      React.createElement("img", {
        src: require("../../assets/images/pending.svg"),
      })
    );
  }
  renderVerificationLevel(text, userLevel, targetLevel) {
    if (userLevel === targetLevel - 1) {
      return React.createElement(
        "a",
        {
          href: "/confirm",
          className: "parent-profile-page__level-verification__url",
        },
        React.createElement(FormattedMessage, {
          id: `${text}.unverified.title`,
        })
      );
    } else {
      if (userLevel < targetLevel) {
        return React.createElement(
          "p",
          { className: "parent-profile-page__level-verification__name" },
          React.createElement(FormattedMessage, {
            id: `${text}.unverified.title`,
          })
        );
      } else {
        return React.createElement(
          "p",
          { className: "parent-profile-page__level-verification__name" },
          React.createElement(FormattedMessage, { id: `${text}.title` })
        );
      }
    }
  }
  renderIdentityVerification(text, userLevel, targetLevel, documentLabel) {
    const isLabelExist = this.props.label;
    if (isLabelExist.length > 0) {
      switch (userLevel) {
        case targetLevel - 1: {
          if (documentLabel) {
            return React.createElement(
              "p",
              { className: "parent-profile-page__level-verification__name" },
              React.createElement(FormattedMessage, {
                id: `${text}.unverified.title`,
              })
            );
          } else {
            return React.createElement(
              "a",
              {
                href: "/confirm",
                className: "parent-profile-page__level-verification__url",
              },
              React.createElement(FormattedMessage, {
                id: `${text}.unverified.title`,
              })
            );
          }
        }
        case targetLevel:
          return React.createElement(
            "p",
            { className: "parent-profile-page__level-verification__name" },
            React.createElement(FormattedMessage, { id: `${text}.title` })
          );
        default:
          return React.createElement(
            "p",
            { className: "parent-profile-page__level-verification__name" },
            React.createElement(FormattedMessage, {
              id: `${text}.unverified.title`,
            })
          );
      }
    } else {
      return React.createElement(
        "p",
        { className: "parent-profile-page__level-verification__name" },
        React.createElement(FormattedMessage, {
          id: `${text}.unverified.title`,
        })
      );
    }
  }
  getLevelsClassNames(currentLevel, targetLevel) {
    const levelSatisfied = currentLevel >= targetLevel;
    const levelClassName = cn({
      "parent-profile-page__text-purple": levelSatisfied,
    });
    const titleClassName = cn("parent-profile-page__ml-gap", {
      "parent-profile-page__text-success": levelSatisfied,
    });
    return { levelClassName, titleClassName };
  }
}
const mapStateToProps = (state) => ({
  user: selectUserInfo(state),
  label: selectLabelData(state),
  documents: selectDocumentsData(state),
});
const mapDispatchProps = (dispatch) => ({
  labelFetch: () => dispatch(labelFetch()),
  fetchDocuments: () => dispatch(fetchDocuments()),
});
const ProfileVerification = connect(
  mapStateToProps,
  mapDispatchProps
)(ProfileVerificationComponent);
export { ProfileVerification };
