import * as React from "react";
import {TabPanel} from "../../components/TabPanel";
import {marketsFetch, } from "../../modules/public/markets";
import {walletsFetch} from "../../modules/user/wallets";
import {fetchHistory, resetHistory} from "../../modules/user/history";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {OrderComponentDesktop} from "../OrderInsertDesktop";
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Dropdown, DropdownButton, MenuItem } from "react-bootstrap";
import { clearFields } from "redux-form";

class OrderTypeDropdownContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedDropdownItem: "Limit",
        };
        // this.handleMakeRequest = (index) => {
        //     if (this.state.tab === this.tabMapping[index]) {
        //         return;
        //     }
        //     this.props.resetHistory();
        //     this.setState({ tab: this.tabMapping[index] });
        // };
        this.getUserMenu = () => {
          // console.log(`Dropdown selected item`, this.props.selectedDropdownItem);

            return (
              <div className="order-type-dropdown__container">
                <DropdownButton style={{ zIndex: "100000" }} onSelect={(e) => { 
                  this.setState({ selectedDropdownItem: e }); 
                  this.props.handleDropdownItem(e);
                  }} id="dropdown-item-button" title={this.props.selectedDropdownItem}>
                  <Dropdown.Item eventKey="Limit">Limit</Dropdown.Item>
                  <Dropdown.Item eventKey="Market">Market</Dropdown.Item>
                </DropdownButton>
              </div>
            )
        };
    }

    render() {
      return (
        <div>
            {this.getUserMenu()}
            {/* {this.state.selectedDropdownItem === 'limit' ? <OrderComponentDesktop orderTypeTab = {"Limit"} /> : null}
            {this.state.selectedDropdownItem === 'market' ? <OrderComponentDesktop orderTypeTab = {"Market"} /> : null} */}
        </div>
      );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMarkets: () => dispatch(marketsFetch()),
    fetchWallets: () => dispatch(walletsFetch()),
    fetchHistory: payload => dispatch(fetchHistory(payload)),
    resetHistory: () => dispatch(resetHistory()),
});

export const OrderTypeDropdown = injectIntl(connect(null, mapDispatchToProps)(OrderTypeDropdownContainer));

