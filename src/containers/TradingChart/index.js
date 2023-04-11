import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { widget } from "../../charting_library/charting_library.min";
import {
  selectCurrentLanguage,
  selectCurrentMarket,
  selectKline,
  selectMarkets,
  selectMarketTickers,
} from "../../modules";
import {
  rangerSubscribeKlineMarket,
  rangerUnsubscribeKlineMarket,
} from "../../modules/public/ranger";
import {
  dataFeedObject,
  getTradingChartTimezone,
  print,
  stdTimezoneOffset,
} from "./api";
import { selectCurrentTheme } from "../../modules/public/generic";
import { periodStringToMinutes } from "../../modules/public/ranger/helpers";
import { customWidgetOptions } from "./tradingChartConfig";
import {UNSUPPORTED_LANGUAGES} from "../../constants";

export class TradingChartComponent extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.currentKlineSubscription = {};
    this.theme =
      localStorage.getItem("colorTheme") &&
      localStorage.getItem("colorTheme") === "light"
        ? "Light"
        : "Dark";
    this.params = {
      interval: "60",
      containerId: "tv_chart_container",
      libraryPath: "/charting_library/",
      chartsStorageUrl: "https://saveload.tradingview.com",
      chartsStorageApiVersion: "1.1",
      clientId: "tradingview.com",
      userId: "public_user_id",
      fullscreen: false,
      autosize: true,
      studiesOverrides: {},
      theme: this.theme,
    };
    this.studies = [];
    this.tvWidget = null;
    this.datafeed = dataFeedObject(this, this.props.markets);
    const currentTimeOffset = new Date().getTimezoneOffset();
    const clockPeriod =
      currentTimeOffset === stdTimezoneOffset(new Date()) ? "STD" : "DST";
    this.setChart = (markets, currentMarket, colorTheme) => {
      this.datafeed = dataFeedObject(this, markets);
      const widgetOptions = {
        allow_symbol_change: true,
        autosize: true,
        calendar: true,
        hide_legend: false,
        save_image: true,
        client_id: "tradingview.com",
        // custom_css_url: '/tradingview.css',
        debug: false,
        details: true,
        enabled_features: [
          "charts_auto_save",
          "use_localstorage_for_settings",
          "control_bar",
          "hide_left_toolbar_by_default",
          "legend_context_menu",
          "header_in_fullscreen_mode",
          "header_chart_type",
          "header_resolutions",
          "side_toolbar_in_fullscreen_mode",
          "dont_show_boolean_study_arguments",
          "hide_last_na_study_output",
          "save_chart_properties_to_local_storage",
          "remove_library_container_border",
        ],
        disabled_features: [
          "border_around_the_chart",
          "timeframes_toolbar",
          "timezone_menu",
          "go_to_date",
          "countdown",
          "header_screenshot",
          "header_undo_redo",
          "header_symbol_search",
          "symbol_info",
          "header_compare",
          "display_market_status",
          "symbol_search_hot_key",
          "compare_symbol",
          "symbol_info",
          "header_interval_dialog_button",
          "show_interval_dialog_on_key_press",
          "widget_logo",
        ],
        enable_publishing: true,
        fullscreen: false,
        height: 610,
        hide_side_toolbar: true,
        hotlist: false,
        library_path: "/charting_library/",
        popup_height: "50",
        popup_width: "000",
        show_popup_button: true,
        studies_overrides: {},
        timeframe: "1D",
        user_id: "public_user_id",
        withdateranges: false,
        // charts_storage_url: "https://saveload.tradingview.com",
        // charts_storage_api_version: "1.1",

        symbol: currentMarket.id,
        datafeed: this.datafeed,
        interval: this.props.kline.period
          ? String(periodStringToMinutes(this.props.kline.period))
          : this.params.interval,
        container_id: this.params.containerId,
        locale: UNSUPPORTED_LANGUAGES.includes(this.props.lang.toLowerCase()) ? 'en' : this.props.lang,
        timezone: getTradingChartTimezone(currentTimeOffset, clockPeriod),

        ...customWidgetOptions(colorTheme),
      };

      this.tvWidget = new widget(widgetOptions);
      const { kline } = this.props;

      let previousRange = { from: 0, to: 0 };
      if (kline.range.from !== 0 && kline.range.to !== 0) {
        previousRange = this.props.kline.range;
      }

      let previousResolution = "";
      if (kline.period) {
        previousResolution = kline.period;
      }

      this.tvWidget.onChartReady(() => {
        this.createStudy();
        this.tvWidget.activeChart().setSymbol(currentMarket.id, () => {
          print("Symbol set", currentMarket.id);
        });

        if (previousRange.from !== 0 && previousRange.to !== 0) {
          this.tvWidget.activeChart().setVisibleRange(previousRange, () => {
            print("Range set", previousRange);
          });
        }

        if (previousResolution) {
          this.tvWidget
            .activeChart()
            .setResolution(
              String(periodStringToMinutes(previousResolution)),
              () => {
                print("Resolution set", previousResolution);
              }
            );
        }
      });
    };
    this.handleThemeChange = (value) => {
      if (
        localStorage.getItem("tradingview.current_theme.name") &&
        value &&
        value === "light"
      ) {
        localStorage.setItem("tradingview.current_theme.name", "light");
      } else {
        localStorage.setItem("tradingview.current_theme.name", "dark");
      }
    };
    this.updateChart = (currentMarket) => {
      if (this.tvWidget) {
        this.tvWidget.onChartReady(() => {
          this.tvWidget.activeChart().setSymbol(currentMarket.id, () => {
            print("Symbol set", currentMarket.id);
          });
        });
      }
    };
    this.createStudy = () => {
      let id = this.tvWidget
        .chart()
        .createStudy("Moving Average", false, false, [7], null, {
          "plot.linewidth": "2",
          "plot.color": "#FF00FF",
        });
      this.studies.push(id);
      id = this.tvWidget
        .chart()
        .createStudy("Moving Average", false, false, [50], null, {
          "plot.color": "#FF1616",
          "plot.linewidth": 2,
        });
      this.studies.push(id);
      id = this.tvWidget
        .chart()
        .createStudy("Moving Average", false, false, [200], null, {
          "plot.color": "#ffffff",
          "plot.linewidth": 10,
        });
      this.studies.push(id);
    };
  }
  componentWillReceiveProps(next) {
    if (
      next.currentMarket &&
      (!this.props.currentMarket ||
        next.currentMarket.id !== this.props.currentMarket.id)
    ) {
      if (
        this.props.currentMarket &&
        this.props.currentMarket.id &&
        this.tvWidget
      ) {
        this.updateChart(next.currentMarket);
      } else {
        this.setChart(next.markets, next.currentMarket, next.colorTheme);
      }
    }
    if (next.kline && next.kline !== this.props.kline) {
      this.datafeed.onRealtimeCallback(next.kline);
    }
    if (next.colorTheme !== this.props.colorTheme) {
      this.handleThemeChange(next.colorTheme);
      this.setChart(next.markets, next.currentMarket, next.colorTheme);
    }
  }

  componentDidMount() {
    if (this.props.currentMarket) {
      this.setChart(
        this.props.markets,
        this.props.currentMarket,
        this.props.colorTheme
      );
    }
  }
  componentWillUnmount() {
    if (this.tvWidget) {
      try {
        this.tvWidget.remove();
      } catch (error) {
        console.log(`TradingChart unmount failed: ${error}`);
      }
    }
  }
  render() {
    return React.createElement(
      React.Fragment,
      null,
      // React.createElement("div", { className: "base-table-header__content" }, this.props.currentMarket ? this.props.currentMarket.name : ''),
      React.createElement("div", {
        id: this.params.containerId,
        className: "parent-trading-chart",
      })
    );
  }
}
const reduxProps = (state) => ({
  markets: selectMarkets(state),
  currentMarket: selectCurrentMarket(state),
  tickers: selectMarketTickers(state),
  kline: selectKline(state),
  lang: selectCurrentLanguage(state),
  colorTheme: selectCurrentTheme(state),
});
const mapDispatchProps = (dispatch) => ({
  subscribeKline: (marketId, periodString) =>
    dispatch(rangerSubscribeKlineMarket(marketId, periodString)),
  unSubscribeKline: (marketId, periodString) =>
    dispatch(rangerUnsubscribeKlineMarket(marketId, periodString)),
});
export const TradingChart = connect(
  reduxProps,
  mapDispatchProps
)(TradingChartComponent);
