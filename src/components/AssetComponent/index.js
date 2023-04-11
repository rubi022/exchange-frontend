import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
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
import { selectCurrencies } from "../../modules/user/beneficiaries/selectors";
import { currenciesFetch } from "../../modules/user/beneficiaries";
import LeftContainer from "../../containers/LeftNavigationContainer";
import { TabPanel } from "../../components/TabPanel";
import {createBeneficiaryFromWallets} from "../../modules/public/generic";
import {primaryCurrency} from "../../api";
import { WalletAsset } from '../WalletAsset';
import { HistoryElement } from '../../containers';

class AssetComponent extends React.Component {

    constructor(props) {
        super(props)

        this.translate = (id) => this.props.intl.formatMessage({ id });
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

    const usdPrecision =
      currencies?.filter((currency) => currency.id === "usd")[0] || 4;

      const nonZeroWallets = formattedWallets.filter(element => Number(element.balance) !== 0 );

    return(<div className="asset-component">
      <Tabs
      defaultActiveKey="asset"
      id=""
      className="asset-tabs mx-0 mb-0"
    >
      <Tab eventKey="asset" title="Assets">
        <div className="parent-wallet mt-0">
            <div className="row no-gutters parent-wallet__tabs-content">
                <div className="col-12">
                    <WalletAsset {...{
                        usdPrecision: usdPrecision.precision || usdPrecision,
                        marketTickers: marketTickers,
                        onWalletSelectionChange: this.onWalletSelectionChange,
                        walletItems: emptyWallets ? nonZeroWallets : (filteredWallets || formattedWallets),
                        activeIndex: this.state.activeIndex,
                        onActiveIndexChange: this.onActiveIndexChange,
                        toggleDeposit: this.toggleDeposit,
                        toggleWithdraw: this.toggleWithdraw,
                        walletsLoading: walletsLoading,
                        depositActionTitle: this.props.intl.formatMessage({
                        id: "page.body.wallet.action.deposit",
                        }),
                        withdrawActionTitle: this.props.intl.formatMessage({
                        id: "page.body.wallet.action.withdraw",
                        }),
                        noWalletsLabel: this.props.intl.formatMessage({
                        id: "page.body.wallets.noWallets",
                        })
                    }} />
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
      </Tab>
      <Tab eventKey="order" title={this.translate("page.header.navbar.openOrders")}>
        <HistoryElement />
      </Tab>
    </Tabs>
    </div>)
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

export const Assets = injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetComponent))
);
