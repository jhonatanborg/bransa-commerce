<template>
  <v-dialog
    transition="dialog-transition"
    max-width="500px"
    width="500"
    @click:outside="close"
    :value="$store.state.product.DialogProduct"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card v-if="productModal">
      <v-btn absolute right class="mt-4" x-small color="white" fab @click="close">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
      <v-row no-gutters justify="center">
        <v-col cols="10">
          <v-img contain aspect-ratio="1.1" :src="image(productModal.produto_imagem)"> </v-img>
        </v-col>
      </v-row>

      <div class="my-5">
        <div class="title-product px-5">
          <span v-text="productModal.produto_descricao"></span>
        </div>
      </div>
      <v-toolbar height="80px" floating bottom>
        <v-row align="center" justify="center">
          <v-col cols="4" sm="4">
            <v-text-field
              v-model="quantity"
              type="number"
              :error="error"
              hide-details
              outlined
              label="Quantidade"
              :error-messages="error ? 'Valor inválido' : ''"
              :menu-props="{ top: true, offsetY: true }"
            ></v-text-field
          ></v-col>
          <v-col cols="8" sm="8">
            <v-btn
              :disabled="AddProductButton"
              type="submit"
              block
              :dark="!AddProductButton"
              @click="setSale"
              x-large
              depressed
              color="#FF2A4B"
            >
              <div>
                Adicionar
                <span class="font-weight-bold" v-text="convertMoney(Total)"> </span>
              </div>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
import Mixins from '@/mixins/mixins';

export default {
  mixins: [Mixins],
  data() {
    return {
      main: 'https://i.imgur.com/FhzGn2D.png',
      dialog: false,
      quantity: 1,
      itemQuantity: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      comment: null,
      complements: [],
      sale: null,
      error: false,
    };
  },
  computed: {
    productModal() {
      return this.$store.state.product.productModal || [];
    },
    Total() {
      if (this.quantity > 0) {
        const total = 0;
        return (
          parseFloat(total) +
          parseFloat(this.productModal.produto_valor) * parseFloat(this.quantity)
        );
      }
      return 0;
    },
    AddProductButton() {
      if (this.quantity <= 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    close() {
      this.$store.commit('product/request', ['DialogProduct', false]);
      this.error = false;
    },
    setSale() {
      if (this.quantity > 0) {
        const venda = {
          EMPRESA_ID: '4',
          VENDAITEM_QTDE: this.quantity,
          VENDAITEM_VLUNIT: this.productModal.produto_valor,
          VENDAITEM_VLTOTAL: parseFloat(this.Total),
          VENDAITEM_DESCRICAO: this.productModal.produto_descricao,
          PRODUTO_ID: this.productModal.produto_id,
          PRODUTO_ID2: this.productModal.produto_id2,
        };
        this.$store.dispatch('sale/idb', {
          state: 'sale',
          data: venda,
          method: 'post',
        });
        this.$store.commit('product/request', ['DialogProduct', false]);
        this.$store.commit('sale/request', ['snack', true]);
        this.sale = null;
        this.error = false;
      } else {
        this.error = true;
      }
    },
    image(image) {
      if (image && image.indexOf('blob') >= 0) {
        return image;
      }
      if (!image) {
        return 'https://i.imgur.com/Ho0V1gI.jpg';
      }
      return this.$store.state.server + image;
    },
  },
};
</script>

<style></style>
