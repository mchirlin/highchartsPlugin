const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
var ZipPlugin = require('zip-webpack-plugin');

var PACKAGE = require('./package.json');
var version = PACKAGE.version;

const plugins = [
  // {name: "areaChartField", version: "v1"},
  {name: "heatMapField", version: "v1"},
  {name: "organizationChartField", version: "v1"},
  {name: "packedBubbleField", version: "v1"},
  {name: "sankeyDiagramField", version: "v1"},
  {name: "scatterChartField", version: "v1"},
  {name: "spiderwebField", version: "v1"},
  {name: "tileMapField", version: "v1"},
  {name: "timelineChartField", version: "v1"},
  {name: "wordCloudField", version: "v1"},
];

let copyPatterns = [
  { from: "resources", to: path.resolve(__dirname, 'dist/lib') }
];

plugins.forEach(element => {
  copyPatterns.push({from: 'src/_shared', to: path.resolve(__dirname, 'dist/lib', element.name, element.version)});
});

let entries = {};

plugins.forEach(element => {
  entries[element.name] = {import: './src/' + element.name + '/' + element.version + '/index.js', filename: element.name + '/' + element.version + '/js/main.js'}
});

module.exports = {
  mode: 'development',
  entry: entries,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/lib'),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: copyPatterns,
    }),
    new ZipPlugin({
      path: '../zip',
      filename: 'adhoc-reporting-charts-' + version + '.zip',
    })
  ]
};
