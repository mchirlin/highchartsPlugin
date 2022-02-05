var Highcharts = require('highcharts');
require('highcharts/modules/sankey')(Highcharts);

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
  var data = newValues.series;
  var colorScheme = newValues.colorScheme;
  var colors = getColorScheme({colorScheme: colorScheme, series: data, type: 'sankeyDiagram'});

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
      data: data,
      type: 'sankey'
    }],
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
