import {
  Highcharts,
  getModel,
  getChartOptions,
  getXAxisRotation,
  ChartTypes
} from '../../_js/chartUtils'

let chart;

Appian.Component.onNewValue(function (newValues) {

  let model = getModel(newValues, ChartTypes.ScatterChart);

  Appian.Component.setValidations(model.validations);

  const {rotation} = getXAxisRotation(
    model,
    -45
  );

  let chartOptions = getChartOptions(
    model,
    {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: model.markerRadius
          }
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
