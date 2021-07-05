<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-header class="header">
      <div class="logo" />
      <top-navbar />
    </a-layout-header>

    <a-layout>
      <a-layout-sider v-model="collapsed" collapsible>
        <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
          <template>
            <a-sub-menu v-for="menu in adminMenu" :key="menu.key">
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
  </a-layout>
</template>
<script>
import TopNavBar from "./TopNavbar.vue";
import Content from "./Content";

export default {
  components: {
    "top-navbar": TopNavBar,
    "dashboard-content": Content
  },
  data() {
    return {
      collapsed: false,

      adminMenu: [
        {
          key: "overview",
          icon: "pie-chart",
          title: "Tổng quan",
          children: [
            {
              key: "calendar",
              title: "Tổng quan",
              path: "dashboard"
            }
          ]
        },
        {
          key: "manage",
          icon: "dropbox",
          title: "Quản lý",
          children: [
            {
              key: "food",
              title: "Món ăn",
              path: "food"
            },
            {
              key: "location",
              title: "Địa chỉ",
              path: "location"
            }
          ]
        },
        {
          key: "order",
          icon: "read",
          title: "Đơn hàng",
          children: [
            {
              key: "order",
              title: "Đơn hàng",
              path: "order"
            },{
              key: "lading-bill",
              title: "Vận đơn",
              path: "lading-bill"
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
              path: "customer"
            },
            {
              key: "merchant",
              title: "Đối tác",
              path: "merchant"
            }
          ]
        },
        {
          key: "restaurant",
          icon: "bank",
          title: "Quán ăn",
          children: [
            {
              key: "restaurant",
              title: "Danh sách quán ăn",
              path: "restaurant"
            },
            {
              key: "discount",
              title: "Ưu đãi",
              path: "discount-code"
            }
            ,
            {
              key: "combo",
              title: "Combo đồ ăn",
              path: "restaurant-combo"
            }
          ]
        },
        // {
        //   key: "report",
        //   icon: "file-text",
        //   title: "Báo cáo",
        //   children: [
        //     {
        //       key: "report",
        //       title: "Báo cáo doanh thu",
        //       path: "report-revenue"
        //     }
        //   ]
        // }
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
