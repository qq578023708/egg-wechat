# egg-wechat

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-wechat.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-wechat
[travis-image]: https://img.shields.io/travis/eggjs/egg-wechat.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-wechat
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-wechat.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-wechat?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-wechat.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-wechat
[snyk-image]: https://snyk.io/test/npm/egg-wechat/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-wechat
[download-image]: https://img.shields.io/npm/dm/egg-wechat.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-wechat

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-wechat 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件
<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## 开启插件

```js
// config/plugin.js
exports.wechat = {
  enable: true,
  package: 'egg-wechat',
};
```

## 使用场景

- 依赖于企业微信通讯录接口API
- app.wechat.getUser('user01');

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
