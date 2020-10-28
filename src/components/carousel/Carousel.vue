<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <v-img
          width="100%"
          height="400px"
          src="https://www.casapark.com.br/wp-content/uploads/2018/12/caravana-coca-cola-banner-interno_v2.jpg"
        >
        </v-img>
      </swiper-slide>
      <swiper-slide>
        <v-img
          width="100%"
          height="400px"
          src="https://www.sadia.com.br/sites/all/themes/brf_portalsadia/share.jpg"
        >
        </v-img>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        // Some Swiper option/callback...
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
};
</script>

<style></style>
