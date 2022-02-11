var Highcharts = require('highcharts');
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/wordcloud')(Highcharts);

import {
  getModel,
  getChartOptions,
  ChartTypes,
 } from '../../chartUtils'

import {merge} from 'lodash';

let chart;

Appian.Component.onNewValue(function (newValues) {
  let model = getModel(newValues, ChartTypes.SankeyDiagram);

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
            enabled: showDataLabels,
          },
          threshold: model.threshold,
        }
      },
      xAxis: {
        visible: xAxisStyle !== 'NONE',
        title: {
          text: escape(xAxisTitle),
          style: {
            fontWeight: __TEXT_WEIGHT_SEMI_BOLD
          }
        },
        labels: {
          rotation,
          style: {
            fontSize: __FONT_SIZE,
            textOverflow: 'ellipsis'
          },
          format: xAxisFormat,
        },
        allowDecimals: allowDecimalAxisLabels,
        categories: categories,
        type: xAxisType
      },
      yAxis: {
        visible: yAxisStyle !== 'NONE',
        maxPadding: yAxisStyle === 'MINIMAL' ? 0 : undefined,
        tickPositioner:
          yAxisStyle === 'MINIMAL' || yAxisStyle === 'NONE' ?
          function () {
            const defaultTicks = this.tickPositions;
            const formattedMin = allowDecimalAxisLabels
              ? yAxisMin
              : Math.floor(yAxisMin);
            const min = formattedMin || defaultTicks[0];
            const formattedMax = allowDecimalAxisLabels
              ? yAxisMax
              : Math.ceil(yAxisMax);
            const max =
              formattedMax || defaultTicks[defaultTicks.length - 1];
            return [min, max];
          }
        : undefined,
        title: {
          text: escape(yAxisTitle),
          style: {
            fontWeight: __TEXT_WEIGHT_SEMI_BOLD
          }
        },
        allowDecimals: allowDecimalAxisLabels
      }
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
