<template>
  <div>
    <v-row dense class="pa-5">
      <v-col cols="12">
        <div class="my-3 title">
          <span> Esqueceu sua senha?</span>
        </div>
        <div class="my-2">
          <span
            >Digite seu e-mail abaixo para enviarmos um codigo de
            verificação</span
          >
        </div>
        <v-text-field
          color="teal accent-4"
          outlined
          :rules="emailRules"
          v-model="email"
          label="E-mail"
        ></v-text-field>
        <v-alert :type="type" :value="request" dismissible>{{
          message
        }}</v-alert>
      </v-col>

      <v-col cols="12">
        <v-btn block x-large @click="resetPass" color="teal accent-4" dark
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
      email: null,
      emailRules: [
        (v) => !!v || "E-mail é necessário",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Digite um e-mail válido",
      ],
      request: false,
      message: null,
      type: null,
      loading: false,
    };
  },
  methods: {
    checkForm() {
      if (this.email === null) {
        this.request = true;
        this.message = "Preencha todos os campos para criar o cadastro!";
        this.type = "error";
        this.loading = false;
        return false;
      } else {
        this.loading = true;
        return true;
      }
    },
    resetPass() {
      if (this.checkForm()) {
        this.$store
          .dispatch("user/request", {
            method: "POST",
            url: "/client-forgot",
            data: { email: this.email },
            noMsg: true,
          })
          .then(() => {
            this.$emit("success-forgot");
          })
          .catch(() => {
            this.type = "error";
            this.request = true;
            this.message =
              "Usuário não encontrado. Tente novamento um e-mail válido!";
          });
      }
    },
  },
};
</script>

<style></style>
