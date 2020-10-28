<template>
  <v-app-bar color="white" app id="app-bar" flat height="90px">
    <div class="d-flex justify-center align-center">
      <div>
        <v-avatar tile size="50">
          <v-img width="100%" src="@/assets/images/online.svg"></v-img
        ></v-avatar>
      </div>
      <div>
        <span class="title-company">Bransa</span>
      </div>
    </div>

    <v-spacer></v-spacer>
    <div class="hidden-sm-and-down mr-3">
      <v-btn
        class="text-capitalize"
        rounded
        large
        dense
        :to="{ name: 'login' }"
        text
        >Iniciar sessão
      </v-btn>

      <v-btn
        class="text-capitalize"
        large
        rounded
        dense
        :to="{ name: 'list-products' }"
        text
        >Produtos
      </v-btn>
    </div>
    <div class="hidden-sm-and-down">
      <v-btn
        large
        depressed
        color="#FF2A4B"
        dark
        class="text-capitalize"
        rounded
      >
        <v-icon class="mr-2">mdi-basket-outline</v-icon>Carrinho
        <b class="notify">1</b>
      </v-btn>
    </div>

    <div v-if="$vuetify.breakpoint.smAndDown">
      <v-icon color="black">mdi-menu</v-icon>
    </div>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
.title-company {
  font-weight: 900;
  font-size: 20px;
}
</style>
