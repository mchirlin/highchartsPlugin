require('highcharts/modules/sankey')(Highcharts);
require('highcharts/modules/organization')(Highcharts);

import {
  Highcharts,
  getModel,
  getChartOptions,
  determineTextColor,
  ChartTypes,
} from '../../_js/chartUtils'

let chart;

Appian.Component.onNewValue(function (newValues) {

  let model = getModel(newValues, ChartTypes.OrganizationChart);

  Appian.Component.setValidations(model.validations);

  let chartOptions = getChartOptions(
    model,
    {
      chart: {
        type: 'organization',
        inverted: model.orientation === 'VERTICAL'
      },
      plotOptions: {
        organization: {
          dataLabels: {
            color: determineTextColor(model.colors[model.colors.length - 1])
          }
        }
      },
      series: [{
        levels: model.colors.map((e, i) => (
          {
            level: i,
            color: e,
            dataLabels: {
              color: determineTextColor(e)
            }
          }
        )),
        color: model.colors[model.colors.length - 1],
        colorByPoint: false,
        nodeWidth: 65 /* TODO - make configurable or dynamic? */
      }],
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
