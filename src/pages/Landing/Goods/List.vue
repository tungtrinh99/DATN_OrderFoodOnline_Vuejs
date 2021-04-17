<template>
  <div class="menu-restaurant">
    <a-input-search
      placeholder="Tìm món"
      style="width: 100%"
      @search="onSearch"
    />
    <a-spin v-if="foodData.length == 0" tip="Đang tải..."></a-spin>
    <a-list
      class="menu-restaurant-list"
      item-layout="horizontal"
      :data-source="foodData"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions">
          <a-button type="danger" @click="addToCart(index)">
            <a-icon type="plus" />
          </a-button>
        </a>
        <a-list-item-meta description="">
          <a slot="title">{{ item.title }}</a>
          <a-avatar
            slot="avatar"
            :src="require('../../../../public/images/' + item.avatar_id)"
          />
        </a-list-item-meta>
        <div class="cost">
          <span
            >{{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat(item.cost).toFixed(0)
              )
            }}đ</span
          >
          <span
            >{{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat(item.cost-(item.cost * item.discount) / 100).toFixed(0)
              )
            }}đ</span
          >
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import http from "../../../http-common";
import EventBus from "../../../event-bus";
export default {
  props: {
    id : Number
  },
  data() {
    return {
      foodData: [],
      cartData: [],
      previewVisible: false,
      previewImage: "",
      keyword: "",
    };
  },
  methods: {
    fetchData() {
      http
        .get("/restaurant-food/list", {
          params: {
            id: this.id,
            keyword: this.keyword,
          },
        })
        .then((response) => {
          this.foodData = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(index,item) {
      this.previewImage = this.foodData[index].avatar_id;
      this.previewVisible = true;
    },
    addToCart(index) {
      if(!localStorage.getItem("cart")){
        localStorage.setItem("cart", JSON.stringify([]));
      }
      this.cartData = JSON.parse(localStorage.getItem("cart"));
      let data = Object.assign({ quantity: 1 }, this.foodData[index]);
      let ind =  this.cartData.findIndex(d=>d.id === data.id);
      console.log(ind);
      if(ind >= 0 ){
        this.cartData[ind].quantity += data.quantity;
      }else if(ind ===  -1) {
        this.cartData.push(data);
      }else {
        this.cartData.push(data);

      }
      localStorage.setItem("cart", JSON.stringify(this.cartData));
      EventBus.$emit("reload");
    },
    onSearch(value) {
      this.keyword = value;
      this.fetchData();
    },
  },
  created: function () {
    this.fetchData();
  },
};
</script>
<style scoped>
.cost {
  display: flex;
  flex-direction: column;
}
.cost > span:nth-child(1) {
  text-decoration: line-through;
}
.cost > span:nth-child(2) {
  font-size: 16px;
  font-weight: 700;
  color: #0288d1;
}
.ant-list-item-meta-title {
  font-size: 16px;
  font-weight: 700;
  color: #0288d1;
  text-align: left;
  padding-left: 16px;
  margin-bottom: 0;
}
.ant-input-search.ant-input-affix-wrapper {
  margin-bottom: 16px;
}
.menu-restaurant{
  padding : 8px 16px;
  background-color: #fff;
}
.ant-btn.ant-btn-danger{
  padding : 0 4px;
  height: 24px;
}
.ant-input-search.ant-input-affix-wrapper{
  margin-top:12px
}
.ant-avatar{
  width: 48px;
  height: 48px;
}
.ant-list-item-meta{
  align-items: center;
}
</style>