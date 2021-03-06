import {
  Highcharts,
  getModel,
  getChartOptions,
  getXAxisRotation,
  ChartTypes
} from '../../_js/chartUtils'

let chart;

Appian.Component.onNewValue(function (newValues) {
  let model = getModel(newValues, ChartTypes.AreaChart);

  Appian.Component.setValidations(model.validations);

  const {rotation} = getXAxisRotation(
    model,
    -45
  );

  let chartOptions = getChartOptions(
    model,
    {
      chart: {
          type: 'area',
          zoomType: 'x'
      },
      plotOptions: {
        area: {
          threshold: model.threshold,
        }
      },
      xAxis: {
        labels: {
          rotation
        }
      }
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
