<template>
  <div>
    <v-row dense class="pa-5">
      <v-col cols="12">
        <div class="my-3">
          <span>
            Enviamos um código de recuperação de senha para seu e-mail. Digite
            abaixo para validar seu cadastro</span
          >
        </div>
        <v-text-field
          color="teal accent-4"
          outlined
          v-model="user.token"
          label="Insira o código"
        ></v-text-field>
        <v-text-field
          color="teal accent-4"
          outlined
          v-model="user.password"
          label="Insira aqui sua nova senha"
        ></v-text-field>
        <v-alert :type="type" :value="request" dismissible>{{
          message
        }}</v-alert>
      </v-col>

      <v-col cols="12">
        <v-btn block x-large @click="confirmReset" color="teal accent-4" dark
          >Confirmar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        token: null,
        password: null,
      },
      type: null,
      request: false,
      message: null,
    };
  },
  methods: {
    confirmReset() {
      this.$store
        .dispatch("user/request", {
          method: "POST",
          url: "/client-reset-password",
          noMsg: true,

          data: this.user,
        })
        .then(() => {
          this.request = true;
          this.type = "success";
          this.message =
            "Sua senha foi alterada com sucesso! Faça login com a nova senha para se conectar";
          setTimeout(() => {
            this.$emit("success-forgot");
          }, 2000);
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script>

<style></style>
