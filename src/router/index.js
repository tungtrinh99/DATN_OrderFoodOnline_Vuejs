import Vue from "vue";
import Router from "vue-router";
import Index from "@/layout/landing/Index.vue";
import Home from "@/pages/landing/home/Home.vue";
import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import Dashboard from "@/pages/admin/dashboard/Dashboard.vue";
import Goods from "@/pages/admin/goods/List.vue";
import RestaurantDetail from "@/pages/Landing/Restaurant/Index.vue";
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
          path: "detail-restaurant",
          name: "Chi tiết món",
          component: RestaurantDetail,
          meta: {
            auth: true
          }
        }
      ]
    },
    {
      path: "/admin",
      component: DashboardLayout,
      redirect: "admin/dashboard",
      meta: {
        auth: true
      },
      children: [
        {
          path: "dashboard",
          title: "Tổng quan",
          component: Dashboard,
          meta: {
            auth: true
          }
        },
        {
          path: "food",
          title: "Đồ ăn",
          component: Goods,
          meta: {
            auth: true,
          },
        },
      ]
    }
  ]
});
