<template>
  <div>
    <div v-if="purchases.length > 0">
      <span class="title-list"> Meus pedidos</span>
      <v-card
        v-for="(item, key) in purchases"
        :key="key"
        @click="goToPurchase(item)"
        link
        class="pa-5  card-purchase"
        flat
      >
        <v-row justify="space-between" align="start">
          <v-col cols="auto"
            ><h4 class="number-purchase">Pedido {{ item.id }}</h4>
            <span class="title-company">Sabor Vital</span>
            <h4 class="value-purchase" v-text="item.total"></h4>
          </v-col>
          <v-col cols="auto">
            <h4 class="data-purchase" v-text="item.created_at"></h4>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-chip
              class="font-weight-bold text-capitalize"
              :color="statuspurchase(item.status) + ' lighten-5'"
              :text-color="statuspurchase(item.status)"
              >{{ item.status }}</v-chip
            >
          </v-col>
          <v-col cols="auto"> </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </div>
    <div v-else>
      Você ainda não realizou nenhum pedido!
    </div>
  </div>
</template>

<script>
import Mixins from "@/mixins/mixins.js";

export default {
  mixins: [Mixins],
  mounted() {
    this.getAll();
  },
  data() {
    return {};
  },
  computed: {
    purchases() {
      return this.$store.state.sale.myPurchases || [];
    },
  },
  methods: {
    goToPurchase(purchase) {
      this.$store.commit("sale/request", ["purchaseDetails", purchase]);
      this.$router.push("pedidos-detalhes/" + purchase.id).catch(() => {});
    },
    getAll() {
      this.$store.dispatch("sale/request", {
        state: "myPurchases",
        method: "GET",
        url: "/sale-client",
        noMsg: true,
      });
    },
  },
};
</script>

<style></style>
