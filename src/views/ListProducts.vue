<template>
  <div>
    <div class="pa-5 carousel">
      <div class="title-carousel my-3">
        <span>Produtos em destaque</span>
      </div>
      <Carousel />
    </div>

    <v-container fluid>
      <v-row no-gutters dense justify="start" align="center">
        <v-col>
          <div class="pa-3">
            <div class="title-category">
              <span>Lista de categorias:</span>
            </div>
            <div>
              <v-row justify="start" align="center">
                <v-col cols="auto">
                  <v-chip
                    small
                    :loading="$store.state.loading"
                    outlined
                    v-if="filter.start !== 1"
                    color="primary"
                    @click="getProducts(filter, true)"
                    >Voltar</v-chip
                  >
                </v-col>
                <v-col
                  v-for="(categorie, index) in categories"
                  :key="index"
                  link
                  cols="auto"
                  @click="categorieFilter = index"
                >
                  <v-chip
                    small
                    link
                    dark
                    :color="categorieFilter === index ? 'red lighten-1' : 'grey'"
                  >
                    <b v-text="categorie.produto_grupo"></b>
                  </v-chip>
                </v-col>
                <v-col cols="auto">
                  <v-chip
                    :loading="$store.state.loading"
                    color="primary"
                    @click="getProducts(filter)"
                    small
                    link
                    dark
                    >Avançar</v-chip
                  >
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
        <v-col cols="12">
          <v-text-field
            solo
            rounded
            v-model="search"
            :loading="$store.state.loading"
            :search-input.sync="search"
            hide-no-data
            hide-selected
            placeholder="Buscar por categoria"
            append-icon="mdi-magnify"
            return-object
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="px-3">
        <v-col v-if="selectCategorie" cols="12">
          <div id="list-products text-uppercase">
            <div :id="'go'">
              <div>
                <span class="title-category"> {{ selectCategorie.produto_grupo }} </span>
                <small>({{ selectCategorie.produtos.length }})</small>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="selectCategorie">
        <v-col sm="2" v-for="(product, index) in selectCategorie.produtos" :key="index">
          <CardProduct :product="product" />
        </v-col>
      </v-row>
    </v-container>
    <DialogProduct />
  </div>
</template>

<script>
import CardProduct from '@/components/products/CardProduct';
import DialogProduct from '@/components/products/DialogProduct';
import Carousel from '@/components/market/Carousel';

export default {
  components: {
    CardProduct,
    DialogProduct,
    Carousel,
  },
  mounted() {
    this.getProducts();
  },
  data() {
    return {
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      links: ['Dashboard', 'Messages', 'Profile', 'Updates'],
      filter: {
        start: 1,
        end: 8,
      },
      categorieFilter: 0,
    };
  },
  watch: {
    search(val) {
      if (val) {
        this.$store.dispatch('product/request', {
          state: 'produtos',
          method: 'POST',
          data: {
            produto_descricao: val,
          },
          url: '/product-filter/',
          noMsg: false,
        });
      }
    },
  },
  computed: {
    categories() {
      return this.$store.state.product.produtos || [];
    },
    selectCategorie() {
      if (this.categories) {
        return this.categories[this.categorieFilter];
      }
      return 0;
    },
  },
  methods: {
    getProducts(filter, minus) {
      let url;
      if (!minus && filter) {
        filter = {
          // eslint-disable-next-line radix
          start: parseInt(filter.start) + 1,
          end: 8,
        };
        this.filter = filter;
        url = `/products-paginate/${filter.start}/${filter.end}`;
      } else if (!minus && !filter) {
        url = `/products-paginate/${this.filter.start}/${this.filter.end}`;
      } else if (filter.start !== 1) {
        filter = {
          // eslint-disable-next-line radix
          start: parseInt(filter.start) - 1,
          end: 8,
        };
        this.filter = filter;
        url = `/products-paginate/${filter.start}/${filter.end}`;
      }
      this.$store.dispatch('product/request', {
        state: 'produtos',
        method: 'GET',
        url,
        noMsg: false,
      });
    },
  },
};
</script>

<style>
.title-category,
.item-tel,
.address {
  font-size: 15px;
  font-family: 'Staatliches', cursive !important;
  color: #2f404e;
  text-transform: capitalize;
}
.title-carousel {
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;

  color: #f9f9f9;
}
.carousel {
  background: #f85032; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #e73827, #f85032); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #e73827,
    #f85032
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 20px;
}
</style>
