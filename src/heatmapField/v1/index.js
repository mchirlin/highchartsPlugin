require('highcharts/modules/heatmap')(Highcharts);

import {
  Highcharts,
  getModel,
  getChartOptions,
  ChartTypes,
} from '../../_js/chartUtils'

let chart;

Appian.Component.onNewValue(function (newValues) {

  let model = getModel(newValues, ChartTypes.HeatMap);

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
        reversed: true
      },
      tooltip: {
        useHTML: true,
        pointFormat: '<b>{series.name}:</b> {point.value}'
      }
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});