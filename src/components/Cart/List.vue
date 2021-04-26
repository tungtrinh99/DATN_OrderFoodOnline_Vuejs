<template>
  <div class="cart">
    <a-list class="list-item" item-layout="horizontal" :data-source="cartData">
      <div slot="header" class="cart-header">
        <h3>Chi tiết đơn hàng</h3>

        <div class="user">
          <span
            >Đơn hàng tạo bởi
            <span style="color: #0288d1">{{
              formData ? formData.fullname : ""
            }}</span></span
          >
          <span>{{ cartData.length }} món</span>
        </div>
      </div>
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-list-item-meta description="">
          <a slot="title">
            {{ item.title }}
          </a>
        </a-list-item-meta>
        <div class="cost">
          <span
            >{{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat(
                  item.cost - (item.cost * item.discount) / 100
                ).toFixed(0)
              )
            }}đ</span
          >
          <div class="quantity-wrapper">
            <a-button @click="minusItemInCart(index)"
              ><a-icon type="minus"
            /></a-button>
            <span>{{ item.quantity }}</span>
            <a-button @click="plusItemInCart(index)"
              ><a-icon type="plus"
            /></a-button>
          </div>
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
        <a-button type="danger" style="width: 100%">
          <a-icon type="check-circle" theme="filled" /> Đặt hàng</a-button
        >
      </div>
    </a-list>
  </div>
</template>
<script>
import EventBus from "../../event-bus";
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      cartData: [],
      key: 0,
      cost: 0,
      formData: {},
    };
  },
  methods: {
    fetchData() {
      this.cost = 0;
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      this.formData = JSON.parse(localStorage.getItem("user"));

      this.cartData = JSON.parse(localStorage.getItem("cart"));
      this.cartData.forEach((d) => {
        return (this.cost +=
          d.quantity * (d.cost - (d.cost * d.discount) / 100));
      });
    },
    reload() {
      this.fetchData();
    },
    minusItemInCart(index) {
      if (this.cartData[index].quantity > 1) {
        this.cartData[index].quantity -= 1;
      } else {
        this.cartData.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(this.cartData));
      this.reload();
    },
    plusItemInCart(index) {
      this.cartData[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(this.cartData));
      this.reload();
    },
    getUserInfo() {
      this.formData = JSON.parse(localStorage.getItem("user"));
    },
  },
  created: function () {
    EventBus.$on("reload", this.reload);
    EventBus.$on("getItemCart", this.fetchData);
  },
  destroyed() {
    EventBus.$off("reload", this.reload);
    EventBus.$off("getItemCart", this.fetchData);
  },
  mounted() {
    this.getUserInfo();
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
  margin-bottom: 8px;
}
.user > span:nth-child(1) {
  font-style: italic;
  text-align: left;
  font-size: 11px;
  display: block;
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
.bill {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: 8px 0;
}
.bill span:nth-child(2) {
  color: #0288d1;
  font-weight: 700;
}
.quantity-wrapper {
  margin-top: 4px;
}
.quantity-wrapper > .ant-btn {
  height: 20px;
  padding: 0;
}
.quantity-wrapper > span {
  padding: 0 4px;
}
</style>