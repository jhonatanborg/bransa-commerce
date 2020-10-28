<template>
  <div>
    <v-card
      class="pa-5 "
      flat
      raised
      color="white"
      @click="openDialog(product)"
    >
      <div class="d-flex justify-center">
        <v-avatar class="text-center  " tile size="150">
          <v-img
            class="red"
            aspect-ratio="1.1"
            width="100%"
            src="https://dydyo.com.br/site/data/uploads/2018/07/37053050_1735985906489585_8325026304877395968_n.jpg"
          >
          </v-img>
        </v-avatar>
      </div>
      <div class="my-3">
        <div class="title-product">
          <span>{{ product.produto_descricao }}</span>
        </div>
        <div class="text-center" v-text="convertMoney(product.produto_valor)">
          <span></span>
        </div>
        <div class="mt-5">
          <v-btn block depressed color="#FF2A4B" dark>Comprar </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import Mixins from "@/mixins/mixins.js";

export default {
  mixins: [Mixins],
  props: {
    product: Object,
  },
  methods: {
    openDialog(product) {
      this.$store.commit("product/request", ["productModal", product]);
      this.$store.commit("product/request", ["DialogProduct", true]);
    },
  },
};
</script>

<style>
.title-product {
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px !important;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* line-height: 36px; */
  max-height: 62px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
