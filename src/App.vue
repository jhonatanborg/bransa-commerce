<template>
  <v-app id="app">
    <MenuBar />
    <Sale />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MenuBar from '@/components/shared/MenuBar';
import Sale from '@/components/sale/Sale';

export default {
  name: 'App',
  components: {
    MenuBar,
    Sale,
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
</style>
