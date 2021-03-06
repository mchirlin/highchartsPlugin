require('highcharts/highcharts-more')(Highcharts);

import {
  Highcharts,
  getModel,
  getChartOptions,
  ChartTypes,
} from '../../_js/chartUtils'

let chart;

Appian.Component.onNewValue(function (newValues) {

  let model = getModel(newValues, ChartTypes.PackedBubble);

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
