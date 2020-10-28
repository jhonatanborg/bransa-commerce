import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/conta",
    name: "session",
    component: () => import("../views/Session.vue"),
    children: [
      {
        path: "/",
        name: "login",
        component: () => import("../components/user/session/Login.vue"),
      },
      {
        path: "/verificar-conta",
        name: "verify-account",
        component: () => import("../components/user/session/VerifyAccount.vue"),
      },
      {
        path: "/cadastro",
        name: "register",
        component: () => import("../components/user/session/Register.vue"),
      },
    ],
  },
  {
    path: "/lista-de-produtos",
    name: "list-products",
    component: () => import("../views/ListProducts.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
