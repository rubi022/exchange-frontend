import * as React from "react";
import closeButton from "../../assets/images/close.svg";
import { OrderTypeTab } from "../OrderTypeTab";
import buySellLogo from "../../assets/images/etc-buy-sell.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectSignInLastLink, selectOrderScreenDisplay } from "../../modules";
import { setOrderScreenDisplay, setSignInLastLink } from "../../modules/public/generic";
import { ordersCancelAllSaga } from "../../modules/user/ordersHistory/sagas/ordersCancelAllSaga";
import { OrderComponentDesktop } from "../../containers/OrderInsertDesktop";

export class MobileBuySellComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windowSize: window.innerWidth,
            selectedDropdownItem: "Limit",
        }

        this.handleOrderScreenDisplay = () => {
            this.props.setOrderScreenDisplay(true);
        };

        this.handleOrderScreenCloseButton = () => {
            this.props.setOrderScreenDisplay(false);
        };

        this.handleScreen = (e) => {
            this.setState({
                windowSize: window.innerWidth,
            });
        };

        this.handleDropdownItem = (value) => {
            this.setState({ selectedDropdownItem: value });
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleScreen.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleScreen.bind(this));
    }

    render() {

        const { windowSize } = this.state;
        const { orderScreenDisplay } = this.props;

        return (
            <div
                className={"parent-order-mobile"}
                style={{
                    width: orderScreenDisplay ? "100%" : "70px",
                }}
            >
                <div
                    className={`parent-order-mobile-close-button-${
                        orderScreenDisplay ? "active" : "close"
                    }`}
                    onClick={this.handleOrderScreenCloseButton.bind(this)}
                >
                    <img
                        className={"parent-order-mobile-close-button-image"}
                        src={closeButton}
                        alt="close"
                    />
                </div>
                {windowSize < 1024 ? (
                    <div
                        className={`order-mobile${
                            orderScreenDisplay ? "-active" : ""
                        }`}
                        onClick={this.handleOrderScreenDisplay.bind(this)}
                    >
                        <div className={"order-mobile-buy-sell justify-content-center align-items-center"}>
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={buySellLogo} alt={"buy/sell"}/>
                            </div>
                        </div>
                        {/*<div className="d-flex justify-content-center align-items-center">*/}
                        {/*    <img src={buySellLogo} alt={"buy/sell"} />*/}
                        {/*</div>*/}
                        {/* <OrderTypeTab /> */}
                        <div className="ordercomponent-container">
                            {this.state.selectedDropdownItem === "Limit" ? <OrderComponentDesktop orderTypeTab={"Limit"}  handleDropdownItem={this.handleDropdownItem} /> : null}
                            {this.state.selectedDropdownItem === "Market" ? <OrderComponentDesktop orderTypeTab={"Market"} handleDropdownItem={this.handleDropdownItem} /> : null}
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    signInLastLink: selectSignInLastLink(state),
    orderScreenDisplay: selectOrderScreenDisplay(state),
});

const mapDispatchToProps = (dispatch) => ({
    setSignInLastLink: () => dispatch(setSignInLastLink()),
    setOrderScreenDisplay: (payload) => dispatch(setOrderScreenDisplay(payload)),
});

const MobileBuySell = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MobileBuySellComponent)
);

export { MobileBuySell };
  