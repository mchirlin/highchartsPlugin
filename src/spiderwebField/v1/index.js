var Highcharts = require('highcharts');
require('highcharts/highcharts-more')(Highcharts);

import {
  getModel,
  getChartOptions,
  ChartTypes,
} from '../../_js/chartUtils'

import {merge} from 'lodash';

let chart;

Appian.Component.onNewValue(function (newValues) {

  let model = getModel(newValues, ChartTypes.Spiderweb);
  model.xAxisType = model.series[0].data[0].name ? 'category' : 'linear';

  Appian.Component.setValidations(model.validations);

  let chartOptions = getChartOptions(
    model,
    {
      chart: {
        polar: true,
        type: 'line'
      },
      pane: {
        size: '80%'
      },
      xAxis: {
        categories: model.categories,
        type: model.xAxisType,
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: model.yAxisMin,
        max: model.yAxisMax
      }
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
