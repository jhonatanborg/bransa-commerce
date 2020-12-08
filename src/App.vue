<template>
  <v-app id="app">
    <MenuBar />
    <MenuMobile />
    <Sale />

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer width="100%" height="auto">
      <v-row justify="center" align="center" dense>
        <v-col cols="12" sm="4">
          <div>
            <router-link :to="{ name: 'Home' }">
              <v-img width="200px" src="@/assets/images/brand.png"></v-img>
            </router-link>
          </div>
        </v-col>
        <v-col cols="12" sm="8">
          <v-row>
            <v-col cols="12" sm="4">
              <div class="item-tel">
                <span>Telefone:</span>
              </div>
              <div class="item-details">
                <span>(66) 3531 - 9039</span>
              </div>
            </v-col>
            <v-col cols="12" sm="8">
              <div class="address">
                <span>Endereço:</span>
              </div>
              <div class="item-details">
                <span> Rua Muricis, nº 502 - Jardim Primaveras - Sinop, Mato Grosso </span> <br />
                <span>78550-001</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="auto">
          <small>
            &copy;2018 —
            <strong>Vedas Sistemas</strong>
          </small>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import MenuBar from '@/components/shared/MenuBar';
import MenuMobile from '@/components/shared/MenuMobile';
import Sale from '@/components/sale/Sale';

export default {
  name: 'App',
  components: {
    MenuBar,
    Sale,
    MenuMobile,
  },
  mounted() {
    this.getSaleIdb();
    this.verify();
  },
  methods: {
    getSaleIdb() {
      this.$store.dispatch('sale/idb', {
        state: 'sale',
        method: 'getAll',
        idb: {
          table: 'bransacart',
        },
      });
    },
    verify() {
      if (localStorage.getItem('token')) {
        this.$store
          .dispatch('user/request', {
            state: 'user',
            method: 'GET',
            url: '/verify',
          })
          .catch(() => {
            localStorage.clear();
            window.location.reload();
          });
      }
    },
  },

  data: () => ({
    //
  }),
};
</script>
<style>
#app {
  font-family: 'Montserrat', sans-serif !important;
  background-color: #f9f9f9 !important;
}
.item-details {
  font-size: 14px;
}
</style>
