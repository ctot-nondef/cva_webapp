import axios from 'axios';
import * as api from './api';

api.setDomain('https://dboeannotation.acdh-dev.oeaw.ac.at/');

const serialize = obj => {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };

const state = {
  apilib: api,
  user: '',
  token: '',
  loading: false,
  loadmsg: '',
  schemas: {},
  endpoints: {},
};

const $config = {
  withCredentials: true,
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint-disable no-underscore-dangle */
const getters = {
  availableEndpoints: s => name => s.endpoints[name],
  f: s => name => s.apilib[name],
  schema: s => name => s.schemas[name],
  types: s => s.schemas.keys,
};

const mutations = {
  setConfig(s, config) {
    s.config = config;
  },
  setToken(s, { token, user }) {
    s.token = token;
    s.user = user;
  },
  setLoading(s, msg) {
    s.loading = true;
    s.loadmsg = msg;
  },
  setLoadingFinished(s) {
    s.loading = false;
    s.loadmsg = '';
  },
  setEndpoints(s, endpoints) {
    s.endpoints = endpoints;
  },
};

const actions = {
  init({ state, commit }) {
    commit('setLoading', 'Loading Database Configuration.');
    axios.get('https://dboeannotation.acdh-dev.oeaw.ac.at/api/').then((res) => {
        //save datatypes to config
        commit('setEndpoints', res.data);
        commit('setLoadingFinished');
    });
  },
  get({ state, commit }, { type, id, page, pageSize, query }) {
    let p = {};
    return new Promise((resolve, reject) => {
      if (type && id) {
        commit('setLoading', `Getting ${type} ${id} from Database`);
        p = state.apilib[`api_${type}_read`]({ id, $config });
      } else if (type && !id) {
        commit('setLoading', `Getting Queryset of ${type} from Database`);
        p = state.apilib[`api_${type}_list`]({ page, pageSize, query, $config });
      } else reject('Invalid or Insufficient Parameters');
      p.then((res) => {
        commit('setLoadingFinished');
        resolve(res);
      })
      .catch((error) => {
        commit('setLoadingFinished');
        reject(error);
      });
    });
  },
  post({ state, commit }, { type, id, body }) {
    let p = {};
    let t = type.charAt(0).toUpperCase() + type.slice(1);
    return new Promise((resolve, reject) => {
      if (type && id) {
        commit('setLoading', `Updating ${type} ${id} to Database`);
        p = state.apilib[`post${t}ByID`]({ id, [type]: body, $config });
      } else if (type && !id) {
        commit('setLoading', `Creating a ${type} in Database`);
        p = state.apilib[`post${t}`]({ [type]: body, $config });
      } else reject('Invalid or Insufficient Parameters');
      p.then((res) => {
        commit('setLoadingFinished');
        resolve(res);
      })
      .catch((error) => {
        commit('setLoadingFinished');
        reject(error);
      });
    });
  },
  delete({ state, commit }, { type, id }) {
    let p = {};
    let t = type.charAt(0).toUpperCase() + type.slice(1);
    return new Promise((resolve, reject) => {
      if (type && id) {
        commit('setLoading', `Deleting ${type} ${id} in Database`);
        p = state.apilib[`delete${t}ByID`]({ id });
      } else reject('Invalid or Insufficient Parameters');
      p.then((res) => {
        commit('setLoadingFinished');
        resolve(res);
      })
      .catch((error) => {
        commit('setLoadingFinished');
        reject(error);
      });
    });
  },
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
