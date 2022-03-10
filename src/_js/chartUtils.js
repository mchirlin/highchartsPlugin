export var Highcharts = require('highcharts');

import { merge, zip, zipWith, isFunction, escape } from 'lodash';

import { Model } from './model';

import "../_css/styles.css"

export const ChartTypes = {
  AreaChart: 'AreaChart',
  BarChart: 'BarChart',
  ColumnChart: 'ColumnChart',
  HeatMap: 'HeatMap',
  OrganizationChart: 'OrganizationChart',
  PackedBubble: 'PackedBubble',
  PieChart: 'PieChart',
  SankeyDiagram: 'SankeyDiagram',
  ScatterChart: 'ScatterChart',
  Spiderweb: 'Spiderweb',
  TileMap: 'TileMap',
  TimelineChart: 'TimelineChart',
  WordCloud: 'WordCloud'
};

const __COLORS_VAL = 'Invalid value for "colorScheme". "colorScheme" must be null, a list of colors, or one of the following values: "CLASSIC" (default), "MIDNIGHT", "OCEAN", "MOSS", "BERRY", "PARACHUTE", "RAINFOREST", or "SUNSET".';

const __COLORS = {
  CLASSIC: [
    '#619ED6',
    '#6BA547',
    '#F7D027',
    '#E48F1B',
    '#B77EA3',
    '#E64345',
    '#60CEED',
    '#9CF168',
    '#F7EA4A',
    '#FBC543',
    '#FFC9ED',
    '#E6696E'
  ],
  MIDNIGHT: ['#97A1D9', '#6978C9', '#4A5596', '#2C3365', '#111539'],
  OCEAN: ['#77C2FE', '#249CFF', '#1578CF', '#0A579E', '#003870'],
  MOSS: ['#62BEB6', '#0B9A8D', '#077368', '#034D44', '#002B24'],
  BERRY: ['#F88FB2', '#ED5C8B', '#D5255E', '#A31246', '#740030'],
  PARACHUTE: ['#E65F8E', '#A86BD1', '#3AA5D1', '#3BB58F', '#3A63AD'],
  RAINFOREST: ['#82C272', '#00A88F', '#0087AC', '#005FAA', '#323B81'],
  SUNSET: ['#FFCA3E', '#FF6F50', '#D03454', '#9C2162', '#772F67']
};

// The patterns used for chart pattern fills
const CHART_PATTERN_FILLS = [
  'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
  'M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9',
  'M 3 0 L 3 10 M 8 0 L 8 10',
  'M 0 3 L 10 3 M 0 8 L 10 8',
  'M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7',
  'M 3 3 L 8 3 L 8 8 L 3 8 Z',
  'M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0',
  'M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7',
  'M 2 5 L 5 2 L 8 5 L 5 8 Z',
  'M 0 0 L 5 10 L 10 0'
];

export const TEXT_WEIGHT_SEMI_BOLD = 600;
export const FONT_SIZE = 11;

export const TEXT_COLOR_DARK = '#222';
export const TEXT_COLOR_LIGHT = '#eee';

const CHARACTER_PX = 10;
const NULL_CATEGORY_LABEL_LENGTH = 9;
const MAX_ANGLED_LABEL_LENGTH = 20;
const MAX_HORIZ_LABEL_LENGTH = 35;
const MICRO_MAX_HORIZ_LABEL_LENGTH = 20;
const MIN_BAR_WIDTH = 10;
const HIGHCHARTS_USABLE_COLUMN_RATIO = 0.6;

