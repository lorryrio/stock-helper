const path = require('path');

module.exports = {
  publicPath: '/',
  indexPath: 'index.html',
  productionSourceMap: true,
  outputDir: path.join(__dirname, './docs'),
};
