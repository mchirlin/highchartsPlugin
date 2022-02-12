var Highcharts = require('highcharts');
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/wordcloud')(Highcharts);

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
      chart: {
        type: 'packedbubble'
      },
      plotOptions: {
        packedbubble: {
          minSize: model.minSize,
          maxSize: model.maxSize,
          dataLabels: {
            enabled: model.showDataLabels,
            style: {
              color: 'black',
              textOutline: 'none',
              fontWeight: 'normal'
            },
            format: '{point.name}'
          },
          layoutAlgorithm: {
            splitSeries: model.splitSeries
          }
        }
      },
      tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}'
      }
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
