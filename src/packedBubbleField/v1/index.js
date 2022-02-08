var Highcharts = require('highcharts');
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/wordcloud')(Highcharts);

import {
  getColorScheme,
   __COLORS,
   __COLORS_VAL
 } from '../../chartUtils'

let chart;

Appian.Component.onNewValue(function (newValues) {
  // Capture Height Parameter
  let containerHeight = newValues.height;

  let validations = [];

  var showLegend = newValues.showLegend == null ? false : newValues.showLegend;
  var showTooltips = newValues.showTooltips == null ? false : newValues.showTooltips;
  var showDataLabels = newValues.showDataLabels == null ? false : newValues.showDataLabels;

  var data = newValues.series;
  var colorScheme = newValues.colorScheme;
  var colors = getColorScheme({colorScheme: colorScheme, series: data, type: 'packedBubble'});

  // var minSize = newValues.minSize;
  // var maxSize = newValues.minSize;

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
      type: 'packedbubble'
    },
    colors: colors,
    series: data,
    plotOptions: {
      packedbubble: {
        // minSize: minSize,
        // maxSize: maxSize,
        dataLabels: {
          enabled: showDataLabels,
          style: {
            color: 'black',
            textOutline: 'none',
            fontWeight: 'normal'
          },
          format: '{point.name}'
        }
      }
    },
    legend: {
      enabled: showLegend
    },
    tooltip: {
      enabled: showTooltips,
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value}'
    },
    title: {
      text: undefined
    },
    credits: {
      enabled: false
    },
  });
});
