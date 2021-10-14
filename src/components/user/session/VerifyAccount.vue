<template>
  <div>
    <div class="text-center">
      <v-row justify="center">
        <v-col cols="6">
          <v-img src="@/assets/images/brand.png"></v-img>
        </v-col>
      </v-row>
    </div>
    <div class="text-center pa-5">
      <span>Vamos verificar a situação do seu CPF ou CNPJ em nossa base de dados</span>
    </div>
    <v-form ref="verify">
      <v-row dense class="pa-5">
        <v-col cols="12">
          <v-text-field
            color="#3868E3"
            outlined
            dense
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            :masked="false"
            :rules="[v => !!v || 'Este campo é obrigatório']"
            v-model="cliente_cnpj_cpf"
            label="Digite CNPJ ou CPF"
            :error="errorValidate"
            :error-messages="messageValidate"
          ></v-text-field>
        </v-col>

        <v-col cols="12" v-if="register">
          <v-btn
            :loading="$store.state.loading"
            block
            outlined
            @click="$emit('register')"
            color="primary "
            dark
            >Fazer cadastro</v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn @click="verify()" :loading="$store.state.loading" block color="#3868E3" dark
            >Verificar</v-btn
          >
        </v-col>
      </v-row>
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
      cliente_cnpj_cpf: null,
      error: false,
      message: null,
      show: false,
      register: false,
      errorValidate: false,
      messageValidate: null,
    };
  },
  methods: {
    verify() {
      this.loading = true;
      if (
        this.$refs.verify.validate() &&
        this.cliente_cnpj_cpf.match(/[0-9]/g).join('').length === 14
      ) {
        if (this.validateCNPJ(this.cliente_cnpj_cpf)) {
          this.sendClient();
        } else {
          this.errorValidate = true;
          this.messageValidate = 'CNPJ inválido! Tente com um válido';
        }
      } else if (
        this.$refs.verify.validate() &&
        this.cliente_cnpj_cpf.match(/[0-9]/g).join('').length === 11
      ) {
        if (this.validateCPF(this.cliente_cnpj_cpf.match(/[0-9]/g).join(''))) {
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
      this.$store
        .dispatch('user/request', {
          method: 'POST',
          url: '/login',
          data: {
            cliente_cnpj_cpf: this.cliente_cnpj_cpf.match(/[0-9]/g).join(''),
          },
          noMsg: true,
        })
        .then(response => {
          if (response.data.cad_cliente_senha) {
            localStorage.setItem('token', response.data.token);
            this.$emit('pass');
            this.$store.commit('user/request', ['user', response.data]);
          }
        })
        .catch(err => {
          this.error = true;
          if (err.response.data.message === 'Senha incorreta') {
            this.$emit('login');
          } else {
            this.messageValidate = err.response.data.message;
            this.error = true;
          }
          if (err.response.data.register) {
            this.register = true;
            this.messageValidate = err.response.data.message;
            this.error = true;
          }
          // this.$router.push({ name: "register" });
        });
    },
  },
};
</script>

<style></style>
