<template>
  <a-layout>
    <a-layout-content style="padding: 64px 50px 0 50px">
      <div
        class="now-banner"
        :style="{
          'background-image':
            'url(' +
            require('./../../../assets/images/Background/back-ground.jpg') +
            ')',
        }"
      >
        <div class="container">
          <form-search></form-search>
        </div>
      </div>
      <div class="contain-main-home">
        <div class="container">
          <div class="main-right-home">
            <div class="user-get-local">
              <div class="row">
                <div class="col-auto">
                  <span class="txt-blue txt-bold">Đồ ăn</span>
                </div>
              </div>
            </div>
            <div class="now-list-restaurant">
              <div class="title-wrapper">
                <h2 class="title">Ưu đãi</h2>
                <a class="view-all-deal" href="/ha-noi/food/deals"
                  >Xem tất cả</a
                >
              </div>
              <div class="list-restaurant">
                <item
                  v-for="(d, index) in listRestaurant"
                  :key="index"
                  :data="d"
                ></item>
              </div>
              <div class="txt-center mt-2">
                <button class="btn-none btn-load-more link">
                  <span class="pr-1">Xem thêm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import FormSearch from "./Form.vue";
import Item from "../../../components/Cards/Item.vue";
import http from "./../../../http-common";

export default {
  components: {
    "form-search": FormSearch,
    item: Item,
  },
  data() {
    const listFoods = [];
    const listRestaurant = [];
    return {
      listFoods,
      listRestaurant
    };
  },
  methods: {
    fetchData() {
      http
        .get("/restaurant/list")
        .then((response) => {
          this.listRestaurant = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<style scoped>
.now-banner {
  height: 100vh;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 0;

  background-size: cover;
  overflow: hidden;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.now-banner .container {
  height: 100%;
  position: relative;
}
.contain-main-home .main-right-home {
  float: right;
  width: 670px;
  margin-top: 48px;
  position: relative;
  z-index: auto;
  margin-bottom: 75px;
  min-height: calc(100vh - 123px);
}

.main-right-home .now-list-restaurant {
  padding: 13px 40px 10px;
  border: 1px solid #d7d7d7;
  background-color: #fff;
}
.main-right-home .now-list-restaurant .list-restaurant {
    margin: 0 -8px;
}
.now-list-restaurant {
  border-radius: 6px;
  margin-bottom: 20px;
  position: relative;
}
.main-right-home .user-get-local {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 14px 17px 14px 40px;
  border-radius: 4px;
}
.main-right-home .user-get-local .pointer {
  cursor: pointer;
}
.txt-blue {
  color: #0288d1 !important;
}
.txt-bold {
  font-weight: 700 !important;
}
.col-auto {
  text-align: left;
}
.main-right-home .now-list-restaurant .item-restaurant {
    padding: 8px;
    width: 33.33333%;
}
.now-list-restaurant .title-wrapper {
  display: flex;
  justify-content: space-between;
}
.now-list-restaurant .title {
  font-size: 16px;
  font-weight: 700;
}
.view-all-deal {
  font-size: 14px;
  font-weight: 400;
  color: #0288d1;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  float: right;
}
.now-list-restaurant .list-restaurant {
  margin: 0 -8px;
  position: relative;
}
.link {
  cursor: pointer;
}
.btn-none {
  color: #0288d1;
  background-color: transparent;
  border: 0;
}
.mt-2 {
  margin-top: 0.5rem !important;
}
.txt-center {
  text-align: center !important;
}
</style>
