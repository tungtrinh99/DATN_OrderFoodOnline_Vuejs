<template>
  <a-layout class="header">
    <a-layout-header style="background : #fff">
      <div class="container header-wrapper">
        <div class="header-left">
          <div class="logo">
            <img :src="require('../assets/logo.png')" alt="" />
          </div>
          <a-menu
            theme="light"
            mode="horizontal"
            :default-selected-keys="['2']"
            :style="{ lineHeight: '64px', marginLeft: '24px' }"
          >
            <a-menu-item key="1">
              Đồ ăn
            </a-menu-item>
            <a-menu-item key="2">
              Bia
            </a-menu-item>
            <a-menu-item key="3">
              Thực phẩm
            </a-menu-item>
            <a-menu-item key="4">
              Trà sữa
            </a-menu-item>
          </a-menu>
        </div>
        <div class="header-right">
          <div class="header-icon-search">
            <a-button shape="circle" icon="search" />
          </div>
          <div class="user-account">
            <a-button>Đăng nhập</a-button>
          </div>
        </div>
      </div>
    </a-layout-header>
  </a-layout>
</template>
<style scoped>
.header {
  position: "fixed";
  z-index: 1;
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
</style>
