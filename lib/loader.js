'use strict';
const wechat = require('./wechat');

module.exports = app => {
  app.addSingleton('wechat', init);
};

function init(config) {
  return new wechat(config);
}
