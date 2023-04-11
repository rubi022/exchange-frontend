import {MarketDepths} from '../../component/organisms';
import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {preciseData} from '../../helpers';
import {selectCurrentMarket, selectDepthAsks, selectDepthBids,} from '../../modules';
import {selectCurrentTheme} from "../../modules/public/generic";

const settings = {
  tooltip: true,
  dataKeyX: 'price',
  dataKeyY: 'cumulativeVolume',
  height: 300,
};
class MarketDepthContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.convertToCumulative = (data, type) => {
      if (!this.props.currentMarket) {
        return;
      }
      const [askCurrency, bidCurrency] = [this.props.currentMarket.base_unit.toUpperCase(), this.props.currentMarket.quote_unit.toUpperCase()];
      const tipLayout = ({ volume, price, cumulativeVolume, cumulativePrice }) => (React.createElement("span", { className: 'parent-market-depth__tooltip' },
          React.createElement("span", null,
              React.createElement(FormattedMessage, { id: "page.body.trade.header.marketDepths.content.price" }),
              " : ",
              price,
              " ",
              bidCurrency),
          React.createElement("span", null,
              React.createElement(FormattedMessage, { id: "page.body.trade.header.marketDepths.content.volume" }),
              " : ",
              volume,
              " ",
              askCurrency),
          React.createElement("span", null,
              React.createElement(FormattedMessage, { id: "page.body.trade.header.marketDepths.content.cumulativeVolume" }),
              " : ",
              preciseData(cumulativeVolume, this.props.currentMarket.amount_precision),
              " ",
              askCurrency),
          React.createElement("span", null,
              React.createElement(FormattedMessage, { id: "page.body.trade.header.marketDepths.content.cumulativeValue" }),
              " : ",
              preciseData(cumulativePrice, this.props.currentMarket.price_precision),
              " ",
              bidCurrency)));
      let cumulativeVolumeData = 0;
      let cumulativePriceData = 0;
      const cumulative = data.map((item, index) => {
        const [price, volume] = item;
        const numberVolume = Number(volume);
        const numberPrice = Number(price);
        cumulativeVolumeData = numberVolume + cumulativeVolumeData;
        cumulativePriceData = cumulativePriceData + (numberPrice * numberVolume);
        return {
          [type]: cumulativeVolumeData,
          cumulativePrice: preciseData(cumulativePriceData, this.props.currentMarket.price_precision),
          cumulativeVolume: preciseData(cumulativeVolumeData, this.props.currentMarket.amount_precision),
          volume: Number(volume),
          price: Number(price),
          name: tipLayout({ volume, price, cumulativeVolume: cumulativeVolumeData, cumulativePrice: cumulativePriceData }),
        };
      });
      return type === 'bid' ? cumulative
              .sort((a, b) => b.bid - a.bid) :
          cumulative.sort((a, b) => a.ask - b.ask);
    };

    this.state = {
      currentBackgroundColor: localStorage.getItem('colorTheme') && localStorage.getItem('colorTheme') === 'light' ? 'white' : '#1C223D',
      strokeAxisColor: '#444F65',
    };

  }
  shouldComponentUpdate(prev, next) {
    const { asksItems, bidsItems } = prev;
    const ordersLength = Number(asksItems.length) + Number(bidsItems.length);
    return ordersLength !== (this.props.asksItems.length + this.props.bidsItems.length) || prev.colorTheme !== this.props.colorTheme || asksItems !== this.props.asksItems || bidsItems !== this.props.bidsItems;
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.colorTheme !== this.props.colorTheme) {
      if (nextProps.colorTheme === 'light') {
        this.setState({
          currentBackgroundColor: 'white',
        })
      } else {
        this.setState({
          currentBackgroundColor: '#1C223D',
        })
      }
    }
  }

  render() {
    const { asksItems, bidsItems } = this.props;
    const { currentBackgroundColor, strokeAxisColor } = this.state;
    const colors = {
      fillAreaAsk: '#fa5252',
      fillAreaBid: '#12b886',
      gridBackgroundStart: 'transparent',
      gridBackgroundEnd: 'transparent',
      strokeAreaAsk: '#fa5252',
      strokeAreaBid: '#12b886',
      strokeGrid: 'transparent',
      strokeAxis: strokeAxisColor,
    };
    return (React.createElement(React.Fragment, null,
        // React.createElement("div", { className: "base-table-header__content" },
        //     React.createElement("div", { className: 'parent-market-depth__title' },
        //         React.createElement(FormattedMessage, { id: "page.body.trade.header.marketDepths" }))),
        (asksItems.length || bidsItems.length) ? this.renderMarketDepth(colors) : null));
  }
  renderMarketDepth(colors) {
    return (React.createElement(MarketDepths, { settings: {...settings, ...{height: MarketDepths ? MarketDepths.clientHeight : 200}}, className: 'parent-market-depth', colors: colors, data: (this.props.asksItems.length > 0 && this.props.bidsItems.length > 0) ? this.convertToDepthFormat() : null, ref: "MarketDepths" }));
  }
  convertToDepthFormat() {
    const { asksItems, bidsItems } = this.props;
    const asksItemsLength = asksItems.length;
    const bidsItemsLength = bidsItems.length;
    const resultLength = asksItemsLength > bidsItemsLength ? bidsItemsLength : asksItemsLength;
    const asks = asksItems.slice(0, resultLength);
    const bids = bidsItems.slice(0, resultLength);
    const asksVolume = this.convertToCumulative(asks, 'ask');
    const bidsVolume = this.convertToCumulative(bids, 'bid');
    return [...bidsVolume, ...asksVolume];
  }
}
const mapStateToProps = state => ({
  asksItems: selectDepthAsks(state),
  bidsItems: selectDepthBids(state),
  currentMarket: selectCurrentMarket(state),
  colorTheme: selectCurrentTheme(state),
});
export const MarketDepthsComponent = connect(mapStateToProps)(MarketDepthContainer);

