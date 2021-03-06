<template>
  <v-dialog
    transition="dialog-transition"
    max-width="650px"
    width="500"
    persistent
    scrollable
    @click:outside="close"
    :value="$store.state.product.DialogProduct"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card v-if="productModal">
      <v-img width="100%" height="35%" aspect-ratio="1.3" :src="image(productModal.produto_imagem)">
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn class="mr-3" x-small color="white" fab @click="close">
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-img>
      <div class="height-title">
        <v-alert dark color="error" dismissible v-model="inventory.error">
          <span v-text="inventory.message"></span>
        </v-alert>
        <span v-text="productModal.produto_descricao"></span>
      </div>

      <v-toolbar height="80px" bottom floating absolute>
        <v-row align="center" justify="center">
          <v-col cols="4" sm="4">
            <v-text-field
              type="number"
              v-model="quantity"
              :error="error"
              hide-details
              outlined
              :rules="rules"
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
      itemQuantity: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      comment: null,
      complements: [],
      sale: null,
      error: false,
      quantity: 1,
      rules: [
        v => (v && v >= this.productModal.produto_vendaminima) || 'Loan should be above £5000',
      ],
      inventory: {
        error: false,
        message: null,
      },
    };
  },
  watch: {
    productIdSum() {
      if (this.productModal.produto_vendaminima && this.productModal.produto_vendaminima >= 0) {
        this.quantity = this.productModal.produto_vendaminima;
      } else {
        this.quantity = 1;
      }
    },
  },
  computed: {
    saleIdb() {
      return this.$store.state.sale.sale;
    },
    productModal() {
      return this.$store.state.product.productModal || [];
    },
    productIdSum() {
      return this.productModal.produto_id + this.productModal.produto_id2;
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
      if (
        this.quantity <= 0 ? true : false || this.quantity < this.productModal.produto_vendaminima
      ) {
        return true;
      }
      return false;
    },
    quantityMinimal() {
      if (this.productModal.produto_vendaminima && this.productModal.produto_vendaminima >= 0) {
        return this.productModal.produto_vendaminima;
      }
      return this.quantity;
    },
  },
  methods: {
    verifyInventory() {
      if (this.quantity > this.productModal.produto_qtde) {
        this.quantity = this.productModal.produto_qtde;
        this.inventory.error = true;
        this.inventory.message = `Temos apenas ${this.productModal.produto_qtde} desse produto em estoque`;
        return false;
      }
      return true;
    },
    verifySale() {
      const findItem = this.saleIdb.find(
        item =>
          item.PRODUTO_ID === this.productModal.produto_id &&
          item.PRODUTO_ID2 === this.productModal.produto_id2,
      );
      if (findItem) {
        this.inventory.error = true;
        this.inventory.message = `Você já tem esse produto na sacola`;
        return false;
      }
      return true;
    },
    close() {
      this.$store.commit('product/request', ['DialogProduct', false]);
      this.error = false;
    },
    setSale() {
      console.log(this.verifySale());
      if (this.quantity > 0 && this.verifyInventory() && this.verifySale()) {
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
        this.inventory.error = false;
        this.inventory.message = null;

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

<style>
.height-title {
  height: 20vh;
  padding: 10px 15px;
  margin: 30px 0px;
}
</style>
