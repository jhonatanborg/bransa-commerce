import actionsGlobal from '../actions';
import mutationsGlobal from '../mutations';

const utils = {
  namespaced: true,
  state: () => ({
    snack: false,
    type: null,
  }),
  mutations: {
    ...mutationsGlobal,
    closeSnack(state) {
      state.snack = false;
    },
  },
  actions: { ...actionsGlobal },
};

export default utils;
