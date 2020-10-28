<template>
  <div>
    <v-row dense class="pa-5" justify="center" align="center">
      <v-col cols="8">
        <div class="my-3 text-center">
          <v-icon size="140" color="white">mdi-check-circle-outline</v-icon>
        </div>
        <div class="text-center">
          <span class="title white--text">
            Deu tudo certo! Você foi cadastrado com sucesso.
          </span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn block x-large @click="success()" :loading="loading" color="white"
          >Continuar</v-btn
        >
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
  methods: {
    success() {
      this.$store.commit("user/request", ["login", { open: false, step: 1 }]);
      if (localStorage.getItem("userRegister")) {
        let user = JSON.parse(localStorage.getItem("userRegister"));
        this.loading = true;
        this.$store
          .dispatch("user/request", {
            state: "user",
            method: "POST",
            url: "/client-login",
            data: {
              email: user.email,
              password: user.password,
            },
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.id);
            localStorage.removeItem("userRegister", response.data.id);
            this.loading = false;

            setTimeout(() => {
              this.$router.push({ name: "list-products" });
            }, 2000);
            location.reload();
          })
          .catch(() => {
            location.reload();
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style></style>
