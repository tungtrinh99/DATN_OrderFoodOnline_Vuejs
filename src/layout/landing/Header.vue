<template>
  <a-layout class="header">
    <a-layout-header style="background: #fff">
      <div class="container header-wrapper">
        <div class="header-left">
          <div class="logo" @click="goHome">
            <img :src="require('@/assets/logo.png')" alt="" :style="{height:'48px'}"/>
          </div>
          <a-menu
            theme="light"
            mode="horizontal"
            :default-selected-keys="['quan-an']"
            :style="{ lineHeight: '64px', marginLeft: '24px' }"
          >
            <a-menu-item v-for="type in listTypeRestaurant" :key="type.code" @click="() => router(type)">
              {{ type.title }}
            </a-menu-item>
          </a-menu>
        </div>
        <div class="header-right">
          <div class="header-icon-search">
            <a-icon type="search" class="btn-search"/>
          </div>
          <div class="user-account">
            <a-button>Đăng nhập</a-button>
          </div>
        </div>
      </div>
    </a-layout-header>
  </a-layout>
</template>
<script>
import http from "../../http-common";
export default {
  data() {
    return {
      listTypeRestaurant: [],
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    getTypeRestaurant() {
      http
        .get("/restaurant/type")
        .then((response) => {
          this.listTypeRestaurant = response.data.data.items;
          
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    router(path) {
      this.$router.push({path: path.code});
    },
  },
  created() {
    this.getTypeRestaurant();
  },
};
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  width: "100%";
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
.header-wrapper {
  display: flex;
  justify-content: space-between;
}
.header-left {
  display: flex;
  justify-content: space-between;
}
.header-right {
  display: flex;
  justify-content: space-between;
}
.header-icon-search {
  margin-right: 24px;
}
.logo {
  cursor: pointer;
}
.ant-menu-item {
}
.ant-menu-item.ant-menu-item-selected {
  font-weight: 700;
}
.btn-search{
  font-size: 24px;
  cursor: pointer;
}
.header-icon-search{
  display: flex;
  align-items: center;
}
</style>
