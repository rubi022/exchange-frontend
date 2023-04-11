import * as React from "react";
import {MarketsTabs} from "../ToolBar/MarketSelector/MarketsTabs";
import {MarketsList} from "../ToolBar/MarketSelector/MarketsList";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    marketsFetch,
    selectCurrentMarket,
    selectMarkets, selectMarketsLoading,
    selectMarketTickers, selectWindowWidth,
    setCurrentMarket
} from "../../modules";
import {selectRanger} from "../../modules/public/ranger/selectors";
import {rangerConnectFetch} from "../../modules/public/ranger";
import {ClipLoader} from "react-spinners";
import {setDocumentTitle} from "../../helpers";

class MobileMarketsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            marketsTabsSelectedValue: "",
            searchFieldValue: ""
        }

        this.marketsTabsSelectHandler = (value) => {
            this.setState({
                marketsTabsSelectedValue: value,
            });
        }
    }

    componentDidMount() {

        setDocumentTitle(
            this.props.intl.formatMessage({ id: "page.body.header.markets" })
        );

        const { markets, rangerState: { connected }, history, windowWidth} = this.props;

        if (markets.length < 1) {
            this.props.marketsFetch();
        }

        if (!connected) {
            this.props.rangerConnect({ withAuth: false });
        }

        if (!history.location.pathname.includes("/markets-list") && windowWidth < 769) {
            history.replace("/markets-list")
        }
    }

    render() {

        const { searchFieldValue, marketsTabsSelectedValue } = this.state;
        const { history, marketsLoading } = this.props;

        if (marketsLoading) {
            return (
                <div className="w-100% h-100 d-flex justify-content-center align-items-center">
                    <ClipLoader
                        sizeUnit={"px"}
                        size={35}
                        loading={true}
                        color={"var(--accent)"}
                    />
                </div>
            )
        }

        return (
            <>
                <MarketsTabs onSelect={this.marketsTabsSelectHandler} />
                <MarketsList search={searchFieldValue} currencyQuote={marketsTabsSelectedValue} history={history}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentMarket: selectCurrentMarket(state),
    marketTickers: selectMarketTickers(state),
    markets: selectMarkets(state),
    rangerState: selectRanger(state),
    windowWidth: selectWindowWidth(state),
    marketsLoading: selectMarketsLoading(state),
});
const mapDispatchToProps = (dispatch) => ({
    marketsFetch: () => dispatch(marketsFetch()),
    rangerConnect: (payload) => dispatch(rangerConnectFetch(payload)),
    setCurrentMarket: (payload) => dispatch(setCurrentMarket(payload)),
});

export const MobilMarkets = injectIntl(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileMarketsComponent))
);
