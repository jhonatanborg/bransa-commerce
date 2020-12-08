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
              <v-list-item-subtitle>Documento</v-list-item-subtitle>
              <v-list-item-title>{{ user.cliente_cnpj_cpf }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Titulo</v-list-item-subtitle>
              <v-list-item-title>{{ user.cliente_fantasia_apelido }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>E-mail</v-list-item-subtitle>
              <v-list-item-title>{{ user.cliente_email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Endereço</v-list-item-subtitle>
              <v-list-item-title
                >{{ user.cliente_municipio }} - {{ user.cliente_uf }}</v-list-item-title
              >
              <v-list-item-title
                >{{ user.cliente_endereco }}, {{ user.cliente_nr }} -
                {{ user.cliente_cep }}</v-list-item-title
              >
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
  data: () => ({}),
  computed: {
    user() {
      return this.$store.state.user.user || {};
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
      window.location.reload();
    },
  },
};
</script>

<style></style>
