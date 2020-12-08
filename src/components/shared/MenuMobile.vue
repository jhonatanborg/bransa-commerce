<template>
  <v-navigation-drawer :value="$store.state.user.menuMobile" temporary app @input="hide">
    <v-list>
      <v-list-item v-if="!auth" :to="{ name: 'session' }" link>
        <v-list-item-content>
          <v-list-item-title>Iniciar sessão</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else :to="{ name: 'my-account' }" link>
        <v-list-item-content>
          <v-list-item-title>Minha conta</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="{ name: 'list-products' }" link>
        <v-list-item-content>
          <v-list-item-title>Produtos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    hide(event) {
      if (!event) {
        this.$store.commit('user/request', ['menuMobile', false]);
      }
    },
  },
};
</script>

<style></style>
