import React from 'react';
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {selectWallets, walletsFetch, selectUserInfo} from "../../modules";
import { selectCurrencies } from "../../modules/user/beneficiaries/selectors";
import { currenciesFetch } from "../../modules/user/beneficiaries";
import { Dropdown } from "react-bootstrap"

class Converter extends React.Component {
    constructor(props) {
        super(props)
        this.translate = (id) => this.props.intl.formatMessage({ id });
    }
    componentDidMount() {
            currenciesFetch()
    }
  render() {
    const {wallets, currencies} = this.props

    let formattedWallets = wallets.map((wallet) => ({
      ...wallet,
      currency: wallet.currency.toUpperCase(),
      iconUrl: wallet.iconUrl ? wallet.iconUrl : "",
    }));


    console.log(formattedWallets);
    console.log("cur", currencies);
    return (
      <div className="convert-page">
        <div className="text-center py-5 title">
            <h1 className="font-bold">IEO Page</h1>
            <p style={{fontWeight: '400'}}>Convert is fast & easy with  Eruo Trust Capital Swap</p>
        </div>
        <div className='card'>
            <div className='convert-wrapper my-2 py-5'>
                <div className='input-wrapper w-100 py-3'>
                    <label>From</label>
                    <div className='d-flex input-box align-items-center py-2'>
                        <input className='form-control' type="number" placeholder="0.0000" />
                        <span className='py-2 pr-4'>Max</span>
                        <Dropdown>
                            <Dropdown.Toggle id="convert-dropdown">
                                BTC
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>BTC</Dropdown.Item>
                                {this.props.currencies.map((v) => {
                                    return (
                                        <Dropdown.Item>{v.name}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className='input-wrapper w-100 pt-3 text-center'>
                    <i class="fas fa-exchange-alt"></i>
                </div>
                <div className='input-wrapper w-100 py-3'>
                    <label>To</label>
                    <div className='d-flex input-box align-items-center py-2'>
                        <input className='form-control' type="number" placeholder="0.0000" />
                        <Dropdown>
                            <Dropdown.Toggle id="convert-dropdown">
                                BTC
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>BTC</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <label className='my-2'>Estimated: 1 USDT ≈ 10 MEOW <i class="fas fa-info-circle"></i></label>
                </div>
                <div className='input-wrapper w-100 py-3'>
                    <button className='btn btn-convert w-100 py-3'>Convert</button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    wallets: selectWallets(state),
    currencies: selectCurrencies(state),
    user: selectUserInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchWallets: () => dispatch(walletsFetch()),
    fetchCurrencies: () => dispatch(currenciesFetch()),
});

export const ConverterScreen = injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Converter))
);
