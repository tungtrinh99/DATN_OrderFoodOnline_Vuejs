<template>
  <div class="content">
    <div class="detail-restaurant">
      <div class="container">
        <a-row>
          <a-col :span="10">
            <img
              class="detail-restaurant-img"
              :src="
                require(`../../../../public/images/${Object.keys(formData).length !== 0 ? formData.avatar_id : '3eae291f-bf6d-41f8-a8b8-eb41cfaecece.jpg'}`)
              "
            />
          </a-col>
          <a-col :span="1"></a-col>
          <a-col :span="13">
            <div class="detail-restaurant-info">
              <a-breadcrumb>
                <a-breadcrumb-item href="/">
                  <a-icon type="home" @click="backHome" />
                  <span @click="backHome">Home</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                  {{ formData.title }}
                </a-breadcrumb-item>
              </a-breadcrumb>
              <div class="name-restaurant">
                <h1>{{ formData.title }}</h1>
              </div>
              <div class="address-restaurant">
                <span>{{ formData.full_address }}</span>
              </div>
              <div class="status-restaurant">
                <div class="opentime-status">
                  <span>Mở cửa</span>
                </div>
                <div class="time">
                  <a-icon type="clock-circle" />
                  <span>{{ formData.opentime }}</span> -
                  <span>{{ formData.closetime }}</span>
                </div>
              </div>
              <div class="cost-restaurant">
                <span><a-icon type="dollar" /> 20,000 - 45,000</span>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="menu-restaurant container">
      <a-row>
        <a-col :span="15">
          <list-food :id="id"></list-food>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="8" :style="{position :'sticky',top:'64px'}">
          <cart :restaurantData = "formData"
                :discountCodeData = "discountCodeList"
          ></cart>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import ListFood from "../Goods/List";
import Cart from "../../../components/Cart/List";
import http from "../../../http-common";
export default {
  data() {
    return {
      id: null,
      formData: {},
      discountCodeList : []
    };
  },
  components: {
    "list-food": ListFood,
    Cart,
  },
  methods: {
    backHome() {
      this.$router.push("/home");
    },
    fetchData() {
      http
        .get("/restaurant/detail", {
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          this.formData = response.data.data.items[0];
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    getDiscountCode(){
       http
        .get("/restaurant-discount/list", {
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          this.discountCodeList = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    }
    
  },
  created() {
    this.id = JSON.parse(localStorage.getItem("restaurant_id"));
    this.fetchData();
    this.getDiscountCode();
  },
};
</script>
<style scoped>
.content {
  background-color: #f2f2f2;
  padding-top: 64px;
}
.detail-restaurant {
  background-color: #fff;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.detail-restaurant {
  padding-top: 30px;
  padding-bottom: 80px;
}
.menu-restaurant.container {
  margin-top: 50px;
}
.detail-restaurant-img {
  width: 100%;
}
.detail-restaurant-info {
  text-align: left;
}
.status-restaurant {
  display: flex;
}
.opentime-status > span {
  color: #6cc942;
}
.opentime-status > span::before {
  content: "";
  border-radius: 50%;
  cursor: pointer;
  width: 8px;
  height: 8px;
  display: inline-block;
  position: relative;
  top: -1px;
  z-index: 2;
  background-color: #6cc942;
  margin-right: 5px;
}
.time {
  padding-left: 8px;
}
.cost-restaurant {
  color: #959595;
  font-size: 15px;
}
.name-restaurant > h1 {
  font-size: 22px;
  color: #464646;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 4px;
  line-height: 33px;
}
.address-restaurant > span {
  font-size: 13px;
  margin-bottom: 2px;
}
.status-restaurant  {
margin-bottom : 6px
}
</style>