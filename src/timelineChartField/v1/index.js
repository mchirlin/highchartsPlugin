var Highcharts = require('highcharts');
require('highcharts/modules/timeline')(Highcharts);

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
  var xAxisStyle = newValues.xAxisStyle;

  var tooltipData = '{point.y}';

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
      zoomType: 'x',
      type: 'timeline'
    },
    colors: colors,
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
      }
    },
    yAxis: {
      gridLineWidth: 1,
      title: null,
      labels: {
        enabled: false
      }
    },
    series: [{
      dataLabels: {
        allowOverlap: false,
        format: '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
          '{point.x:%d %b %Y}</span><br/>{point.label}'
      },
      marker: {
        symbol: 'circle'
      },
      data: data
    }],
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
      outside: true,
      style: {
        width: 300
      }
    },
    title: {
      text: undefined
    },
    credits: {
      enabled: false
    },
  });
});
