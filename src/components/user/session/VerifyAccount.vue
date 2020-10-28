<template>
  <div>
    <div class="text-center">
      <v-avatar tile size="50">
        <v-img width="100%" src="@/assets/images/online.svg"></v-img
      ></v-avatar>
      <div>
        <span class="title-company">Bransa</span>
      </div>
    </div>

    <div class="text-center pa-5">
      <span
        >Acesse sua conta para comprar <br />
        e verificar preços</span
      >
    </div>
    <v-row dense class="pa-5">
      <v-col cols="12">
        <v-text-field
          color="red lighten-1"
          outlined
          dense
          v-model="client_cnpj_cpf"
          label="Digite CNPJ da sua empresa"
        ></v-text-field>
      </v-col>
      <v-alert type="error" dense :value="error"> {{ message }}</v-alert>
      <v-col cols="12">
        <v-btn
          @click="verify()"
          :loading="$store.state.loading"
          block
          x-large
          color="red lighten-1"
          dark
          >Cadastrar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client_cnpj_cpf: null,
      error: false,
      message: null,
      show: false,
    };
  },
  methods: {
    checkForm() {
      if (this.client_cnpj_cpf === null) {
        this.error = true;
        this.message = "Preencha todos os campos para criar o cadastro!";
        return false;
      } else {
        return true;
      }
    },
    verify() {
      if (this.checkForm()) {
        this.$store
          .dispatch("user/request", {
            method: "POST",
            url: "/login",
            data: {
              client_cnpj_cpf: this.client_cnpj_cpf,
              cliente_senha: "0000",
            },
            noMsg: true,
          })
          .then((response) => {
            console.log("aqui", response.data);
          })
          .catch(() => {
            this.error = true;
            this.message = "Esse cnpj não foi encontrado";
            this.$router.push({ name: "register" });
          });
      }
    },
  },
};
</script>

<style></style>
