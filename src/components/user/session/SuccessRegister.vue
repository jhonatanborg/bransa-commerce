<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <div class="text-center my-5">
          <v-avatar size="110" color="teal accent-4">
            <v-icon outlined size="60" dark>mdi-checkbox-marked</v-icon>
          </v-avatar>
        </div>
        <div class="text-center ">
          <span class="title-message ">
            Tudo certo!
          </span>
        </div>
        <div class="pa-5 text-center">
          <span
            >Seu cadastro foi enviado para analise. Vamos verificar se os seus dados estão corretos
            para fazer a validação</span
          >
        </div>
        <v-col cols="12">
          <v-btn to="/" color="red lighten-1" block depressed dark>Entendi</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style></style>
