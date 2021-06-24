'use strict';

const axios = require('axios');

const BaseUrl = 'https://qyapi.weixin.qq.com/cgi-bin/';
const WhiteList = [ 'gettoken' ];
const Expires = 7200000;

/**
 * 企业微信操作对象，依赖于企业微信通讯录应用接口API
 */
class wechat {
  constructor({ corpId, corpSecret }) {
    this.CorpId = corpId;
    this.CorpSecret = corpSecret;
    this.AccessToken = '';
    this.request = axios.create({
      baseURL: BaseUrl,
      timeout: 5000,
    });
    this.request.interceptors.request.use(async config => {
      if (WhiteList.indexOf(config.url) < 0) {
        config.params = Object.assign({ access_token: await this.getAccessToken() }, config.params);
      }
      return config;
    },
    error => Promise.reject(error));

    this.request.interceptors.response.use(response => {
      const res = response.data;
      const { errcode, errmsg } = res;
      if (errcode === 0) return res;
      console.log(res);
      const err = new Error(errmsg);
      err.number = errcode;
      throw err;
    },
    error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '请求错误';
            break;
          case 401:
            error.message = '未授权，请登录';
            break;
          case 403:
            error.message = '拒绝访问';
            break;
          case 404:
            error.message = `请求地址出错：${error.response.config.url}`;
            break;
          case 408:
            error.message = '请求超时';
            break;
          case 500:
            error.message = '服务器内部错误';
            break;
          case 501:
            error.message = '服务未实现';
            break;
          case 502:
            error.message = '网关错误';
            break;
          case 503:
            error.message = '服务不可用';
            break;
          case 504:
            error.message = '网关超时';
            break;
          case 505:
            error.message = 'http版本不受支持';
            break;
          default:
            break;
        }
      }
      return Promise.reject(error);
    });
  }

  /**
   * 获取token
   * @return {Promise<unknown>}
   */
  getCorpToken() {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'gettoken',
        params: { corpid: this.CorpId, corpsecret: this.CorpSecret },
      }).then(data => {
        resolve(data.access_token);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 获取 AccessToken
   * @return {Promise<unknown>}
   */
  getAccessToken() {
    return new Promise(async (resolve, reject) => {
      if (!this.AccessToken) {
        try {
          this.AccessToken = await this.getCorpToken();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => {
          this.AccessToken = '';
        }, Expires);
      }
      resolve(this.AccessToken);
    });
  }

  /**
   * 创建成员
   * @param data 参考 https://work.weixin.qq.com/api/doc/90000/90135/90195
   * @return {Promise<unknown>}
   */
  createUser(data) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'user/create',
        method: 'post',
        data,
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 读取成员
   * @param userid 成员UserID。对应管理端的帐号，企业内必须唯一。不区分大小写，长度为1~64个字节
   * @return {Promise<unknown>}
   */
  getUser(userid) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'user/get',
        params: { userid },
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 更新成员
   * @param data 参考 https://work.weixin.qq.com/api/doc/90000/90135/90197
   * @return {Promise<unknown>}
   */
  updateUser(data) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'user/update',
        method: 'post',
        data,
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 删除成员
   * @param userid 成员UserID。对应管理端的帐号
   * @return {Promise<unknown>}
   */
  deleteUser(userid) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'user/delete',
        params: { userid },
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 批量删除成员
   * @param useridlist 成员UserID列表。对应管理端的帐号。最多支持200个。若存在无效UserID，直接返回错误 参考 https://work.weixin.qq.com/api/doc/90000/90135/90199
   * @return {Promise<unknown>}
   */
  deleteUserBatch(useridlist) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'user/batchdelete',
        method: 'post',
        data: { useridlist },
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 获取部门成员
   * @param department_id 获取的部门id
   * @param fetch_child 是否递归获取子部门下面的成员：1-递归获取，0-只获取本部门
   * @return {Promise<unknown>}
   */
  getUserSimpleList(department_id, fetch_child = 0) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'user/simplelist',
        data: { department_id, fetch_child },
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 获取部门成员详情
   * @param department_id 获取的部门id
   * @param fetch_child 1/0：是否递归获取子部门下面的成员
   * @return {Promise<unknown>}
   */
  getUserList(department_id, fetch_child = 0) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'user/list',
        data: { department_id, fetch_child },
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 邀请成员
   * @param data 参考 https://work.weixin.qq.com/api/doc/90000/90135/90975
   * @return {Promise<unknown>}
   * @class
   */
  inviteUserBatch(data) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'batch/invite',
        method: 'post',
        data,
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 创建部门
   * @param data 参考 https://work.weixin.qq.com/api/doc/90000/90135/90205
   * @return {Promise<unknown>}
   */
  createDepartment(data) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'department/create',
        method: 'post',
        data,
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 更新部门
   * @param data 参考 https://work.weixin.qq.com/api/doc/90000/90135/90206
   * @return {Promise<unknown>}
   */
  updateDepartment(data) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'department/update',
        method: 'post',
        data,
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 删除部门
   * @param id 部门id。（注：不能删除根部门；不能删除含有子部门、成员的部门）
   * @return {Promise<unknown>}
   */
  deleteDepartment(id) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'department/delete',
        params: { id },
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * 获取部门列表
   * @param id 部门id。获取指定部门及其下的子部门（以及及子部门的子部门等等，递归）。 如果不填，默认获取全量组织架构
   * @return {Promise<unknown>}
   */
  getDepartmentList(id) {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'department/list',
        params: { id },
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

}

module.exports = wechat;
