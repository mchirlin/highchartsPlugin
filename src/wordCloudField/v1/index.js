var Highcharts = require('highcharts');
require('highcharts/modules/wordcloud')(Highcharts);

import {
  getModel,
  getChartOptions,
  ChartTypes,
} from '../../_js/chartUtils'

import {merge} from 'lodash';

let chart;

Appian.Component.onNewValue(function (newValues) {
  let model = getModel(newValues, ChartTypes.WordCloud);

  Appian.Component.setValidations(model.validations);

  let chartOptions = getChartOptions(
    model,
    {
      series: [{
        type: 'wordcloud',
      }],
      plotOptions: model.showLinks ? {
        series: {
          cursor: 'pointer',
          events: {
            click: function (event) {
              Appian.Component.saveValue('link', event.target.point.options);
            }
          }
        }
      } : {},
    }
  )

  chart = Highcharts.chart('container', chartOptions);
});
