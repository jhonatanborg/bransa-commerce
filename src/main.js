import Vue from 'vue';
import App from './App';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import 'swiper/swiper-bundle.css';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
