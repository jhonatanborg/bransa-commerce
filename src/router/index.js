import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/ListProducts';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/conta',
    name: 'session',
    component: () => import('../views/Session'),
  },
  {
    path: '/lista-de-produtos',
    name: 'list-products',
    component: () => import('../views/ListProducts'),
  },
  {
    path: '/minha-conta',
    name: 'my-account',
    component: () => import('../views/MyAccount'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
