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
import DashboardMerchant from "@/pages/merchant/Dashboard/Dashboard.vue"
const routes = [{
    path: "/",
    component: Index,
    redirect: "home",
    children: [{
        path: "home",
        name: "Trang chủ",
        component: Home,

      },
      {
        path: "detail-restaurant",
        name: "Chi tiết món",
        component: RestaurantDetail,

      },
      {
        path: "register",
        name: "Đăng kí",
        component: RegisterPage,


      },
      {
        path: "/login",
        name: "Đăng nhập",
        component: LoginPage,


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
      {
        path: "order",
        title: "Đơn hàng",
        component: Order,
        meta: {
          auth: true,
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
      title: "Đăng nhập",
    },
  },
  {
    path: "/merchant",
    component: MerchantDashboardLayout,
    redirect: "merchant/order",
    meta: {
      auth: true
    },
    children: [{
        path: "order",
        title: "Đơn hàng",
        component: OrderRestaurant,
        meta: {
          authMerchant: true
        }
      },{
        path: "food",
        title: "Đồ ăn",
        component: FoodRestaurant,
        meta: {
          authMerchant: true
        }
      },
      {
        path: "dashboard",
        title: "Tổng quan",
        component: DashboardMerchant,
        meta: {
          authMerchant: true
        }
      }
    ]
    }
]
export default routes;
