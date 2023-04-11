import { Pagination } from "@components/components";
import classnames from "classnames";
import * as React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { localeFullDate } from "../../helpers";
import {
  getUserActivity,
  selectTotalNumber,
  selectUserActivity,
  selectUserActivityCurrentPage,
  selectUserActivityFirstElemIndex,
  selectUserActivityLastElemIndex,
  selectUserActivityLoading,
  selectUserActivityNextPageExists,
  selectUserActivityPageCount,
} from "../../modules";
import { Table } from "../../component/molecules/Table/Table";
import {ClipLoader} from "react-spinners";
const paginationLimit = 7;
class ProfileAccountActivityComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.renderContent = () => {
      const {
        total,
        firstElemIndex,
        lastElemIndex,
        page,
        nextPageExists,
        userActivity,
      } = this.props;

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(Table, {
          header: this.getHeaders().map((e) => e.toUpperCase()),
          data: this.getActivityData(userActivity),
          className: "activity-table activity-table-data",
          //   style: {
          //     display: "table",
          //     "background-color": "white",
          //     // backgroundColor: "white !important",
          //   },
        }),
        React.createElement(Pagination, {
          firstElemIndex: firstElemIndex,
          lastElemIndex: lastElemIndex,
          total: total,
          page: page,
          nextPageExists: nextPageExists,
          onClickPrevPage: this.onClickPrevPage,
          onClickNextPage: this.onClickNextPage,
        })
      );
    };
    this.getHeaders = () => {
      return [
        this.props.intl.formatMessage({
          id: "page.body.profile.header.accountActivity.content.date",
        }),
        this.props.intl.formatMessage({
          id: "page.body.profile.header.accountActivity.content.action",
        }),
        this.props.intl.formatMessage({
          id: "page.body.profile.header.accountActivity.content.result",
        }),
        this.props.intl.formatMessage({
          id: "page.body.profile.header.accountActivity.content.addressip",
        }),
        this.props.intl.formatMessage({
          id: "page.body.profile.header.accountActivity.content.userAgent",
        }),
      ];
    };
    this.getResultOfUserAction = (value) => {
      switch (value) {
        case "login":
          return this.props.intl.formatMessage({
            id: "page.body.profile.content.action.login",
          });
        case "logout":
          return this.props.intl.formatMessage({
            id: "page.body.profile.content.action.logout",
          });
        case "request QR code for 2FA":
          return this.props.intl.formatMessage({
            id: "page.body.profile.content.action.request2fa",
          });
        case "enable 2FA":
          return this.props.intl.formatMessage({
            id: "page.body.profile.content.action.enable2fa",
          });
        case "login::2fa":
          return this.props.intl.formatMessage({
            id: "page.body.profile.content.action.login.2fa",
          });
        case "request password reset":
          return this.props.intl.formatMessage({
            id: "page.body.profile.content.action.requestPasswordReset",
          });
        case "password reset":
          return this.props.intl.formatMessage({
            id: "page.body.profile.content.action.passwordReset",
          });
        case "signup":
          return this.props.intl.formatMessage({
            id: "page.body.profile.content.action.signup",
          });
        default:
          return value;
      }
    };
    this.onClickPrevPage = () => {
      const { page } = this.props;
      this.props.getUserActivity({
        page: Number(page) - 1,
        limit: paginationLimit,
      });
    };
    this.onClickNextPage = () => {
      const { page } = this.props;
      this.props.getUserActivity({
        page: Number(page) + 1,
        limit: paginationLimit,
      });
    };
  }
  componentDidMount() {
    this.props.getUserActivity({ page: 0, limit: paginationLimit });
    document.getElementsByClassName('page-content')[0].classList.add('page-content__custom-wrapper');
  }
  componentWillUnmount() {
    document.getElementsByClassName('page-content')[0].classList.remove('page-content__custom-wrapper');
  }

  render() {
    const { loading, userActivity } = this.props;
    console.log('loading', loading);
    const emptyMsg = this.props.intl.formatMessage({ id: "page.noDataToShow" });
    return React.createElement(
      "div",
      {},
      React.createElement(
        "div",
        { className: "content-area" },
          React.createElement(
              "div",
              {
                className: "cliploader-container",
                style: { display: !userActivity.length && loading ? "flex" : "none" },
              },
              loading &&
              React.createElement("div", { className: "d-flex justify-content-center align-items-center w-100 h-100" },
                React.createElement(ClipLoader, {
                  sizeUnit: "px",
                  size: 35,
                  loading: loading,
                  color: "var(--accent)",
                })
              )
          ),
        React.createElement(
          "div",
          {
            className: `parent-history-elem ${
              userActivity.length ? "" : "parent-history-empty"
            }`,
          },
          userActivity.length ? this.renderContent() : null,
          !userActivity.length && !loading
            ? React.createElement(
                "p",
                { className: "parent-history-elem__empty" },
                emptyMsg
              )
            : null
        )
      )
    );
  }
  getActivityData(userData) {
    return userData.map((item) => {
      return [
        localeFullDate(item.created_at),
        this.getResultOfUserAction(item.action),
        this.renderResult(
          this.props.intl.formatMessage({
            id: `page.body.profile.content.result.${item.result}`,
          })
        ),
        item.user_ip,
        item.user_agent,
      ];
    });
  }
  renderResult(result) {
    const className = classnames({
      "parent-profile-page__activity-result-succeed":
        result ===
        this.props.intl.formatMessage({
          id: "page.body.profile.content.result.succeed",
        }),
      "parent-profile-page__activity-result-failed":
        result ===
        this.props.intl.formatMessage({
          id: "page.body.profile.content.result.failed",
        }),
    });
    return React.createElement("span", { className: className }, result);
  }
}
const mapStateToProps = (state) => ({
  userActivity: selectUserActivity(state),
  loading: selectUserActivityLoading(state),
  total: selectTotalNumber(state),
  page: selectUserActivityCurrentPage(state),
  pageCount: selectUserActivityPageCount(state, paginationLimit),
  firstElemIndex: selectUserActivityFirstElemIndex(state, paginationLimit),
  lastElemIndex: selectUserActivityLastElemIndex(state, paginationLimit),
  nextPageExists: selectUserActivityNextPageExists(state, paginationLimit),
});
const mapDispatchToProps = (dispatch) => ({
  getUserActivity: (params) => dispatch(getUserActivity(params)),
});
export const ProfileAccountActivity = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ProfileAccountActivityComponent)
);
