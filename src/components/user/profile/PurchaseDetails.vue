<template>
  <div id="purchase-details" v-if="purchase.id">
    <div class="d-flex justify-end">
      <v-btn color="error" :to="{ name: 'purchases' }" outlined>Voltar</v-btn>
    </div>
    <v-card flat class="my-5">
      <v-alert
        :color="statuspurchase(purchase.status)"
        :text-color="statuspurchase(purchase.status)"
        class="ma-0"
        type="success"
      >
        <span class="white--text font-weight-bold">
          {{ purchase.status }}
        </span>
      </v-alert>
      <div class="px-3">
        <v-row justify="space-between">
          <v-col cols="auto">Pedido {{ purchase.id }}</v-col>
          <v-col cols="auto">{{ purchase.created_at }}</v-col>
        </v-row>
      </div>
      <div class="px-3">
        <v-row justify="space-between">
          <v-col cols="auto">Itens</v-col>
        </v-row>
      </div>
      <v-list>
        <div>
          <v-list-item
            v-for="(item, key) in purchase.items"
            :key="key"
            class="px-3"
          >
            <v-list-item-content>
              <v-list-item-title
                ><span v-text="item.product_qtd + 'X '"></span>
                <span v-text="item.product.name"></span>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action
              class="value-product"
              v-text="convertMoney(item.product.value)"
            ></v-list-item-action>
          </v-list-item>
          <v-divider class="px-3"></v-divider>
        </div>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Subtotal</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action
            v-text="convertMoney(purchase.subtotal)"
            class="value-product"
          ></v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Taxa de entrega</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action
            v-text="convertMoney(purchase.delivery_value)"
            class="value-product"
          ></v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Total</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action
            v-text="convertMoney(purchase.total)"
            class="value-product"
          ></v-list-item-action>
        </v-list-item>
        <div class="px-4 grey lighten-5">
          <v-row justify="space-between">
            <v-col cols="auto">Forma de pagamento</v-col>
            <v-col
              cols="auto"
              v-for="(pay, p) in purchase.payment.match(
                /[a-zA-Z\u00C0-\u00FF ]+/g
              )"
              :key="p"
            >
              {{ pay }}
            </v-col>
          </v-row>
        </div>
        <div class="px-4 purchase-address">
          <div>
            <span>Entregar em:</span>
          </div>
          <div>
            <span>
              {{ purchase.address.street }},
              {{ purchase.address.number }}
              <span
                v-if="purchase.address.complement"
                v-text="', ' + purchase.address.complement"
              ></span>
            </span>
          </div>
        </div>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import Mixins from "@/mixins/mixins.js";

export default {
  mixins: [Mixins],

  mounted() {
    setInterval(() => {
      this.getDetails();
    }, 15000);
    this.getDetails();
  },
  computed: {
    purchase() {
      return this.$store.state.sale.purchaseDetails || {};
    },
  },
  methods: {
    getDetails() {
      if (this.$route.params.id) {
        this.$store.dispatch("sale/request", {
          state: "purchaseDetails",
          method: "GET",
          url: "/sale-client/" + this.$route.params.id,
          noMsg: true,
        });
      }
    },
  },
};
</script>

<style></style>
