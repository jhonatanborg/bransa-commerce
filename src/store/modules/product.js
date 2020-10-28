import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const product = {
  namespaced: true,
  state: () => ({
    DialogProduct: false,
    produtos: [],
    productModal: null,
  }),

  getters: {
    getCategories(state) {
      let categories = [];
      Object.values(state.products).forEach((value) => {
        if (value.products.length > 0)
          categories.push({
            id: value.id,
            name: value.name,
          });
      });
      return categories;
    },
    getSuggesteds(state) {
      const suggesteds = [];
      // suggested
      if (state.products.length > 0) {
        console.log("asdasd");
        state.products.forEach((c) => {
          c.products.forEach((p) => {
            if (p.suggested === "y") suggesteds.push(p);
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