export function getModel(newValues, type) {
  let model = new Model();
  model.type = type;
  model.height = newValues.height;
  model.orientation = newValues.orientation;
  model.categories = newValues.categories;
  model.xCategories = newValues.xCategories;
  model.yCategories = newValues.yCategories;
  model.showLegend = newValues.showLegend;
  model.showTooltips = newValues.showTooltips;
  model.showDataLabels = newValues.showDataLabels;
  model.showLinks = newValues.showLinks;
  model.xAxisTitle = newValues.xAxisTitle;
  model.yAxisTitle = newValues.yAxisTitle;
  model.xAxisType = newValues.xAxisType;
  model.xAxisFormat = newValues.xAxisFormat;
  model.xAxisStyle = newValues.xAxisStyle;
  model.yAxisStyle = newValues.yAxisStyle;
  model.yAxisMin = newValues.yAxisMin;
  model.yAxisMax = newValues.yAxisMax;
  model.markerRadius = newValues.markerRadius;
  model.minSize = newValues.minSize;
  model.maxSize = newValues.maxSize;
  model.allowDecimalAxisLabels = newValues.allowDecimalAxisLabels;
  model.threshold = newValues.threshold;
  model.splitSeries = newValues.splitSeries;
  model.series = newValues.series[0].data ? newValues.series : [{data: newValues.series}];
  model.colorScheme = newValues.colorScheme;
  model.colors = getColorScheme(model);
  model.validations = getValidations(model);

  if (model.validations.length > 0) {
    model.height = 16;
  }

  // Force width of report
  // if (model.type == ChartTypes.TileMap) {
  //   document.getElementById('container').style.width = (model.heightPixels * 1.25)  + 'px';
  // }

  document.getElementById('container').style.height = model.heightPixels + 'px';

  return model;
}

function getValidations(model) {
  let validations = [];
  if (!model.colors) {
    validations.push(__COLORS_VAL);
  }

  return validations;
}

