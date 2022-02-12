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
      chart: {
        type: 'wordcloud'
      },
      series: [{
        type: 'wordcloud',
        data: model.series,
        name: 'Occurrences'
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
