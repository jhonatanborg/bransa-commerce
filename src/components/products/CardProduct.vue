<template>
  <div>
    <v-card @click="openDialog(product)" link flat class="pa-5" max-width="100%">
      <div>
        <div>
          <v-img aspect-ratio="1.1" :src="image(product.produto_imagem)"> </v-img>
        </div>
        <div class="title-product">
          <span v-text="product.produto_descricao"> </span>
        </div>
        <div class="my-2">
          <small v-text="'CÓD: ' + product.produto_codigo"></small>
        </div>
        <div>
          <span v-if="auth" v-text="convertMoney(product.produto_valor)"> </span>
          <div v-else>
            <v-chip color="#00c996" text-color="white" dark small>
              <b class=" mx-2">
                Ver preço
              </b>
            </v-chip>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import Mixins from '@/mixins/mixins';

export default {
  mixins: [Mixins],
  props: {
    product: Object,
  },
  computed: {
    auth() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    openDialog(product) {
      if (this.auth) {
        this.$store.commit('product/request', ['productModal', product]);
        this.$store.commit('product/request', ['DialogProduct', true]);
      } else {
        this.$router.push({ name: 'session' });
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
.title-product {
  margin-top: 10px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  text-transform: lowercase;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
