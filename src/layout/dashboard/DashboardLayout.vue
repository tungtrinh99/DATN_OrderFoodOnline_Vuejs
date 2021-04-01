<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-header class="header" v-if="displayType.STAFF == role">
      <div class="logo" />
      <top-navbar />
    </a-layout-header>
    <a-layout-header class="header" style="position:fixed;left:0;right:0;z-index:1" v-else>
      <div class="logo" />
      <top-navbar />
    </a-layout-header>
    <a-layout v-if="displayType.STAFF == role" >
      <a-layout-sider v-model="collapsed" collapsible >
        <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
          <template >
            <a-sub-menu v-for="menu in staffMenu" :key="menu.key">
              <span slot="title"
                ><a-icon :type="menu.icon" /><span>{{ menu.title }}</span></span
              >
              <a-menu-item v-for="child in menu.children" :key="child.key">
                <router-link class="btn btn-primary" :to="child.path">{{
                  child.title
                }}</router-link>
              </a-menu-item>
            </a-sub-menu>
          </template>
          
        </a-menu>
      </a-layout-sider>
      <a-layout style="">
        <a-layout-content
          :style="{ background: '#fff', margin: 0, minHeight: '280px' }"
        >
          <dashboard-content></dashboard-content>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout v-else  >
      
      <a-layout style="">
        <a-layout-content
          :style="{ background: '#fff', margin: 0, minHeight: '280px' , marginTop:'64px'}"
        >
          <dashboard-content></dashboard-content>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import TopNavBar from "./TopNavbar.vue";
import Content from "./Content";
import Constant from './../../../assets/js/commom/constant'

export default {
  components: {
    "top-navbar": TopNavBar,
    "dashboard-content": Content
  },
  data() {
    var  displayType = Constant.displayType;
    var role = localStorage.getItem('logged-in');
    return {
      displayType,
      role,
      collapsed: false,
      staffMenu: [
        {
          key: "overview",
          icon: "pie-chart",
          title: "Tổng quan",
          children: [
            {
              key: "calendar",
              title: "Lịch biểu",
              path: "dashboard"
            }
          ]
        },
        {
          key: "goods",
          icon: "dropbox",
          title: "Hàng hóa",
          children: [
            {
              key: "all-goods",
              title: "Tất cả hàng hóa",
              path: "goods"
            },
            {
              key: "brands",
              title: "Thương hiệu",
              path: "brands"
            }
          ]
        },
        {
          key: "user",
          icon: "user",
          title: "Người dùng",
          children: [
            {
              key: "customer",
              title: "Khách hàng",
              path: "customers"
            },
            {
              key: "staff",
              title: "Nhân viên",
              path: "staff"
            }
          ]
        },
        {
          key: "order",
          icon: "read",
          title: "Đơn hàng",
          children: [
            {
              key: "sale-order",
              title: "Đơn hàng bán",
              path: "order"
            },
            {
              key: "import-order",
              title: "Đơn hàng nhập",
              path: ""
            }
          ]
        }
      ],
      customerMenu : [
        {
          key: "overview",
          icon: "pie-chart",
          title: "Tổng quan",
          children: [
            {
              key: "calendar",
              title: "Lịch biểu",
              path: "dashboard-client"
            }
          ]
        },
        {
          key: "goods-client",
          icon: "dropbox",
          title: "Hàng hóa",
          children: [
            {
              key: "all-goods-client",
              title: "Tất cả hàng hóa",
              path: "goods-client"
            }
          ]
        },
        {
          key: "order-client",
          icon: "read",
          title: "Đơn hàng",
          children: [
            {
              key: "sale-order-client",
              title: "Đơn hàng mua",
              path: "order-client"
            },
            
          ]
        }
      ]
    };
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 10px !important;
}
</style>
