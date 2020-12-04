<template>
  <v-container>
    <v-row align="center" class="fill-height" justify="center">
      <v-col cols="12" sm="5">
        <Session />
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
