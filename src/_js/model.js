import { ChartTypes } from './chartUtils';

export class Model {
  get type() {
    return this._type;
  }
  set type(type) {
    this._type = type;
  }

  get height() {
    return this._height;
  }
  set height(height) {
    this._height = height;
  }

  get categories() {
    return this._categories;
  }
  set categories(categories) {
    this._categories = categories;
  }

  get xCategories() {
    return this._xCategories;
  }
  set xCategories(xCategories) {
    this._xCategories = xCategories;
  }

  get yCategories() {
    return this._yCategories;
  }
  set yCategories(yCategories) {
    this._yCategories = yCategories;
  }

  get showLegend() {
    return this._showLegend;
  }
  set showLegend(showLegend) {
    this._showLegend = showLegend == null ? true : showLegend;
  }

  get showTooltips() {
    return this._showTooltips ;
  }
  set showTooltips(showTooltips) {
    this._showTooltips = showTooltips == null ? true : showTooltips;
  }

  get showDataLabels() {
    return this._showDataLabels;
  }
  set showDataLabels(showDataLabels) {
    this._showDataLabels = showDataLabels == null ? false : showDataLabels;
  }

  get showLinks() {
    return this._showLinks;
  }
  set showLinks(showLinks) {
    this._showLinks = showLinks == null ? false : showLinks;
  }

  get xAxisTitle() {
    return this._xAxisTitle;
  }
  set xAxisTitle(xAxisTitle) {
    this._xAxisTitle = xAxisTitle;
  }

  get yAxisTitle() {
    return this._yAxisTitle;
  }
  set yAxisTitle(yAxisTitle) {
    this._yAxisTitle = yAxisTitle;
  }

  get xAxisType() {
    return this._xAxisType;
  }
  set xAxisType(xAxisType) {
    this._xAxisType = xAxisType;
  }

  get xAxisFormat() {
    return this._xAxisFormat;
  }
  set xAxisFormat(xAxisFormat) {
    this._xAxisFormat = xAxisFormat;
  }

  get xAxisStyle() {
    return this._xAxisStyle;
  }
  set xAxisStyle(xAxisStyle) {
    this._xAxisStyle = xAxisStyle;
  }

  get yAxisStyle() {
    return this._yAxisStyle;
  }
  set yAxisStyle(yAxisStyle) {
    this._yAxisStyle = yAxisStyle;
  }

  get yAxisMin() {
    return this._yAxisMin;
  }
  set yAxisMin(yAxisMin) {
    this._yAxisMin = yAxisMin ? 0 : yAxisMin;
  }

  get yAxisMax() {
    return this._yAxisMax;
  }
  set yAxisMax(yAxisMax) {
    this._yAxisMax = yAxisMax;
  }

  get minSize() {
    return this._minSize;
  }
  set minSize(minSize) {
    if (!minSize && this.type === ChartTypes.PackedBubble) {
      this._minSize = "10%";
    } else if (minSize) {
      this._minSize = minSize;
    }
  }

  get maxSize() {
    return this._maxSize;
  }
  set maxSize(maxSize) {
    if (!maxSize && this.type === ChartTypes.PackedBubble) {
      this._maxSize = "50%";
    } else if (maxSize) {
      this._maxSize = maxSize;
    }
  }

  get allowDecimalAxisLabels() {
    return this._allowDecimalAxisLabels;
  }
  set allowDecimalAxisLabels(allowDecimalAxisLabels) {
    this._allowDecimalAxisLabels = allowDecimalAxisLabels == null ? false : allowDecimalAxisLabels;
  }

  get dataLabelFormat() {
    return this._dataLabelFormat;
  }
  set dataLabelFormat(dataLabelFormat) {
    this._dataLabelFormat = dataLabelFormat;
  }

  get threshold() {
    return this._threshold;
  }
  set threshold(threshold) {
    this._threshold = threshold == null ? 0 : threshold;
  }

  get splitSeries() {
    return this._splitSeries;
  }
  set splitSeries(splitSeries) {
    this._splitSeries = splitSeries;
  }

  get marker() {
    return this._marker;
  }
  set marker(marker) {
    this._marker = marker;
  }

  get series() {
    return this._series;
  }
  set series(series) {
    this._series = series;
  }

  get colorScheme() {
    return this._colorScheme;
  }
  set colorScheme(colorScheme) {
    this._colorScheme = colorScheme;
  }

  get colors() {
    return this._colors;
  }
  set colors(colors) {
    this._colors = colors;
  }

  get validations() {
    return this._validations;
  }
  set validations(validations) {
    this._validations = validations;
  }
}
