<template>
  <div>
    <small>Endereço de entrega</small>
    <v-form ref="address">
      <v-row>
        <v-col cols="12" sm="4" class="py-0">
          <v-select
            :items="states"
            label="UF"
            outlined
            :rules="[v => !!v || 'Este campo é obrigatório']"
            v-model="address.cliente_uf"
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" sm="8" class="py-0">
          <v-text-field
            label="Municipio"
            outlined
            v-model="address.cliente_municipio"
            dense
            :rules="[v => !!v || 'Este campo é obrigatório']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" class="py-0">
          <v-text-field
            label="CEP"
            outlined
            v-model="address.cliente_cep"
            dense
            :rules="[v => !!v || 'Este campo é obrigatório']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model="address.cliente_bairro"
            label="Bairro"
            outlined
            dense
            :rules="[v => !!v || 'Este campo é obrigatório']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0" sm="8">
          <v-text-field
            v-model="address.cliente_endereco"
            label="Logradouro"
            outlined
            dense
            :rules="[v => !!v || 'Este campo é obrigatório']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0" sm="4">
          <v-text-field
            v-model="address.cliente_nr"
            label="Número"
            outlined
            dense
            :rules="[v => !!v || 'Este campo é obrigatório']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model="address.cliente_complemento"
            label="Complemento"
            outlined
            dense
            :rules="[v => !!v || 'Este campo é obrigatório']"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn x-large @click="setAddress()" block dark deprEsted color="red lighten-1"
            >Avançar</v-btn
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
      states: [
        'AC',
        'AL',
        'AM',
        'AP',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RO',
        'RS',
        'RR',
        'SC',
        'SE',
        'SP',
        'TO',
      ],
      address: {
        cliente_bairro: null,
        cliente_cep: null,
        cliente_complemento: null,
        cliente_endereco: null,
        cliente_municipio: null,
        cliente_nr: null,
        cliente_uf: 'MT',
      },
    };
  },
  methods: {
    setAddress() {
      if (this.$refs.address.validate()) {
        this.$store.commit('user/request', ['addressRegister', this.address]);
        this.$emit('pass');
      }
    },
  },
};
</script>

<style></style>