export function getChartOptions(
  model,
  ...chartSpecificOptions
) {
  const accentColor = Appian.getAccentColor();
  const isAreaChart = model.type === ChartTypes.AreaChart;
  const isBarChart = model.type === ChartTypes.BarChart;
  const isColumnChart = model.type === ChartTypes.ColumnChart;
  const isHeatMap = model.type === ChartTypes.HeatMap;
  const isOrgChart = model.type === ChartTypes.OrganizationChart;
  const isPieChart = model.type === ChartTypes.PieChart;
  const isTileMap = model.type === ChartTypes.TileMap;
  const isTimelineChart = model.type === ChartTypes.TimelineChart;
  // const isAccentDark = !!accentColor && isHexColorDark(accentColor);
  // const inDarkAccentBackground = context.inAccentBackground && isAccentDark;
  // const inDarkBackground = inDarkAccentBackground || context.inDarkBackground;
  const inDarkBackground = false;
  // const isPercentToTotal = model.get('stacking') === 'PERCENT_TO_TOTAL';
  const tooltipData = '{point.y}';
  // const tooltipData = isPercentToTotal
  //  ? '{point.percentage:.1f}%'
  //  : '{point.y}';
  const usePatternFill = false;
  // const usePatternFill = chartPatternFill && (isBarChart || isColumnChart || isAreaChart); // pie chart not included for data labels and tooltips
  const useLargerLegendItems = false;
  // const useLargerLegendItems =
  //  chartPatternFill &&
  //  (isBarChart || isColumnChart || isPieChart || isAreaChart); */
  const tooltipColor = usePatternFill ? TEXT_COLOR_DARK : '{series.color}';
  // chartContext = context;

  Highcharts.dateFormats = {
    '-m': function (timestamp) {
        return (new Date(timestamp)).getUTCMonth() + 1;
    },
    '-e': function (timestamp) {
        return (new Date(timestamp)).getUTCDate();
    }
  };

  return merge(
    {
      title: {
        text: ''
      },
      ...(!isOrgChart && {colors: model.colors}),
      xAxis: {
        visible: model.xAxisStyle !== 'NONE',
        title: {
          text: escape(model.xAxisTitle),
          style: {
            fontWeight: TEXT_WEIGHT_SEMI_BOLD
          }
        },
        categories: model.categories,
        allowDecimals: model.allowDecimalAxisLabels,
        gridLineColor: inDarkBackground
          ? 'rgba(136, 136, 136, 0.5)'
          : 'rgba(200, 200, 200, 0.5)', // when this rgba value changes, update its counterpart in charts.less and variables.less
        lineColor: inDarkBackground
          ? 'rgba(136, 136, 136, 1)'
          : 'rgba(200, 200, 200, 1)', // when this rgba value changes, update its counterpart in charts.less and variables.less
        labels: {
          // Setting the 'step' makes every nth label visible on the axis, so this will cause every label to be shown.
          // Bar charts with AUTO height should expand to be able to show every label. Other charts/heights rely on Highcharts default behavior
          step:
            model.type == isBarChart &&
            (!model.height || model.height === 'AUTO')
              ? 1
              : 0,
          style: {
            fontSize: FONT_SIZE,
            textOverflow: 'ellipsis',
            color: inDarkBackground ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK
          }
        },
        format: model.xAxisFormat,
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
      //   gridLineColor: inDarkBackground
      //     ? 'rgba(136, 136, 136, 0.5)'
      //     : 'rgba(200, 200, 200, 0.5)',
      //   lineColor: inDarkBackground
      //     ? 'rgba(136, 136, 136, 1)'
      //     : 'rgba(200, 200, 200, 1)',
      //   labels: {
      //     // 100% label gets slightly cut off on a STANDARD percent bar chart
      //     x:
      //       isBarChart &&
      //       isPercentToTotal &&
      //       model.get('yAxisStyle') !== 'MINIMAL'
      //         ? -1
      //         : 0,
      //     format: isPercentToTotal ? '{value}%' : '{value}',
      //     style: {
      //       fontSize: FONT_SIZE,
      //       color: inDarkBackground ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK
      //     }
      //   },
      //   plotLines: createReferenceLines(
      //     model.get('referenceLines'),
      //     accentColor,
      //     colorScheme,
      //     inDarkBackground
      //   )
      },
      colorAxis: (isHeatMap || isTileMap) ? {
        min: 0,
        minColor: '#FFF',
        maxColor: model.colors[1] ? model.colors[1] : model.colors[0]
      } : undefined,
      tooltip: {
        // Use the default tooltip styling for Timeline Charts
        pointFormat: `<span style="color:${tooltipColor};">{series.name}: </span>` +
          `<span style="font-weight: ${TEXT_WEIGHT_SEMI_BOLD}">${tooltipData}</span><br/>`,
        shared: true,
        useHTML: true,
        borderRadius: 0,
        shadow: false,
        borderColor: '#eee',
        backgroundColor: 'rgba(255,255,255,0.92)',
        enabled: model.showTooltips,
        outside: true
      },
      legend: {
        // rtl: isRTLLanguage,
        align: (isHeatMap || isTileMap) ? 'right' : 'center',
        layout: (isHeatMap || isTileMap) ? 'vertical' : 'horizontal',
        verticalAlign: (isHeatMap || isTileMap) ? 'top' : 'bottom',
        y: (isHeatMap || isTileMap) ? 25 : 0,
        itemHoverStyle: {
          color: inDarkBackground ? '#fff' : '#000'
        },
        itemHiddenStyle: {
          color: inDarkBackground ? '#aaa' : '#ccc'
        },
        itemStyle: {
          fontWeight: 'normal',
          fontSize: useLargerLegendItems ? 13 : FONT_SIZE,
          color: inDarkBackground ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK
        },
        enabled: model.showLegend,
        padding: model.height === 'MICRO' || isPieChart ? 2 : 5, // default is 8
        symbolHeight: (isHeatMap || isTileMap) ? 280 : useLargerLegendItems ? 13 : 10 // defaults to font size, needed to prevent legend circle from being cut off
      },
      plotOptions: {
        series: merge(
          {
            dataLabels: {
              enabled: model.showDataLabels,
              style: {
                textShadow: 'none',
                cursor: 'default',
                textOutline: 'none'
              }
            }
          },
          model.showLinks ? {
            cursor: 'pointer',
            events: {
              click: function (event) {
                Appian.Component.saveValue('link', event.point.options);
              }
            }
          } : {}
        ),
        // bar: {
        //   borderWidth: 1,
        //   dataLabels: {
        //     formatter: getBarColDataLabelFormatter(
        //       inDarkBackground,
        //       usePatternFill
        //     ),
        //     enabled: model.get('showDataLabels'),
        //     style: {
        //       textOutline: usePatternFill ? '1px contrast' : 'none',
        //       cursor: 'default'
        //     }
        //   },
        //   stacking: getStackingConfig(model.get('stacking')),
        //   groupPadding:
        //     model.get('height') === 'MICRO' || model.get('height') === 'SHORT'
        //       ? 0.1
        //       : 0.2 // default is 0.2
        // },
        // column: {
        //   borderWidth: 1,
        //   dataLabels: {
        //     formatter: getBarColDataLabelFormatter(
        //       inDarkBackground,
        //       usePatternFill
        //     ),
        //     enabled: model.get('showDataLabels'),
        //     style: {
        //       textOutline: usePatternFill ? '1px contrast' : 'none',
        //       cursor: 'default'
        //     }
        //   },
        //   stacking: getStackingConfig(model.get('stacking'))
        // },
        // pie: {
        //   borderWidth: 1,
        //   innerSize: model.get('style') === 'DONUT' ? '50%' : undefined,
        //   // This stops the cursor from changing to text select when hovering on a label
        //   cursor: 'default',
        //   showInLegend: true,
        //   dataLabels: {
        //     enabled:
        //       model.get('seriesLabelStyle') !== 'LEGEND' &&
        //       shouldShowPieLabels(model).showAnyLabels,
        //     style: {
        //       color: inDarkBackground ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
        //       fontWeight: 'normal',
        //       fontSize: '0.8571rem',
        //       // This width was just picked. It might be good to check exact current behaviour.
        //       width: '100px',
        //       textShadow: 'none',
        //       textOutline: 'none'
        //     }
        //   }
        // },
        line: {
          turboThreshold: 0,
          dataLabels: {
            color: inDarkBackground ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK
          }
        },
        // area: {
        //   // Highcharts does not show series with links longer than the turboThreshold.
        //   // Setting it to 0 disables this and will always show the series.
        //   // See https://api.highcharts.com/highcharts/plotOptions.series.turboThreshold
        //   turboThreshold: 0,
        //   dataLabels: {
        //     enabled: model.get('showDataLabels'),
        //     style: {
        //       textShadow: 'none',
        //       cursor: 'default',
        //       color: inDarkBackground ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
        //       textOutline: 'none'
        //     }
        //   },
        //   stacking: getStackingConfig(model.get('stacking'))
        // }
      },
      series: processSeries(model),
      credits: {
        enabled: false
      },
      chart: {
        spacing: getChartSpacing(model),
        style: {
          fontFamily: 'Calibri, Helvetica, sans-serif' // TODO - Appian Fonts
        },
        backgroundColor: 'rgba(0,0,0,0)' // transparent
      }
    },
    ...chartSpecificOptions
  );
}

