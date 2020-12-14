<template>
  <div class="pa-5 carousel" v-if="featured && featured.length > 0">
    <div class="title-carousel my-3">
      <span>Produtos em destaque </span>
    </div>
    <carousel
      class="mx-10"
      :perPageCustom="[
        [768, 1],
        [320, 1],
        [262, 1],
        [500, 1],
        [1024, 5],
      ]"
      :navigationClickTargetSize="10"
      :navigationEnabled="true"
      :paginationEnabled="false"
      :minSwipeDistance="20"
      navigationNextLabel="<i class='material-icons'>arrow_forward_ios</i>"
      navigationPrevLabel="<i class='material-icons'>arrow_back_ios</i>"
    >
      <slide :navigationNextLabel="'Próximo'" v-for="(item, index) in featured" :key="index">
        <v-card
          @click="openDialog(item)"
          max-width="270px"
          height="100%"
          link
          flat
          class="pa-5 mx-2"
        >
          <div>
            <v-avatar size="100%" tile>
              <v-img aspect-ratio="1.1" :src="image(item.produto_imagem)"> </v-img>
            </v-avatar>
            <div class="item-title-product">
              <span v-text="item.produto_descricao"> </span>
            </div>
            <div class="my-3">
              <small v-text="'CÓD: ' + item.produto_codigo"></small>
            </div>
            <div>
              <span v-if="auth" v-text="convertMoney(item.produto_valor)"> </span>
              <div v-else>
                <v-chip color="#00c996" text-color="white" dark>
                  <b class=" mx-2">
                    Ver preço
                  </b>
                </v-chip>
              </div>
            </div>
          </div>
        </v-card>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Mixins from '@/mixins/mixins';

export default {
  mixins: [Mixins],

  components: {
    Carousel,
    Slide,
  },
  mounted() {
    this.getFeatured();
  },
  computed: {
    featured() {
      return this.$store.state.product.featured;
    },
    auth() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    getFeatured() {
      this.$store.dispatch('product/request', {
        state: 'featured',
        method: 'GET',
        url: '/products-featured',
      });
    },
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
.item-title-product {
  margin-top: 10px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  text-transform: lowercase;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
