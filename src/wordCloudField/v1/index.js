var Highcharts = require('highcharts');
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

  var showTooltips = newValues.showTooltips == null ? false : newValues.showTooltips;
  var showLinks = newValues.showLinks == null ? false : newValues.showLinks;
  var data = newValues.series;
  var colorScheme = newValues.colorScheme;
  var colors = getColorScheme({colorScheme: colorScheme, series: data, type: 'wordCloud'});

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
    colors: colors,
    series: [{
      type: 'wordcloud',
      data: data,
      name: 'Occurrences'
    }],
    plotOptions: showLinks ? {
      series: {
        cursor: 'pointer',
        events: {
          click: function (event) {
            Appian.Component.saveValue('link', event.target.point.options);
          }
        }
      }
    } : {},
    tooltip: {
      enabled: showTooltips
    },
    title: {
      text: undefined
    },
    credits: {
      enabled: false
    },
  });
});