function getColorScheme(model) {
  const colorScheme = model.colorScheme;
  // Skip the first color if only a single series ()
  const skipFirstColor = model.type === ChartTypes.AREACHART && (model.series || {}).length === 1;

  if (!colorScheme) {
    return __COLORS.CLASSIC;
  }
  const colorSchemeType = typeof colorScheme;

  let colorValues;
  if (colorSchemeType === 'string') {
    const colorSchemeName = colorScheme;
    const colorSchemeValues = __COLORS[colorSchemeName];

    if (colorSchemeName === 'CLASSIC') {
      return __COLORS.CLASSIC;
    }

    colorValues = skipFirstColor ? colorSchemeValues.slice(1) : colorSchemeValues;
  } else if (Array.isArray(colorScheme)) {
    return colorScheme;
  } else {
    return __COLORS.CLASSIC;
  }
  return colorValues;
}

// This function will convert dates and datetimes in the X series to timestamps
export function processSeries(model) {
  let dataIndex = model.series[0].data[0]['x'] == null ? 0 : 'x';

  if (model.xAxisType === 'datetime') {
    model.series.forEach((e, i) => {
      e.data.forEach((f, j) => {
        model.series[i].data[j][dataIndex] = Date.parse(model.series[i].data[j][dataIndex]);
      });
    });
  }

  return model.series;
}

// This function will return X if the series is in the format of {x: 1, y: 2} or 0 if the series is in the format of [1,2]
function getDataIndex(series, axis) {
  return series[0].data[0][axis] ? axis : 0;
}

export function getXAxisRotation(
  model,
  numDegreesXAxis = -45
) {

  let clientWidth = getClientWidth();
  let minWidth = getChartMinWidth(model.series);

  if (!model.series || !model.series.length) {
    return {rotation: 0, formatter: null};
  }

  const scrollsHorizontally = minWidth > clientWidth;
  const horizontalCharLimit = getHorizontalCharLimit(
    model.series,
    scrollsHorizontally ? minWidth : clientWidth
  );

  const hasUnlabelledCategories = getLongestSeriesData(model.series).length > (model.categories ? model.categories.length : 0);
  const labelExceedsHorizontalSpace =
    (model.categories && model.categories.some(
        // Measures the word length in each label as highcharts does not wrap continuous words in labels
        (c) =>
          c.split(' ').some((string) => string.length > horizontalCharLimit)
    )) || (hasUnlabelledCategories && NULL_CATEGORY_LABEL_LENGTH > horizontalCharLimit);

  if (scrollsHorizontally || labelExceedsHorizontalSpace) {
    return {rotation: numDegreesXAxis, formatter: null};
  }
  return {rotation: 0};
}

