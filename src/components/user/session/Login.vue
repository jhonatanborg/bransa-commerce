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
    <div class="pa-5">
      <div>
        <v-text-field
          color="red lighten-1"
          label="CNPJ"
          outlined
          dense
          id="id"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          color="red lighten-1"
          label="Senha"
          outlined
          dense
          id="id"
        ></v-text-field>
      </div>
      <div>
        <v-btn
          class="text-capitalize font-weight-bold"
          block
          large
          dark
          color="red lighten-1"
          >Login</v-btn
        >
      </div>
      <div class="my-5">
        <v-btn
          class="text-capitalize font-weight-bold"
          block
          large
          dark
          :to="{ name: 'verify-account' }"
          outlined
          color="red lighten-1"
          >Primeiro acesso ?
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      message: null,
      request: false,
      loading: false,
      type: null,
    };
  },
  methods: {
    checkForm() {
      if (this.user.email === null || this.user.password === null) {
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
    Login() {
      this.loading = true;

      if (this.checkForm()) {
        this.$store
          .dispatch("user/request", {
            state: "user",
            method: "POST",
            url: "/client-login",
            data: this.user,
            noMsg: true,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.id);
            this.request = true;
            this.type = "success";
            this.message = "Login efetuado com sucesso";
            this.loading = false;

            setTimeout(() => {
              this.$router.push({ name: "list-products" });
            }, 2000);
            location.reload();
          })
          .catch(() => {
            this.request = true;
            this.type = "error";
            this.message = "Erro ao fazer login, tente novamente";
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style></style>
