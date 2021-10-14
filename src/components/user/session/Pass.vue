<template>
  <div class="my-4">
    <div class="my-3">
      <h4>Cadastre uma senha</h4>
    </div>
    <div class="my-2">
      <small>Para completar seu cadastro precisamos que você crie uma senha para essa conta</small>
    </div>

    <v-form ref="pass">
      <v-row>
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model="cliente_senha"
            label="Insira aqui uma senha"
            outlined
            dense
            :rules="[v => !!v || 'Este campo é obrigatório']"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn x-large @click="passConfirm()" block dark deprEsted color="#3868E3"
            >Confirmar senha</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cliente_senha: null,
    };
  },
  methods: {
    passConfirm() {
      if (this.$refs.pass && !this.$store.state.user.userRegister) {
        this.$store
          .dispatch('user/request', {
            state: 'user',
            method: 'PUT',
            url: '/password',
            data: { cliente_senha: this.cliente_senha },
            noMsg: true,
          })
          .then(response => {
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
            this.$router.push('/');
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
      if (this.$refs.pass && this.$store.state.user.userRegister) {
        this.$store.state.user.userRegister.cliente_cnpj_cpf = this.$store.state.user.userRegister.cliente_cnpj_cpf
          .match(/[0-9]/g)
          .join('');
        const cliente = Object.assign(
          this.$store.state.user.userRegister,
          this.$store.state.user.addressRegister,
          { cliente_senha: this.cliente_senha },
        );
        this.$store
          .dispatch('user/request', {
            method: 'POST',
            url: '/register',
            data: cliente,
            noMsg: true,
          })
          .then(() => {
            console.log('deu certo');
            this.$emit('success');
          });
      }
    },
  },
};
</script>

<style></style>
