'use strict';
const assert = require('assert');
const mock = require('egg-mock');

describe('test/wechat.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/wechat-test',
    });
    return app.ready();
  });
  after(() => app.close());
  afterEach(mock.restore);

  it('should GET AccessToken', async () => {
    console.log(await app.wechat.getAccessToken());
    assert('111');
  });

  it('should Get User', async () => {
    console.log(await app.wechat.getUser(''));
  });
});
