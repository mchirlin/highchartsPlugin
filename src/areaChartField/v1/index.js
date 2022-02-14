var Highcharts = require('highcharts');

import {
  getModel,
  getChartOptions,
  getXAxisRotation,
  ChartTypes,
  TEXT_WEIGHT_SEMI_BOLD,
  FONT_SIZE
} from '../../_js/chartUtils'

import {merge} from 'lodash';

let chart;

Appian.Component.onNewValue(function (newValues) {
  let model = getModel(newValues, ChartTypes.AreaChart);

  Appian.Component.setValidations(model.validations);

  const {rotation, formatter} = getXAxisRotation(
    model,
    -45
  );

  Highcharts.dateFormats = {
      '-m': function (timestamp) {
          return (new Date(timestamp)).getUTCMonth() + 1;
      },
      '-e': function (timestamp) {
          return (new Date(timestamp)).getUTCDate();
      }
  };

  let chartOptions = getChartOptions(
    model,
    {
      chart: {
          type: 'area',
          zoomType: 'x',
          animation: true
      },
      plotOptions: {
        area: {
          dataLabels: {
            enabled: model.showDataLabels,
          },
          threshold: model.threshold,
        }
      },
      xAxis: {
        visible: model.xAxisStyle !== 'NONE',
        title: {
          text: escape(model.xAxisTitle),
          style: {
            fontWeight: TEXT_WEIGHT_SEMI_BOLD
          }
        },
        labels: {
          rotation,
          style: {
            fontSize: FONT_SIZE,
            textOverflow: 'ellipsis'
          },
          format: model.xAxisFormat,
        },
        allowDecimals: model.allowDecimalAxisLabels,
        categories: model.categories,
        type: model.xAxisType
      },
      yAxis: {
        visible: model.yAxisStyle !== 'NONE',
        maxPadding: model.yAxisStyle === 'MINIMAL' ? 0 : undefined,
        tickPositioner:
          model.yAxisStyle === 'MINIMAL' || model.yAxisStyle === 'NONE' ?
          function () {
            const defaultTicks = this.tickPositions;
            const formattedMin = model.allowDecimalAxisLabels
              ? model.yAxisMin
              : Math.floor(model.yAxisMin);
            const min = formattedMin || defaultTicks[0];
            const formattedMax = model.allowDecimalAxisLabels
              ? model.yAxisMax
              : Math.ceil(model.yAxisMax);
            const max =
              formattedMax || defaultTicks[defaultTicks.length - 1];
            return [min, max];
          }
        : undefined,
        title: {
          text: escape(model.yAxisTitle),
          style: {
            fontWeight: TEXT_WEIGHT_SEMI_BOLD
          }
        },
        allowDecimals: model.allowDecimalAxisLabels
      }
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
