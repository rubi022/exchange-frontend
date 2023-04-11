import { Button } from "@components/components";
import * as React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { walletCustomCurrency } from './../../api/config'
import {
  CurrencyInfo,
  DepositCrypto,
  DepositFiat,
  Wallets,
} from "../../components";
import { ModalWithdrawConfirmation } from "../../containers/ModalWithdrawConfirmation";
import { ModalWithdrawSubmit } from "../../containers/ModalWithdrawSubmit";
import { WalletHistory } from "../../containers/Wallets/History";
import { Withdraw } from "../../containers/Wallets/Withdraw";
import {estimateValue, setDocumentTitle} from "../../helpers";
import {
  alertPush,
  beneficiariesData, marketsFetch, selectHideEmptyWallets,
  selectHistory, selectMarkets,
  selectMarketTickers,
  selectMobileWalletUi,
  selectUserInfo,
  selectWallets,
  selectWalletsAddressError,
  selectWalletsLoading,
  selectWithdrawSuccess, setEmptyWalletVar,
  setMobileWalletUi,
  walletsAddressFetch,
  walletsData,
  walletsFetch,
  walletsWithdrawCcyFetch,
} from "../../modules";
import { ClipLoader } from "react-spinners";
import { ModalWithdraw } from "../../containers/ModalWithdraw";
import { WalletListDesktop } from "../../components/WalletListDesktop";
import { selectCurrencies } from "../../modules/user/beneficiaries/selectors";
import { currenciesFetch } from "../../modules/user/beneficiaries";
import LeftContainer from "../../containers/LeftNavigationContainer";
import { TabPanel } from "../../components/TabPanel";
import {createBeneficiaryFromWallets} from "../../modules/public/generic";
import {primaryCurrency} from "../../api";

const bch = require("bitcoin-source");

class WalletsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.translate = (id) => this.props.intl.formatMessage({ id });
    this.onTabChange = (index, label) => this.setState({ tab: label });
    this.onActiveIndexChange = (index) => {
      this.setState({
          activeIndex: index,
          activeCurrency: this.state.walletsList.length > 0 ? this.state.walletsList[index] ? this.state.walletsList[index].currency.toUpperCase() : '' : ''
      })
    };
    this.onCurrentTabChange = (index) =>
      this.setState({ currentTabIndex: index });
    this.toggleSubmitModal = () => {
      this.setState((state) => ({
        withdrawSubmitModal: !state.withdrawSubmitModal,
        withdrawDone: true,
      }));
      this.props.setMobileWalletUi('');
    };
    this.toggleDeposit = () => {
      this.setState((state) => ({
        depositModal: !state.depositModal,
      }));
      this.props.setMobileWalletUi('');
    };
    this.toggleWithdraw = () => {
      this.setState((state) => ({
        withdrawModal: !state.withdrawModal,
      }));
      this.props.setMobileWalletUi('');
    };

    this.toggleConfirmModal = (withdrawState) => {
      this.setState((state) => ({
        ...withdrawState,
        withdrawConfirmModal: !state.withdrawConfirmModal,
      }));
      this.props.setMobileWalletUi('');
    };
    this.handleWithdraw = () => {
      const {
        selectedWalletIndex,
        otpCode,
        amount,
        beneficiary_id,
        useBeneficiary,
        rid,
      } = this.state;
      if (selectedWalletIndex === -1) {
        return;
      }
      const { currency } = this.props.wallets[selectedWalletIndex];
      let withdrawRequest = {
        amount: amount.toString(),
        currency: currency.toLowerCase(),
        otp: otpCode,
        beneficiary_id,
      };
      if (!useBeneficiary) {
        withdrawRequest = {
          amount: amount.toString(),
          currency: currency.toLowerCase(),
          otp: otpCode,
          rid,
        };
      }
      this.props.walletsWithdrawCcy(withdrawRequest);
      this.toggleConfirmModal();
    };
    this.handleOnCopy = () => {
      this.props.fetchSuccess({
        message: ["page.body.wallets.tabs.deposit.ccy.message.success"],
        type: "success",
      });
    };
    this.isOtpDisabled = () => {
      return React.createElement(
        "div",
        { className: "text-cengter1 pt-5" },
        React.createElement(
          "p",
          { className: "parent-wallet__enable-2fa-message" },
          this.translate("page.body.wallets.tabs.withdraw.content.enable2fa")
        ),
        React.createElement(Button, {
          className: "btn btn-primary w-auto",
          label: this.translate(
            "page.body.wallets.tabs.withdraw.content.enable2faButton"
          ),
          onClick: this.redirectToEnable2fa,
        })
      );
    };
    this.redirectToEnable2fa = () =>
      this.props.history.push("/security/2fa", { enable2fa: true });
    this.onWalletSelectionChange = (value) => {
      const { wallets } = this.props;
      if (
        !value.address &&
        !this.props.walletsLoading &&
        value.type !== "fiat"
      ) {
        this.props.fetchAddress({ currency: value.currency });
      }
      const nextWalletIndex = this.props.wallets.findIndex(
        (wallet) =>
          wallet.currency.toLowerCase() === value.currency.toLowerCase()
      );
      this.setState({
        selectedWalletIndex: nextWalletIndex,
        withdrawDone: false,
      });
      this.props.setMobileWalletUi(wallets[nextWalletIndex].name);
    };
    this.t = (key) => {
      return this.props.intl.formatMessage({ id: key });
    };
    this.getTableHeaders = () => {
      return [
        this.t("page.body.wallet.currencyTitle"),
        this.t("page.body.wallet.currencyName"),
        this.t("page.body.wallet.availableBalance"),
        this.t("page.body.wallet.lockedBalance"),
        this.t("page.body.wallet.actionTitle"),
      ];
    };
    this.resize = () => {
      this.setState((state) => ({
        mobileWallet: window.innerWidth < 720,
      }));
    };
    this.getWithdrawProps = () => {
      const { tab, withdrawDone, selectedWalletIndex } = this.state;
      if (selectedWalletIndex === -1) {
        return [{ content: null, label: "" }];
      }
      const {
        user: { level, otp },
        wallets,
      } = this.props;
      const wallet = wallets[selectedWalletIndex];
      const { currency, fee, type, beneficiaries, balance } = wallet;
      const fixed = (wallet || { fixed: 0 }).fixed;
      return {
        withdrawDone,
        currency,
        fee,
        balance,
        beneficiaries,
        onClick: this.toggleConfirmModal,
        borderItem: "empty-circle",
        twoFactorAuthRequired: this.isTwoFactorAuthRequired(level, otp),
        type,
        fixed,
        withdrawAddressLabel: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.content.address",
        }),
        withdrawAmountLabel: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.content.amount",
        }),
        withdraw2faLabel: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.content.code2fa",
        }),
        withdrawFeeLabel: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.content.fee",
        }),
        withdrawTotalLabel: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.content.total",
        }),
        withdrawButtonLabel: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.content.button",
        }),
        withdrawAddressLabelPlaceholder: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.content.addressPlaceholder",
        }),
        withdrawUseBeneficiaryIdToggleLabel: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.form.toggleLabel",
        }),
        withdrawBeneficiaryPlaceholder: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.form.beneficiaryPlaceHolder",
        }),
        withdrawBeneficiaryAdd: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.form.addNewBeneficiary",
        }),
        withdrawBalanceLabel: this.props.intl.formatMessage({
          id: "page.body.wallets.tabs.withdraw.content.balance",
        }),
        createBeneficiaryFromWallets: this.props.createBeneficiaryFromWallets,
      };
    };

    this.handleToggleEmptyWallets = () => {
      const { emptyWallets } = this.props;
      this.props.setEmptyWallets(!emptyWallets);
    }

    this.state = {
      activeIndex: 0,
      mobileWallet: false,
      selectedWalletIndex: -1,
      withdrawSubmitModal: false,
      withdrawModal: false,
      depositModal: false,
      withdrawConfirmModal: false,
      otpCode: "",
      amount: 0,
      beneficiary_id: 0,
      beneficiary_details: [],
      tab: this.translate("page.body.wallets.tabs.deposit"),
      withdrawDone: false,
      total: 0,
      currentTabIndex: 0,
      activeCurrency: '',
    };
  }

  componentDidMount() {
    this.props.fetchCurrencies();
    document.getElementsByClassName('parent-layout')[0].classList.add('parent-layout__custom-wrapper');
    setDocumentTitle(this.t("page.header.navbar.wallets"));
    if (this.props.wallets.length === 0) {
      this.props.fetchWallets();
    } else {
      this.props.fetchAddress({ currency: this.props.wallets[0].currency });
    }
    if (this.state.selectedWalletIndex === -1 && this.props.wallets.length) {
      this.setState({ selectedWalletIndex: 0 });
    }
    if (this.props.markets.length < 1) {
      this.props.marketsFetch();
    }
    this.resize();
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    document.getElementsByClassName('parent-layout')[0].classList.remove('parent-layout__custom-wrapper');
    this.props.clearWallets();
  }

  componentWillReceiveProps(next) {
    if (this.props.wallets.length === 0 && next.wallets.length > 0) {
      this.setState({
        selectedWalletIndex: 0,
      });
      this.props.fetchAddress({ currency: next.wallets[0].currency });
    }
    if (!this.props.withdrawSuccess && next.withdrawSuccess) {
      this.toggleSubmitModal();
    }
    if (this.props.wallets.length > 0) {
      this.setState({
        walletsList: [...this.props.wallets]
      })
    }
  }

  render() {
    const {
      wallets,
      historyList,
      mobileWalletChosen,
      walletsLoading,
      marketTickers,
      currencies,
      emptyWallets,
      markets
    } = this.props;

    const usdPrecision =
      currencies?.filter((currency) => currency.id === "usd")[0] || 4;
    const {
      total,
      beneficiary_id,
      beneficiary_details,
      selectedWalletIndex,
      filteredWallets,
      withdrawSubmitModal,
      withdrawConfirmModal,
      currentTabIndex,
      depositModal,
      withdrawModal,
      mobileWallet,
    } = this.state;
    let formattedWallets = wallets.map((wallet) => ({
      ...wallet,
      currency: wallet.currency.toUpperCase(),
      iconUrl: wallet.iconUrl ? wallet.iconUrl : "",
    }));
    const selectedCurrency = (wallets[selectedWalletIndex] || { currency: "" })
      .currency;
    const wallet = wallets[selectedWalletIndex];
    if (walletsLoading)
      return React.createElement(
        "div",
        { className: "d-flex justify-content-center align-items-center w-100 h-100" },
        React.createElement(ClipLoader, {
          sizeUnit: "px",
          size: 35,
          loading: true,
          color: "var(--accent)",
        })
      );

    const walletCurrencies = formattedWallets.filter((data) => walletCustomCurrency().includes(data.currency));;
    let upperList = [];

    if (walletCurrencies.length > 0) {
      let result1 = [], result2 = [];
      for (let i = 0; i < formattedWallets.length; i++) {
        if (walletCurrencies.includes(formattedWallets[i])) {
          result1.push(formattedWallets[i]);
        } else {
          result2.push(formattedWallets[i]);
        }
      }

      this.state.walletsList = result1.concat(result2);
      formattedWallets = result1.concat(result2);
      upperList = walletCurrencies.slice(0, 4);
    } else {
      upperList = formattedWallets.slice(0, 4);
    }


    const defaultIconUrl = require(`../../components/WalletItem/Icon/default.png`)

    const defaultCurrency = currencies.filter(curr => curr.id.toLowerCase() === "usd" || curr.id.toLowerCase() === "usdt")[0];
    const defaultCurrencyWallet = defaultCurrency && wallets.filter(wallet => wallet.currency === defaultCurrency.id)[0];

    const nonZeroWallets = formattedWallets.filter(element => Number(element.balance) !== 0 );
    const totalEstimatedValue = estimateValue(primaryCurrency(), currencies, wallets, markets, marketTickers) || '0.0';

    return (
      <div style={{ display: "flex", height: '100%' }}>
        <LeftContainer />
        <div className={'parent-wallet__custom-wrapper'}>
          <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                margin: "30px",
              }}
              className="parent-container parent-wallet"
          >
            <div className="mobile-dis-appear">
              <h3
                  style={{
                    padding: "2rem 0rem 1rem",
                    fontWeight: 700,
                    fontSize: "27.6px",
                    color: "var(--side-bar-active-content-heading)",
                  }}
              >
                {this.props.intl.formatMessage({id: 'page.header.navbar.wallets'})}
              </h3>
            </div>
            <div className="new-card-wallet-list">
              {upperList.map((e, i) => {
                let iconUrl = e.iconUrl;
                if (!iconUrl) {
                  try {
                    if (e.currency === "QUBIT") {
                      iconUrl = require(`../../components/WalletItem/Icon/QUBIT.png`)
                    } else {
                      iconUrl = require(`../../components/WalletItem/Icon/${e.currency}.svg`);
                    }
                  } catch (e) {
                    iconUrl = defaultIconUrl;
                  }
                }

                return (
                    <div className="new-card-wallet">
                      <div className="new-card-wallet-item">
                        <img
                            style={{
                              width: "32px",
                              height: "32px",
                            }}
                            src={iconUrl}
                        ></img>
                        <div
                            style={{
                              flex: 1,
                              marginLeft: "10px",
                            }}
                        >
                          <h6 className="new-card-wallet-list-heading">{e.name}</h6>
                          <div className="new-card-wallet-amt-div">
                        <span className="new-card-wallet-list-span">
                          Avl: &nbsp;
                        </span>
                            {e.balance}
                          </div>
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
            <div
                className={`row no-gutters parent-wallet__tabs-content ${
                    !historyList.length && "parent-wallet__tabs-content-height"
                }`}
            >
              <div
                  className={`col-md-12 col-sm-12 col-12 ${
                      mobileWalletChosen && "d-none d-md-block"
                  }`}
              >
                <div className="d-flex d-md-none flex-column justify-content-center align-items-center w-100 pt-4 wallets-portfolio-wrapper">
                  <div>
                    <h2>
                      ${Number(totalEstimatedValue).toFixed(2)}
                    </h2>
                  </div>
                  <div className="portfolio-text">
                    {this.translate("page.wallets.portfolio.text").toUpperCase()}
                  </div>
                </div>
                {mobileWallet ? (
                  <>
                    <Wallets
                        {...{
                          onWalletSelectionChange: this.onWalletSelectionChange,
                          walletItems: ([defaultCurrencyWallet]),
                          activeIndex: this.state.activeIndex,
                          onActiveIndexChange: this.onActiveIndexChange,
                          walletsLoading: walletsLoading,
                          toggleEmptyWallets: this.handleToggleEmptyWallets,
                          showEmptyWallets: emptyWallets,
                          marketTickers: marketTickers,
                          markets: markets,
                          currencies: currencies,
                          displayHideSwitch: false,
                          hideWalletsLabel: this.props.intl.formatMessage({
                            id: "page.wallets.label.hideEmptyWallets"
                          }),
                        }}
                    />
                    <Wallets
                        {...{
                          onWalletSelectionChange: this.onWalletSelectionChange,
                          walletItems: emptyWallets ? nonZeroWallets : (filteredWallets || formattedWallets),
                          activeIndex: this.state.activeIndex,
                          onActiveIndexChange: this.onActiveIndexChange,
                          walletsLoading: walletsLoading,
                          toggleEmptyWallets: this.handleToggleEmptyWallets,
                          showEmptyWallets: emptyWallets,
                          marketTickers: marketTickers,
                          markets: markets,
                          currencies: currencies,
                          displayHideSwitch: true,
                          hideWalletsLabel: this.props.intl.formatMessage({
                            id: "page.wallets.label.hideEmptyWallets"
                          }),
                        }}
                    />
                  </>
                ) : (
                    <WalletListDesktop
                        {...{
                          usdPrecision: usdPrecision.precision || usdPrecision,
                          marketTickers: marketTickers,
                          onWalletSelectionChange: this.onWalletSelectionChange,
                          walletItems: emptyWallets ? nonZeroWallets : (filteredWallets || formattedWallets),
                          activeIndex: this.state.activeIndex,
                          onActiveIndexChange: this.onActiveIndexChange,
                          toggleDeposit: this.toggleDeposit,
                          toggleWithdraw: this.toggleWithdraw,
                          walletsLoading: walletsLoading,
                          headers: this.getTableHeaders(),
                          toggleEmptyWallets: this.handleToggleEmptyWallets,
                          showEmptyWallets: emptyWallets,
                          hideWalletsLabel: this.props.intl.formatMessage({
                            id: "page.wallets.label.hideEmptyWallets"
                          }),
                          depositActionTitle: this.props.intl.formatMessage({
                            id: "page.body.wallet.action.deposit",
                          }),
                          withdrawActionTitle: this.props.intl.formatMessage({
                            id: "page.body.wallet.action.withdraw",
                          }),
                          noWalletsLabel: this.props.intl.formatMessage({
                            id: "page.body.wallets.noWallets",
                          })
                        }}
                    />
                )}
              </div>
              {mobileWallet && (
                  <div
                      className={`parent-wallet__tabs col-md-7 col-sm-12 col-12 mobile-wallet-open ${
                          !mobileWalletChosen && "d-none d-md-block"
                      }`}
                  >
                    <CurrencyInfo
                        {...{
                          wallet: wallets[selectedWalletIndex],
                        }}
                    />
                    <TabPanel
                        {...{
                          panels: this.renderTabs(selectedWalletIndex),
                          onTabChange: this.onTabChange,
                          currentTabIndex: currentTabIndex,
                          onCurrentTabChange: this.onCurrentTabChange,
                        }}
                    />
                  </div>
              )}
            </div>
          </div>

          <ModalWithdraw
              {...{
                show: withdrawModal,
                title: "page.body.wallets.tabs.withdraw",
                currency: this.state.activeCurrency,
                render: this.renderWithdrawal(wallet),
                onSubmit: this.toggleWithdraw,
              }}
          />
          <ModalWithdraw
              {...{
                show: depositModal,
                title: "page.body.wallets.tabs.deposit",
                currency: this.state.activeCurrency,
                render: this.renderDeposit(wallet),
                onSubmit: this.toggleDeposit,
              }}
          />
          <ModalWithdrawConfirmation
              {...{
                show: withdrawConfirmModal,
                amount: total,
                currency: selectedCurrency,
                beneficiary_id: beneficiary_id,
                beneficiary_details: beneficiary_details,
                onSubmit: this.handleWithdraw,
                onDismiss: this.toggleConfirmModal,
              }}
          />

          <ModalWithdrawSubmit
              {...{
                show: withdrawSubmitModal,
                currency: selectedCurrency,
                onSubmit: this.toggleSubmitModal,
              }}
          />
        </div>
        </div>
    );
  }

  renderTabs(walletIndex) {
    const { tab } = this.state;
    if (walletIndex === -1) {
      return [{ content: null, label: "" }];
    }
    const { wallets } = this.props;
    const wallet = wallets[walletIndex];
    const { type } = wallet;
    const withdrawProps = this.getWithdrawProps();
    return [
      {
        content:
          tab === this.translate("page.body.wallets.tabs.deposit")
            ? this.renderDeposit(wallet)
            : null,
        label: this.translate("page.body.wallets.tabs.deposit"),
      },
      {
        content:
          tab === this.translate("page.body.wallets.tabs.withdraw")
            ? this.renderWithdraw(withdrawProps, type)
            : null,
        label: this.translate("page.body.wallets.tabs.withdraw"),
      },
    ];
  }

  renderDeposit(wallet) {
    const { addressDepositError, wallets, currencies } = this.props;
    const { selectedWalletIndex } = this.state;
    if (selectedWalletIndex === -1) {
      return React.createElement(React.Fragment, null);
    }
    const currency = (wallets[selectedWalletIndex] || { currency: "" })
      .currency;
    let confirmations = 0;
    let min_deposit_amount = 0;
    let deposit_enabled = 0;
    let deposit_fee = 0;
    currencies?.filter(element => {
      if (element.id === currency) {
        confirmations = element.min_confirmations
        min_deposit_amount = element.min_deposit_amount
        deposit_enabled = element.deposit_enabled
        deposit_fee = element.deposit_fee
      }
    });

    const text = this.props.intl.formatMessage({
      id: "page.body.wallets.tabs.deposit.ccy.message.submit",
    });
    const error = addressDepositError
      ? this.props.intl.formatMessage({
        id: "page.body.wallets.tabs.deposit.ccy.message.error",
      })
      : this.props.intl.formatMessage({
        id: "page.body.wallets.tabs.deposit.ccy.message.error",
      });
    const walletAddress = wallet.address || '';
    if (wallet.type === "coin") {
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(DepositCrypto, {
          data: walletAddress,
          handleOnCopy: ["page.body.wallets.tabs.deposit.ccy.message.success"],
          error: error,
          text: text,
          min_deposit_warning: this.props.intl.formatMessage({
            id: "page.body.wallets.min_deposit_warning",
          }, {
            min_amount: min_deposit_amount,
            currency: wallet.currency.toUpperCase(),
          }),
          mining_deposit_warning: this.props.intl.formatMessage({
            id: "page.body.wallets.mining_deposit_warning",
          }),
          disabled: walletAddress === "",
          copiableTextFieldText: this.translate(
            "page.body.wallets.tabs.deposit.ccy.message.address"
          ),
          copyButtonText: this.translate(
            "page.body.wallets.tabs.deposit.ccy.message.button"
          ),
          minDepositAmount: min_deposit_amount,
          depositEnabled: deposit_enabled,
          depositFee: deposit_fee,
          currency: wallet.currency,
        }),
        currency &&
        React.createElement(WalletHistory, {
          label: "deposit",
          type: "deposits",
          currency: currency,
        })
      );
    } else {
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(DepositFiat, { currency: wallet.currency }),
        currency &&
        React.createElement(WalletHistory, {
          label: "deposit",
          type: "deposits",
          currency: currency,
        })
      );
    }
  }

  renderWithdraw(withdrawProps, type) {
    const { walletsError, user, wallets } = this.props;
    const { selectedWalletIndex } = this.state;
    if (selectedWalletIndex === -1) {
      return React.createElement(React.Fragment, null);
    }
    const currency = (wallets[selectedWalletIndex] || { currency: "" })
      .currency;

    return React.createElement(
      React.Fragment,
      null,
      walletsError &&
      React.createElement(
        "p",
        { className: "parent-wallet__error" },
        walletsError.message
      ),
      React.createElement(Withdraw, Object.assign({}, withdrawProps)),
      currency &&
      React.createElement(WalletHistory, {
        label: "withdraw",
        type: "withdraws",
        currency: currency,
      })
    );
  }

  renderWithdrawal() {
    const { walletsError, user, wallets } = this.props;
    const { selectedWalletIndex } = this.state;
    if (selectedWalletIndex === -1) {
      return React.createElement(React.Fragment, null);
    }
    const currency = (wallets[selectedWalletIndex] || { currency: "" })
      .currency;
    const withdrawProps = this.getWithdrawProps();
    withdrawProps.walletBalance = wallets[selectedWalletIndex].balance;
    return React.createElement(
      React.Fragment,
      null,
      walletsError &&
      React.createElement(
        "p",
        { className: "parent-wallet__error" },
        walletsError.message
      ),
      React.createElement(Withdraw, Object.assign({}, withdrawProps)),
      currency &&
      React.createElement(WalletHistory, {
        label: "withdraw",
        type: "withdraws",
        currency: currency,
      })
    );
  }

  isTwoFactorAuthRequired(level, is2faEnabled) {
    return window.env.withdrawOtp && window.env.withdrawOtp === true
      ? false
      : level > 1 || (level === 1 && is2faEnabled);
  }
}

const mapStateToProps = (state) => ({
  user: selectUserInfo(state),
  wallets: selectWallets(state),
  currencies: selectCurrencies(state),
  walletsLoading: selectWalletsLoading(state),
  addressDepositError: selectWalletsAddressError(state),
  withdrawSuccess: selectWithdrawSuccess(state),
  historyList: selectHistory(state),
  mobileWalletChosen: selectMobileWalletUi(state),
  marketTickers: selectMarketTickers(state),
  emptyWallets: selectHideEmptyWallets(state),
  markets: selectMarkets(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(currenciesFetch()),
  fetchWallets: () => dispatch(walletsFetch()),
  fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
  walletsWithdrawCcy: (params) => dispatch(walletsWithdrawCcyFetch(params)),
  clearWallets: () => dispatch(walletsData([])),
  fetchSuccess: (payload) => dispatch(alertPush(payload)),
  setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
  createBeneficiaryFromWallets: (payload) => dispatch(createBeneficiaryFromWallets(payload)),
  setEmptyWallets: (payload) => dispatch(setEmptyWalletVar(payload)),
  marketsFetch: () => dispatch(marketsFetch()),
});

export const WalletsScreen = injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletsComponent))
);
