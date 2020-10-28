<template>
  <div>
    <v-container fluid>
      <v-row no-gutters dense justify="start">
        <v-col cols="12">
          <v-text-field
            solo
            v-model="model"
            :loading="$store.state.loading"
            :search-input.sync="search"
            hide-no-data
            hide-selected
            placeholder="Buscar por categoria"
            append-icon="mdi-magnify"
            return-object
          ></v-text-field>

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
                    :color="
                      categorieFilter === index ? 'red lighten-1' : 'grey'
                    "
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
      </v-row>
      <v-row class="px-3">
        <v-col v-if="selectCategorie" cols="12">
          <div id="list-products text-uppercase">
            <div :id="'go'">
              <div class="title-category">
                {{ selectCategorie.produto_grupo }}
              </div>
            </div>
            <v-row>
              <v-col
                sm="2"
                v-for="(product, index) in selectCategorie.produtos"
                :key="index"
              >
                <CardProduct :product="product"
              /></v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <DialogProduct />
  </div>
</template>

<script>
import CardProduct from "@/components/products/CardProduct.vue";
import DialogProduct from "@/components/products/DialogProduct.vue";
export default {
  components: {
    CardProduct,
    DialogProduct,
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
      links: ["Dashboard", "Messages", "Profile", "Updates"],
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
        this.$store.dispatch("product/request", {
          state: "produtos",
          method: "POST",
          data: {
            produto_grupo: val,
          },
          url: "/category/",
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
          start: parseInt(filter.start) + 1,
          end: 8,
        };
        this.filter = filter;
        url = `/products-paginate/${filter.start}/${filter.end}`;
      } else if (!minus && !filter) {
        url = `/products-paginate/${this.filter.start}/${this.filter.end}`;
      } else if (filter.start !== 1) {
        filter = {
          start: parseInt(filter.start) - 1,
          end: 8,
        };
        this.filter = filter;
        url = `/products-paginate/${filter.start}/${filter.end}`;
      }

      this.$store.dispatch("product/request", {
        state: "produtos",
        method: "GET",
        url,
        noMsg: false,
      });
    },
  },
};
</script>

<style>
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 0em;
  z-index: 2;
}
.title-category {
  font-size: 15px;
  font-family: "Staatliches", cursive !important;
  color: #2f404e;
  text-transform: capitalize;
}
</style>
