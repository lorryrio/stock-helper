const path = require('path');

module.exports = {
  publicPath: '/stock-helper/',
  indexPath: 'index.html',
  productionSourceMap: true,
  outputDir: path.join(__dirname, './docs'),
};
