<template>
  <div>
    <div class="d-flex justify-center  align-center">
      <v-card flat max-width="420px" class="fill-height pa-5">
        <v-window touchless v-model="step">
          <v-window-item :value="1">
            <Login @pass="setStep(3)" @first-access="setStep(5)" />
          </v-window-item>
          <v-window-item :value="2">
            <Register @address="setStep(4)" />
          </v-window-item>
          <v-window-item :value="3">
            <Pass @success="setStep(6)" />
          </v-window-item>
          <v-window-item :value="4">
            <Address @pass="setStep(3)" @return="setStep(2)" />
          </v-window-item>
          <v-window-item :value="5">
            <VerifyAccount @pass="setStep(3)" @register="setStep(2)" @login="setStep(1)" />
          </v-window-item>
          <v-window-item :value="6">
            <Success />
          </v-window-item>
        </v-window>
      </v-card>
    </div>
  </div>
</template>

<script>
import Login from '@/components/user/session/Login';
import Register from '@/components/user/session/Register';
import Pass from '@/components/user/session/Pass';
import Address from '@/components/user/session/Address';
import VerifyAccount from '@/components/user/session/VerifyAccount';
import Success from '@/components/user/session/SuccessRegister';

export default {
  components: {
    Login,
    Register,
    Pass,
    Address,
    VerifyAccount,
    Success,
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
    setStep(value) {
      this.step = value;
    },
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
