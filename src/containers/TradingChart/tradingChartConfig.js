import {colors} from "../../constants";

export const customWidgetOptions = (colorTheme) => {
    if (colorTheme === 'light') {
        return ({
            toolbar_bg: colors.light.chart.secondary,
            loading_screen: {
                backgroundColor: colors.light.chart.secondary,
            },
            overrides: {
                ['symbolWatermarkProperties.color']: colors.light.chart.primary,
                ['volumePaneSize']: 'medium',
                ['mainSeriesProperties.candleStyle.upColor']: colors.light.chart.up,
                ['mainSeriesProperties.candleStyle.downColor']: colors.light.chart.down,
                ['mainSeriesProperties.candleStyle.borderUpColor']: colors.light.chart.up,
                ['mainSeriesProperties.candleStyle.borderDownColor']: colors.light.chart.down,
                ['mainSeriesProperties.candleStyle.wickUpColor']: colors.light.chart.up,
                ['mainSeriesProperties.candleStyle.wickDownColor']: colors.light.chart.down,
                ['paneProperties.background']: colors.light.chart.primary,
                ['paneProperties.vertGridProperties.color']: colors.light.chart.grid,
                ['paneProperties.vertGridProperties.style']: 1,
                ['paneProperties.horzGridProperties.color']: colors.light.chart.grid,
                ['paneProperties.horzGridProperties.style']: 1,
                ['paneProperties.crossHairProperties.color']: colors.light.chart.tertiary,
                ['paneProperties.crossHairProperties.width']: 1,
                ['paneProperties.crossHairProperties.style']: 1,
                ['scalesProperties.backgroundColor']: colors.light.chart.primary,
                "paneProperties.legendProperties.showLegend": !1,
                "mainSeriesProperties.candleStyle.drawWick": !0,
                "mainSeriesProperties.candleStyle.drawBorder": !0,
                "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,
                "scalesProperties.scaleSeriesOnly": !1,
                "scalesProperties.showSeriesLastValue": !0,
                "scalesProperties.showSeriesPrevCloseValue": !1,
                "scalesProperties.showStudyLastValue": !1,
                "scalesProperties.showStudyPlotLabels": !1,
                "scalesProperties.showSymbolLabels": !1
            },
            theme: 'Light',
        });
    }

    return ({
        toolbar_bg: colors.dark.chart.secondary,
        loading_screen: {
            backgroundColor: colors.dark.chart.secondary,
        },
        overrides: {
            ['symbolWatermarkProperties.color']: colors.dark.chart.primary,
            ['volumePaneSize']: 'medium',
            ['mainSeriesProperties.candleStyle.upColor']: colors.dark.chart.up,
            ['mainSeriesProperties.candleStyle.downColor']: colors.dark.chart.down,
            ['mainSeriesProperties.candleStyle.borderUpColor']: colors.dark.chart.up,
            ['mainSeriesProperties.candleStyle.borderDownColor']: colors.dark.chart.down,
            ['mainSeriesProperties.candleStyle.wickUpColor']: colors.dark.chart.up,
            ['mainSeriesProperties.candleStyle.wickDownColor']: colors.dark.chart.down,
            ['paneProperties.background']: colors.dark.chart.primary,
            ['paneProperties.vertGridProperties.color']: colors.dark.chart.grid,
            ['paneProperties.vertGridProperties.style']: 1,
            ['paneProperties.horzGridProperties.color']: colors.dark.chart.grid,
            ['paneProperties.horzGridProperties.style']: 1,
            ['paneProperties.crossHairProperties.color']: colors.dark.chart.tertiary,
            ['paneProperties.crossHairProperties.width']: 1,
            ['paneProperties.crossHairProperties.style']: 1,
            ['scalesProperties.backgroundColor']: colors.dark.chart.primary,
            "paneProperties.legendProperties.showLegend": !1,
            "mainSeriesProperties.candleStyle.drawWick": !0,
            "mainSeriesProperties.candleStyle.drawBorder": !0,
            "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,
            "scalesProperties.scaleSeriesOnly": !1,
            "scalesProperties.showSeriesLastValue": !0,
            "scalesProperties.showSeriesPrevCloseValue": !1,
            "scalesProperties.showStudyLastValue": !1,
            "scalesProperties.showStudyPlotLabels": !1,
            "scalesProperties.showSymbolLabels": !1
        },
        theme: 'Dark',
    });
};
