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
import Carousel from '@/components/carousel/Carousel';
import Brands from '@/components/market/Brands';
import PrimeList from '@/components/products/PrimeList';
// import Categories from "@/components/categories/Categories";

export default {
  name: 'Home',
  components: {
    Carousel,
    Brands,
    PrimeList,
    // Categories,
  },
};
</script>
