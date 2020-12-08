<template>
  <v-row justify="center" class="my-5">
    <v-col cols="12" sm="6">
      <v-img src="@/assets/icons/check.svg"></v-img>
    </v-col>
    <v-col cols="12" sm="8">
      <div class="pa-5 item-title-alert">
        <span>Seu pedido foi realizado com sucesso!</span>
      </div>
    </v-col>
    <v-col cols="12" sm="8">
      <div>
        <v-btn @click="eventSale(false)" depressed block color="primary">Continuar na loja</v-btn>
      </div>
    </v-col>
  </v-row>
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
  computed: {},
  methods: {
    eventSale(event) {
      if (!event) {
        this.$store.commit('sale/request', ['cart', { open: event, step: 1 }]);
      }
    },
  },
};
</script>

<style>
.item-title-alert {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  text-align: center;

  color: #2d2c2c;
}
</style>
