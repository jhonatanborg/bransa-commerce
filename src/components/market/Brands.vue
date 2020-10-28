<template>
  <div id="brands my-5">
    <div class="text-center mt-5">
      <span class="section-title">As melhores marcas estão no Bransa</span>
    </div>
    <div></div>
    <swiper class="swiper my-5" :options="swiperOption">
      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://logodownload.org/wp-content/uploads/2014/04/coca-cola-logo-4.png"
            >
            </v-img
          ></v-avatar>
        </v-card>
      </swiper-slide>
      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://dydyo.com.br/site/data/uploads/2019/11/dydyoredondo@4x.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://www.maiscarnesuina.com.br/wp-content/uploads/2018/03/nutribras-alimentos.jpg"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://logospng.org/download/sadia/logo-sadia-vermelha-512.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://images-unilever.ifcshop.com.br/marca/100885_20200825152032.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://jbs.com.br/wp-content/uploads/2019/08/logo_seara_interna.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://www.auroraalimentos.com.br/img/logo-aurora.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>
      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://logodownload.org/wp-content/uploads/2014/04/coca-cola-logo-4.png"
            >
            </v-img
          ></v-avatar>
        </v-card>
      </swiper-slide>
      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://dydyo.com.br/site/data/uploads/2019/11/dydyoredondo@4x.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://www.maiscarnesuina.com.br/wp-content/uploads/2018/03/nutribras-alimentos.jpg"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://logospng.org/download/sadia/logo-sadia-vermelha-512.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://images-unilever.ifcshop.com.br/marca/100885_20200825152032.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://jbs.com.br/wp-content/uploads/2019/08/logo_seara_interna.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>

      <swiper-slide>
        <v-card class="pa-5" max-width="100px">
          <v-avatar tile size="100">
            <v-img
              aspect-ratio="1.1"
              src="https://www.auroraalimentos.com.br/img/logo-aurora.png"
            >
            </v-img
          ></v-avatar> </v-card
      ></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 7,
        spaceBetween: 5,
        centeredSlides: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
};
</script>

<style>
#brands {
  font-family: "Staatliches", cursive !important;
}
.section-title {
  font-size: 25px;
  font-family: "Staatliches", cursive !important;
  color: #2f404e;
}
</style>
