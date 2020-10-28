<template>
  <v-row>
    <v-col sm="4">
      <div class="section-title"><span>Escolha por categoria</span></div>
    </v-col>
    <v-col sm="8">
      <v-row>
        <v-col v-for="n in 15" cols="3" :key="n">
          <v-card class="pa-5" max-width="100px">
            <v-avatar tile size="120">
              <v-img
                aspect-ratio="1.1"
                src="https://www.maiscarnesuina.com.br/wp-content/uploads/2018/03/nutribras-alimentos.jpg"
              >
              </v-img
            ></v-avatar>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
.section-title {
  font-size: 25px;
  font-family: "Staatliches", cursive !important;
  color: #2f404e;
}
</style>
