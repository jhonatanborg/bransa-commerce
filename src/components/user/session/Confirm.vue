<template>
  <div>
    <v-row dense class="pa-5">
      <v-col cols="12">
        <div class="my-3">
          <span>
            Enviamos um código para seu e-mail. Digite abaixo para validar seu
            cadastro</span
          >
        </div>
        <v-text-field
          color="teal accent-4"
          outlined
          v-model="code"
          label="Insira o código"
        ></v-text-field>
        <v-alert
          type="error"
          :value="error"
          dismissible
          v-text="'Codigo de verificação inválido'"
        ></v-alert>
      </v-col>

      <v-col cols="12">
        <v-btn block x-large @click="sendCode" color="teal accent-4" dark
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
      code: null,
      error: false,
    };
  },
  methods: {
    sendCode() {
      this.$store
        .dispatch("user/request", {
          method: "POST",
          url: "/client-confirm",
          noMsg: true,

          data: { token: this.code },
        })
        .then(() => {
          this.$emit("success-code");
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script>

<style></style>
