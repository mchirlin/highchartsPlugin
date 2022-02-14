var Highcharts = require('highcharts');
require('highcharts/modules/heatmap')(Highcharts);

import {
  getModel,
  getChartOptions,
  ChartTypes,
} from '../../_js/chartUtils'

import {merge} from 'lodash';

let chart;

Appian.Component.onNewValue(function (newValues) {

  let model = getModel(newValues, ChartTypes.Heatmap);

  Appian.Component.setValidations(model.validations);

  let chartOptions = getChartOptions(
    model,
    {
      chart: {
        type: 'heatmap'
      },
      xAxis: {
        categories: model.xCategories
      },
      yAxis: {
        categories: model.yCategories,
        title: null,
        reversed true
      },
      // colorAxis: {
      //   min: 0,
      //   minColor: '#FFFFFF',
      //   maxColor: Highcharts.getOptions().colors[0]
      // },
      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
