import {CloseButton, Loader, Pagination} from "@components/components";
import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { History } from "../../components";
import { CloseIcon } from "../../assets/images/CloseIcon";
import {
    localeDate,
    preciseData, setDepositIcon,
    setDepositStatusColor, setTradeColor,
    setTradesType, setWithdrawIcon,
    setWithdrawStatusColor,
    uppercase,
} from "../../helpers";
import {
  fetchHistory,
  selectCurrentPage,
  selectFirstElemIndex,
  selectFullHistory,
  selectHistory,
  selectHistoryLoading,
  selectLastElemIndex,
  selectMarkets,
  selectNextPageExists,
  selectPageCount,
  selectWallets, selectWindowWidth,
} from "../../modules";
import { ClipLoader } from "react-spinners";
import { Decimal } from "../../component/molecules/Decimal/Decimal";
import { get } from "lodash";
import BottomLeftGreen from "../../assets/images/bottom-left-green.png";

class HistoryComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      selectedDetails: [],
      detailsSelected: false,
      selectedType: "deposit",
    }
    this.depositHeader = [
      this.props.intl.formatMessage({
        id: "page.body.history.deposit.header.txid",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.deposit.header.date",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.deposit.header.currency",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.deposit.header.amount",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.deposit.header.status",
      }),
    ];
    this.withdrawHeader = [
      this.props.intl.formatMessage({
        id: "page.body.history.withdraw.header.address",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.withdraw.header.date",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.withdraw.header.currency",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.withdraw.header.amount",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.withdraw.header.fee",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.withdraw.header.status",
      }),
    ];
    this.tradesHeader = [
      this.props.intl.formatMessage({
        id: "page.body.history.trade.header.date",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.trade.header.side",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.trade.header.market",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.trade.header.price",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.trade.header.amount",
      }),
      this.props.intl.formatMessage({
        id: "page.body.history.trade.header.funds",
      }),
    ];
    this.renderContent = () => {
      const {
        type,
        firstElemIndex,
        lastElemIndex,
        fullHistory,
        page,
        nextPageExists,
      } = this.props;
      let newFullHistory = fullHistory ? fullHistory : lastElemIndex;
      let newLastElemIndex = nextPageExists ? lastElemIndex : firstElemIndex + (this.retrieveData() ? this.retrieveData().length - 1 : 0)
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(History, {
          headers: this.renderHeaders(type),
          data: this.retrieveData(),
        }),
          React.createElement(Pagination, {
            firstElemIndex: firstElemIndex,
            lastElemIndex: newLastElemIndex,
            total: nextPageExists ? newFullHistory : newLastElemIndex,
            page: page,
            nextPageExists: nextPageExists,
            onClickPrevPage: this.onClickPrevPage,
            onClickNextPage: this.onClickNextPage
          })
      );
    };
    this.onClickPrevPage = () => {
      const { page, type } = this.props;
      this.props.fetchHistory({ page: Number(page) - 1, type, limit: 25 });
    };
    this.onClickNextPage = () => {
      const { page, type } = this.props;
      this.props.fetchHistory({ page: Number(page) + 1, type, limit: 25 });
    };
    this.renderHeaders = (type) => {
      switch (type) {
        case "deposits":
          return this.depositHeader;
        case "withdraws":
          return this.withdrawHeader;
        case "trades":
          return this.tradesHeader;
        default:
          return [];
      }
    };
    this.retrieveData = () => {
      const { type, list } = this.props;
      return [...list].map((item) => this.renderTableRow(type, item));
    };
    this.renderTableRow = (type, item) => {
      const { marketsData, wallets, windowWidth } = this.props;
      switch (type) {
        case "deposits": {
          const { txid, created_at, currency, amount } = item;
          const state = this.props.intl.formatMessage({
            id: `page.body.history.deposit.content.status.${item.state}`,
          });
          const itemArray = [
              txid,
              localeDate(created_at),
              uppercase(currency),
              `${amount} ${uppercase(currency)}`,
              <strong style={{color: setDepositStatusColor(item.state)}}>
                  {state}
              </strong>,
          ];
          const blockchainLink = this.getBlockchainLink(currency, txid);
          const wallet = wallets.find((obj) => obj.currency === currency);

          const renderIcon = () => {
            return (
                <div className="d-flex justify-content-center align-items-center deposit-table__icon-wrapper" onClick={() => this.handleSelectDetails(itemArray, "deposit")}>
                  <img src={setDepositIcon(item.state)} alt={"dep-arrow"}/>
                </div>
            )
          }

          const renderDepositInfo = () => {
            return (
                <div className="d-flex flex-column justify-content-start align-items-start py-2" onClick={() => this.handleSelectDetails(itemArray, "deposit")}>
                  <div className="mb-2" >
                    <h6 className="font-weight-bold mb-0">
                      {currency && currency.toUpperCase()}
                    </h6>
                  </div>
                  <div>
                    <p className="text-muted-2 mb-0">
                      {localeDate(created_at)}
                    </p>
                  </div>
                </div>
            )
          }

          const renderDepositAmount = () => {
            return (
                <div className="d-flex flex-column justify-content-center align-items-end pr-3" onClick={() => this.handleSelectDetails(itemArray, "deposit")}>
                  <div className="mb-2">
                    <strong className="font-weight-bold">
                      {wallet && preciseData(amount, wallet.fixed)}
                    </strong>
                  </div>
                  <div>
                    <p style={{color: setDepositStatusColor(item.state)}} className="mb-0">
                      {state}
                    </p>
                  </div>
                </div>
            )
          }

          if (windowWidth < 769) {
            return [
                renderIcon(),
                renderDepositInfo(),
                renderDepositAmount(),
            ]
          }

          return [
            React.createElement(
              "div",
              { className: "parent-history-elem__hide", key: txid },
              React.createElement(
                "a",
                {
                  href: blockchainLink,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                txid
              )
            ),
            localeDate(created_at),
            currency && currency.toUpperCase(),
            wallet && preciseData(amount, wallet.fixed),
            React.createElement(
              "span",
              {
                style: { color: setDepositStatusColor(item.state) },
                key: txid,
              },
              state
            ),
          ];
        }
        case "withdraws": {
          const {
            blockchain_txid,
            created_at,
            currency,
            amount,
            fee,
            rid,
          } = item;
          const currencyInfo = this.props.wallets.find(
            (wallet) => wallet.currency === currency
          );
          const state = this.props.intl.formatMessage({
            id: `page.body.history.withdraw.content.status.${item.state}`,
          });
          const wallet = wallets.find((obj) => obj.currency === currency);

          const itemArray = [
              blockchain_txid || rid,
              localeDate(created_at),
              uppercase(currency),
              `${wallet && preciseData(amount, wallet.fixed)} ${uppercase(currency)}`,
              `${fee} ${uppercase(currency)}`,
              <strong style={{color: setWithdrawStatusColor(item.state)}}>
                  {state}
              </strong>,
          ]

          const renderIcon = () => {
            return (
                <div className="d-flex justify-content-center align-items-center px-1 withdraw-table__icon-wrapper" onClick={() => this.handleSelectDetails(itemArray, "withdraw")}>
                  <img src={setWithdrawIcon(item.state)} alt={"dep-arrow"}/>
                </div>
            );
          }

          const renderWithdrawInfo = () => {
            return (
                <div className="d-flex flex-column justify-content-start align-items-start py-2 pl-1"
                     onClick={() => this.handleSelectDetails(itemArray, "withdraw")}>
                    <div className="mb-2">
                        <h6 className="font-weight-bold mb-0">
                            {currency && currency.toUpperCase()}
                        </h6>
                    </div>
                    <div className="d-flex" style={{fontSize: "13px"}}>
                        <div className="d-flex flex-column align-items-start justify-content-start text-muted-2">
                            <span className="mb-1">
                              {this.props.intl.formatMessage({
                                  id: "page.body.openOrders.header.amount",
                              })}
                            </span>
                            <span className="mb-1">
                                {/*{this.props.intl.formatMessage({*/}
                                {/*    id: "page.body.openOrders.header.price",*/}
                                {/*})}*/}
                                Fee
                            </span>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-start pl-2">
                            <span className="mb-1">
                                {wallet && preciseData(amount, wallet.fixed)}
                            </span>
                            <span>
                                {fee}
                            </span>
                        </div>
                    </div>
                </div>
            )
          }

          const renderWithdrawAmount = () => {
            return (
                <div className="d-flex flex-column justify-content-center align-items-end pr-3" onClick={() => this.handleSelectDetails(itemArray, "withdraw")}>
                  <div>
                    <p className="text-muted-2 mb-2">
                      {localeDate(created_at)}
                    </p>
                  </div>
                  <div className="py-2">
                    <strong style={{color: setWithdrawStatusColor(item.state)}} className="mb-0">
                      {state}
                    </strong>
                  </div>
                </div>
            )
          }

          if (windowWidth < 769 ) {
            return [
                renderIcon(),
                renderWithdrawInfo(),
                renderWithdrawAmount(),
            ]
          }

          return [
            React.createElement(
              "div",
              {
                className: "parent-history-elem__hide",
                key: blockchain_txid || rid,
              },
              (get(currencyInfo, "type") === "coin" &&
                React.createElement(
                  "a",
                  {
                    href: this.getBlockchainLink(
                      currency,
                      blockchain_txid,
                      rid
                    ),
                    target: "_blank",
                    rel: "noopener noreferrer",
                  },
                  blockchain_txid || rid
                )) ||
                React.createElement("a", {}, blockchain_txid || rid)
            ),
            localeDate(created_at),
            uppercase(currency),
            wallet && preciseData(amount, wallet.fixed),
            fee,
            React.createElement(
              "span",
              {
                style: { color: setWithdrawStatusColor(item.state) },
                key: blockchain_txid || rid,
              },
              state
            ),
          ];
        }
        case "trades": {
          const { id, created_at, side, market, price, total, amount, fee } = item;

          const marketToDisplay = marketsData.find((m) => m.id === market) || {
            name: "",
            price_precision: 0,
            amount_precision: 0,
          };
          console.log("markets to display", marketToDisplay);
          const marketName = marketToDisplay ? marketToDisplay.name : market;
          const sideText = setTradesType(side).text.toLowerCase()
            ? this.props.intl.formatMessage({
                id: `page.body.history.trade.content.side.${setTradesType(
                  side
                ).text.toLowerCase()}`,
              })
            : "";

            const buySellSection = () => {

                // const percentage = (Number(executed_volume)/Number(origin_volume)) * 100;
                const percentage = 100;
                const fillPercent = ((percentage/100) * 251.2);

                return (
                    <div className="d-flex justify-content-center align-items-center flex-column pl-2" style={{height: "70px"}}>
                        <div className="mb-2">
                            <h6 style={{color: setTradesType(side).color}} className="text-capitalize font-weight-bold mb-0">
                                {sideText}
                            </h6>
                        </div>
                        <span className="pb-1" style={{width: "47px", height: "55px"}}>
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="transparent"/>
                                <path fill="none" stroke-linecap="round" stroke-width={percentage ? "5" : "0"} stroke={setTradeColor(side).color}
                                      stroke-dasharray={`${fillPercent}, 251.2`}
                                      d="M50 10
                                         a 40 40 0 0 1 0 80
                                         a 40 40 0 0 1 0 -80"/>
                                <text x="50" y="50" text-anchor="middle" dy="7" font-size="24" fill={setTradeColor(side).color}>{percentage}%</text>
                            </svg>
                        </span>
                    </div>
                )
            }

            const detailsSection = () => {
                return (
                    <div className="d-flex flex-column justify-content-start align-items-start pl-2">
                        <div className="d-flex justify-content-end align-items-end mb-2">
                            <h6 className="text-white mb-0 font-weight-bold">
                                {marketToDisplay.name && marketToDisplay.base_unit.toUpperCase()}
                            </h6>
                            <p className="mb-0 ml-1">
                                /{marketToDisplay.name && marketToDisplay.quote_unit.toUpperCase()}
                            </p>
                        </div>
                        <div className="d-flex" style={{fontSize: "13px"}}>
                            <div className="d-flex flex-column align-items-start justify-content-start text-muted-2">
                              <span className="mb-1">
                                {this.props.intl.formatMessage({
                                    id: "page.body.openOrders.header.amount",
                                })}
                              </span>
                              <span className="mb-1">
                                {this.props.intl.formatMessage({
                                    id: "page.body.openOrders.header.price",
                                })}
                              </span>
                            </div>
                            <div className="d-flex flex-column align-items-start justify-content-start pl-2">
                              <span className="mb-1">
                                  <Decimal key={id} precision={ marketToDisplay.amount_precision}>{amount}</Decimal>
                                  &nbsp;
                                  {marketToDisplay.name && marketToDisplay.base_unit.toUpperCase()}
                              </span>
                              <span className={"mb-1"}>
                                <Decimal key={id} precision={ marketToDisplay.price_precision}>{price}</Decimal>
                                  &nbsp;
                                  {marketToDisplay.name && marketToDisplay.quote_unit.toUpperCase()}
                              </span>
                            </div>
                        </div>
                    </div>
                )
            }

            const dateSection = () => {
                return (
                    <div className="d-flex flex-column pt-2 align-items-end px-3 py-1">
                        <p className={`text-muted-2 mb-2`}>
                            {localeDate(created_at)}
                        </p>
                        <div className="d-flex" style={{fontSize: "13px"}}>
                            <div className="d-flex flex-column align-items-start justify-content-start text-muted-2">
                              <span className="mb-1">
                                {this.props.intl.formatMessage({
                                    id: "page.body.trade.header.openOrders.content.total",
                                })}
                              </span>
                              <span className="mb-1">
                                {this.props.intl.formatMessage({
                                    id: "page.body.history.withdraw.header.fee",
                                })}
                              </span>
                            </div>
                            <div className="d-flex flex-column align-items-end justify-content-start pl-2">
                                <span className={"mb-1"}>
                                    <Decimal
                                        id={id}
                                        precision={marketToDisplay.price_precision + marketToDisplay.amount_precision}
                                    >
                                        {total}
                                    </Decimal>
                                    {" "}
                                    {marketToDisplay.name && marketToDisplay.quote_unit.toUpperCase()}
                                </span>
                                    {fee && <span className={"mb-1"}>
                                    <Decimal
                                        id={id}
                                        precision={marketToDisplay.price_precision + marketToDisplay.amount_precision}
                                    >
                                        {fee}
                                    </Decimal>
                                        {" "}
                                        {marketToDisplay.name && marketToDisplay.quote_unit.toUpperCase()}
                                </span>}
                            </div>
                        </div>
                    </div>
                )
            }

          if(windowWidth < 769) {
            return [
                // buySellSection(),
                detailsSection(),
                dateSection(),
            ]
          }

          return [
            localeDate(created_at),
            React.createElement(
              "span",
              { style: { color: setTradesType(side).color }, key: id },
              sideText
            ),
            marketName,
            React.createElement(
              Decimal,
              { key: id, fixed: marketToDisplay.price_precision },
              price
            ),
            React.createElement(
              Decimal,
              { key: id, fixed: marketToDisplay.amount_precision },
              amount
            ),
            React.createElement(
              Decimal,
              {
                key: id,
                fixed:
                  marketToDisplay.price_precision +
                  marketToDisplay.amount_precision,
              },
              total
            ),
          ];
        }
        default: {
          return [];
        }
      }
    };
    this.getBlockchainLink = (currency, txid, rid) => {
      const currencyInfo = this.props.wallets.find(
        (wallet) => wallet.currency === currency
      );
      try {
        if (currencyInfo) {
          if (txid) {
            return currencyInfo.explorerTransaction.replace("#{txid}", txid);
          }
          if (rid) {
            return currencyInfo.explorerAddress.replace("#{address}", rid);
          }
        }
      } catch (e) {
        return "";
      }
      return "";
    };

    this.renderDetails = () => {
      const {selectedDetails, selectedType, detailsSelected} = this.state;

      const getHeaders = (selectedType) => {
        switch (selectedType) {
          case "deposit":
            return this.depositHeader;
          case "withdraw":
            return this.withdrawHeader;
          case "trades":
            return this.tradesHeader;
          default: return this.depositHeader;
        }
      }

      const getTitle = () => {
          switch (selectedType) {
              case "deposit":
                  return this.props.intl.formatMessage({id: "page.history.deposit.details"});
              case "withdraw":
                  return this.props.intl.formatMessage({id: "page.history.withdraw.details"});
              default: return "Details";
          }
      }

      return (
          <div className={`d-flex flex-column history-details-div pt-3 px-3 ${detailsSelected ? "history-details-div-open" : "history-details-div-close"}`}>
            <div className="d-flex justify-content-between">
              <div>
                  {getTitle()}
              </div>
              <div onClick={() => {this.setState({detailsSelected: false})}}>
                <CloseIcon />
              </div>
            </div>
            <div className="d-flex flex-column py-2">
              {
                getHeaders(selectedType).map((head, index) => {
                  return (
                      <div className="d-flex flex-column justify-content-center align-items-start py-1">
                        <div className="mb-1 text-muted-2">
                          {head}
                        </div>
                        <div className="text-break mw-100 text-white">
                          {selectedDetails && selectedDetails[index]}
                        </div>
                      </div>
                  )
                })
              }
            </div>
          </div>
      )
    }
    this.handleSelectDetails = (value, type) => {
      this.setState({
        selectedDetails: value,
        detailsSelected: true,
        selectedType: type,
      })
    }
  }
  componentDidMount() {
    const { type } = this.props;
    this.props.fetchHistory({ page: 0, type, limit: 25 });
  }
  render() {
    const { list, fetching } = this.props;
    const {selectedDetails, detailsSelected} = this.state;
    const detailsOverLay = () => {
      return (
          <div className="history-details-overlay" onClick={() => {this.setState({detailsSelected: false})}}/>
      )
    }
    return React.createElement(
      "div",
      {
        className: `parent-history-elem ${
          list.length ? "deposits-table" : "parent-history-elem-empty"
        }`,
      },
      
      React.createElement(
        "div",
        {
          className: "clip-loader__container justify-content-center align-items-center w-100 h-100",
          style: { display: fetching ? "d-flex" : "none" },
        },
        fetching &&
          React.createElement(ClipLoader, {
            sizeUnit: "px",
            size: 35,
            loading: fetching,
            color: "var(--accent)",
          })
      ),
      list.length ? this.renderContent() : null,
      !list.length && !fetching
        ? React.createElement(
            "p",
            { className: "parent-history-elem__empty" },
            this.props.intl.formatMessage({ id: "page.noDataToShow" })
          )
        : null,
      (selectedDetails && detailsSelected) && detailsOverLay(),
      (selectedDetails && detailsSelected) && this.renderDetails(),
    );
  }
}
const mapStateToProps = (state) => ({
  marketsData: selectMarkets(state),
  wallets: selectWallets(state),
  list: selectHistory(state),
  fetching: selectHistoryLoading(state),
  fullHistory: selectFullHistory(state),
  page: selectCurrentPage(state),
  pageCount: selectPageCount(state, 25),
  firstElemIndex: selectFirstElemIndex(state, 25),
  lastElemIndex: selectLastElemIndex(state, 25),
  nextPageExists: selectNextPageExists(state, 25),
  windowWidth: selectWindowWidth(state),
});
export const mapDispatchToProps = (dispatch) => ({
  fetchHistory: (params) => dispatch(fetchHistory(params)),
});
const HistoryElement = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(HistoryComponent)
);
export { HistoryElement };
