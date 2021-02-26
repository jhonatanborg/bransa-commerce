import actionsGlobal from '../actions';
import mutationsGlobal from '../mutations';

const user = {
  namespaced: true,
  state: () => ({
    login: {
      open: false,
      step: 1,
    },
    user: null,
    userRegister: null,
    addressRegister: null,
    menuMobile: false,
    message: null,
  }),

  getters: {
    getPayments(state) {
      if (state.user) {
        if (state.user.formaptgto_empresa) {
          return state.user.formaptgto_empresa;
        }
        if (state.user.grupocli) {
          const payments = [];
          state.user.grupocli.formaPgtoCli.forEach(element => {
            payments.push(element.formaPgto);
          });
          return payments;
        }
      }
      return [];
    },
  },
  mutations: { ...mutationsGlobal },
  actions: { ...actionsGlobal },
};

export default user;
