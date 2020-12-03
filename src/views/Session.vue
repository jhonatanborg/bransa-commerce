<template>
  <v-container>
    <v-row align="center" class="fill-height" justify="center">
      <v-col cols="12" sm="5">
        <v-card outlined class="pa-5">
          <Session />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Session from '@/components/user/session/Session';

export default {
  components: {
    Session,
  },
};
</script>

<style></style>
