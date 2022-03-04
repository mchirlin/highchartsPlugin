require('highcharts/modules/wordcloud')(Highcharts);

import {
  Highcharts,
  getModel,
  getChartOptions,
  ChartTypes,
} from '../../_js/chartUtils'

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
      }]
    }
  )

  chart = Highcharts.chart('container', chartOptions);
});
