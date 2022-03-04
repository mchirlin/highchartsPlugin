require('highcharts/modules/sankey')(Highcharts);

import {
  Highcharts,
  getModel,
  getChartOptions,
  ChartTypes,
} from '../../_js/chartUtils'

let chart;

Appian.Component.onNewValue(function (newValues) {
  let model = getModel(newValues, ChartTypes.SankeyDiagram);

  Appian.Component.setValidations(model.validations);

  let chartOptions = getChartOptions(
    model,
    {
      chart: {
        type: 'sankey'
      }
    }
  );

  chart = Highcharts.chart('container', chartOptions);
});
