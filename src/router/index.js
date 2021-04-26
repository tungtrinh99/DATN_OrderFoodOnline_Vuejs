import Vue from "vue";
import Router from "vue-router";
import Index from "@/layout/Client/Index.vue";
import Home from "@/pages/Client/home/Home.vue";
import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import Dashboard from "@/pages/admin/Dashboard/Dashboard.vue";
import Goods from "@/pages/admin/Goods/List.vue";
import RestaurantDetail from "@/pages/Client/Restaurant/Index.vue";
import Customer from "@/pages/admin/Customer/List.vue";
import Merchant from "@/pages/admin/Merchant/List.vue";
import Restaurant from "@/pages/admin/Restaurant/List.vue";
import Location from "@/pages/admin/Location/List.vue";
import LoginPage from "@/pages/client/Login/Form.vue";
import RegisterPage from "@/pages/client/Register/Form.vue"
Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      component: Index,
      redirect: "home",
      meta: {
        auth: true
      },
      children: [{
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
      children: [{
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
        {
          path: "customer",
          title: "Khách hàng",
          component: Customer,
          meta: {
            auth: true,
          },
        },
        {
          path: "merchant",
          title: "Chủ quán",
          component: Merchant,
          meta: {
            auth: true,
          },
        },
        {
          path: "restaurant",
          title: "Quán ăn",
          component: Restaurant,
          meta: {
            auth: true,
          },
        }, {
          path: "location",
          title: "Địa điểm",
          component: Location,
          meta: {
            auth: true,
          },
        },
      ]
    },
    {
      path: "/",
      component: Index,
      redirect: "login",
      children: [{
        path: "login",
        name: "Đăng nhập",
        component: LoginPage,

      }, ]
    },
    {
      path: "/",
      component: Index,
      redirect: "register",
      children: [{
        path: "register",
        name: "Đăng kí",
        component: RegisterPage,

      }, ]
    }
  ]
});
