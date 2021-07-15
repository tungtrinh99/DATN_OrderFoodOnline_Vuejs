<template>
  <div>
    <base-list
      :textTitle="title"
      :entity="entity"
      :isAction="isAction"
      :isAdd="isAdd"
      @openRecord="openRecord($event)"
    ></base-list>
    <show
      :show="show"
      :title="'Chi tiết vận đơn'"
      :formData="formData"
      :orderCodes="orderCodes"
      :orders="orders"
      @close="close"
    >
    </show>
  </div>
</template>

<script>
import BaseList from "../../BasePage/BaseList.vue";
import Show from "./Show.vue";
import http from "./../../../http-common";
const entity = "lading-bill";
export default {
  data() {
    return {
      title: "Vận đơn",
      entity,
      isAction: false,
      isAdd: true,
      formData: {},
      show: false,
      orderCodes: [],
      orders: []
    };
  },
  components: {
    "base-list": BaseList,
    Show
  },
  methods: {
    openRecord(value) {
      Promise.all([this.getOrders(), this.getLadingBill(value)])
        .then(res => {
          this.show = true;
          this.formData = res[1].data[0];
          this.orderCodes =
            this.formData.orders != null ? this.formData.orders.split(",") : [];
          let order = res[0].data.data.items;
          this.orders.length = 0;
          this.orderCodes.forEach(code => {
            let result = order.find(order => order.order_code == code);
            this.orders.push(result);
          });
        })
        .catch(error => {});
    },
    close() {
      this.show = false;
    },
    getOrders() {
      return http.post("/orders/list");
    },
    getLadingBill(value) {
      return http.get("/lading-bill/detail", {
        params: {
          id: value
        }
      });
    }
  }
};
</script>

<style></style>
