<template>
  <div class="home-search">
    <div>
      <h1 class="title">Đặt Đồ ăn, giao hàng từ 20'...</h1>
      <div class="local">
        có {{ formData.length }} địa điểm ở Hà Nội từ 00:00 - 23:59
      </div>
    </div>
    <div class="form-search">
      <common-select></common-select>
    </div>
    <div class="category-list-filter">
      <a v-for="type in listTypeFood" href=""
        ><span class="category-item">{{ type.title }}</span>
      </a>
    </div>
    <div>
      <div class="form-bottom">
        Sử dụng Website Xuân Tùng để có nhiều giảm giá <br />và trải nghiệm tốt
        hơn
      </div>
    </div>
  </div>
</template>
<script>
import http from "../../../http-common";
import CommonSelect from "../../../components/Select/CommonSelect"
export default {
  components:{
    "common-select": CommonSelect
  },
  data() {
    return {
      listRestaurant: [],
      listTypeFood: [],
    };
  },
  props:{
    formData : Array
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    getListTypeRestaurant() {
      http
        .get("/food/type")
        .then((response) => {
          this.listTypeFood = response.data.data.items;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
  },
  created() {
    this.getListTypeRestaurant();
  },
};
</script>
<style scoped>
.home-search {
  color: #fff;
  width: 470px;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  margin-top: -30px;
  text-align: left;
}
.home-search .title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #fff;
  text-align: left;
}
.home-search .local {
  font-size: 15px;
  text-transform: capitalize;
}
.home-search .form-search {
  padding: 27px 0 40px;
  position: relative;
}
.category-list-filter > a {
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 15px;
}
.category-list-filter .category-item {
  font-size: 16px;
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
  padding: 7px 21px;
  border-radius: 6px;
  border: 1px solid;
  display: inline-block;
  transition: all 0.3s ease;
}
.category-list-filter .category-item:hover {
  text-decoration: none;
  color: #252525;
  background-color: #fff;
  border-color: #fff;
}
.form-bottom {
  font-size: 18px !important;
  margin: 16px 0 8px 0;
}
</style>
