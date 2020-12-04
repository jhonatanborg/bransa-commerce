<template>
  <v-app-bar app color="white" flat>
    <div class="d-flex justify-center align-center">
      <router-link :to="{ name: 'Home' }">
        <v-img width="130px" src="@/assets/images/brand.png"></v-img>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <div class="nav-links hidden-sm-and-down">
      <router-link :to="{ name: 'list-products' }">Produtos</router-link>
      <router-link v-if="!auth" :to="{ name: 'session' }">Iniciar sessão</router-link>
      <router-link v-else :to="{ name: 'my-account' }">Minha Conta</router-link>
      <a @click="openSale()" href="#" id="cart"
        ><v-icon size="20">mdi-cart</v-icon> Carrinho
        <span class="badge"> {{ sale.length }}</span></a
      >
      <span> </span>
    </div>
    <div v-if="$vuetify.breakpoint.smAndDown">
      <v-icon color="black">mdi-menu</v-icon>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    sale() {
      return this.$store.state.sale.sale || {};
    },
    auth() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    openSale() {
      if (this.$store.state.sale.sale.length > 0) {
        this.$store.commit('sale/request', ['cart', { open: true, step: 1 }]);
      } else {
        this.$store.commit('sale/request', ['cart', { open: true, step: 3 }]);
      }
    },
  },
};
</script>

<style>
.nav-links {
  display: inline;
  font-family: 'Montserrat', sans-serif !important;
  float: right;
  font-size: 18px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  margin: 0 30px;
}

.nav-links > a {
  display: inline-block;
  text-decoration: none;
  color: #efefef;
  margin: 0 30px;
}

.nav-links > a:hover {
  color: #ff5353;
}
.badge {
  background-color: #6394f8;
  border-radius: 10px;
  color: white;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 3px 7px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
}
</style>
