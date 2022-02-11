export class Model {
  constructor(type) {
    this.type = type;
  }

  get type() {
    return this.type;
  }

  get categories() {
    return this.categories;
  }
  set categories(categories) {
    this.categories = categories;
  }

  get showLegend() {
    return this.showLegend;
  }
  set showLegend(showLegend) {
    this.showLegend == null ? true : showLegend;
  }

  get showTooltips() {
    return this.showTooltips ;
  }
  set showTooltips(showTooltips) {
    this.showTooltips = showTooltips == null ? true : showTooltips;
  }

  get showDataLabels() {
    return this.showDataLabels;
  }
  set showDataLabels(showDataLabels) {
    this.showDataLabels = showDataLabels == null ? true : showDataLabels;
  }

  get showLinks() {
    return this.showTooltips;
  }
  set showLinks(showLinks) {
    this.showLinks = showLinks == null ? false : showLinks;
  }

  get allowDecimalAxisLabels() {
    return this.allowDecimalAxisLabels;
  }
  set allowDecimalAxisLabels(allowDecimalAxisLabels) {
    this.allowDecimalAxisLabels = allowDecimalAxisLabels == null ? false : allowDecimalAxisLabels;
  }

  get xAxisTitle() {
    return this.xAxisTitle;
  }
  set xAxisTitle(xAxisTitle) {
    this.xAxisTitle = xAxisTitle;
  }

  get yAxisTitle() {
    return this.yAxisTitle;
  }
  set yAxisTitle(yAxisTitle) {
    this.yAxisTitle = yAxisTitle;
  }

  get xAxisType() {
    return this.xAxisType;
  }
  set xAxisType(xAxisType) {
    this.xAxisType = xAxisType;
  }

  get xAxisFormat() {
    return this.xAxisFormat;
  }
  set xAxisFormat(xAxisFormat) {
    this.xAxisFormat = xAxisFormat;
  }

  get xAxisStyle() {
    return this.xAxisStyle;
  }
  set xAxisStyle(xAxisStyle) {
    this.xAxisStyle = xAxisStyle;
  }

  get yAxisStyle() {
    return this.yAxisStyle;
  }
  set xAxisType(yAxisStyle) {
    this.yAxisStyle = yAxisStyle;
  }

  get yAxisMin() {
    return this.yAxisMin;
  }
  set yAxisMin(yAxisMin) {
    this.yAxisMin = yAxisMin;
  }

  get yAxisMax() {
    return this.yAxisMax;
  }
  set yAxisMax(yAxisMax) {
    this.yAxisMax = yAxisMax;
  }

  get minSize() {
    return this.minSize;
  }
  set minSize(minSize) {
    if(minSize == null && this.type === ChartTypes.PackedBubbleminSize) {
      this.minSize = "10%";
    }
  }

  get maxSize() {
    return this.maxSize;
  }
  set maxSize(maxSize) {
    if(maxSize == null && this.type === ChartTypes.PackedBubbleminSize) {
      this.maxSize = "50%";
    }
  }

  get threshold() {
    return this.threshold;
  }
  set threshold(threshold) {
    this.threshold = threshold == null ? 0 : threshold;
  }

  get splitSeries() {
    return this.splitSeries;
  }
  set splitSeries(splitSeries) {
    this.splitSeries = splitSeries;
  }

  get series() {
    return this.series;
  }
  set series(series) {
    this.series = series;
  }

  get colors() {
    return this.colors;
  }
  set colors(colors) {
    this.colors = colors;
  }
}
