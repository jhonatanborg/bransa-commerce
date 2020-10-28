<template>
  <v-container>
    <v-row align="center" class="fill-height" justify="center">
      <v-col cols="12" sm="5">
        <v-card outlined class="pa-5">
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
};
</script>

<style></style>
