<template>
  <div>
    <v-card class="overflow-y-auto barscroll" style="height: 30vh;" flat>
      <div class="py-3 grey lighten-4">
        <span class="mx-3">Produtos</span>
      </div>
      <v-list-item v-for="(item, i) in sale" :key="i" dense link class="my-0">
        <v-list-item-content>
          <v-list-item-title>
            <b> {{ item.VENDAITEM_QTDE }} X</b>
            {{ item.VENDAITEM_DESCRICAO }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action>
          <div class="price-item">
            <small>
              <b v-text="convertMoney(item.VENDAITEM_VLTOTAL)"></b>
            </small>
          </div>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon color="error" @click="deleteItemSale(item.id)">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <v-card class="pa-5 grey lighten-4 item-min-purchase" flat>
      A disponibilidade dos produtos está sujeita aos seus respectivos estoques.
    </v-card>
    <div class="details pa-4 my-5">
      <div class="">
        <span class="font-weight-bold">Detalhes</span>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between my-2">
        <div>
          <span>Total</span>
        </div>
        <div>
          <span v-text="convertMoney(subTotal)"></span>
        </div>
      </div>
      <div class="my-5">
        <div class="">
          <span class="font-weight-bold">Selecione a forma de pagamento</span>
        </div>
        <v-divider></v-divider>
        <v-list class="mx-0">
          <v-list-item-group class="mx-0" v-model="pay">
            <template v-for="(item, i) in payment">
              <v-list-item
                :key="i"
                :value="item.FORMAPGTO_CODIGO"
                class="px-3"
                active-class="red--text text--accent-4"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.FORMAPGTO_DESCRICAO"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox :input-value="active" color="red--text accent-4"></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </div>
      <v-alert dark color="error " icon="mdi-alert" dismissible :value="error">
        Selecione uma forma de pagamento para finalizar
      </v-alert>
      <v-btn color="#3868E3" x-large @click="validPurchase" block dark>Confirmar</v-btn>
    </div>
  </div>
</template>

<script>
import Mixins from '@/mixins/mixins';

export default {
  data() {
    return {
      items: ['Dinheiro', 'Crédito', 'Débito', 'Transferência'],
      pay: null,
      error: false,
    };
  },
  mixins: [Mixins],
  computed: {
    sale() {
      return this.$store.state.sale.sale;
    },
    subTotal() {
      let sum;
      if (this.sale) {
        // eslint-disable-next-line no-shadow
        sum = this.sale.reduce((sum, item) => sum + item.VENDAITEM_VLTOTAL, 0);
      }
      return sum;
    },
    total() {
      return parseFloat(this.subTotal);
    },
    payment() {
      return this.$store.getters['user/getPayments'];
    },
  },
  methods: {
    nextSale() {
      if (localStorage.getItem('token')) {
        this.$emit('next');
      } else {
        this.$store.commit('user/request', ['login', { open: true, step: 1 }]);
      }
    },
    deleteItemSale(item) {
      const payload = {
        table: 'saledb',
        data: item,
        method: 'delete',
      };
      this.$store.dispatch('sale/idb', payload);
      this.$store
        .dispatch('sale/idb', {
          state: 'sale',
          method: 'getAll',
          table: 'saledb',
        })
        .then(resp => {
          if (resp.length === 0) {
            this.$store.commit('sale/request', ['cart', { open: true, step: 2 }]);
          }
        });
    },
    validPurchase() {
      const products = [];
      Object.values(this.sale).forEach(value => {
        products.push({
          PRODUTO_ID: value.PRODUTO_ID,
          PRODUTO_ID2: value.PRODUTO_ID2,
          VENDAITEM_QTDE: value.VENDAITEM_QTDE,
        });
      });
      const sale = {
        ITENS: products,
        FORMAPGTO_CODIGO: this.pay,
      };
      if (sale) {
        this.sendPuchase(sale);
      }
    },
    sendPuchase(sale) {
      this.$store
        .dispatch('sale/request', {
          method: 'POST',
          url: '/sale',
          data: sale,
          noMsg: true,
        })
        .then(() => {
          this.$store.commit('sale/request', ['cart', { open: true, step: 3 }]);
          this.$store.dispatch('sale/idb', {
            state: 'sale',
            method: 'deleteAll',
          });
        });
    },
  },
};
</script>

<style></style>
