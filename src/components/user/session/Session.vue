<template>
  <v-navigation-drawer
    right
    height="100%"
    app
    class="overflow-y-hidden"
    @input="eventSale"
    temporary
    :class="step == 4 ? 'teal accent-4' : 'white'"
    clipped
    :width="$vuetify.breakpoint.xsOnly ? '100%' : '500px'"
    :value="$store.state.user.login.open"
  >
    <v-row justify="end" align="center" class="mx-3">
      <v-col cols="auto">
        <v-btn
          @click="
            $store.commit('user/request', ['login', { open: false, step: 1 }])
          "
          outlined
          color="error lighten"
          >Fechar

          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <v-img
          v-if="step !== 4"
          contain
          width="150px"
          aspect-ratio="1.1"
          src="@/assets/logo-banner.png"
        ></v-img>
        <v-img
          v-else
          contain
          width="150px"
          aspect-ratio="1.1"
          src="@/assets/logo-banner.png"
        ></v-img>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="px-5" v-if="step !== 4">
      <v-col cols="auto">
        <v-btn
          depressed
          rounded
          :dark="step == 1 ? true : false"
          @click="step = 1"
          :color="step == 1 ? 'teal accent-4' : 'grey lighten-2'"
          >Login</v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-btn
          depressed
          :dark="step == 2 || 3 ? true : false"
          rounded
          @click="step = 2"
          :color="step == 2 ? 'teal accent-4' : 'grey lighten-2'"
          >Registrar</v-btn
        >
      </v-col>
    </v-row>
    <div class="d-flex justify-center  align-center">
      <v-card
        flat
        max-width="400px"
        class="fill-height"
        :color="step == 4 ? 'teal accent-4' : 'white'"
      >
        <v-window v-model="step">
          <v-window-item :value="1">
            <Login @forgot-pass="step = 5" />
          </v-window-item>
          <v-window-item :value="2">
            <Register @confirm="step = 3" />
          </v-window-item>
          <v-window-item :value="3">
            <Confirm @success-code="step = 4" />
          </v-window-item>
          <v-window-item :value="4"> <SuccessRegister /> </v-window-item>
          <v-window-item :value="5">
            <ForgotPass @success-forgot="step = 6" />
          </v-window-item>
          <v-window-item :value="6">
            <ConfirmForgot @success-forgot="step = 1" />
          </v-window-item>
        </v-window>
      </v-card>
    </div>
    <v-row class="text-center align-center justify-center">
      <v-col cols="8">
        <div>
          <span class="title">Bem vindo ao Sabor vital</span>
        </div>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
// import Mixins from "@/mixins/mixins.js";
import ClickOutside from "vue-click-outside";
import Login from "@/components/user/session/Login.vue";
import Register from "@/components/user/session/Register.vue";
import Confirm from "@/components/user/session/Confirm.vue";
import SuccessRegister from "@/components/user/session/SuccessRegister.vue";
import ForgotPass from "@/components/user/session/ForgotPass.vue";
import ConfirmForgot from "@/components/user/session/ConfirmForgot.vue";
export default {
  //   mixins: [Mixins],
  components: {
    Login,
    Register,
    Confirm,
    SuccessRegister,
    ForgotPass,
    ConfirmForgot,
  },
  data: () => ({
    step: 1,
    dialogPay: false,
    purchase: [],
    cupomValidate: null,
    cupom: null,
    discount_value: 0,
    successCupom: null,
    loadingCupom: false,
  }),
  methods: {
    eventSale(event) {
      this.$store.commit("user/request", ["login", { open: event, step: 1 }]);
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style>
a {
  text-decoration: none;
}

.barscroll::-webkit-scrollbar {
  width: 15px;
}

.barscroll::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.barscroll::-webkit-scrollbar-thumb {
  background: #ef354e;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.barscroll::-webkit-scrollbar-thumb:hover {
  background: black;
}
.pay-subtitle {
  color: #707070;
  font-weight: 400;
}
.title-cart {
  font-weight: 900;
  font-size: 18px;
  font-weight: 900;
}
</style>
