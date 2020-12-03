<template>
  <div class="fill-height">
    <div>
      <span> Dados da conta </span>
    </div>
    <div>
      Qual o tipo da conta?
    </div>
    <v-row>
      <v-col>
        <v-card
          :dark="user.cliente_tipo === 'JURÍDICA' ? true : false"
          :color="user.cliente_tipo === 'JURÍDICA' ? 'primary' : 'grey lighten-5'"
          @click="setClientType('JURÍDICA')"
          link
          flat
          class="pa-5"
        >
          Juridica
        </v-card>
      </v-col>
      <v-col>
        <v-card
          @click="setClientType('FÍSICA')"
          link
          :dark="user.cliente_tipo === 'FÍSICA' ? true : false"
          :color="user.cliente_tipo === 'FÍSICA' ? 'primary' : 'grey lighten-5'"
          flat
          class="pa-5"
        >
          Fisica
        </v-card>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-alert :value="error" dense text type="error">
          Para <strong>continuar</strong> selecione um tipo de
          <strong> cadastro! </strong>
        </v-alert>
      </v-col>
    </v-row>

    <v-form ref="client">
      <v-row>
        <v-col cols="12" class="py-0">
          <v-text-field
            :rules="[v => !!v || 'Este campo é obrigatório']"
            v-model="user.cliente_cnpj_cpf"
            :label="user.cliente_tipo === 'JURÍDICA' ? 'Digite o CNPJ' : 'Digite o CPF'"
            v-mask="user.cliente_tipo === 'JURÍDICA' ? '##.###.###/####-##' : '###.###.###-##'"
            outlined
            :error="errorValidate"
            :error-messages="messageValidate"
            dense
            :masked="false"
          ></v-text-field>
        </v-col>
        <v-col v-if="user.cliente_tipo !== 'FÍSICA'" cols="12" class="py-0">
          <v-text-field
            :rules="[v => !!v || 'Este campo é obrigatório']"
            v-model="user.cliente_fantasia_apelido"
            label="Digite o nome fantasia"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            :rules="[v => !!v || 'Este campo é obrigatório']"
            v-model="user.cliente_razao_nome"
            :label="user.cliente_tipo === 'JURÍDICA' ? 'Digite a razão social' : 'Digite seu nome'"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            :rules="[
              v =>
                !v ||
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                'Digite um e-mail válido',
            ]"
            v-model="user.cliente_email"
            label="Email"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            :rules="[v => !!v || 'Este campo é obrigatório']"
            v-model="user.cliente_telefone1"
            label="Telefone"
            v-mask="['(##) ####-####', '(##) #####-####']"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-btn x-large @click="verify()" block dark deprEsted color="red lighten-1"
            >Avançar</v-btn
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
  data: () => ({
    type: null,
    error: false,
    user: {
      cliente_tipo: 'JURÍDICA',
      cliente_razao_nome: 'Jhonatan',
      cliente_fantasia_apelido: 'Jhonatan',
      cliente_cnpj_cpf: '06049690154',
      cliente_email: 'jhonatanborgesdj@gmail.com',
      cliente_telefone1: '66999769452',
    },
    errorValidate: false,
    messageValidate: null,
  }),

  methods: {
    setClientType(val) {
      if (val) {
        this.user.cliente_tipo = val;
      }
    },
    verify() {
      this.loading = true;
      if (
        this.$refs.client.validate() &&
        this.user.cliente_cnpj_cpf.match(/[0-9]/g).join('').length === 14
      ) {
        if (this.validateCNPJ(this.user.cliente_cnpj_cpf)) {
          this.setUser();
        } else {
          this.errorValidate = true;
          this.messageValidate = 'CNPJ inválido! Tente com um válido';
        }
      } else {
        this.errorValidate = true;
        this.messageValidate = 'CNPJ inválido! Tente com um válido';
      }
      if (
        this.$refs.client.validate() &&
        this.user.cliente_cnpj_cpf.match(/[0-9]/g).join('').length === 11
      ) {
        if (this.validateCPF(this.user.cliente_cnpj_cpf.match(/[0-9]/g).join(''))) {
          this.setUser();
        } else {
          this.errorValidate = true;
          this.messageValidate = 'CPF inválido! Tente com um válido';
        }
      } else {
        this.errorValidate = true;
        this.messageValidate = 'CPF inválido! Tente com um válido';
      }
    },
    setUser() {
      this.$store
        .dispatch('user/request', {
          method: 'POST',
          url: '/login',
          data: {
            cliente_cnpj_cpf: this.user.cliente_cnpj_cpf.match(/[0-9]/g).join(''),
          },
          noMsg: true,
        })
        .then(resp => {
          console.log('then', resp.data);
        })
        .catch(err => {
          console.log('catch', err.response);
          if (err.response.data.register) {
            this.$store.commit('user/request', ['userRegister', this.user]);
            this.$emit('address');
          } else if (
            err.response.data.message === 'Seu cadastro ainda não foi liberado, aguarde.'
          ) {
            this.errorValidate = true;
            this.messageValidate = err.response.data.message;
          }
        });
    },
  },
};
</script>

<style>
.title-message {
  font-family: 'Staatliches', cursive !important;
  font-size: 20px;
}
</style>
