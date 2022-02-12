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

  get showLegend() {
    return this._showLegend;
  }
  set showLegend(showLegend) {
    this._showLegend == null ? true : showLegend;
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
    this._showDataLabels = showDataLabels == null ? true : showDataLabels;
  }

  get showLinks() {
    return this._showTooltips;
  }
  set showLinks(showLinks) {
    this._showTooltips = showLinks == null ? false : showLinks;
  }

  get allowDecimalAxisLabels() {
    return this._allowDecimalAxisLabels;
  }
  set allowDecimalAxisLabels(allowDecimalAxisLabels) {
    this._allowDecimalAxisLabels = allowDecimalAxisLabels == null ? false : allowDecimalAxisLabels;
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
    this._yAxisMin = yAxisMin;
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
    if (minSize == null && this.type === ChartTypes.PackedBubble) {
      this._minSize = "10%";
    }
  }

  get maxSize() {
    return this._maxSize;
  }
  set maxSize(maxSize) {
    if (maxSize == null && this.type === ChartTypes.PackedBubble) {
      this._maxSize = "50%";
    }
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

  get series() {
    return this._series;
  }
  set series(series) {
    this._series = series;
  }

  get colors() {
    return this._colors;
  }
  set colors(colors) {
    this._colors = colors;
  }
}
