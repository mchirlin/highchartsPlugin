var Highcharts = require('highcharts');
import { escape } from 'lodash'

import {
  getColorScheme,
  getXAxisType,
  processSeries,
   __COLORS,
   __COLORS_VAL,
   __TEXT_COLOR_DARK,
   __TEXT_COLOR_LIGHT,
   __TEXT_WEIGHT_SEMI_BOLD,
   __FONT_SIZE
 } from '../../chartUtils'

 import css from "../../highcharts.css";

let chart;

Appian.Component.onNewValue(function (newValues) {
  // Capture Height Parameter
  let containerHeight = newValues.height;

  let validations = [];

  var showLegend = newValues.showLegend == null ? false : newValues.showLegend;
  var showTooltips = newValues.showTooltips == null ? false : newValues.showTooltips;
  var showDataLabels = newValues.showDataLabels == null ? false : newValues.showDataLabels;

  var categories = newValues.categories;
  var data = newValues.series;

  var xAxisTitle = newValues.xAxisTitle;
  var yAxisTitle = newValues.yAxisTitle;
  var xAxisStyle = newValues.xAxisStyle;
  var yAxisStyle = newValues.yAxisStyle;
  var yAxisMin = newValues.yAxisMin;
  var yAxisMax = newValues.yAxisMax;
  var xAxisType = getXAxisType(data, categories);

  var threshold = newValues.threshold;

  var tooltipData = '{point.y}';
  var allowDecimalAxisLabels = newValues.allowDecimalAxisLabels;

  var colorScheme = newValues.colorScheme;
  var colors = getColorScheme({colorScheme: colorScheme, series: data, type: 'areaChart'});

  if (!colors) {
    validations.push(__COLORS_VAL);
  }

  if (validations.length > 0) {
    containerHeight = '0px';
  }

  if (containerHeight === 'auto') {
    document.getElementById('container').style.height = '400px';
  } else if (containerHeight !== 'auto') {
    document.getElementById('container').style.height = parseInt(containerHeight) - 16 + "px";
  }

  Appian.Component.setValidations(validations);

  chart = Highcharts.chart('container', {
    chart: {
        type: 'area',
        styledMode: true
    },
    colors: colors,
    plotOptions: {
      area: {
        dataLabels: {
          enabled: showDataLabels,
        },
        threshold: threshold ? threshold : 0,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
                enabled: true
            }
          }
        }
      }
    },
    legend: {
      enabled: showLegend
    },
    xAxis: {
      visible: xAxisStyle !== 'NONE',
      title: {
        text: escape(xAxisTitle),
        style: {
          fontWeight: __TEXT_WEIGHT_SEMI_BOLD
        }
      },
      labels: {
        style: {
          fontSize: __FONT_SIZE
        }
      },
      allowDecimals: allowDecimalAxisLabels,
      categories: categories,
      type: xAxisType
    },
    yAxis: {
      visible: yAxisStyle !== 'NONE',
      maxPadding: yAxisStyle === 'MINIMAL' ? 0 : undefined,
      tickPositioner:
        yAxisStyle === 'MINIMAL' || yAxisStyle === 'NONE' ?
        function () {
          const defaultTicks = this.tickPositions;
          const formattedMin = allowDecimalAxisLabels
            ? yAxisMin
            : Math.floor(yAxisMin);
          const min = formattedMin || defaultTicks[0];
          const formattedMax = allowDecimalAxisLabels
            ? yAxisMax
            : Math.ceil(yAxisMax);
          const max =
            formattedMax || defaultTicks[defaultTicks.length - 1];
          return [min, max];
        }
      : undefined,
      title: {
        text: escape(yAxisTitle),
        style: {
          fontWeight: __TEXT_WEIGHT_SEMI_BOLD
        }
      },
      allowDecimals: allowDecimalAxisLabels
    },
    series: processSeries(data),
    tooltip: {
      pointFormat:
        `<span style="color:${__TEXT_COLOR_DARK};">{series.name}: </span>` +
        `<span style="font-weight: ${__TEXT_WEIGHT_SEMI_BOLD}">${tooltipData}</span><br/>`,
      shared: true,
      useHTML: true,
      borderRadius: 0,
      shadow: false,
      borderColor: '#eee',
      backgroundColor: 'rgba(255,255,255,0.92)',
      enabled: showTooltips,
      outside: true
    },
    title: {
      text: undefined
    },
    credits: {
      enabled: false
    },
  });
});
