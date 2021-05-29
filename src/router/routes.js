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
import Order from "@/pages/admin/Order/List.vue";
import LoginPage from "@/pages/client/Login/Form.vue";
import RegisterPage from "@/pages/client/Register/Form.vue";
import LoginDashboard from "@/pages/admin/Login/Form.vue";
import OrderRestaurant from "@/pages/Merchant/Order/List.vue";
import FoodRestaurant from "@/pages/Merchant/Goods/List.vue";
import LoginMerchant from "@/pages/Merchant/Login/Form.vue";
import MerchantDashboardLayout from "@/layout/Merchant/DashboardLayout.vue";
import DashboardMerchant from "@/pages/merchant/Dashboard/Dashboard.vue";

const appName = " | Nghiện ăn";

const routes = [{
    path: "/",
    component: Index,
    redirect: "home",
    children: [{
        path: "home",
        name: "Trang chủ",
        component: Home,
        meta : {
          title : 'Trang chủ' + appName
        }
      },
      {
        path: "detail-restaurant",
        name: "Chi tiết món",
        component: RestaurantDetail,
        meta : {
          title : 'Quán ăn' + appName
        }
      },
      {
        path: "register",
        name: "Đăng kí",
        component: RegisterPage,
        meta : {
          title : 'Đăng kí' + appName
        }

      },
      {
        path: "/login",
        name: "Đăng nhập",
        component: LoginPage,
        meta : {
          title : 'Đăng nhập' + appName
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
          auth: true,
          title : 'Tổng quan' +appName
        }
      },
      {
        path: "food",
        title: "Món ăn",
        component: Goods,
        meta: {
          auth: true,
          title : 'Món ăn' +appName
        },
      },
      {
        path: "customer",
        title: "Khách hàng",
        component: Customer,
        meta: {
          auth: true,
          title : 'Khách hàng' +appName
        },
      },
      {
        path: "merchant",
        title: "Đối tác",
        component: Merchant,
        meta: {
          auth: true,
          title : 'Đối tác' +appName
        },
      },
      {
        path: "restaurant",
        title: "Quán ăn",
        component: Restaurant,
        meta: {
          auth: true,
          title : 'Quán ăn' +appName
        },
      }, {
        path: "location",
        title: "Địa điểm",
        component: Location,
        meta: {
          auth: true,
          title : 'Địa điểm' +appName
        },
      },
      {
        path: "order",
        title: "Đơn hàng",
        component: Order,
        meta: {
          auth: true,
          title : 'Đơn hàng' +appName
        },
      },

    ]
  },

  {
    path: "/admin/login",
    name: "Đăng nhập quản lý",
    component: LoginDashboard,
    meta: {
      auth: false,
      title: "Đăng nhập",
    },
  },
  {
    path: "/merchant/login",
    name: "Đăng nhập đối tác",
    component: LoginMerchant,
    meta: {
      authMerchant: false,
      title: "Đăng nhập" + appName,
    },
  },
  {
    path: "/merchant",
    component: MerchantDashboardLayout,
    redirect: "merchant/order",
    meta: {
      auth: true,

    },
    children: [{
        path: "order",
        title: "Đơn hàng",
        component: OrderRestaurant,
        meta: {
          authMerchant: true,
          title: "Đơn hàng" + appName,

        }
      },{
        path: "food",
        title: "Món ăn",
        component: FoodRestaurant,
        meta: {
          authMerchant: true,
          title: "Món ăn" + appName,

        }
      },
      {
        path: "dashboard",
        title: "Tổng quan",
        component: DashboardMerchant,
        meta: {
          authMerchant: true,
          title: "Tổng quan" + appName,

        }
      }
    ]
    }
]
export default routes;
