<template>
  <v-toolbar id="app-bar" flat hide-on-scroll>
    <v-btn dense :to="'/'" :ripple="false" text><b>Bransa</b></v-btn>
    <v-spacer></v-spacer>
    <div class="hidden-sm-and-down" dense>
      <v-btn class="mr-3" rounded>
        <v-icon class="mr-2">mdi-basket-outline</v-icon>Carrinho
        <b class="notify">1</b>
      </v-btn>
    </div>
    <div class="hidden-sm-and-down mr-3">
      <div>
        <v-btn rounded large dense :to="{ name: 'session' }" text
          >Iniciar sessão
        </v-btn>
      </div>
    </div>
    <div v-if="$vuetify.breakpoint.smAndDown">
      <v-icon color="black">mdi-menu</v-icon>
    </div>
  </v-toolbar></template
>

<script>
export default {};
</script>

<style></style>
