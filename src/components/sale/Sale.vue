<template>
  <v-navigation-drawer
    right
    app
    @input="eventSale"
    temporary
    clipped
    height="100%"
    :width="$vuetify.breakpoint.xsOnly ? '100%' : '370px'"
    :value="$store.state.sale.cart.open"
  >
    <v-card flat class="mx-0 pa-0 my-0 ">
      <div class="align-center">
        <v-list-item class="mx-0">
          <v-list-item-content>
            <span class="title-cart">Seu carrinho</span>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="eventSale(false)" outlined color="error">Fechar</v-btn>
          </v-list-item-action>
        </v-list-item>
      </div>
      <div>
        <div id="list-products">
          <v-window v-model="step">
            <v-window-item :value="1"><SaleFirst @next="stepSelector(2)"/></v-window-item>
            <v-window-item :value="2">
              <SaleEmpty />
            </v-window-item>
            <v-window-item :value="3">
              <SaleSuccess />
            </v-window-item>
          </v-window>
        </div>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import Mixins from '@/mixins/mixins';
import SaleFirst from '@/components/sale/SaleIntro';
import SaleEmpty from '@/components/sale/SaleEmpty';
import SaleSuccess from '@/components/sale/SaleSuccess';

export default {
  mixins: [Mixins],
  components: {
    SaleFirst,
    SaleSuccess,
    SaleEmpty,
  },

  data: () => ({
    dialogPay: false,
    purchase: [],
    cupomValidate: null,
    cupom: null,
    discount_value: 0,
    successCupom: null,
    loadingCupom: false,
  }),
  computed: {
    sale() {
      return this.$store.state.sale.sale;
    },
    step: {
      set() {},
      get() {
        return this.$store.state.sale.cart.step;
      },
    },
  },
  methods: {
    eventSale(event) {
      if (!event) {
        this.$store.commit('sale/request', ['cart', { open: event, step: 1 }]);
      }
    },
    stepSelector(value) {
      this.$store.commit('sale/request', ['cart', { open: true, step: value }]);
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}

.barscroll::-webkit-scrollbar {
  width: 15px;
}

.barscroll::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.barscroll::-webkit-scrollbar-thumb {
  background: #00bfa5;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.barscroll::-webkit-scrollbar-thumb:hover {
  background: black;
}
.pay-subtitle {
  color: #707070;
  font-weight: 400;
}
.title-cart {
  font-weight: 900;
  font-size: 18px;
  font-weight: 900;
}
</style>
