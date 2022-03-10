require('highcharts/modules/timeline')(Highcharts);

import {
  Highcharts,
  getModel,
  getChartOptions,
  ChartTypes
} from '../../_js/chartUtils'

let chart;

var tooltipData = '{point.y}';

Appian.Component.onNewValue(function (newValues) {
  newValues.xAxisType = 'datetime';

  let model = getModel(newValues, ChartTypes.TimelineChart);
  let hasDatetime = model.series[0].data[0].x ? true : false;

  model.xAxisType = hasDatetime ? 'datetime' : 'linear';
  model.marker = hasDatetime ? 'circle' : 'square';
  model.dataLabelFormat = hasDatetime ? '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
    '{point.x:%d %b %Y}</span><br/>{point.label}' : undefined;

  Appian.Component.setValidations(model.validations);

  let chartOptions = getChartOptions(
    model,
    {
      chart: {
        zoomType: 'x',
        type: 'timeline'
      },
      tooltip: {
        pointFormat: '{point.description}',
      },
      xAxis: {
        visible: false,
        type: model.xAxisType,
      },
      yAxis: {
        gridLineWidth: 1,
        title: null,
        labels: {
          enabled: false
        }
      },
      series: [{
        dataLabels: {
          allowOverlap: false,
          format: model.dataLabelFormat,
          width: 100,
        },
        marker: {
          symbol: model.marker
        }
      }]
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
