import Vue from "vue";
import Router from "vue-router";
import Index from "@/layout/landing/Index.vue";
import Home from "@/pages/Home/Home.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Index,
      redirect: "home",
      meta: {
        auth: true
      },
      children: [
        {
          path: "home",
          name: "Trang chủ",
          component: Home,
          meta: {
            auth: true
          }
        },
        {
          path: "admin",
          name: "Trang chủ",
          component: Home,
          meta: {
            auth: true
          }
        }
      ]
    }
  ]
});
