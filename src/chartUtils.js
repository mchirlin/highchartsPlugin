export const __COLORS_VAL = 'Invalid value for "colorScheme". "colorScheme" must be null, a list of colors, or one of the following values: "CLASSIC" (default), "MIDNIGHT", "OCEAN", "MOSS", "BERRY", "PARACHUTE", "RAINFOREST", or "SUNSET".';

export const __COLORS = {
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
export const CHART_PATTERN_FILLS = [
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

export const __TEXT_WEIGHT_SEMI_BOLD = 600;
export const __FONT_SIZE = 11;

export const __TEXT_COLOR_DARK = '#222';
export const __TEXT_COLOR_LIGHT = '#eee';

export function getColorScheme(model) {
  const colorScheme = model.colorScheme;
  const numberOfSeries = (model.series || {}).size;

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

    colorValues = numberOfSeries === 1 ? colorSchemeValues.slice(1) : colorSchemeValues;
  } else if (colorSchemeType.isArray()) {
    return colorScheme;
  } else {
    return __COLORS.CLASSIC;
  }
  return colorValues;
}
