<template>
  <div>
    <v-row dense align="center" justify="center">
      <v-col sm="8">
        <div class="text-center">
          <v-img width="100%" src="@/assets/images/brand.png"></v-img>
        </div>
      </v-col>
      <v-col class="pa-0" sm="12">
        <div class="text-center">
          <span
            >Acesse sua conta para comprar <br />
            e verificar preços</span
          >
        </div>
      </v-col>
    </v-row>
    <v-form ref="login" class="pa-5">
      <div>
        <v-text-field
          color="red lighten-1"
          label="CNPJ ou CPF"
          outlined
          dense
          v-mask="['##.###.###/####-##', '###.###.###-##']"
          v-model="cliente.cliente_cnpj_cpf"
          :rules="[v => !!v || 'Este campo é obrigatório']"
          :error="errorValidate"
          :error-messages="messageValidate"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          color="red lighten-1"
          label="Senha"
          outlined
          dense
          v-model="cliente.cliente_senha"
        ></v-text-field>
      </div>
      <v-alert type="error" dense :value="error"> {{ message }}</v-alert>

      <div>
        <v-btn
          class="text-capitalize font-weight-bold"
          block
          @click="login()"
          dark
          color="red lighten-1"
          >Login</v-btn
        >
      </div>
      <div class="my-5">
        <v-btn
          class="text-capitalize font-weight-bold"
          block
          dark
          @click="$emit('first-access')"
          outlined
          color="red lighten-1"
          >Primeiro acesso?
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import Mixins from '@/mixins/mixins';

export default {
  directives: { mask },
  mixins: [Mixins],

  data() {
    return {
      cliente: {
        cliente_cnpj_cpf: null,
        cliente_senha: null,
      },
      message: null,
      request: false,
      loading: false,
      error: false,
      errorValidate: false,
      messageValidate: null,
    };
  },
  methods: {
    login() {
      this.loading = true;
      if (
        this.$refs.login.validate() &&
        this.cliente.cliente_cnpj_cpf.match(/[0-9]/g).join('').length === 14
      ) {
        if (this.validateCNPJ(this.cliente.cliente_cnpj_cpf)) {
          this.sendClient();
        } else {
          this.errorValidate = true;
          this.messageValidate = 'CNPJ inválido! Tente com um válido';
        }
      } else if (
        this.$refs.login.validate() &&
        this.cliente.cliente_cnpj_cpf.match(/[0-9]/g).join('').length === 11
      ) {
        if (this.validateCPF(this.cliente.cliente_cnpj_cpf.match(/[0-9]/g).join(''))) {
          this.sendClient();
        } else {
          this.errorValidate = true;
          this.messageValidate = 'CPF inválido! Tente com um válido';
        }
      } else {
        this.errorValidate = true;
        this.messageValidate = 'Documento inválido! Tente com um válido';
      }
    },
    sendClient() {
      this.cliente.cliente_cnpj_cpf = this.cliente.cliente_cnpj_cpf.match(/[0-9]/g).join('');
      this.$store
        .dispatch('user/request', {
          state: 'user',
          method: 'POST',
          url: '/login',
          data: this.cliente,
          noMsg: true,
        })
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.token);
          if (response.data.cad_cliente_senha) {
            this.$emit('pass');
          } else {
            this.$router.push('/');
            localStorage.setItem('token', response.data.token);
          }
          this.loading = false;
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data[0]) {
              this.message = err.response.data[0].message;
            } else {
              this.message = err.response.data.message;
            }
            this.error = true;
            this.loading = false;
          }
        });
    },
  },
};
</script>

<style></style>
