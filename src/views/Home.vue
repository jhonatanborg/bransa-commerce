<template>
  <div class="home">
    <Carousel />
    <v-container>
      <Brands />
      <div>
        <!-- <Categories /> -->
      </div>
    </v-container>
    <div class="red lighten-1">
      <PrimeList />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Carousel from "@/components/carousel/Carousel.vue";
import Brands from "@/components/market/Brands.vue";
import PrimeList from "@/components/products/PrimeList.vue";
// import Categories from "@/components/categories/Categories.vue";

export default {
  name: "Home",
  components: {
    Carousel,
    Brands,
    PrimeList,
    // Categories,
  },
};
</script>
