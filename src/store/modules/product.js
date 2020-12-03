import actionsGlobal from '../actions';
import mutationsGlobal from '../mutations';

const product = {
  namespaced: true,
  state: () => ({
    DialogProduct: false,
    produtos: [],
    productModal: null,
    featured: null,
  }),

  getters: {
    getCategories(state) {
      const categories = [];
      Object.values(state.products).forEach(value => {
        if (value.products.length > 0)
          categories.push({
            id: value.id,
            name: value.name,
          });
      });
      return categories;
    },
    getBanner(state) {
      const suggesteds = [];
      // suggested
      if (state.products.length > 0) {
        state.products.forEach(c => {
          c.products.forEach(p => {
            if (p.suggested === 'y') suggesteds.push(p);
          });
        });
      }
      return suggesteds;
    },
  },
  mutations: { ...mutationsGlobal },
  actions: { ...actionsGlobal },
};

export default product;
