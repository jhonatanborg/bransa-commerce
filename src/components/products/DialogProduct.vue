<template>
  <v-dialog
    transition="dialog-transition"
    max-width="500px"
    scrollable
    width="500"
    @click:outside="close"
    :value="$store.state.product.DialogProduct"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card v-if="productModal">
      <v-img
        width="100%"
        height="25%"
        aspect-ratio="1.1"
        :src="
          productModal.image
            ? $store.state.server + productModal.image
            : 'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder-300x300.png'
        "
      >
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn class="mr-3" x-small color="white" fab @click="close">
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-img>
      <div class="my-5">
        <div class="title-product px-5">
          <span v-text="productModal.produto_descricao"></span>
        </div>
        <div class="px-5">
          <v-chip color="#00c996" text-color="white" dark>
            <b class=" mx-2">
              Ver preço
            </b>
          </v-chip>
        </div>
      </div>
      <div class="overflow-x-hidden" v-if="productModal.subcategories">
        <div v-for="(item, i) in productModal.subcategories" :key="i">
          <div class="grey pa-5 lighten-3 title-item-category">
            <span v-text="item.name"> </span>
          </div>
          <v-list>
            <v-list-item-group v-model="complements" multiple>
              <template v-for="(value, i) in item.complements">
                <v-list-item
                  :key="i"
                  :value="value"
                  active-class="green--text text--accent-4"
                >
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="value.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle class="font-weight-bold">
                        + {{ convertMoney(value.value) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        color="#488e4b"
                        @click.stop="toggle"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </div>
        <div class="my-3 px-5">
          <!-- <v-textarea
            outlined
            dense
            rows="2"
            v-model="comment"
            placeholder="Ex. sem pimenta, sem molho verde"
            label="Personalize seu pedido"
            id="id"
          ></v-textarea> -->
        </div>
      </div>

      <v-toolbar max-height="80px" floating bottom>
        <v-row align="center">
          <v-col cols="4" sm="4">
            <v-text-field
              v-model="quantity"
              type="number"
              hide-details
              solo
              :menu-props="{ top: true, offsetY: true }"
            ></v-text-field
          ></v-col>
          <v-col cols="8" sm="8">
            <v-btn
              dark
              type="submit"
              block
              @click="setSale"
              x-large
              depressed
              color="#FF2A4B"
            >
              <div>
                Confirmar
                <span class="font-weight-bold" v-text="convertMoney(Total)">
                </span>
              </div>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
import Mixins from "@/mixins/mixins.js";

export default {
  mixins: [Mixins],
  data() {
    return {
      main: "https://i.imgur.com/FhzGn2D.png",
      dialog: false,
      quantity: 1,
      itemQuantity: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      comment: null,
      complements: [],
      sale: null,
    };
  },
  computed: {
    productModal() {
      return this.$store.state.product.productModal || [];
    },
    Total() {
      let total = 0;
      if (this.complements.length > 0) {
        this.complements.forEach((item) => {
          total += item.value * parseFloat(this.quantity);
        });
      }
      return (
        parseFloat(total) +
        parseFloat(this.productModal.produto_valor) * parseFloat(this.quantity)
      );
    },
  },
  methods: {
    close() {
      this.$store.commit("product/request", ["DialogProduct", false]);
    },
    setSale() {
      let childs = [];
      if (this.complements.length > 0) {
        this.complements.forEach((item) => {
          childs.push({ complement_id: item.id });
        });
      }
      let product = {
        product_id: this.productModal.id,
        product_qtd: this.quantity,
        product_name: this.productModal.name,
        total: parseFloat(this.Total),
        childs: childs,
        obs: this.comment,
      };
      this.$store.dispatch("sale/idb", {
        state: "sale",
        data: product,
        method: "post",
      });
      this.$store.commit("product/request", ["DialogProduct", false]);
      this.sale = null;
    },
  },
};
</script>

<style>
.title-product {
  font-size: 18px;
}
</style>
