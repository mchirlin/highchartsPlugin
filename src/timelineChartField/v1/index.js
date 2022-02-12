var Highcharts = require('highcharts');
require('highcharts/modules/timeline')(Highcharts);

import {
  getModel,
  getChartOptions,
  ChartTypes,
 } from '../../chartUtils'

import {merge} from 'lodash';

let chart;

Appian.Component.onNewValue(function (newValues) {
  let model = getModel(newValues, ChartTypes.TimelineChart);

  Appian.Component.setValidations(model.validations);

  let chartOptions = getChartOptions(
    model,
    {
      chart: {
        zoomType: 'x',
        type: 'timeline'
      },
      yAxis: {
        gridLineWidth: 1,
      },
      series: [{
        dataLabels: {
          allowOverlap: false,
          format: '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
            '{point.x:%d %b %Y}</span><br/>{point.label}'
        },
        data: data
      }],
      tooltip: {
        pointFormat:
          `<span style="color:${__TEXT_COLOR_DARK};">{series.name}: </span>` +
          `<span style="font-weight: ${__TEXT_WEIGHT_SEMI_BOLD}">${tooltipData}</span><br/>`,
        shared: true,
        useHTML: true,
        borderRadius: 0,
        shadow: false,
        borderColor: '#eee',
        backgroundColor: 'rgba(255,255,255,0.92)',
        outside: true,
        style: {
          width: 300
        }
      }
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