function getLongestSeriesData(series) {
  const getLongestArray = (maxArray, curArray) => {
    return maxArray.length > curArray.length ? maxArray : curArray;
  };
  return series.map((s) => (s && s.data) || []).reduce(getLongestArray, []);
}

export function getHorizontalCharLimit(series, chartWidth) {
  const numCategoriesRendered = series
    ? getLongestSeriesData(series).length
    : 0;
  if (numCategoriesRendered === 0) {
    return null;
  }
  const pixelsPerCategory = chartWidth / numCategoriesRendered;
  const horizontalCharLimit = pixelsPerCategory / CHARACTER_PX;
  return horizontalCharLimit;
}

export function getTruncatedLabelFormatter(maxLabelLength) {
  return function () {
    return this.value.length > maxLabelLength
      ? this.value.slice(0, maxLabelLength) + String.fromCharCode(8230)
      : this.value;
  };
}

export function getChartMinWidth(series, isStacked = false, zoomable = false) {
  if (!series || !series.length || zoomable) {
    return 0;
  }
  const numCategoriesRendered = getLongestSeriesData(series).length;
  const numBars = numCategoriesRendered * (isStacked ? 1 : series.length);
  const minimumWidth =
    (numBars * MIN_BAR_WIDTH) / HIGHCHARTS_USABLE_COLUMN_RATIO;
  return minimumWidth;
}

export function getClientWidth() {
  return document.getElementById("container").clientWidth;
}

export function getChartSpacing(model) {
  const height = model.height;
  const chartType = model.type;
  const isColumnChart = chartType === ChartTypes.ColumnChart;
  const isLineChart = chartType === ChartTypes.LineChart;
  const isAreaChart = chartType === ChartTypes.AreaChart;
  const isPieChart = chartType === ChartTypes.PieChart;
  if (
    (isLineChart || isColumnChart || isAreaChart) &&
    model.yAxisStyle === 'NONE'
  ) {
    switch (height) {
      case 'MICRO':
        return [5, 5, 6, 5]; // Need horizontal spacing to be 5 in order to prevent the first rotated X-Axis label from cutting off
      case 'SHORT':
        return [5, 5, 15, 5]; // Increased bottom spacing to accommodate scrollbar
      default:
        return [10, 5, 15, 5];
    }
  }
  if (isPieChart) {
    switch (height) {
      case 'MICRO':
      case 'SHORT':
        return [5, 10, 6, 10]; // Pie Charts need even more horizontal spacing to avoid cut off labels
      default:
        return [10, 10, 10, 10];
    }
  } else {
    switch (height) {
      case 'MICRO':
        return [5, 1, 6, 1]; // Bar Charts & some Line/Column/Area Charts only need one pixel of horizontal space to account for the axis line
      case 'SHORT':
        return [5, 1, 15, 1]; // Increased bottom spacing to accommodate scrollbar
      default:
        return [10, 1, 15, 1];
    }
  }
}

export function determineTextColor(color, stacking = false, inDarkBackground = false) {
  const shouldFlipLabelColor =
    (isSeriesColorDark(color) && stacking !== null) ||
    (stacking == null && inDarkBackground);
  return shouldFlipLabelColor ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK;
}

function isSeriesColorDark(color) {
  const hexValue = color.replace('#', '');
  const shortHex = hexValue.length === 3;
  const r = parseInt(
    shortHex
      ? `0x${hexValue[0]}${hexValue[0]}`
      : `0x${hexValue[0]}${hexValue[1]}`
  );
  const g = parseInt(
    shortHex
      ? `0x${hexValue[1]}${hexValue[1]}`
      : `0x${hexValue[2]}${hexValue[3]}`
  );
  const b = parseInt(
    shortHex
      ? `0x${hexValue[2]}${hexValue[2]}`
      : `0x${hexValue[4]}${hexValue[5]}`
  );
  return 1 - (r * 0.299 + g * 0.587 + b * 0.114) / 255 > 0.5;
}
