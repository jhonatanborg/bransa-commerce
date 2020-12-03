import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import product from './modules/product';
import sale from './modules/sale';
import utils from './modules/utils';
// import createPersistedState from "vuex-persistedstate";
import idbActions from './modules/dexieDb';
import actionsGlobal from './actions';
import mutationsGlobal from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, product, sale, utils },
  // plugins: [createPersistedState()],
  state: {
    exitModal: false,
    loading: false,
    server: process.env.VUE_APP_BACKEND,
  },
  mutations: {
    loading(state, data) {
      state.loading = data;
    },
    ...mutationsGlobal,
  },
  actions: {
    ...idbActions,
    ...actionsGlobal,
  },
});
