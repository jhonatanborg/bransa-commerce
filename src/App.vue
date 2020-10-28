<template>
  <v-app id="app">
    <MenuBar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MenuBar from "@/components/shared/MenuBar";

export default {
  name: "App",

  components: {
    MenuBar,
  },

  data: () => ({
    //
  }),
};
</script>
<style>
#app {
  font-family: "Montserrat", sans-serif !important;
  background-color: #f9f9f9 !important;
}
</style>
