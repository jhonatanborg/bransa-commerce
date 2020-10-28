<template>
  <div>
    <v-row justify="center">
      <v-col>
        <div>
          <span class="title">Criar Conta</span>
        </div>
      </v-col>
    </v-row>
    <v-window v-model="step">
      <v-window-item :value="1">
        <div>
          <small> Dados da conta </small>
        </div>
        <div>
          Qual o tipo da conta?
        </div>
        <v-row>
          <v-col>
            <v-card link dark color="primary" flat class="pa-5">
              Fisica
            </v-card>
          </v-col>
          <v-col>
            <v-card link flat class="pa-5">
              Juridica
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item :value="2">
        <div>
          <small> Dados da conta </small>
        </div>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              hide-details
              color="red lighten-1"
              label="Digite seu CPF"
              outlined
              dense
              id="id"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details
              color="red lighten-1"
              label="Digite seu Nome"
              outlined
              dense
              id="id"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details
              color="red lighten-1"
              label="Email"
              outlined
              dense
              id="id"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              color="red lighten-1"
              label="Telefone"
              outlined
              dense
              id="id"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
    <v-row>
      <v-col>
        <v-btn
          x-large
          @click="step++"
          block
          dark
          depressed
          color="red lighten-2"
          >Avançar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
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
