<template>
  <div>
    <v-toolbar class="ma-0" flat color="white">
      <v-toolbar-title class="ma-0">
        Perfil
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row class="d-flex justify-space-between" v-if="user">
      <v-col cols="12" sm="12">
        <v-list three-line>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Nome</v-list-item-subtitle>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>E-mail</v-list-item-subtitle>
              <v-list-item-title>{{ user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12">
        <v-btn color="error" @click="logout()" outlined>Encerrar sessão</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getUser();
  },
  data: () => ({
    user: null,
  }),
  computed: {},
  methods: {
    getUser() {
      if (localStorage.getItem('token')) {
        this.$store
          .dispatch('user/request', {
            method: 'GET',
            url: `/client/${localStorage.getItem('user')}`,
            noMsg: true,
          })
          .then(response => {
            this.user = response.data;
          })
          .catch(() => {
            localStorage.clear();
            location.reload();
          });
      }
    },
    logout() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>

<style></style>
