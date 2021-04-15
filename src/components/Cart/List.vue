<template>
  <div class="cart">
    <a-list class="list-item" item-layout="horizontal" :data-source="cartData">
      <div slot="header" class="cart-header">
        <h3>Chi tiết đơn hàng</h3>
        <div class="user">
          <div>
            <a-avatar icon="user" />
            <span>Xuân Tùng</span>
          </div>
          <span>{{ cartData.length }} món</span>
        </div>
      </div>
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-list-item-meta description="">
          <a slot="title">{{ item.title }}</a>
          <!-- <a-avatar
            slot="avatar"
            :src="require('../../../public/images/' + item.avatar_id)"
          /> -->
        </a-list-item-meta>
        <div class="cost">
          <span
            >{{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat((item.cost * item.discount) / 100).toFixed(0)
              )
            }}đ</span
          >
          <span>x {{ item.quantity }}</span>
        </div>
      </a-list-item>
      <div slot="footer">
        <div class="bill">
          <span>Tổng cộng</span>
          <span
            >{{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat(cost).toFixed(0)
              )
            }}đ</span
          >
        </div>
        <a-button type="danger" style="width: 100%">Đặt hàng</a-button>
      </div>
    </a-list>
  </div>
</template>
<script>
import EventBus from "../../event-bus";
export default {
  props: {
    id: {
      type: Number,
      default: "",
    },
  },
  data() {
    return {
      cartData: [],
      key: 0,
      cost : 0
    };
  },
  methods: {
    fetchData() {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      this.cartData = JSON.parse(localStorage.getItem("cart"));
      this.cartData.forEach((d)=>{
        return this.cost += (d.quantity * d.cost * d.discount)/100
      })
    },
    reload() {
      this.fetchData()
    },
  },
  created: function () {
    EventBus.$on("reload", this.reload);
  },
  destroyed() {
    EventBus.$off("reload", this.reload);
  },
  beforeMount() {
    this.fetchData();
  },
};
</script>
<style scoped>
.ant-list-item-meta-title {
  margin-bottom: 0px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 11px;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
}
.cost {
  display: flex;
  flex-direction: column;
}
.cost span {
  font-size: 13px;
}
.cart-header h3 {
  font-size: 14px;
  font-weight: 700;
  text-align: left;
}
.cart {
  padding: 8px 16px;
  background-color: #fff;
}
.user {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user span:nth-child(2) {
  font-weight: 700;
  margin-left: 8px;
  color: #000;
}
.bill{
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: 8px 0;
}
.bill span:nth-child(2){
  color: #0288d1;
  font-weight: 700;
}
</style>