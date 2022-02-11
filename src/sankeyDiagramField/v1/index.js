var Highcharts = require('highcharts');
require('highcharts/modules/sankey')(Highcharts);

import {
  getModel,
  getChartOptions,
  ChartTypes,
 } from '../../chartUtils'

import {merge} from 'lodash';

let chart;

Appian.Component.onNewValue(function (newValues) {
  let model = getModel(newValues, ChartTypes.SankeyDiagram);

  Appian.Component.setValidations(model.validations);

  let chartOptions = getChartOptions(
    model,
    {
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
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
