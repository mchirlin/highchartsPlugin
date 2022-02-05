var Highcharts = require('highcharts');
import { escape } from 'lodash'

import {
  getColorScheme,
   __COLORS,
   __COLORS_VAL,
   __TEXT_COLOR_DARK,
   __TEXT_COLOR_LIGHT,
   __TEXT_WEIGHT_SEMI_BOLD,
   __FONT_SIZE
 } from '../../chartUtils'

let chart;

Appian.Component.onNewValue(function (newValues) {
  // Capture Height Parameter
  let containerHeight = newValues.height;

  let validations = [];

  var showTooltips = newValues.showTooltips == null ? false : newValues.showTooltips;

  var xAxisTitle = newValues.xAxisTitle;
  var yAxisTitle = newValues.yAxisTitle;
  var yAxisMin = newValues.yAxisMin;
  var yAxisMax = newValues.yAxisMax;
  var xAxisStyle = newValues.xAxisStyle;
  var yAxisStyle = newValues.yAxisStyle;

  var tooltipData = '{point.y}';

  var allowDecimalAxisLabels = newValues.allowDecimalAxisLabels;

  var data = newValues.series;
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
        type: 'area'
    },
    colors: colors,
    plotOptions: {
      area: {
        // pointStart: 1940,
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
    xAxis: {
      visible: xAxisStyle !== 'NONE',
      title: {
        text: escape(xAxisTitle),
        fontWeight: __TEXT_WEIGHT_SEMI_BOLD
      },
      labels: {
        style: {
          fontSize: __FONT_SIZE
        }
      },
      allowDecimals: allowDecimalAxisLabels
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
    series: data,
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
