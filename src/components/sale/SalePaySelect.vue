<template>
  <div>
    <v-card class="pa-5" flat>
      <div class="details my-5">
        <div class="">
          <span class="font-weight-bold">Detalhes</span>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between my-2">
          <div>
            <span>Subtotal</span>
          </div>
          <div>
            <span v-text="convertMoney(subTotal)"></span>
          </div>
        </div>

        <div class="d-flex justify-space-between my-2">
          <div>
            <span>Total</span>
          </div>
          <div>
            <span v-text="convertMoney(total)"></span>
          </div>
        </div>
        <div class="my-5">
          <div class="">
            <span class="font-weight-bold">Selecione a forma de pagamento</span>
          </div>
          <v-divider></v-divider>
          <v-list class="mx-0">
            <v-list-item-group class="mx-0" v-model="pay">
              <template v-for="(item, i) in items">
                <v-list-item
                  :key="i"
                  :value="item"
                  class="px-3"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox :input-value="active" color="deep-purple accent-4"></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
          <div class="d-flex justify-space-between my-2">
            <v-text-field v-model="change_for" outlined dense label="Troco para?"></v-text-field>
          </div>
        </div>
        <v-alert dark color="error " icon="mdi-alert" dismissible :value="error">
          Selecione uma forma de pagamento para finalizar
        </v-alert>
        <v-btn color="#156f72" x-large @click="validPurchase" block dark>Confirmar</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import Mixins from '@/mixins/mixins';

export default {
  mixins: [Mixins],
  data() {
    return {
      items: ['Dinheiro', 'Crédito', 'Débito', 'Transferência'],
      pay: null,
      change_for: null,
      error: false,
    };
  },
  computed: {
    sale() {
      return this.$store.state.sale.sale;
    },
    subTotal() {
      let sum;
      if (this.sale) {
        // eslint-disable-next-line no-shadow
        sum = this.sale.reduce((sum, item) => sum + item.total, 0);
      }
      return sum;
    },
    total() {
      return parseFloat(this.subTotal) + parseFloat(this.addressClient.district_id.delivery_value);
    },
  },
  methods: {
    validPurchase() {
      if (this.pay) {
        const purchase = this.$store.state.sale.sale;
        purchase.forEach(element => {
          delete element.product_name;
          delete element.id;
        });

        const sale = {
          address: this.addressClient,
          change_for: this.change_for,
          products: purchase,
          payment: this.pay.toString(),
        };
        sale.address.district_id = sale.address.district_id.id;
        console.log(sale);
        this.sendPuchase(sale);
      } else {
        this.error = true;
      }
    },
    sendPuchase(sale) {
      this.$store
        .dispatch('sale/request', {
          method: 'POST',
          url: '/sale-client/',
          data: sale,
          noMsg: true,
        })
        .then(resp => {
          this.$store.commit('sale/request', ['cart', { open: false, step: 1 }]);
          this.$store.commit('sale/request', ['purchaseDetails', resp.data]);
          this.$router.push(`pedidos-detalhes/${resp.data.id}`).catch(() => {});
          this.$store.dispatch('sale/idb', {
            state: 'sale',
            method: 'deleteAll',
            idb: {
              table: 'saledb',
            },
          });
        });
    },
  },
};
</script>

<style></style>
