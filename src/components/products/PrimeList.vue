<template>
  <div class="pa-5">
    <div class="text-center mt-5">
      <span class="section-title white--text">Últimas novidades: Galo e Renata </span>
    </div>
    <v-row justify="center">
      <v-col v-for="n in 4" :key="n" cols="12" sm="2">
        <v-card class="pa-5" flat raised color="white">
          <v-row justify="center">
            <v-avatar tile size="140">
              <v-img
                aspect-ratio="1.1"
                width="100%"
                src="https://images-unilever.ifcshop.com.br/produto/36045_0_20201014145646.jpg"
              >
              </v-img
            ></v-avatar>
            <div class="my-3">
              <div class="text-center">
                <span class="title-product">Sardinha Coqueiro Tomate 250g</span>
              </div>
              <div class="text-center"><span>R$ 50,00</span></div>
              <div class="mt-5">
                <v-btn block rounded depressed color="#FF2A4B" dark>Adicionar </v-btn>
              </div>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.section-title {
  font-size: 25px;
  font-family: 'Staatliches', cursive !important;
  color: #2f404e;
}
.title-product {
  font-size: 16px;
  font-family: 'Staatliches', cursive !important;
}
</style>
